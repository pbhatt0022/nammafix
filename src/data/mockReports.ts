/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Report, User, StatusEvent, Verification, Mission } from "../types";

export const initialUsers: User[] = [
  {
    id: "u_001",
    name: "Arjun Gowda",
    role: "citizen",
    locality: "Yelahanka, Bengaluru",
    karma: 120,
    badges: ["First Responder", "Evidence Builder"],
    reportsSubmitted: 4,
    verificationsGiven: 8,
    closuresConfirmed: 2
  },
  {
    id: "u_002",
    name: "Priyanka Bhatt",
    role: "citizen",
    locality: "Indiranagar, Bengaluru",
    karma: 420,
    badges: ["Civic Hero", "Drainage Guru", "Mission Finisher"],
    reportsSubmitted: 8,
    verificationsGiven: 15,
    closuresConfirmed: 5
  },
  {
    id: "u_003",
    name: "Ananya Rao",
    role: "admin",
    locality: "BBMP Ward 89 Office",
    karma: 500,
    badges: ["Master Resolver", "Ward Custodian"],
    reportsSubmitted: 1,
    verificationsGiven: 30,
    closuresConfirmed: 12
  }
];

export const initialMissions: Mission[] = [
  {
    id: "M-001",
    title: "Monsoon Preparedness Watch",
    description: "Report and verify dangerous potholes, blocked storm-water drains, and electrical pole hazards before the heavy rains start.",
    active: true,
    bonusPoints: 30,
    categories: ["Road Damage", "Drainage", "Public Safety"],
    progress: 75
  },
  {
    id: "M-002",
    title: "Eco-Clean Ward 89",
    description: "Submit valid reports for public black-spots (illegal garbage dump zones) and verify when clean-up is completed.",
    active: true,
    bonusPoints: 20,
    categories: ["Waste"],
    progress: 40
  },
  {
    id: "M-003",
    title: "Illuminated Neighborhoods",
    description: "Audit dark spots. Report broken streetlights or hazardous overhead cables to secure local walking routes.",
    active: false,
    bonusPoints: 15,
    categories: ["Streetlight", "Public Safety"],
    progress: 100
  }
];

export const initialReports: Report[] = [
  {
    id: "NF-101",
    title: "Severe garbage overflow near Yelahanka New Town Market",
    description: "Huge pile of solid waste has accumulated outside the vegetable market gate. Stray dogs are scattering it and it blocks half the access road.",
    category: "Waste",
    subCategory: "Illegal Garbage Dump Pile",
    status: "Routed",
    severity: "Medium",
    severityScore: 58,
    priorityScore: 65,
    aiConfidence: 0.94,
    verificationScore: 60,
    latitude: 13.0982,
    longitude: 77.5873,
    landmark: "Yelahanka Vegetable Market West Gate",
    imageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80",
    createdBy: "u_001",
    suggestedResolver: "BBMP Solid Waste Management (Yelahanka Sector)",
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    publicRisk: "Health hazard, blocks public pedestrian pathway, attracts stray animals.",
    evidenceObserved: [
      "Accumulated commercial wet/dry waste",
      "Stray animals actively scattering debris",
      "Encroachment onto active vehicle lane"
    ],
    recommendedNextAction: "Dispatch dumper truck for deep clearance and install temporary fencing."
  },
  {
    id: "NF-102",
    title: "Massive crater pothole near Indiranagar School entrance",
    description: "Deep pothole directly in front of the primary school gate. Water accumulates in it making it invisible after light showers. Two-wheelers frequently slip here.",
    category: "Road Damage",
    subCategory: "Deep Crater Pothole",
    status: "Community Verified",
    severity: "High",
    severityScore: 82,
    priorityScore: 88,
    aiConfidence: 0.96,
    verificationScore: 85,
    latitude: 12.9716,
    longitude: 77.6412,
    landmark: "Indiranagar National School Gate",
    imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80",
    createdBy: "u_002",
    suggestedResolver: "BBMP Ward 89 Engineering Division",
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    publicRisk: "Extreme risk of low-visibility accidents for school buses, children, and delivery riders.",
    evidenceObserved: [
      "Crater exceeding 12cm depth",
      "Direct alignment with school bus boarding zone",
      "Signs of structural road base degradation"
    ],
    recommendedNextAction: "Deploy immediate cold-mix patch kit; schedule permanent micro-surfacing."
  },
  {
    id: "NF-103",
    title: "Damaged high-voltage cable sparking on 100 Feet Road",
    description: "The overhead cable joint has pulled loose and sparked when heavy buses pass. It is hanging within 7 feet of the footpath near the coffee shop.",
    category: "Public Safety",
    subCategory: "Exposed Sparks & Hanging Cable",
    status: "In Progress",
    severity: "Critical",
    severityScore: 95,
    priorityScore: 97,
    aiConfidence: 0.98,
    verificationScore: 90,
    latitude: 12.9625,
    longitude: 77.6381,
    landmark: "Opposite Starbucks Coffee, 100ft Road",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
    createdBy: "u_002",
    suggestedResolver: "BESCOM (Koramangala/Indiranagar O&M Division)",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    publicRisk: "Fatal electrocution risk for pedestrians, highly escalated due to damp monsoon branches.",
    evidenceObserved: [
      "Hanging distribution conductor within reach",
      "Intermittent thermal sparking visible",
      "Uninsulated joint exposed to wet foliage"
    ],
    recommendedNextAction: "Immediate shutdown of feeder line; dispatch emergency crew to tension and insulate cable."
  },
  {
    id: "NF-104",
    title: "Major water pipe burst flooding residential street",
    description: "Main potable water line is leaking heavily from an underground joint. Millions of liters of clean water are flooding into the nearby stormwater drain.",
    category: "Water Leakage",
    subCategory: "Main Line Pipeline Rupture",
    status: "AI Reviewed",
    severity: "High",
    severityScore: 78,
    priorityScore: 75,
    aiConfidence: 0.91,
    verificationScore: 20,
    latitude: 12.9352,
    longitude: 77.6245,
    landmark: "Koramangala 3rd Block, Near Post Office",
    imageUrl: "https://images.unsplash.com/photo-1542013936693-8848e5740a7a?auto=format&fit=crop&w=600&q=80",
    createdBy: "u_001",
    suggestedResolver: "BWSSB (Water Supply Operations Team)",
    createdAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(), // 8 hours ago
    updatedAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    publicRisk: "Large-scale waste of clean drinking water, erosion of road foundation causing sinkholes.",
    evidenceObserved: [
      "Subterranean upwelling of high-pressure water",
      "Flooding across 150m of residential roadway",
      "Pavement lifting observed"
    ],
    recommendedNextAction: "Isolate sector valve immediately; excavate and replace broken socket joint."
  },
  {
    id: "NF-105",
    title: "Completely blocked stormwater drain causes house flooding",
    description: "The storm drain is stuffed with plastic bags and household garbage. A light rain yesterday caused sewage-mixed rainwater to backup into the ground floor flats.",
    category: "Drainage",
    subCategory: "Blocked Stormwater Outlet",
    status: "Community Verified",
    severity: "High",
    severityScore: 76,
    priorityScore: 81,
    aiConfidence: 0.89,
    verificationScore: 78,
    latitude: 13.0294,
    longitude: 77.5912,
    landmark: "RT Nagar, Behind BDA Complex",
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80",
    createdBy: "u_002",
    suggestedResolver: "BBMP Stormwater Drain (SWD) Department",
    createdAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(), // 4 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    publicRisk: "Urban flooding of homes, sewage backflow, severe dengue mosquito breeding ground.",
    evidenceObserved: [
      "100% block with compacted plastic and silt",
      "Stagnant water depth exceeding 1.2m",
      "Slight sewage odor indicating cross-contamination"
    ],
    recommendedNextAction: "Bring in suction desilting vehicle to clear obstruction; enforce fines on local vendors throwing bags."
  },
  {
    id: "NF-106",
    title: "Broken streetlight leaves blind corner pitch black",
    description: "The double-halogen lamp has been dead for a month. It lies on a sharp S-curve in a high-traffic lane. Multiple near-miss crashes occurred this week.",
    category: "Streetlight",
    subCategory: "Non-functional Halogen Fixture",
    status: "Submitted",
    severity: "Medium",
    severityScore: 50,
    priorityScore: 48,
    aiConfidence: 0.88,
    verificationScore: 10,
    latitude: 12.9104,
    longitude: 77.6025,
    landmark: "JP Nagar 2nd Phase, near Outer Ring junction",
    imageUrl: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80",
    createdBy: "u_001",
    suggestedResolver: "BBMP Electrical Department Division V",
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(), // 5 hours ago
    updatedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    publicRisk: "Increased risk of muggings and vehicle accidents on dark residential blind-curve.",
    evidenceObserved: [
      "Extinguished bulb, visible burn mark on casing",
      "Location situated on sharp, narrow high-speed turn"
    ],
    recommendedNextAction: "Replace ballast and substitute with modern high-efficiency energy-saving LED lamp."
  },
  {
    id: "NF-110",
    title: "Bent and rusted traffic warning sign at junction",
    description: "The 'STOP / ONE WAY' sign has been hit by a vehicle and is bent flat, making it invisible to oncoming commuters. Cars are driving the wrong way.",
    category: "Road Damage",
    subCategory: "Damaged Traffic Signage",
    status: "Resolved",
    severity: "Low",
    severityScore: 28,
    priorityScore: 32,
    aiConfidence: 0.85,
    verificationScore: 95,
    latitude: 12.9281,
    longitude: 77.5839,
    landmark: "Jayanagar 4th Block, 9th Main Corner",
    imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=600&q=80",
    closureImageUrl: "https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?auto=format&fit=crop&w=600&q=80",
    createdBy: "u_002",
    suggestedResolver: "Bangalore Traffic Police Engineering Cell",
    createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    publicRisk: "Confusion at blind corner leading to head-on collision wrong-way entries.",
    evidenceObserved: [
      "Metal pole bent at 45 degree angle",
      "Reflective film peeling and illegible"
    ],
    recommendedNextAction: "Erect new hot-dipped galvanized pole; install micro-prismatic high-intensity STOP sign."
  }
];

export const initialStatusEvents: StatusEvent[] = [
  {
    id: "SE-001",
    reportId: "NF-102",
    fromStatus: "Submitted",
    toStatus: "AI Reviewed",
    changedBy: "system",
    note: "Gemini AI analyzed the uploaded photo and text, generated the Structured AI Evidence Packet, scored severity at 82, and auto-recommended routing to Ward 89 Engineering Division.",
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000 + 10 * 60 * 1000).toISOString()
  },
  {
    id: "SE-002",
    reportId: "NF-102",
    fromStatus: "AI Reviewed",
    toStatus: "Community Verified",
    changedBy: "system",
    note: "Verification score reached 85 points following 3 independent photo-confirmed neighbor validations. Escalating to high-priority active queue.",
    createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: "SE-003",
    reportId: "NF-103",
    fromStatus: "Submitted",
    toStatus: "AI Reviewed",
    changedBy: "system",
    note: "Exposed live high-voltage cables analyzed. Immediate safety override activated: mapped to Critical Severity (95/100).",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000 + 5 * 60 * 1000).toISOString()
  },
  {
    id: "SE-004",
    reportId: "NF-103",
    fromStatus: "AI Reviewed",
    toStatus: "In Progress",
    changedBy: "admin",
    note: "BESCOM control team notified. Feeder line scheduled for standard isolating cutoff. Repair crew dispatched to clear wet branches and install insulation sleeves.",
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
  },
  {
    id: "SE-005",
    reportId: "NF-110",
    fromStatus: "Submitted",
    toStatus: "AI Reviewed",
    changedBy: "system",
    note: "Low priority sign replacement logged. Evidence verified.",
    createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000 + 15 * 60 * 1000).toISOString()
  },
  {
    id: "SE-006",
    reportId: "NF-110",
    fromStatus: "In Progress",
    toStatus: "Resolved",
    changedBy: "admin",
    note: "Maintenance crew deployed a new galvanized pole and straight STOP sign. Closure verified automatically via Gemini multimodal before/after audit.",
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString()
  }
];

export const initialVerifications: Verification[] = [
  {
    id: "V-001",
    reportId: "NF-102",
    userId: "u_001",
    userName: "Arjun Gowda",
    type: "confirm",
    comment: "I live on Indiranagar 12th cross and passed by this morning. Water covers it completely and two kids on an Activa almost fell over. Definitely present!",
    createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000 - 4 * 3600).toISOString()
  },
  {
    id: "V-002",
    reportId: "NF-102",
    userId: "u_003",
    userName: "Ananya Rao",
    type: "photo",
    comment: "Added backup picture. BBMP team needs to patch this before the afternoon school rush.",
    imageUrl: "https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?auto=format&fit=crop&w=200&q=80",
    createdAt: new Date(Date.now() - 18 * 3600).toISOString()
  },
  {
    id: "V-003",
    reportId: "NF-101",
    userId: "u_002",
    userName: "Priyanka Bhatt",
    type: "confirm",
    comment: "Garbage pile has doubled since Monday. Vendors are throwing everything directly into the pile. Smell is toxic.",
    createdAt: new Date(Date.now() - 2 * 24 * 3600).toISOString()
  }
];
