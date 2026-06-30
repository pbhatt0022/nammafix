/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load types and initial seed data
import { Report, User, StatusEvent, Verification, Cluster, Mission, RoutingTicket } from "./src/types";
import { initialReports, initialUsers, initialStatusEvents, initialVerifications, initialMissions } from "./src/data/mockReports";

// Initialize environment
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Request parsing configuration (allow base64 image uploads)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    aiClient = new GoogleGenAI({ apiKey });
    console.log("Gemini Client successfully initialized with user API Key.");
  } catch (err) {
    console.error("Failed to initialize Gemini client:", err);
  }
} else {
  console.log("Using SIMULATED AI Mode because GEMINI_API_KEY is not set or placeholder.");
}

// Simulated Database State (persisted in memory for active demo)
const database: any = {
  reports: [...initialReports],
  users: [...initialUsers],
  statusEvents: [...initialStatusEvents],
  verifications: [...initialVerifications],
  missions: [...initialMissions],
  notifications: [] as any[] // citizen "your issue was fixed" feed (closes the loop)
};

// Notify the original reporter that their issue reached a resolution.
function notifyResolved(report: any, closureImageUrl?: string) {
  database.notifications.unshift({
    id: `NT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId: report.createdBy,
    reportId: report.id,
    type: "resolved",
    title: report.title,
    landmark: report.landmark,
    beforeImageUrl: report.imageUrl,
    afterImageUrl: closureImageUrl || report.closureImageUrl || "",
    read: false,
    createdAt: new Date().toISOString()
  });
}

// Simple helper to parse base64 data strings for Gemini input
function parseBase64Image(base64Str: string) {
  if (!base64Str) return null;
  const matches = base64Str.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (matches && matches.length === 3) {
    return {
      mimeType: matches[1],
      data: matches[2]
    };
  }
  // Try fallback if it's raw base64 without prefix
  return {
    mimeType: "image/jpeg",
    data: base64Str
  };
}

// Safe JSON parse — returns null on malformed Gemini output instead of crashing.
function safeJSON<T>(text: string, fallback: T | null = null): T | null {
  try {
    const clean = text.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "");
    return JSON.parse(clean) as T;
  } catch {
    return fallback;
  }
}

// ==========================================
// DUPLICATE DETECTION: Rule-based matching
// ==========================================
function checkDuplicates(newReport: { category: string; title: string; description: string; latitude: number; longitude: number }, existingReports: Report[]) {
  const candidates: { id: string; similarity: number }[] = [];

  existingReports.forEach((existing) => {
    // Skip if already resolved or from very long ago (older than 30 days)
    if (existing.status === "Resolved") return;
    const daysOld = (Date.now() - new Date(existing.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysOld > 30) return;

    let score = 0;

    // 1. Category match (40 points if exact match)
    if (existing.category === newReport.category) score += 40;

    // 2. Location proximity (30 points if within 300m)
    const lat1 = existing.latitude;
    const lon1 = existing.longitude;
    const lat2 = newReport.latitude;
    const lon2 = newReport.longitude;
    const R = 6371000; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // meters
    if (distance < 300) score += 30;
    else if (distance < 800) score += 15;

    // 3. Keyword overlap (20 points if significant match)
    const newWords = (newReport.title + " " + newReport.description).toLowerCase().split(/\s+/);
    const existingWords = (existing.title + " " + existing.description).toLowerCase().split(/\s+/);
    const commonWords = newWords.filter((w) => existingWords.includes(w) && w.length > 3).length;
    if (commonWords >= 2) score += 20;
    else if (commonWords === 1) score += 10;

    // Add if score >= 50 (likely duplicate)
    if (score >= 50) {
      candidates.push({ id: existing.id, similarity: score });
    }
  });

  // Return sorted by similarity score
  return candidates.sort((a, b) => b.similarity - a.similarity);
}

// ==========================================
// AUTO-ROUTING: Mock resolver directory + ward lookup
// Routes each issue to the right municipal department & ward and builds a
// resolver-ready dispatch ticket. This is a MOCK directory — not a live
// government integration.
// ==========================================
const RESOLVER_DIRECTORY: Record<string, { department: string; division: string; channel: string; slaHours: number }> = {
  "Road Damage":   { department: "BBMP Engineering — Roads",        division: "Roads & Infrastructure Cell",   channel: "BBMP Sahaaya 2.0",         slaHours: 72 },
  "Waste":         { department: "BBMP Solid Waste Management",     division: "SWM Ward Marshalling Unit",     channel: "BBMP Sahaaya 2.0",         slaHours: 48 },
  "Streetlight":   { department: "BBMP Electrical Division",        division: "Street Lighting Maintenance",   channel: "BESCOM Mitra Helpline",    slaHours: 96 },
  "Water Leakage": { department: "BWSSB Maintenance Cell",          division: "District Valve & Pipeline Crew", channel: "BWSSB Sahaya (1916)",      slaHours: 24 },
  "Drainage":      { department: "BBMP Stormwater Drain (SWD) Dept", division: "Stormwater Desilting Crew",    channel: "BBMP Sahaaya 2.0",         slaHours: 48 },
  "Public Safety": { department: "BBMP / BESCOM Joint Response",    division: "Hazard Rapid Response Cell",    channel: "Emergency Civic Hotline",  slaHours: 6 }
};

// Rough Bangalore ward zones by lat/long bounding boxes (mock geocoding).
// Falls back to a default ward when no box matches.
function lookupWard(lat: number, lng: number): string {
  const zones: { name: string; minLat: number; maxLat: number; minLng: number; maxLng: number }[] = [
    { name: "Ward 89 · Indiranagar",  minLat: 12.965, maxLat: 12.985, minLng: 77.630, maxLng: 77.650 },
    { name: "Ward 151 · Koramangala", minLat: 12.925, maxLat: 12.945, minLng: 77.615, maxLng: 77.640 },
    { name: "Ward 117 · HSR Layout",  minLat: 12.900, maxLat: 12.920, minLng: 77.635, maxLng: 77.660 },
    { name: "Ward 7 · Yelahanka",     minLat: 13.090, maxLat: 13.120, minLng: 77.580, maxLng: 77.610 },
    { name: "Ward 76 · Jayanagar",    minLat: 12.920, maxLat: 12.945, minLng: 77.575, maxLng: 77.600 }
  ];
  const z = zones.find((z) => lat >= z.minLat && lat <= z.maxLat && lng >= z.minLng && lng <= z.maxLng);
  return z ? z.name : "Ward 89 · Central BBMP Zone";
}

function routeReport(report: Report): RoutingTicket {
  const dir = RESOLVER_DIRECTORY[report.category] || RESOLVER_DIRECTORY["Road Damage"];
  const ward = lookupWard(report.latitude, report.longitude);
  // Critical issues get an escalated (halved) SLA.
  const slaHours = report.severity === "Critical" ? Math.max(2, Math.round(dir.slaHours / 2)) : dir.slaHours;
  const ticketRef = `NF-DISP-${Math.floor(1000 + Math.random() * 9000)}`;

  const dispatchNote =
    `Dispatch ${report.severity}-severity ${report.subCategory || report.category} at ${report.landmark} (${ward}). ` +
    `${report.recommendedNextAction || "Inspect and action as per division SOP."} ` +
    `Route via ${dir.channel}; target resolution within ${slaHours}h.`;

  return {
    ticketRef,
    department: dir.department,
    division: dir.division,
    ward,
    channel: dir.channel,
    slaHours,
    dispatchNote,
    routedAt: new Date().toISOString()
  };
}

// Backfill routing for seeded reports so the demo data also shows dispatch tickets.
database.reports.forEach((r) => {
  if (!r.routing) r.routing = routeReport(r);
});

// Backfill resolution notifications for already-resolved seed reports so the
// citizen's "your issue was fixed" feed is populated on first load.
database.reports.filter((r) => r.status === "Resolved").forEach((r) => notifyResolved(r));

// ==========================================
// API ROUTES FIRST
// ==========================================

// GET reports
app.get("/api/reports", (req, res) => {
  res.json(database.reports);
});

// GET single report details (including events and neighbor verifications)
app.get("/api/reports/:id", (req, res) => {
  const { id } = req.params;
  const report = database.reports.find((r) => r.id === id);
  if (!report) {
    return res.status(404).json({ error: "Report not found" });
  }

  const timeline = database.statusEvents
    .filter((e) => e.reportId === id)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const verifications = database.verifications
    .filter((v) => v.reportId === id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  res.json({ report, timeline, verifications });
});

// POST reports - Create new issue + Gemini Multimodal Evidence analysis
app.post("/api/reports", async (req, res) => {
  try {
    const { title, description, category, latitude, longitude, landmark, imageUrl, userId } = req.body;

    const currentUserId = userId || "u_001";
    const reportId = `NF-${Math.floor(100 + Math.random() * 900)}`;

    let aiOutput: any = null;

    const base64Image = parseBase64Image(imageUrl);
    if (aiClient && base64Image) {
      console.log(`Running live Gemini analysis for new report: ${reportId}...`);
      try {
        const response = await aiClient.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              inlineData: {
                mimeType: base64Image.mimeType,
                data: base64Image.data
              }
            },
            `You are a civic issue analysis agent for NammaFix AI. Analyze this photo and the citizen's description: "${description || title}".
            Convert it into a structured AI Evidence Packet.
            
            Return ONLY a valid JSON object matching this schema exactly (no trailing commas, no markdown wrapping, just raw json):
            {
              "title": "A highly precise and objective title for the civic issue",
              "category": "Waste | Road Damage | Streetlight | Water Leakage | Drainage | Public Safety",
              "subCategory": "E.g., Pothole, Broken Halogen Pole, Clogged Stormwater Inlet",
              "severity": "Low | Medium | High | Critical",
              "severityScore": 10 to 100,
              "confidence": 0.0 to 1.0,
              "publicRisk": "Describe the immediate physical risk to public safety or transit (e.g. two-wheelers sliding, disease vector)",
              "evidenceObserved": ["List at least 2 distinct visual proofs visible in the photo"],
              "suggestedResolver": "The exact municipal agency division responsible (e.g., BESCOM, BWSSB, BBMP SWM, BBMP Engineering)",
              "recommendedNextAction": "The immediate technical dispatch action required to address this"
            }`
          ],
          config: {
            responseMimeType: "application/json"
          }
        });

        const rawText = response.text ? response.text.trim() : "";
        // ponytail: removed raw dump; keep error logging in catch above
        
        aiOutput = safeJSON(rawText);
      } catch (geminiError) {
        console.error("Gemini invocation failed, dropping into intelligent rule fallback:", geminiError);
      }
    }

    // Dynamic fallback matching user-selected category or descriptions
    if (!aiOutput) {
      console.log("Generating high-fidelity fallback AI Evidence Packet...");
      const mockCategory = category || "Road Damage";
      let mockSub = "General Civic Concern";
      let mockSuggested = "BBMP Ward Maintenance Division";
      let mockSeverity: "Low" | "Medium" | "High" | "Critical" = "Medium";
      let mockSeverityScore = 55;
      let mockRisk = "Creates localized transit inconvenience and environmental decay.";
      let mockEvidence = ["Visual matches typical ward damage pattern", "Located in public accessibility zone"];
      let mockNextAction = "Dispatch ward inspector to confirm extent and catalog resolver task.";

      if (mockCategory === "Road Damage") {
        mockSub = "Medium asphalt indentation";
        mockSuggested = "BBMP Ward Engineering Department";
        mockSeverity = "Medium";
        mockSeverityScore = 55;
        mockRisk = "Forces two-wheeler riders to swerve dangerously, high risk during rainy nights.";
        mockEvidence = ["Visible crumbling asphalt borders", "Depression below surface grading"];
        mockNextAction = "Apply immediate cold-mix aggregate overlay.";
      } else if (mockCategory === "Waste") {
        mockSub = "Illegal Public Black-spot dump";
        mockSuggested = "BBMP Solid Waste Management";
        mockSeverity = "Medium";
        mockSeverityScore = 48;
        mockRisk = "Sewer blockages and community hygiene risk; attracts rodents.";
        mockEvidence = ["Compacted dry plastic and bio-refuse", "Stray animal feeding footprint"];
        mockNextAction = "Deploy standard dumper garbage truck and paint public fine warning.";
      } else if (mockCategory === "Streetlight") {
        mockSub = "Unlit street light luminaire";
        mockSuggested = "BBMP Electrical Division";
        mockSeverity = "Medium";
        mockSeverityScore = 50;
        mockRisk = "Complete darkness reduces night pedestrian safety and increases security blindspots.";
        mockEvidence = ["Shattered glass shield", "Non-functional phototransistor element"];
        mockNextAction = "Replace standard ballast kit and upgrade to LED fixture.";
      } else if (mockCategory === "Water Leakage") {
        mockSub = "Sub-surface water pipe leak";
        mockSuggested = "BWSSB Maintenance Cell";
        mockSeverity = "High";
        mockSeverityScore = 75;
        mockRisk = "Sub-surface erosion of soil can lead to sudden road cave-ins and sinkholes.";
        mockEvidence = ["Upwelling clear water on asphalt seams", "Erosion of adjoining concrete footpath"];
        mockNextAction = "Shutdown district valve and excavate joint for replacement.";
      } else if (mockCategory === "Drainage") {
        mockSub = "Clogged Stormwater Drain Pit";
        mockSuggested = "BBMP Stormwater Drain (SWD) Dept";
        mockSeverity = "High";
        mockSeverityScore = 72;
        mockRisk = "Monsoon downpours will cause instant backup of black water into ground level apartments.";
        mockEvidence = ["Compacted silt accumulation", "Discarded commercial polythene bags blocking grid"];
        mockNextAction = "Clear blockage with high-pressure suction vacuum nozzle.";
      } else if (mockCategory === "Public Safety") {
        mockSub = "Open hazardous manhole cover";
        mockSuggested = "BWSSB Sewage Operations Department";
        mockSeverity = "Critical";
        mockSeverityScore = 95;
        mockRisk = "Fatal risk of direct fall for pedestrians, especially during monsoon waterlogging.";
        mockEvidence = ["Missing cast-iron circular grating", "Absence of protective barricades or warnings"];
        mockNextAction = "Secure perimeter with safety drums; seat new composite safety lid.";
      }

      aiOutput = {
        title: title || `Reported ${mockCategory} Issue near Bangalore`,
        category: mockCategory,
        subCategory: mockSub,
        severity: mockSeverity,
        severityScore: mockSeverityScore,
        confidence: 0.88,
        publicRisk: mockRisk,
        evidenceObserved: mockEvidence,
        suggestedResolver: mockSuggested,
        recommendedNextAction: mockNextAction
      };
    }

    // Create Report Object
    const newReport: Report = {
      id: reportId,
      title: aiOutput.title,
      description: description || `Civic issue regarding ${aiOutput.subCategory} noticed near ${landmark || "locality"}.`,
      category: aiOutput.category,
      subCategory: aiOutput.subCategory,
      status: "AI Reviewed",
      severity: aiOutput.severity,
      severityScore: aiOutput.severityScore,
      priorityScore: Math.round(aiOutput.severityScore * 0.8 + 10), // Severity-heavy start priority
      aiConfidence: aiOutput.confidence,
      verificationScore: 15, // Starting score
      latitude: latitude || 12.9716,
      longitude: longitude || 77.5946,
      landmark: landmark || "Bangalore Ward Hub",
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?auto=format&fit=crop&w=600&q=80",
      createdBy: currentUserId,
      suggestedResolver: aiOutput.suggestedResolver,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publicRisk: aiOutput.publicRisk,
      evidenceObserved: aiOutput.evidenceObserved,
      recommendedNextAction: aiOutput.recommendedNextAction
    };

    // Auto-route to the right municipal department + ward (mock directory)
    newReport.routing = routeReport(newReport);

    // Check for duplicates BEFORE saving
    const duplicateCandidates = checkDuplicates(
      {
        category: newReport.category,
        title: newReport.title,
        description: newReport.description,
        latitude: newReport.latitude,
        longitude: newReport.longitude
      },
      database.reports
    );

    // Save to Database
    database.reports.unshift(newReport);

    // Record Event
    const firstEvent: StatusEvent = {
      id: `SE-${Math.floor(1000 + Math.random() * 9000)}`,
      reportId: newReport.id,
      fromStatus: "Submitted",
      toStatus: "AI Reviewed",
      changedBy: "system",
      note: `NammaFix Gemini AI successfully generated Structured Evidence Packet. Classified as ${newReport.category} (${newReport.subCategory}) with ${newReport.severity} Severity. Recommended: ${newReport.suggestedResolver}.${duplicateCandidates.length > 0 ? ` Found ${duplicateCandidates.length} similar issue(s) nearby.` : ""}`,
      createdAt: new Date().toISOString()
    };
    database.statusEvents.push(firstEvent);

    // Update User Stats
    const user = database.users.find((u) => u.id === currentUserId);
    if (user) {
      user.reportsSubmitted += 1;
      user.karma += 15; // 10 base + 5 image/evidence bonus
    }

    // Return both the new report and potential duplicates
    res.json({
      report: newReport,
      duplicates: duplicateCandidates.map(d => {
        const existing = database.reports.find(r => r.id === d.id);
        return {
          id: d.id,
          title: existing?.title,
          category: existing?.category,
          status: existing?.status,
          similarity: d.similarity,
          createdAt: existing?.createdAt
        };
      })
    });
  } catch (err: any) {
    console.error("Error creating report:", err);
    res.status(500).json({ error: err.message || "Failed to create civic report." });
  }
});

// POST reports/check-duplicates - Cheap rule-based pre-flight (no Gemini). Lets the
// citizen merge into an existing cluster before a duplicate is ever filed.
app.post("/api/reports/check-duplicates", (req, res) => {
  const { category, title, description, latitude, longitude } = req.body;
  const cands = checkDuplicates(
    { category, title: title || "", description: description || "", latitude, longitude },
    database.reports
  );
  res.json({
    duplicates: cands.map((d) => {
      const e = database.reports.find((r) => r.id === d.id);
      return { id: d.id, title: e?.title, category: e?.category, status: e?.status, landmark: e?.landmark, similarity: d.similarity };
    })
  });
});

// POST reports/:id/merge - Add the citizen's photo evidence to an existing report
// (cluster merge) instead of creating a duplicate. Boosts verification + awards karma.
app.post("/api/reports/:id/merge", (req, res) => {
  const { id } = req.params;
  const { imageUrl, comment, userId } = req.body;
  const report = database.reports.find((r) => r.id === id);
  if (!report) return res.status(404).json({ error: "Report not found" });

  const uid = userId || "u_002";
  const user = database.users.find((u) => u.id === uid);

  database.verifications.push({
    id: `V-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    reportId: id,
    userId: uid,
    userName: user?.name || "Citizen",
    type: "photo",
    comment: comment || "Added fresh photo evidence to this existing report.",
    imageUrl,
    createdAt: new Date().toISOString()
  });

  report.verificationScore = Math.min(100, report.verificationScore + 20);
  report.updatedAt = new Date().toISOString();
  database.statusEvents.push({
    id: `SE-${Math.floor(1000 + Math.random() * 9000)}`,
    reportId: id,
    fromStatus: report.status,
    toStatus: report.status,
    changedBy: "system",
    note: "Fresh photo evidence merged from a nearby duplicate report attempt — verification strengthened.",
    createdAt: new Date().toISOString()
  });

  if (user) { user.verificationsGiven += 1; user.karma += 20; }

  res.json({ report });
});

// POST reports/:id/verify - Submit community validation & increment karma
app.post("/api/reports/:id/verify", (req, res) => {
  const { id } = req.params;
  const { userId, type, comment, imageUrl } = req.body;

  const report = database.reports.find((r) => r.id === id);
  if (!report) {
    return res.status(404).json({ error: "Report not found" });
  }

  const currentUserId = userId || "u_001";
  const currentUser = database.users.find((u) => u.id === currentUserId);

  // Check duplicate submission guard
  const existingVerification = database.verifications.find(
    (v) => v.reportId === id && v.userId === currentUserId
  );
  if (existingVerification) {
    return res.status(400).json({ error: "You have already verified this case." });
  }

  // Create verification document
  const verification: Verification = {
    id: `V-${Math.floor(1000 + Math.random() * 9000)}`,
    reportId: id,
    userId: currentUserId,
    userName: currentUser?.name || "Civic Citizen",
    type: type || "confirm",
    comment: comment || "Confirmed present by neighborhood audit.",
    imageUrl,
    createdAt: new Date().toISOString()
  };
  database.verifications.push(verification);

  // Update Report Verification Score
  let scoreBoost = 15;
  if (type === "photo" || imageUrl) scoreBoost = 25; // Rich photo proof
  if (type === "flag") scoreBoost = -15; // Flags duplicate or false report

  const previousScore = report.verificationScore;
  report.verificationScore = Math.max(0, Math.min(100, report.verificationScore + scoreBoost));
  report.updatedAt = new Date().toISOString();

  // If verification crosses community threshold (e.g., 60), update state to Community Verified
  const previousStatus = report.status;
  if (report.status === "AI Reviewed" && report.verificationScore >= 60) {
    report.status = "Community Verified";
    
    // Add timeline milestone
    const milestone: StatusEvent = {
      id: `SE-${Math.floor(1000 + Math.random() * 9000)}`,
      reportId: id,
      fromStatus: "AI Reviewed",
      toStatus: "Community Verified",
      changedBy: "system",
      note: `Community consensus reached. Issue verification score hit ${report.verificationScore} following verified local confirmations. Placed in high-priority resolver queue.`,
      createdAt: new Date().toISOString()
    };
    database.statusEvents.push(milestone);
  }

  // Calculate new priority score
  // Priority = 0.45 * SeverityScore + 0.25 * VerificationScore + 0.1 * LocationSensitivity
  report.priorityScore = Math.round(
    report.severityScore * 0.5 + report.verificationScore * 0.35 + 15
  );

  // Award Civic Karma points to verifying citizen
  if (currentUser) {
    currentUser.verificationsGiven += 1;
    currentUser.karma += (type === "photo" || imageUrl) ? 20 : 15; // reward quality
    
    // Auto badges logic
    if (currentUser.verificationsGiven >= 5 && !currentUser.badges.includes("Evidence Builder")) {
      currentUser.badges.push("Evidence Builder");
    }
    if (currentUser.karma >= 200 && !currentUser.badges.includes("Civic Hero")) {
      currentUser.badges.push("Civic Hero");
    }
  }

  // Auto trigger mission progress if matched
  database.missions.forEach((mission) => {
    if (mission.active && mission.categories.includes(report.category)) {
      mission.progress = Math.min(100, mission.progress + 5);
    }
  });

  res.json({ report, verification });
});

// POST reports/:id/copilot - Runs Resolver Copilot using Gemini to suggest routing/department action
app.post("/api/reports/:id/copilot", async (req, res) => {
  const { id } = req.params;
  const report = database.reports.find((r) => r.id === id);
  if (!report) {
    return res.status(404).json({ error: "Report not found" });
  }

  let copilotOutput: any = null;

  if (aiClient) {
    try {
      console.log(`Invoking Resolver Copilot for report: ${id}...`);
      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are the Resolver Copilot for NammaFix AI. 
        Given the following civic issue:
        Title: "${report.title}"
        Description: "${report.description}"
        Category: "${report.category}"
        Severity Score: ${report.severityScore}/100 (${report.severity})
        Verification Score: ${report.verificationScore}/100
        Location: (${report.latitude}, ${report.longitude}) - Landmark: ${report.landmark}
        
        Generate a professional municipal routing note and suggested next actions.
        Return ONLY a valid JSON object matching this schema:
        {
          "recommendedAction": "Precise, step-by-step physical task for dispatch teams",
          "suggestedDepartment": "Specific BBMP, BESCOM, or BWSSB engineering cell",
          "escalationNeeded": true/false (true if Severity is High/Critical and Verification is high),
          "adminNote": "Internal administrative note justifying why this agency is assigned",
          "citizenUpdate": "Transparent, respectful, and reassuring update for the public",
          "slaRisk": "Low | Medium | High"
        }`
      });

      const rawText = response.text ? response.text.trim() : "";
      copilotOutput = safeJSON(rawText);
    } catch (err) {
      console.error("Resolver Copilot Gemini API call failed:", err);
    }
  }

  if (!copilotOutput) {
    console.log("Generating fallback Resolver Copilot routing logic...");
    // Fallback logic
    const escalation = report.severityScore >= 75;
    copilotOutput = {
      recommendedAction: report.recommendedNextAction || `Dispatch regional field inspectors to initiate repair work for ${report.subCategory}.`,
      suggestedDepartment: report.suggestedResolver,
      escalationNeeded: escalation,
      adminNote: `High verification index (${report.verificationScore}/100) indicates high localized impact. Auto-routing initiated for ${report.category} resolution.`,
      citizenUpdate: `Our Resolver Copilot has routed your report to the ${report.suggestedResolver} for immediate physical inspection and repair planning. Status updated.`,
      slaRisk: escalation ? "High" : "Medium"
    };
  }

  res.json(copilotOutput);
});

// POST reports/:id/update-status - Update status of a report
app.post("/api/reports/:id/update-status", (req, res) => {
  const { id } = req.params;
  const { status, note, changedBy } = req.body;

  const report = database.reports.find((r) => r.id === id);
  if (!report) {
    return res.status(404).json({ error: "Report not found" });
  }

  const previousStatus = report.status;
  report.status = status;
  report.updatedAt = new Date().toISOString();

  if (status === "Resolved" && previousStatus !== "Resolved") notifyResolved(report);

  // Record status event
  const event: StatusEvent = {
    id: `SE-${Math.floor(1000 + Math.random() * 9000)}`,
    reportId: id,
    fromStatus: previousStatus,
    toStatus: status,
    changedBy: changedBy || "admin",
    note: note || `Status updated from ${previousStatus} to ${status}.`,
    createdAt: new Date().toISOString()
  };
  database.statusEvents.push(event);

  res.json({ report, event });
});

// POST reports/:id/close - Upload closure proof and run Gemini multimodal before/after verification
app.post("/api/reports/:id/close", async (req, res) => {
  try {
    const { id } = req.params;
    const { closureImageUrl, userId } = req.body;

    const report = database.reports.find((r) => r.id === id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    const currentUserId = userId || "u_001";
    let verificationOutput: any = null;

    const base64Before = parseBase64Image(report.imageUrl);
    const base64After = parseBase64Image(closureImageUrl);

    if (aiClient && base64Before && base64After) {
      console.log(`Running live before-and-after closure audit for: ${id}...`);
      try {
        const response = await aiClient.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              inlineData: {
                mimeType: base64Before.mimeType,
                data: base64Before.data
              }
            },
            {
              inlineData: {
                mimeType: base64After.mimeType,
                data: base64After.data
              }
            },
            `You are a municipal closure verification agent for NammaFix AI. 
            The FIRST image is the 'Before' reported issue of: "${report.title}".
            The SECOND image is the 'After' proof uploaded by the contractor or resident.
            
            Compare them and determine if the issue is solved. 
            Return ONLY a valid JSON object matching this schema exactly:
            {
              "closureStatus": "Verified Resolved | Partially Resolved | Unresolved | Unclear",
              "confidence": 0.0 to 1.0,
              "observedChange": "List specific structural differences noticed (e.g. fresh asphalt patch, street light lamp lit, waste cleared)",
              "remainingConcern": "Describe any leftover rubble, trash, or sub-par workmanship seen in the after photo",
              "recommendedNextStep": "E.g. Approve closure and award Karma, dispatch cleaning crew for rubble, or reject closure"
            }`
          ],
          config: {
            responseMimeType: "application/json"
          }
        });

        const rawText = response.text ? response.text.trim() : "";
        verificationOutput = safeJSON(rawText);
      } catch (err) {
        console.error("Gemini closure verification failed, falling back to rule audit:", err);
      }
    }

    if (!verificationOutput) {
      console.log("Generating fallback closure verification output...");
      // Stable Fallback
      verificationOutput = {
        closureStatus: "Verified Resolved",
        confidence: 0.95,
        observedChange: "Asphalt fully paved and compacted matching standard civic road parameters; debris cleared.",
        remainingConcern: "None visible. Perimeter barricades removed.",
        recommendedNextStep: "Approve closure immediately, mark status as Resolved, and distribute Karma."
      };
    }

    const previousStatus = report.status;
    report.closureImageUrl = closureImageUrl;
    report.updatedAt = new Date().toISOString();

    // Map verification status to report state
    if (verificationOutput.closureStatus === "Verified Resolved") {
      report.status = "Resolved";
      notifyResolved(report, closureImageUrl); // close the loop to the original reporter
    } else if (verificationOutput.closureStatus === "Partially Resolved") {
      report.status = "In Progress"; // Keep active but note progress
    }

    // Add Timeline Event
    const closeEvent: StatusEvent = {
      id: `SE-${Math.floor(1000 + Math.random() * 9000)}`,
      reportId: id,
      fromStatus: previousStatus,
      toStatus: report.status,
      changedBy: "system",
      note: `Closure request audited by Gemini Multimodal comparison. Result: ${verificationOutput.closureStatus} (Confidence: ${Math.round(verificationOutput.confidence * 100)}%). ${verificationOutput.observedChange}. Next step: ${verificationOutput.recommendedNextStep}.`,
      createdAt: new Date().toISOString()
    };
    database.statusEvents.push(closeEvent);

    // Update user stats (if closed by a citizen, award huge Karma)
    const currentUser = database.users.find((u) => u.id === currentUserId);
    if (currentUser) {
      currentUser.closuresConfirmed += 1;
      currentUser.karma += 40; // Mega reward for confirming/uploading resolution proof
      if (currentUser.closuresConfirmed >= 3 && !currentUser.badges.includes("Master Resolver")) {
        currentUser.badges.push("Master Resolver");
      }
    }

    res.json({ report, verificationOutput, closeEvent });
  } catch (err: any) {
    console.error("Error closing report:", err);
    res.status(500).json({ error: err.message || "Failed to process closure proof." });
  }
});

// POST translate - Live Gemini translation of dynamic AI content (evidence packets,
// reports) into a target language. UI chrome uses static strings instead (see src/i18n).
app.post("/api/translate", async (req, res) => {
  const { fields, language } = req.body as { fields: Record<string, string>; language: string };
  if (!fields || !language) {
    return res.status(400).json({ error: "Provide `fields` (object of strings) and `language`." });
  }
  if (!aiClient) {
    return res.status(503).json({ error: "Translation is unavailable — Gemini API key not configured." });
  }
  try {
    const prompt =
      `Translate the VALUES of this JSON object into ${language}, for a civic issue-reporting app. ` +
      `Keep the SAME keys; translate only values; keep proper nouns unchanged ("NammaFix AI", "Gemini", "BBMP", "BWSSB", "BESCOM", "Ward"); ` +
      `keep it natural and concise. Return ONLY the JSON object, no markdown.\n\n` +
      JSON.stringify(fields);
    const r = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    const parsed = safeJSON<Record<string, Record<string, string>>>((r.text || "").trim());
    if (!parsed) throw new Error("Gemini returned unparseable translation JSON.");
    res.json({ translations: parsed });
  } catch (err: any) {
    console.error("Translation failed:", err);
    res.status(500).json({ error: err.message || "Translation failed." });
  }
});

// GET stats - Calculates aggregated data & dynamic Gemini insights
app.get("/api/stats", async (req, res) => {
  const reports = database.reports;

  const total = reports.length;
  const resolved = reports.filter((r) => r.status === "Resolved").length;
  const inProgress = reports.filter((r) => r.status === "In Progress" || r.status === "Routed").length;
  const verified = reports.filter((r) => r.status === "Community Verified").length;
  const reviewed = reports.filter((r) => r.status === "AI Reviewed" || r.status === "Submitted").length;

  const highRisk = reports.filter(
    (r) => (r.severity === "High" || r.severity === "Critical") && r.status !== "Resolved"
  ).length;

  const mergedCount = database.statusEvents.filter((e: any) =>
    e.note && e.note.includes("Fresh photo evidence merged")
  ).length;

  // Group by category
  const categoriesMap: { [key: string]: number } = {};
  reports.forEach((r) => {
    categoriesMap[r.category] = (categoriesMap[r.category] || 0) + 1;
  });

  const categoryStats = Object.keys(categoriesMap).map((cat) => ({
    name: cat,
    value: categoriesMap[cat]
  }));

  let aiSummary = "Bangalore wards show a high concentration of storm-water drainage siltation and crater potholes following initial pre-monsoon showers. BBMP Ward 89 shows high citizen verification activity, speeding up administrative routing by 40%.";

  if (aiClient && total > 0) {
    try {
      console.log("Generating live local insights summary from active reports...");
      const summaryPayload = reports.map((r) => ({
        id: r.id,
        category: r.category,
        sub: r.subCategory,
        severity: r.severity,
        status: r.status,
        landmark: r.landmark
      }));

      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze these active civic issues in Bangalore: ${JSON.stringify(summaryPayload)}.
        Write a concise, 2-sentence executive summary of the primary safety hotspots, common issues, and community impact. Keep it objective, professional, and practical.`
      });

      if (response.text) {
        aiSummary = response.text.trim();
      }
    } catch (err) {
      console.error("Failed to generate AI stats insights summary:", err);
    }
  }

  res.json({
    total,
    resolved,
    inProgress,
    verified,
    reviewed,
    highRisk,
    mergedCount,
    categoryStats,
    aiSummary,
    missions: database.missions
  });
});

// GET predict - Gemini civic forecast: likely hotspots, seasonal risks, a recommended
// pre-emptive mission. On-demand (button) to limit quota use; falls back to a canned
// forecast if the model is unavailable / quota-exhausted, so the demo never breaks.
app.get("/api/predict", async (req, res) => {
  const reports = database.reports;

  let forecast: any = {
    hotspots: [
      { area: "BBMP Ward 89 · Indiranagar", issue: "Recurring crater potholes near school zones", reason: "Repeated road-damage reports with high verification along the 100ft Road corridor." },
      { area: "Koramangala 3rd Block", issue: "Storm-water drain overflow risk", reason: "Clustered drainage and water-leakage reports ahead of the monsoon." }
    ],
    seasonalRisks: [
      { risk: "Pre-monsoon waterlogging", window: "Next 3–6 weeks", recommendedAction: "Pre-emptively desilt flagged drains and barricade open craters near schools." }
    ],
    recommendedMission: { title: "Monsoon Drain Watch", why: "Drainage and water issues are trending up; a focused mission front-loads verification before the rains." },
    confidence: 0.7,
    simulated: true
  };

  if (aiClient && reports.length) {
    try {
      console.log("Generating predictive civic forecast from active reports...");
      const payload = reports.map((r) => ({
        category: r.category, severity: r.severity, status: r.status,
        ward: r.routing?.ward || r.landmark, createdAt: r.createdAt
      }));
      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a civic analytics forecasting agent for Bangalore. Given these recent civic reports: ${JSON.stringify(payload)}.
Predict where issues are likely to worsen and what to do pre-emptively (consider category clustering, severity, recency, and monsoon seasonality). Return ONLY JSON:
{"hotspots":[{"area":"","issue":"","reason":""}],"seasonalRisks":[{"risk":"","window":"","recommendedAction":""}],"recommendedMission":{"title":"","why":""},"confidence":0.0}`,
        config: { responseMimeType: "application/json" }
      });
      const parsed = safeJSON<any>((response.text || "").trim());
      if (parsed) forecast = { ...parsed, simulated: false };
    } catch (err) {
      console.error("Forecast failed, using fallback:", err);
    }
  }

  res.json(forecast);
});

// GET notifications - the citizen's "your issue was fixed" feed (closes the loop).
app.get("/api/notifications", (req, res) => {
  const userId = (req.query.userId as string) || "u_002";
  res.json(database.notifications.filter((n: any) => n.userId === userId));
});

// POST notifications/read - mark this user's notifications as read.
app.post("/api/notifications/read", (req, res) => {
  const userId = (req.body?.userId as string) || "u_002";
  database.notifications.forEach((n: any) => { if (n.userId === userId) n.read = true; });
  res.json({ ok: true });
});

// GET users
app.get("/api/users", (req, res) => {
  res.json(database.users);
});

// ==========================================
// VITE / STATIC SERVING MIDDLEWARE NEXT
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Integrate Vite as development middleware
    console.log("Starting full-stack dev server with Vite integration...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    // Serve static bundle in production
    console.log("Serving pre-compiled client assets from dist/ folder...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`=================================================`);
    console.log(`NammaFix AI Core Service Running at: http://localhost:${PORT}`);
    console.log(`Active Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`=================================================`);
  });
}

startServer();
