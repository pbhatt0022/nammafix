/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  role: "citizen" | "admin";
  locality: string;
  karma: number;
  badges: string[];
  reportsSubmitted: number;
  verificationsGiven: number;
  closuresConfirmed: number;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: "Waste" | "Road Damage" | "Streetlight" | "Water Leakage" | "Drainage" | "Public Safety";
  subCategory: string;
  status: "Submitted" | "AI Reviewed" | "Community Verified" | "Routed" | "In Progress" | "Resolved";
  severity: "Low" | "Medium" | "High" | "Critical";
  severityScore: number; // 0 - 100
  priorityScore: number; // 0 - 100
  aiConfidence: number; // 0.0 - 1.0
  verificationScore: number; // 0 - 100
  latitude: number;
  longitude: number;
  landmark: string;
  imageUrl: string;
  closureImageUrl?: string;
  createdBy: string;
  suggestedResolver: string;
  clusterId?: string;
  createdAt: string;
  updatedAt: string;
  publicRisk?: string;
  evidenceObserved?: string[];
  recommendedNextAction?: string;
}

export interface Verification {
  id: string;
  reportId: string;
  userId: string;
  userName: string;
  type: "confirm" | "flag" | "photo";
  comment: string;
  imageUrl?: string;
  createdAt: string;
}

export interface StatusEvent {
  id: string;
  reportId: string;
  fromStatus: string;
  toStatus: string;
  changedBy: string; // "citizen" | "admin" | "system"
  note: string;
  createdAt: string;
}

export interface Cluster {
  id: string;
  category: string;
  area: string;
  centerLat: number;
  centerLng: number;
  reportIds: string[];
  summary: string;
  clusterSeverity: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  active: boolean;
  bonusPoints: number;
  categories: string[];
  progress: number; // 0 to 100
}

export interface ResolverCopilotOutput {
  recommendedAction: string;
  suggestedDepartment: string;
  escalationNeeded: boolean;
  adminNote: string;
  citizenUpdate: string;
  slaRisk: "Low" | "Medium" | "High";
}

export interface ClosureVerificationOutput {
  closureStatus: "Verified Resolved" | "Partially Resolved" | "Unresolved" | "Unclear";
  confidence: number;
  observedChange: string;
  remainingConcern: string;
  recommendedNextStep: string;
}
