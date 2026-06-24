/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ActiveCaseView from "./components/ActiveCaseView";
import ReportIssueView from "./components/ReportIssueView";
import CommunityMapView from "./components/CommunityMapView";
import ImpactStats from "./components/ImpactStats";
import { Report, User, StatusEvent, Verification } from "./types";
import { ClipboardList, AlertCircle, Sparkles, Filter, Navigation, PlusCircle, CheckCircle, Flame, Clock } from "lucide-react";

interface AppProps {
  initialTab?: string;        // deep-link from the landing page
  startReporting?: boolean;   // open the report form on entry
  onHome?: () => void;        // back to the landing page
}

export default function App({ initialTab = "dashboard", startReporting = false, onHome }: AppProps = {}) {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [timeline, setTimeline] = useState<StatusEvent[]>([]);
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [activeTab, setActiveTab] = useState(initialTab); // "dashboard" | "map" | "missions"
  const [isReporting, setIsReporting] = useState(startReporting);
  
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const [apiCount, setApiCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Priyanka Bhatt ("u_002") is our central active demo citizen
  const demoUserId = "u_002";
  const currentUser = users.find((u) => u.id === demoUserId) || {
    id: demoUserId,
    name: "Priyanka Bhatt",
    role: "citizen" as const,
    locality: "Indiranagar, Bengaluru",
    karma: 420,
    badges: ["Civic Hero", "Drainage Guru"],
    reportsSubmitted: 8,
    verificationsGiven: 15,
    closuresConfirmed: 5
  };

  // Fetch reports and users on mount and upon any API transaction
  const loadData = async () => {
    try {
      const resReports = await fetch("/api/reports");
      if (resReports.ok) {
        const reportsList = await resReports.json();
        setReports(reportsList);
        
        // Default select the high-priority school pothole NF-102 if nothing selected yet
        if (reportsList.length > 0 && !selectedReport) {
          const defaultReport = reportsList.find((r: Report) => r.id === "NF-102") || reportsList[0];
          setSelectedReport(defaultReport);
          fetchReportDetails(defaultReport.id);
        } else if (selectedReport) {
          // Sync currently selected report's latest data fields
          const updatedSelected = reportsList.find((r: Report) => r.id === selectedReport.id);
          if (updatedSelected) {
            setSelectedReport(updatedSelected);
          }
        }
      }

      const resUsers = await fetch("/api/users");
      if (resUsers.ok) {
        const usersList = await resUsers.json();
        setUsers(usersList);
      }
    } catch (err) {
      console.error("Failed to load initial data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReportDetails = async (id: string) => {
    try {
      const res = await fetch(`/api/reports/${id}`);
      if (res.ok) {
        const data = await res.json();
        setTimeline(data.timeline);
        setVerifications(data.verifications);
      }
    } catch (err) {
      console.error("Failed to load details for report:", id, err);
    }
  };

  useEffect(() => {
    loadData();
  }, [apiCount]);

  // Click report handler
  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
    setIsReporting(false);
    fetchReportDetails(report.id);
  };

  const incrementApiCount = () => {
    setApiCount((prev) => prev + 1);
  };

  // On successful issue creation
  const handleReportSuccess = (newReport: Report) => {
    setIsReporting(false);
    incrementApiCount();
    setSelectedReport(newReport);
    fetchReportDetails(newReport.id);
  };

  // Filtered reports
  const filteredReports = reports.filter((r) => {
    const catMatch = categoryFilter === "All" || r.category === categoryFilter;
    const statMatch = statusFilter === "All" || r.status === statusFilter;
    return catMatch && statMatch;
  });

  const categoryColorBadge = {
    "Road Damage": "bg-red-50 text-red-700 border-red-100",
    "Waste": "bg-yellow-50 text-yellow-700 border-yellow-100",
    "Streetlight": "bg-orange-50 text-orange-700 border-orange-100",
    "Water Leakage": "bg-blue-50 text-blue-700 border-blue-100",
    "Drainage": "bg-amber-50 text-amber-700 border-amber-100",
    "Public Safety": "bg-purple-50 text-purple-700 border-purple-100"
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#F1F5F9] font-sans text-slate-900 overflow-hidden">
      {/* Header component */}
      <Header
        currentUser={currentUser}
        activeTab={activeTab}
        onHome={onHome}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsReporting(false);
        }}
      />

      {/* Main Core Dashboard Grid */}
      <main className="flex-1 flex gap-6 p-6 overflow-hidden min-h-0">
        {activeTab === "dashboard" && (
          <>
            {/* LEFT COLUMN: ACTIVE CASE ANALYSIS OR FORM (3/5 WIDTH) */}
            <div className="w-3/5 flex flex-col gap-6 h-full overflow-hidden">
              {isReporting ? (
                <ReportIssueView
                  onSuccess={handleReportSuccess}
                  onCancel={() => setIsReporting(false)}
                  incrementApiCount={incrementApiCount}
                />
              ) : selectedReport ? (
                <ActiveCaseView
                  report={selectedReport}
                  timeline={timeline}
                  verifications={verifications}
                  onActionTriggered={incrementApiCount}
                  incrementApiCount={incrementApiCount}
                  userId={demoUserId}
                />
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center p-8 text-center h-full">
                  <span className="text-slate-400 italic">No report selected. Choose one below or submit a new case.</span>
                </div>
              )}

              {/* Bottom half of Left column: Queue list of remaining incidents */}
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col overflow-hidden">
                {/* Section Header */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      BBMP Ward 89 Operations Queue ({filteredReports.length})
                    </span>
                  </div>

                  {/* Filter panel */}
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <Filter className="w-3 h-3 text-slate-400" />
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5"
                    >
                      <option value="All">All Categories</option>
                      <option value="Road Damage">Road Damage</option>
                      <option value="Waste">Waste</option>
                      <option value="Streetlight">Streetlight</option>
                      <option value="Water Leakage">Water Leakage</option>
                      <option value="Drainage">Drainage</option>
                      <option value="Public Safety">Public Safety</option>
                    </select>
                    
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Submitted">Submitted</option>
                      <option value="AI Reviewed">AI Reviewed</option>
                      <option value="Community Verified">Community Verified</option>
                      <option value="Routed">Routed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                {/* Scannable Incident queue list */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                  {loading ? (
                    <div className="py-8 text-center text-xs font-mono text-slate-400">LOADING OPERATIONS GRID...</div>
                  ) : filteredReports.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400 italic">No reports matches the filter criteria.</div>
                  ) : (
                    filteredReports.map((r) => {
                      const isSelected = selectedReport?.id === r.id;
                      return (
                        <div
                          key={r.id}
                          onClick={() => handleSelectReport(r)}
                          className={`p-3 border rounded-xl cursor-pointer transition-all flex justify-between items-center hover:bg-slate-50/50 ${
                            isSelected ? "border-indigo-500 bg-indigo-50/15 ring-1 ring-indigo-500/20" : "border-slate-200 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 max-w-[80%]">
                            <img
                              src={r.imageUrl}
                              alt=""
                              className="w-10 h-10 object-cover rounded-lg border shrink-0 bg-slate-100"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <span className="font-mono font-extrabold text-[9px] text-slate-400">#{r.id}</span>
                                <span className={`px-1.5 py-0.1 border text-[8px] font-bold rounded uppercase ${categoryColorBadge[r.category]}`}>
                                  {r.category}
                                </span>
                                <span className="text-[9px] text-slate-400 font-mono truncate">{r.landmark}</span>
                              </div>
                              <h4 className="text-xs font-bold text-slate-800 truncate leading-tight">
                                {r.title}
                              </h4>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 shrink-0 text-right">
                            <div className="flex flex-col items-end shrink-0">
                              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Priority</span>
                              <span className={`text-xs font-black ${r.priorityScore >= 80 ? "text-red-500" : r.priorityScore >= 50 ? "text-orange-500" : "text-slate-700"}`}>
                                {r.priorityScore}%
                              </span>
                            </div>
                            
                            <div className="flex flex-col items-end shrink-0 min-w-[70px]">
                              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Status</span>
                              <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded leading-none ${
                                r.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-blue-50 text-blue-700"
                              }`}>
                                {r.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: TIMELINE, STATS & QUICK ACTIONS (2/5 WIDTH) */}
            <div className="w-2/5 flex flex-col gap-6 h-full overflow-hidden shrink-0">
              {/* Resolution Pipeline Timeline */}
              {selectedReport && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col max-h-[220px] shrink-0 overflow-hidden">
                  <h3 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5 shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    Resolution Pipeline Timeline
                  </h3>
                  <div className="flex-1 overflow-y-auto pr-1 space-y-4">
                    {timeline.map((event, idx) => (
                      <div key={event.id} className="flex gap-3 relative">
                        {/* Bullet tracker lines */}
                        <div className="relative shrink-0 mt-0.5">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center z-10 ${
                            event.toStatus === "Resolved" ? "bg-emerald-500 ring-4 ring-emerald-100" : "bg-indigo-500 ring-4 ring-indigo-100"
                          }`}>
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                          {idx < timeline.length - 1 && (
                            <div className="absolute top-4 left-2 w-0.5 h-12 bg-slate-100 -translate-x-1/2 z-0" />
                          )}
                        </div>
                        
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-black text-slate-800 leading-tight">
                            {event.toStatus} Milestone reached
                          </p>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-sans font-medium">
                            {event.note}
                          </p>
                          <p className="text-[9px] text-slate-400 font-mono uppercase">
                            Logged by {event.changedBy} · {new Date(event.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Impact stats and bento metrics */}
              <div className="flex-1 overflow-y-auto pr-1">
                <ImpactStats apiCount={apiCount} incrementApiCount={incrementApiCount} />
              </div>

              {/* Action Quick Bar */}
              <div className="grid grid-cols-2 gap-3 shrink-0">
                <button
                  onClick={() => setIsReporting(true)}
                  className="p-3 bg-white border border-slate-200 rounded-xl text-center hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-1 group"
                >
                  <PlusCircle className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-all" />
                  <span className="text-[9px] font-extrabold uppercase text-slate-500 tracking-wider">Report New Spot</span>
                </button>
                <button
                  onClick={() => setActiveTab("map")}
                  className="p-3 bg-white border border-slate-200 rounded-xl text-center hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-1 group"
                >
                  <Navigation className="w-5 h-5 text-slate-600 group-hover:scale-110 transition-all" />
                  <span className="text-[9px] font-extrabold uppercase text-slate-500 tracking-wider">Operations Map</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* COMMUNITY MAP VIEW TAB */}
        {activeTab === "map" && (
          <CommunityMapView
            reports={reports}
            selectedReport={selectedReport}
            onSelectReport={(r) => {
              handleSelectReport(r);
              setActiveTab("dashboard");
            }}
          />
        )}

        {/* CIVIC MISSIONS DETAILS TAB */}
        {activeTab === "missions" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex-1 overflow-y-auto">
            <h2 className="text-lg font-black text-slate-800 mb-2">🏆 BBMP Ward 89 - Civic Mission Guild</h2>
            <p className="text-xs text-slate-500 mb-6">Explore regional missions. Complete validations or resolve targets to obtain exclusive badges and multiplier karma points.</p>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-lg">☔</div>
                <h3 className="font-extrabold text-sm text-slate-800">Monsoon Preparedness Guild</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Report and confirm waterlogged streets, damaged drain grates, or dangerous roadside electrical poles around Yelahanka.</p>
                <div className="bg-indigo-600 text-white font-bold text-[9px] uppercase px-2.5 py-1 rounded inline-block">Active Mission · +30 Bonus</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-lg">♻️</div>
                <h3 className="font-extrabold text-sm text-slate-800">Clean Commercial Corridor</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Report and verify commercial waste dumping blackspots near main avenues and promote compliance with waste segregations.</p>
                <div className="bg-indigo-600 text-white font-bold text-[9px] uppercase px-2.5 py-1 rounded inline-block">Active Mission · +20 Bonus</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4 opacity-50">
                <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-lg">💡</div>
                <h3 className="font-extrabold text-sm text-slate-800">Night Light Auditing</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Completed. Walk dark corridors, identify dead luminaires, and confirm newly installed LED street lamps.</p>
                <div className="bg-slate-300 text-slate-700 font-bold text-[9px] uppercase px-2.5 py-1 rounded inline-block">Unlocked & Finished</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer component */}
      <Footer apiCount={apiCount} />
    </div>
  );
}

// Simple Helper Check component inside file scope to bypass nested imports
function Check({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
