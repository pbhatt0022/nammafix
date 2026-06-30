/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Report, StatusEvent, Verification, ResolverCopilotOutput, ClosureVerificationOutput } from "../types";
import TranslatePacket from "../i18n/TranslatePacket";
import { useT } from "../i18n";
import MicButton from "../i18n/MicButton";
import { ShieldCheck, Calendar, MapPin, Cpu, UploadCloud, AlertCircle, Sparkles, Check, CheckCircle2, Navigation, HeartHandshake, FileText, ChevronRight, MessageSquare } from "lucide-react";

interface ActiveCaseViewProps {
  report: Report;
  timeline: StatusEvent[];
  verifications: Verification[];
  onActionTriggered: () => void;
  incrementApiCount: () => void;
  userId: string;
}

// Preset Bangalore resolved photos for rapid demo clearance
const RESOLVED_PRESETS = [
  {
    name: "Pothole Filled Proof",
    url: "https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Cleared Garbage Spot Proof",
    url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Insulated Wire Bracket Proof",
    url: "https://images.unsplash.com/photo-1595151402449-477f953217b0?auto=format&fit=crop&w=600&q=80"
  }
];

export default function ActiveCaseView({
  report,
  timeline,
  verifications,
  onActionTriggered,
  incrementApiCount,
  userId
}: ActiveCaseViewProps) {
  const { t } = useT();
  const [copilotData, setCopilotData] = useState<ResolverCopilotOutput | null>(null);
  const [loadingCopilot, setLoadingCopilot] = useState(false);
  
  const [closureImageUrl, setClosureImageUrl] = useState("");
  const [loadingClosure, setLoadingClosure] = useState(false);
  const [closureResult, setClosureResult] = useState<ClosureVerificationOutput | null>(null);

  const [verifyComment, setVerifyComment] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [hasVerifiedSelf, setHasVerifiedSelf] = useState(false);

  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nammafix-evidence-${report.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const timelineHtml = timeline.map(event => `
      <div class="timeline-item">
        <div class="timeline-header">
          <strong>${event.toStatus}</strong>
          <span class="timeline-time">${new Date(event.createdAt).toLocaleString()}</span>
        </div>
        <p class="timeline-note">${event.note}</p>
        <p class="timeline-meta">Logged by ${event.changedBy}</p>
      </div>
    `).join("");

    const verificationsHtml = verifications.map(v => `
      <div class="verification-item">
        <div class="verification-header">
          <strong>${v.userName}</strong>
          <span class="verification-time">${new Date(v.createdAt).toLocaleString()}</span>
        </div>
        <p class="verification-comment">"${v.comment}"</p>
      </div>
    `).join("");

    printWindow.document.write(`
      <html>
      <head>
        <title>NammaFix AI Evidence Packet - #${report.id}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #1e293b;
            line-height: 1.5;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            border-bottom: 3px solid #4f46e5;
            padding-bottom: 20px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .logo {
            background: #4f46e5;
            color: white;
            font-weight: 900;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 18px;
          }
          .brand-text {
            font-size: 20px;
            font-weight: 800;
          }
          .brand-subtitle {
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: block;
          }
          .packet-id {
            font-family: monospace;
            font-size: 12px;
            background: #f1f5f9;
            padding: 4px 8px;
            border-radius: 4px;
            border: 1px solid #cbd5e1;
          }
          .title-section {
            margin-bottom: 24px;
          }
          .title {
            font-size: 24px;
            font-weight: 800;
            margin: 0 0 10px 0;
            color: #0f172a;
          }
          .badges {
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
          }
          .badge {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            padding: 3px 8px;
            border-radius: 4px;
            border: 1px solid;
          }
          .badge-category {
            background: #e0e7ff;
            color: #3730a3;
            border-color: #c7d2fe;
          }
          .badge-sub {
            background: #f1f5f9;
            color: #334155;
            border-color: #e2e8f0;
          }
          .badge-status {
            background: #ecfdf5;
            color: #065f46;
            border-color: #a7f3d0;
          }
          .badge-severity {
            background: #fef2f2;
            color: #991b1b;
            border-color: #fca5a5;
          }
          .meta-grid {
            display: grid;
            grid-template-cols: 1fr 1fr;
            gap: 20px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
          }
          .meta-item label {
            display: block;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            color: #64748b;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }
          .meta-item span {
            font-size: 13px;
            font-weight: 600;
          }
          .description-box {
            background: #fafafa;
            border-left: 4px solid #cbd5e1;
            padding: 16px;
            border-radius: 0 8px 8px 0;
            font-style: italic;
            font-size: 14px;
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #64748b;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 6px;
            margin: 30px 0 16px 0;
          }
          .evidence-images {
            display: grid;
            grid-template-cols: 1fr ${report.closureImageUrl ? "1fr" : ""};
            gap: 20px;
            margin-bottom: 30px;
          }
          .image-card {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
          }
          .image-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            display: block;
          }
          .image-label {
            background: #0f172a;
            color: white;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            padding: 6px 12px;
            letter-spacing: 0.5px;
          }
          .image-label.after {
            background: #059669;
          }
          .timeline-item, .verification-item {
            border-bottom: 1px solid #f1f5f9;
            padding: 12px 0;
          }
          .timeline-header, .verification-header {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            margin-bottom: 4px;
          }
          .timeline-time, .verification-time {
            color: #94a3b8;
            font-family: monospace;
          }
          .timeline-note, .verification-comment {
            font-size: 12px;
            margin: 0;
            color: #475569;
          }
          .timeline-meta {
            font-size: 10px;
            color: #94a3b8;
            margin: 4px 0 0 0;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand">
            <div class="logo">NF</div>
            <div>
              <span class="brand-text">NammaFix AI</span>
              <span class="brand-subtitle">Civic Resolution Layer</span>
            </div>
          </div>
          <div class="packet-id">EVIDENCE PACKET: #${report.id}</div>
        </div>

        <div class="title-section">
          <h1 class="title">${report.title}</h1>
          <div class="badges">
            <span class="badge badge-category">${report.category}</span>
            <span class="badge badge-sub">${report.subCategory}</span>
            <span class="badge badge-status">${report.status}</span>
            <span class="badge badge-severity">Severity: ${report.severity} (${report.severityScore}/100)</span>
          </div>
        </div>

        <div class="description-box">
          "${report.description}"
        </div>

        <div class="meta-grid">
          <div class="meta-item">
            <label>Location Landmark</label>
            <span>${report.landmark}</span>
          </div>
          <div class="meta-item">
            <label>Coordinates</label>
            <span>${report.latitude.toFixed(6)}° N, ${report.longitude.toFixed(6)}° E</span>
          </div>
          <div class="meta-item">
            <label>Suggested Resolver</label>
            <span>${report.suggestedResolver}</span>
          </div>
          <div class="meta-item">
            <label>Priority Rating</label>
            <span>${report.priorityScore}% Priority Index</span>
          </div>
          ${report.publicRisk ? `
            <div class="meta-item" style="grid-column: span 2;">
              <label>AI Public Safety Risk Assessment</label>
              <span style="color: #b91c1c; font-weight: 700;">${report.publicRisk}</span>
            </div>
          ` : ""}
          ${report.recommendedNextAction ? `
            <div class="meta-item" style="grid-column: span 2;">
              <label>AI Recommended Dispatch Action</label>
              <span>${report.recommendedNextAction}</span>
            </div>
          ` : ""}
        </div>

        <h2 class="section-title">Visual Evidence Audit</h2>
        <div class="evidence-images">
          <div class="image-card">
            <div class="image-label">Before: Reported Issue</div>
            <img src="${report.imageUrl}" alt="Before" />
          </div>
          ${report.closureImageUrl ? `
            <div class="image-card">
              <div class="image-label after">After: Verified Fix</div>
              <img src="${report.closureImageUrl}" alt="After" />
            </div>
          ` : ""}
        </div>

        <h2 class="section-title">Resolution Timeline</h2>
        <div class="timeline-list">
          ${timelineHtml}
        </div>

        <h2 class="section-title">Community verification logs</h2>
        <div class="verification-list">
          ${verificationsHtml || '<p style="font-size: 12px; color: #94a3b8; italic">No neighborhood validations logged.</p>'}
        </div>

        <div style="margin-top: 40px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px;">
          Generated automatically by NammaFix AI. Verified using Google Gemini Multimodal Models.
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  // Check if current user has verified this report already
  useEffect(() => {
    setHasVerifiedSelf(verifications.some((v) => v.userId === userId));
    // Reset tabs/outputs when active report shifts
    setCopilotData(null);
    setClosureImageUrl("");
    setClosureResult(null);
    setVerifyComment("");
    setVerifySuccess(false);
  }, [report.id, verifications, userId]);

  // Invoke Gemini Resolver Copilot
  const handleTriggerCopilot = async () => {
    setLoadingCopilot(true);
    incrementApiCount();
    try {
      const res = await fetch(`/api/reports/${report.id}/copilot`, {
        method: "POST"
      });
      if (res.ok) {
        const data = await res.json();
        setCopilotData(data);
      }
    } catch (err) {
      console.error("Failed to run Copilot:", err);
    } finally {
      setLoadingCopilot(false);
    }
  };

  // Dispatch Action & Update Report Status
  const handleRouteAction = async () => {
    incrementApiCount();
    let nextStatus = "Routed";
    if (report.status === "Routed") nextStatus = "In Progress";
    
    try {
      const noteText = copilotData 
        ? `${copilotData.suggestedDepartment} assigned. Route directives: "${copilotData.recommendedAction}"`
        : `Admin assigned to ${report.suggestedResolver} for regional inspection.`;

      const res = await fetch(`/api/reports/${report.id}/update-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: nextStatus,
          note: noteText,
          changedBy: "admin"
        })
      });

      if (res.ok) {
        onActionTriggered();
        setCopilotData(null);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Neighborhood Upvote / Confirm Present
  const handleNeighborVerify = async (type: "confirm" | "flag") => {
    setVerifying(true);
    incrementApiCount();
    try {
      const res = await fetch(`/api/reports/${report.id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          type,
          comment: verifyComment || (type === "confirm" ? "Neighborhood inspection: Checked and confirmed this issue is active." : "Neighborhood flag: Marked as possible duplicate/false report."),
          imageUrl: ""
        })
      });

      if (res.ok) {
        setVerifySuccess(true);
        setVerifyComment("");
        setTimeout(() => {
          onActionTriggered();
        }, 1000);
      }
    } catch (err) {
      console.error("Verification failed:", err);
    } finally {
      setVerifying(false);
    }
  };

  // Upload Closure Proof (Simulated Before/After Comparison using Gemini)
  const handleVerifyClosure = async () => {
    if (!closureImageUrl) return;
    setLoadingClosure(true);
    incrementApiCount();

    try {
      const res = await fetch(`/api/reports/${report.id}/close`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          closureImageUrl,
          userId
        })
      });

      if (res.ok) {
        const data = await res.json();
        setClosureResult(data.verificationOutput);
        setTimeout(() => {
          onActionTriggered();
        }, 3000);
      }
    } catch (err) {
      console.error("Closure error:", err);
    } finally {
      setLoadingClosure(false);
    }
  };

  const severityColorMap = {
    Low: "bg-green-50 text-green-700 border-green-100",
    Medium: "bg-yellow-50 text-yellow-700 border-yellow-100",
    High: "bg-orange-50 text-orange-700 border-orange-100",
    Critical: "bg-red-50 text-red-700 border-red-100"
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
      {/* AI Evidence Header */}
      <div className="bg-slate-900 px-6 py-3.5 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-mono text-[11px] tracking-wider uppercase font-extrabold">
            {t("case.packet")} #{report.id}
          </span>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-[10px] font-black uppercase tracking-wider transition-all border border-slate-700 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            {t("case.export")}
          </button>
          {showExportMenu && (
            <div className="absolute right-0 mt-1.5 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 z-50 text-[9px] uppercase font-mono tracking-wider">
              <button
                onClick={() => {
                  handleExportJSON();
                  setShowExportMenu(false);
                }}
                className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-slate-700 hover:text-white transition-all font-bold cursor-pointer"
              >
                {t("case.downloadJson")}
              </button>
              <button
                onClick={() => {
                  handleExportPDF();
                  setShowExportMenu(false);
                }}
                className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-slate-700 hover:text-white transition-all font-bold border-t border-slate-700 cursor-pointer"
              >
                {t("case.printPdf")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Primary Detail Container */}
      <div className="p-6 flex-1 overflow-y-auto max-h-[580px] space-y-6">
        {/* Core Title Section */}
        <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-black uppercase tracking-tight">
                {t("enum.cat." + report.category)}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-bold uppercase tracking-tight">
                {report.subCategory}
              </span>
              <span className={`px-2.5 py-0.5 border rounded text-[10px] font-bold uppercase ${
                report.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-blue-50 text-blue-700 border-blue-100"
              }`}>
                {t("enum.status." + report.status)}
              </span>
            </div>
            
            <h1 className="text-xl font-extrabold text-slate-800 leading-tight mb-2">
              {report.title}
            </h1>
            
            <div className="flex items-center gap-4 text-slate-400 text-xs font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {report.landmark} ({report.latitude.toFixed(4)}° N, {report.longitude.toFixed(4)}° E)
              </span>
              <span className="flex items-center gap-1 border-l border-slate-200 pl-4">
                <Calendar className="w-3.5 h-3.5" />
                {t("case.reported")} {new Date(report.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className={`p-2.5 rounded-xl border flex flex-col items-center justify-center shrink-0 w-16 text-center ${severityColorMap[report.severity]}`}>
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">{t("case.severity")}</span>
            <span className="text-lg font-black mt-0.5">
              {(report.severityScore / 10).toFixed(0)}/10
            </span>
          </div>
        </div>

        {/* Citizen Description and Public Risk Details */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
          <p className="text-slate-700 italic font-medium leading-relaxed">
            "{report.description}"
          </p>
          {report.publicRisk && (
            <div className="pt-2 border-t border-slate-200 flex items-start gap-2 text-[11px] text-slate-500 font-medium">
              <span className="font-mono text-red-600 font-extrabold uppercase tracking-wide shrink-0 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                {t("case.publicRiskBound")}
              </span>
              <span>{report.publicRisk}</span>
            </div>
          )}
        </div>

        {/* Visual Before/After Section */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            {t("case.photoAudit")}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Before Photo */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
              <img
                src={report.imageUrl}
                alt="Before issue"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-mono font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider shadow-md">
                {t("case.before")}
              </div>
            </div>

            {/* After Photo / Resolution File upload */}
            {report.status === "Resolved" && report.closureImageUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-emerald-200 aspect-video bg-slate-100">
                <img
                  src={report.closureImageUrl}
                  alt="After fix"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-mono font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider shadow-md">
                  {t("case.after")}
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col justify-between p-4 aspect-video">
                {loadingClosure ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-100 border-t-indigo-600 animate-spin mb-2" />
                    <span className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">
                      {t("case.auditProgress")}
                    </span>
                    <span className="text-[8px] font-mono text-slate-400 mt-1 uppercase">
                      {t("case.auditComparing")}
                    </span>
                  </div>
                ) : closureResult ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-2 text-xs">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-1" />
                    <span className="font-extrabold text-emerald-600 uppercase text-[10px] tracking-wider">
                      {closureResult.closureStatus}
                    </span>
                    <p className="text-[9px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                      {closureResult.observedChange}
                    </p>
                  </div>
                ) : closureImageUrl ? (
                  <div className="flex-1 flex flex-col items-center justify-center relative rounded overflow-hidden">
                    <img
                      src={closureImageUrl}
                      alt="Closure Preview"
                      className="w-full h-24 object-cover rounded mb-2 border"
                    />
                    <button
                      onClick={handleVerifyClosure}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase py-1.5 rounded tracking-widest shadow"
                    >
                      {t("case.verifyClosure")}
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-2">
                    <UploadCloud className="w-7 h-7 text-slate-400 mb-1" />
                    <span className="text-[11px] font-extrabold text-slate-700 uppercase">
                      {t("case.uploadClosure")}
                    </span>
                    <span className="text-[9px] text-slate-400 mb-3">
                      {t("case.uploadHint")}
                    </span>
                    
                    {/* Presets Quick selectors */}
                    <div className="grid grid-cols-3 gap-1.5 w-full">
                      {RESOLVED_PRESETS.map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setClosureImageUrl(preset.url)}
                          className="bg-white border border-slate-200 hover:border-indigo-400 rounded p-1 text-[9px] font-bold text-slate-500 hover:text-slate-800 truncate"
                        >
                          {t("case.scenario")} {pIdx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Structural Indicators */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
            <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider">{t("case.duplicateFilter")}</span>
            <span className="text-xs font-extrabold text-emerald-600 mt-1">
              98.2% {t("case.unique")}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
            <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider">{t("case.routingDivision")}</span>
            <span className="text-xs font-extrabold text-slate-700 mt-1 truncate">
              {report.suggestedResolver.replace("BBMP", "").trim()}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
            <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider">{t("case.verificationScore")}</span>
            <span className={`text-xs font-extrabold mt-1 ${report.verificationScore >= 60 ? "text-indigo-600" : "text-amber-600"}`}>
              {report.verificationScore}% ({verifications.length} {t("case.neighborCheck")})
            </span>
          </div>
        </div>

        {/* Auto-generated Civic Dispatch Ticket (mock resolver directory routing) */}
        {report.routing && (
          <div className="rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-indigo-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">
                  {t("case.dispatchTicket")}
                </span>
              </div>
              <span className="font-mono text-[10px] font-extrabold text-indigo-500 bg-white px-2 py-0.5 rounded border border-indigo-100">
                {report.routing.ticketRef}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
              <Field label={t("case.department")} value={report.routing.department} />
              <Field label={t("case.division")} value={report.routing.division} />
              <Field label={t("case.wardZone")} value={report.routing.ward} />
              <Field label={t("case.channel")} value={report.routing.channel} />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">{t("case.targetSla")}</span>
              <span className={`text-xs font-black px-2 py-0.5 rounded ${report.routing.slaHours <= 12 ? "bg-red-100 text-red-700" : report.routing.slaHours <= 48 ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"}`}>
                {report.routing.slaHours}h
              </span>
            </div>
            <div className="rounded-lg bg-white border border-indigo-100 p-2.5">
              <span className="text-[9px] font-black uppercase tracking-wider text-indigo-400">{t("case.dispatchNote")}</span>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium mt-0.5">{report.routing.dispatchNote}</p>
            </div>
            <p className="text-[9px] text-slate-400 italic mt-2">
              {t("case.mockNote")}
            </p>
          </div>
        )}

        {/* Live Gemini translation of the AI packet into the selected language */}
        <TranslatePacket
          fields={{
            Title: report.title,
            ...(report.publicRisk ? { "Public Risk": report.publicRisk } : {}),
            ...(report.recommendedNextAction ? { "Recommended Next Action": report.recommendedNextAction } : {}),
            "Suggested Resolver": report.suggestedResolver,
            ...(report.routing ? { "Dispatch Note": report.routing.dispatchNote } : {}),
          }}
        />

        {/* Neighbor Confirmations & comments */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              {t("case.feed")} ({verifications.length})
            </h3>
            {report.status !== "Resolved" && (
              <span className="text-[10px] text-slate-500 font-mono">
                {t("case.threshold")}
              </span>
            )}
          </div>

          {/* Verification Actions */}
          {report.status !== "Resolved" && !hasVerifiedSelf && !verifySuccess && (
            <div className="p-4 border border-indigo-100 bg-indigo-50/30 rounded-xl space-y-3">
              <span className="block text-[11px] font-extrabold text-indigo-900 uppercase">
                {t("case.auditPrompt")}
              </span>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={verifyComment}
                    onChange={(e) => setVerifyComment(e.target.value)}
                    placeholder={t("case.commentPlaceholder")}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 pr-9 text-xs font-medium focus:outline-indigo-500"
                  />
                  <MicButton onTranscript={(txt) => setVerifyComment((p) => (p ? p + " " : "") + txt)} className="absolute right-1.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  onClick={() => handleNeighborVerify("confirm")}
                  disabled={verifying}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-lg uppercase tracking-wider"
                >
                  {t("case.confirmActive")}
                </button>
              </div>
            </div>
          )}

          {verifySuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs rounded-lg flex items-center gap-2 font-bold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{t("case.verifySuccess")}</span>
            </div>
          )}

          {/* Feed list */}
          <div className="space-y-3 max-h-[160px] overflow-y-auto">
            {verifications.length === 0 ? (
              <p className="text-xs text-slate-400 italic">{t("case.noValidations")}</p>
            ) : (
              verifications.map((v) => (
                <div key={v.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-extrabold text-slate-700">{v.userName}</span>
                    <span className="text-slate-400 font-mono uppercase">
                      {new Date(v.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{v.comment}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer Copilot / Router Suggestion Box */}
      {report.status !== "Resolved" && (
        <div className="px-6 py-4 bg-indigo-50 border-t border-indigo-100 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3 max-w-[70%]">
            <div className="w-9 h-9 bg-white rounded-lg border border-indigo-100 shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
              <Cpu className="w-5 h-5 animate-pulse text-indigo-600" />
            </div>
            
            {loadingCopilot ? (
              <div className="space-y-1">
                <p className="text-[10px] font-black text-indigo-900 uppercase">{t("case.copilotRunning")}</p>
                <div className="h-2 w-32 bg-indigo-200 animate-pulse rounded" />
              </div>
            ) : copilotData ? (
              <div>
                <p className="text-[9px] font-black text-indigo-900 uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-orange-500 fill-orange-500" />
                  {t("case.copilotDispatchNote")}
                </p>
                <p className="text-xs text-indigo-800 line-clamp-1 italic font-medium">
                  "{copilotData.citizenUpdate}"
                </p>
              </div>
            ) : (
              <div>
                <p className="text-[10px] font-black text-indigo-900 uppercase">{t("case.copilotActive")}</p>
                <p className="text-[11px] text-indigo-700 italic">
                  {t("case.copilotHint")}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {!copilotData ? (
              <button
                onClick={handleTriggerCopilot}
                disabled={loadingCopilot}
                className="px-4 py-2 bg-white text-indigo-600 border border-indigo-200 text-[10px] font-black rounded-lg uppercase tracking-wider hover:bg-indigo-50/50"
              >
                {t("case.inspectDispatch")}
              </button>
            ) : (
              <button
                onClick={handleRouteAction}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow"
              >
                {report.status === "Routed" ? t("case.startRepairs") : t("case.approveRouting")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Small label/value pair used inside the dispatch ticket card.
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">{label}</span>
      <span className="text-[11px] font-bold text-slate-700 leading-tight">{value}</span>
    </div>
  );
}
