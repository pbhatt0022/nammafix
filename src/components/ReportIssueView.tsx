/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Camera, MapPin, UploadCloud, Cpu, AlertCircle, CheckCircle, Flame } from "lucide-react";
import { Report } from "../types";

interface ReportIssueViewProps {
  onSuccess: (newReport: Report) => void;
  onCancel: () => void;
  incrementApiCount: () => void;
}

// Preset Bangalore demo scenarios for rapid judging convenience
const BANGALORE_PRESETS = [
  {
    title: "Crater Pothole near Indiranagar School entrance",
    description: "Deep pothole directly in front of the primary school gate. Water accumulates in it making it invisible after light showers.",
    category: "Road Damage",
    landmark: "Indiranagar National School Gate, BBMP Ward 89",
    latitude: 12.9716,
    longitude: 77.6412,
    imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Overhead electrical wires sparking",
    description: "Hanging high-voltage cable pulled loose from bracket. Sparks during high wind and dangles within reach on footpath.",
    category: "Public Safety",
    landmark: "Opposite Starbucks Coffee, 100ft Road",
    latitude: 12.9625,
    longitude: 77.6381,
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Potable BWSSB pipe rupture flooding street",
    description: "Main underground water pipe broke. High pressure drinking water is flooding the residential lanes of Koramangala.",
    category: "Water Leakage",
    landmark: "Koramangala 3rd Block, Near BDA Post Office",
    latitude: 12.9352,
    longitude: 77.6245,
    imageUrl: "https://images.unsplash.com/photo-1542013936693-8848e5740a7a?auto=format&fit=crop&w=600&q=80"
  }
];

export default function ReportIssueView({ onSuccess, onCancel, incrementApiCount }: ReportIssueViewProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Road Damage");
  const [landmark, setLandmark] = useState("");
  const [latitude, setLatitude] = useState(12.9716);
  const [longitude, setLongitude] = useState(77.5946);
  const [imageUrl, setImageUrl] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState("");

  // Select a pre-packaged Bangalore scenario
  const handleSelectPreset = (preset: typeof BANGALORE_PRESETS[0]) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setCategory(preset.category);
    setLandmark(preset.landmark);
    setLatitude(preset.latitude);
    setLongitude(preset.longitude);
    setImageUrl(preset.imageUrl);
    setError("");
  };

  // Convert custom file upload to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setError("File exceeds 8MB. Please select a smaller civic photo.");
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.onerror = () => {
      setError("Failed to convert image to base64.");
    };
    reader.readAsDataURL(file);
  };

  // Trigger Gemini API Analysis Flow
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      setError("An evidence photo is required for Gemini AI classification.");
      return;
    }
    if (!description.trim()) {
      setError("Please supply a short description for the routing context.");
      return;
    }

    setLoading(true);
    setError("");
    incrementApiCount();

    const steps = [
      "Compressing civic photo evidence...",
      "Connecting securely to Gemini 2.5 Flash...",
      "Multimodal analysis of visual structures...",
      "Assessing localized risk and public hazard indices...",
      "Formulating structured JSON Evidence Packet...",
      "Seeding simulation database records..."
    ];

    let currentStep = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setLoadingStep(steps[currentStep]);
      }
    }, 1000);

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || `Reported ${category} Issue`,
          description,
          category,
          latitude,
          longitude,
          landmark: landmark || "Bangalore Ward Hub",
          imageUrl,
          userId: "u_002" // Priyanka (the reporter)
        })
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        const errObj = await response.json();
        throw new Error(errObj.error || "Server failed to catalog report.");
      }

      const createdReport = await response.json();
      onSuccess(createdReport);
    } catch (err: any) {
      clearInterval(stepInterval);
      setError(err.message || "Network timeout connecting to Gemini proxy.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-y-auto max-h-[690px]">
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            📸 Submit New Civic Report
          </h2>
          <p className="text-xs text-slate-500">
            Powered by Gemini Multimodal Structured Analysis
          </p>
        </div>
        <button
          onClick={onCancel}
          className="text-xs font-bold uppercase text-slate-400 hover:text-slate-600 px-2 py-1 rounded"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
            <Cpu className="w-6 h-6 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
          </div>
          <h3 className="text-base font-extrabold text-slate-800 mb-2">
            AI INTAKE ENGINE RUNNING
          </h3>
          <p className="text-xs font-mono text-indigo-600 font-bold tracking-tight uppercase animate-pulse">
            {loadingStep}
          </p>
          <div className="mt-8 max-w-sm p-3 bg-slate-50 rounded-lg border border-slate-100 text-[10px] text-slate-400 font-mono">
            GEMINI is parsing raw image pixels to categorize, evaluate risk bounds, assign severity, and route your ticket.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Preset Demo Panel */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-500" />
              Rapid Hackathon Presets (Click to Auto-Fill)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {BANGALORE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="p-2.5 bg-slate-50 border border-slate-200 hover:border-indigo-400 rounded-lg text-left transition-all hover:bg-white"
                >
                  <span className="block text-[10px] font-extrabold text-indigo-600 uppercase tracking-tighter">
                    Preset #{idx + 1}
                  </span>
                  <span className="block text-[11px] font-bold text-slate-800 line-clamp-1 mt-0.5">
                    {preset.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Visual upload box */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              Step 1: Evidence Photo Upload (Required)
            </label>
            
            {imageUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video group bg-slate-900">
                <img
                  src={imageUrl}
                  alt="Evidence"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40">
                  <label className="cursor-pointer bg-white text-slate-800 px-4 py-2 rounded-lg text-xs font-bold shadow-lg uppercase tracking-wider">
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="absolute top-3 left-3 bg-indigo-600 text-white text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded tracking-widest">
                  Preview Loaded
                </div>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-slate-100/50 transition-all aspect-video">
                <UploadCloud className="w-10 h-10 text-slate-400 mb-2 animate-bounce" />
                <span className="text-xs font-black text-slate-700">Drag & Drop or Click to Select File</span>
                <span className="text-[10px] text-slate-400 mt-1 font-mono uppercase">Max size: 8MB (JPEG, PNG)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Category (Initial Guess)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-700 focus:outline-indigo-500"
              >
                <option value="Road Damage">Road Damage (Potholes, footpaths)</option>
                <option value="Waste">Waste (Garbage piles, commercial dumps)</option>
                <option value="Streetlight">Streetlight (Broken luminaire, dark corridor)</option>
                <option value="Water Leakage">Water Leakage (BWSSB pipe ruptures)</option>
                <option value="Drainage">Drainage (Clogged storm drain, raw sewage)</option>
                <option value="Public Safety">Public Safety (Sparking wires, open manholes)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Neighborhood / Landmark
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="E.g., Outside National College metro"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-700 focus:outline-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
              Specific Civic Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Provide a short description detailing how long the issue has existed or the risk to traffic."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-700 focus:outline-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Latitude Coordinate
              </label>
              <input
                type="number"
                step="0.000001"
                value={latitude}
                onChange={(e) => setLatitude(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-700"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Longitude Coordinate
              </label>
              <input
                type="number"
                step="0.000001"
                value={longitude}
                onChange={(e) => setLongitude(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-700"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3 border-t border-slate-100">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-black uppercase tracking-wider shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 animate-spin-slow" />
              Analyze and Review with Gemini
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold uppercase"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
