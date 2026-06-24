# **NammaFix AI: Final MVP Build Plan for Vibe2Ship 2026**

## **1\. Product Decision**

### **Project Name**

**NammaFix AI**

### **One-line pitch**

**NammaFix AI is a Gemini-powered civic resolution layer that turns local issue reports into verified, prioritized, routed, and trackable community action.**

### **Best tagline**

**Report once. Verify together. Resolve transparently.**

### **Product positioning**

NammaFix AI is not a generic civic complaint portal. It is an AI-powered resolution workflow.

Most civic apps stop at:

**Photo → Complaint → Ticket**

NammaFix AI demonstrates:

**Photo → AI Evidence Packet → Duplicate Check → Community Verification → Priority Score → Resolver Copilot → Status Timeline → Closure Proof → Civic Karma → Impact Dashboard**

### **What the MVP must prove**

The MVP must prove that AI can help communities handle local civic issues more efficiently by improving:

* Reporting quality  
* Issue classification  
* Duplicate control  
* Community validation  
* Prioritization  
* Resolver actionability  
* Status transparency  
* Closure accountability  
* Citizen engagement

### **The magic moment**

A citizen uploads a messy photo and short description. Gemini instantly converts it into a structured civic report with:

* Issue category  
* Severity  
* Confidence  
* Evidence summary  
* Public risk  
* Missing information  
* Suggested resolver  
* Recommended next action

That is the core demo moment.

---

# **2\. Final MVP Demo Journey**

Build the product around one polished end-to-end story:

1. Citizen uploads a photo of a pothole, garbage overflow, broken streetlight, water leakage, or blocked drain.  
2. Citizen adds a short description and confirms location.  
3. Gemini analyzes the image and text.  
4. NammaFix generates an **AI Evidence Packet**.  
5. System checks whether a similar issue already exists nearby.  
6. Citizen submits report or adds evidence to existing duplicate cluster.  
7. Other community members verify the issue.  
8. Admin dashboard ranks the issue by severity, verification strength, and age.  
9. Resolver Copilot generates suggested department, next action, and routing note.  
10. Admin moves issue through status lifecycle.  
11. Resolver/admin uploads closure proof.  
12. Gemini compares before/after evidence.  
13. Issue is marked Resolved, Partially Resolved, or Disputed.  
14. Civic Karma and impact dashboard update.

This is the full story to optimize for.

---

# **3\. Build Principles**

## **Build**

* One strong vertical slice  
* Gemini-first workflow  
* Simple Firebase-backed app  
* Polished demo data  
* Clear admin and citizen views  
* Honest simulated resolver workflow  
* Evidence-backed AI outputs  
* Responsible gamification

## **Do not build**

* Real municipal API integration  
* MCP servers  
* Agent Gateway  
* Agent Sandbox  
* Gemini Memory Bank  
* Vertex AI Agent Builder unless already easy  
* Legal admissibility or Rule 707 claims  
* Cryptographically verifiable civic evidence  
* Full voice-first experience  
* Full multilingual interface  
* Advanced ward demographics  
* Public ward shaming rankings  
* Complex RAG unless the core is already working

## **Safer wording**

Use:

**“Structured AI Evidence Packet”**

Do not use:

**“Cryptographically verifiable legal evidence packet.”**

Use:

**“Mock resolver directory / resolver-ready routing note.”**

Do not use:

**“Integrated with municipal systems.”**

Use:

**“Agentic workflow implemented through Gemini-powered functions.”**

Do not use:

**“Autonomous government action engine.”**

---

# **4\. MVP Feature Scope**

## **P0: Must Build**

These are essential for a complete submission.

| Feature | What it does | Implementation | Judging value |
| ----- | ----- | ----- | ----- |
| Citizen issue report | Upload image, add description, confirm location | React form \+ Firebase Storage | Problem solving, usability |
| Gemini issue analysis | Classifies issue and extracts civic details | Google AI Studio / Gemini API | Google tech, agentic depth |
| AI Evidence Packet | Structured report with category, severity, confidence, risk, resolver | Gemini JSON output | Innovation, technical implementation |
| Report detail page | Shows image, AI output, status, location, verification | React component | Product experience |
| Status timeline | Tracks Submitted → AI Reviewed → Verified → Routed → In Progress → Resolved | Firestore statusEvents | Tracking and transparency |
| Admin dashboard | Shows prioritized issue queue | Firestore query \+ sorting | Resolver actionability |
| Resolver Copilot | Generates suggested action and routing note | Gemini text generation | Agentic depth |
| Community verification | Citizens confirm, add comment/photo, or flag duplicate | Firestore verifications | Validation and collaboration |
| Impact dashboard | Shows open, verified, resolved, high-risk issues | Simple stats/cards/charts | Impact |
| Deployed app \+ README \+ Google Doc | Required submission assets | Hosting \+ GitHub \+ Doc | Submission completeness |

## **P1: Strong Differentiators**

Build after P0 is stable.

| Feature | What it does | Simple implementation |
| ----- | ----- | ----- |
| Duplicate detection | Finds nearby similar issues | Category \+ distance \+ keyword/text similarity |
| Closure verification | Compares before/after images | Gemini multimodal comparison |
| Civic Karma | Rewards useful civic contribution | Rule-based scoring |
| Badges | Shows user contribution identity | Static badge rules |
| Local missions | Encourages themed participation | Static missions like Monsoon Watch |
| Admin escalation draft | Generates follow-up message | Gemini prompt from report context |

## **P2: Optional Polish**

Only add if everything else works.

| Feature | Add only if easy |
| ----- | ----- |
| Basic Kannada/Hindi summary |  |
| Privacy warning if image contains people/vehicles |  |
| Heatmap-style issue clusters |  |
| Better mobile animations |  |
| Demo video walkthrough |  |
| Downloadable evidence packet JSON |  |
| Shareable public report link |  |

---

# **5\. Final Agentic Workflow**

Do not build nine separate complex agents. Build five or six functions and present them as an agentic workflow.

## **Agent map**

| Agent | Input | Output | Implementation | UI placement |
| ----- | ----- | ----- | ----- | ----- |
| Issue Intake Agent | Image \+ description \+ location | Category, title, summary | Gemini multimodal | AI Evidence Preview |
| Severity Agent | Issue type \+ image \+ context | Severity, confidence, risk | Gemini \+ scoring formula | Evidence Packet / Admin |
| Duplicate Agent | New report \+ existing reports | Duplicate probability, cluster suggestion | Rule-based first, Gemini optional | Report submission flow |
| Verification Agent | Community confirmations | Verification score | Rule-based | Report detail |
| Resolver Copilot | Report \+ severity \+ verification \+ status | Suggested action, department, routing note | Gemini text generation | Admin dashboard |
| Closure Agent | Before image \+ after image | Resolved / partial / unresolved | Gemini multimodal | Closure panel |
| Impact Agent | Aggregated report data | Locality insight summary | Simple stats \+ Gemini optional | Impact dashboard |
| Gamification Agent | User actions | Karma points and badges | Rule-based | User profile |

## **Implement as functions**

analyzeIssue()  
calculateSeverity()  
checkDuplicates()  
addVerification()  
generateResolverAction()  
verifyClosure()  
calculateCivicKarma()  
generateDashboardStats()

This is enough to show agentic depth without overbuilding.

---

# **6\. Recommended Tech Stack**

## **Frontend**

* React \+ Vite or Next.js  
* Tailwind CSS  
* Lucide icons  
* Recharts or Chart.js  
* Google Maps JavaScript API, or fallback to simple map/list if needed

## **Backend / data**

* Firebase Firestore for reports, users, verifications, status events  
* Firebase Storage for images  
* Firebase Hosting or Vercel for deployment

## **AI**

* Google AI Studio  
* Gemini API for:  
  * image/text issue analysis  
  * structured evidence packet  
  * resolver copilot  
  * closure verification  
  * dashboard insight summary

## **Deployment**

Preferred:

* Firebase Hosting if already comfortable  
* Vercel if faster  
* Follow Google AI Studio deployment guidance if required by hackathon submission

## **Do not complicate with**

* Cloud Run unless needed  
* Vertex AI unless team already knows it  
* MCP  
* Agent runtimes  
* long-running background agents  
* vector DB unless core app is complete

---

# **7\. Architecture Flow**

Citizen uploads image \+ description \+ location  
        ↓  
Image stored in Firebase Storage  
        ↓  
Gemini analyzes image/text  
        ↓  
AI Evidence Packet generated as JSON  
        ↓  
Report saved in Firestore  
        ↓  
Duplicate check against existing reports  
        ↓  
Report displayed on map/list  
        ↓  
Community verification updates verification score  
        ↓  
Admin dashboard sorts by priority score  
        ↓  
Resolver Copilot generates next action  
        ↓  
Status timeline updates  
        ↓  
Closure image uploaded  
        ↓  
Gemini verifies before/after evidence  
        ↓  
Civic Karma and impact dashboard update

---

# **8\. Data Model**

## **users**

{  
  "id": "u\_001",  
  "name": "Demo Citizen",  
  "role": "citizen",  
  "locality": "Yelahanka",  
  "karma": 85,  
  "badges": \["First Fix Reporter", "Evidence Builder"\],  
  "reportsSubmitted": 3,  
  "verificationsGiven": 5,  
  "closuresConfirmed": 1,  
  "createdAt": "timestamp"  
}

## **reports**

{  
  "id": "NF-102",  
  "title": "Large pothole near school gate",  
  "description": "Large pothole near the school gate. Two-wheelers are swerving around it.",  
  "category": "Road Damage",  
  "subCategory": "Pothole",  
  "status": "Community Verified",  
  "severity": "High",  
  "severityScore": 82,  
  "priorityScore": 88,  
  "aiConfidence": 0.87,  
  "verificationScore": 76,  
  "latitude": 13.12345,  
  "longitude": 77.56789,  
  "landmark": "Near school gate",  
  "imageUrl": "firebase-storage-url",  
  "closureImageUrl": "",  
  "createdBy": "u\_001",  
  "suggestedResolver": "Ward Road Maintenance",  
  "clusterId": "CL-009",  
  "createdAt": "timestamp",  
  "updatedAt": "timestamp"  
}

## **agentOutputs**

{  
  "id": "AO-102",  
  "reportId": "NF-102",  
  "issueAnalysis": {  
    "summary": "The image appears to show a road cavity that may create risk for two-wheelers.",  
    "evidenceObserved": \[  
      "Visible depression on road surface",  
      "Located near active traffic area"  
    \],  
    "missingInfo": \["Exact side of road"\],  
    "publicRisk": "Two-wheeler accident risk, especially during rain",  
    "recommendedNextAction": "Inspect and schedule patch repair",  
    "confidence": 0.87  
  },  
  "resolverCopilot": {  
    "suggestedDepartment": "Road Maintenance",  
    "adminNote": "High-severity pothole near a school gate with community verification.",  
    "citizenUpdate": "Your issue has been verified and routed for review."  
  },  
  "closureVerification": {  
    "status": "",  
    "confidence": 0,  
    "reason": ""  
  }  
}

## **verifications**

{  
  "id": "V-001",  
  "reportId": "NF-102",  
  "userId": "u\_002",  
  "type": "confirm\_with\_photo",  
  "comment": "Still present this morning.",  
  "imageUrl": "firebase-storage-url",  
  "locationDistanceMeters": 45,  
  "qualityScore": 0.9,  
  "createdAt": "timestamp"  
}

## **statusEvents**

{  
  "id": "E-001",  
  "reportId": "NF-102",  
  "fromStatus": "AI Reviewed",  
  "toStatus": "Community Verified",  
  "changedBy": "system",  
  "note": "Verification score crossed threshold after 3 confirmations.",  
  "createdAt": "timestamp"  
}

## **clusters**

{  
  "id": "CL-009",  
  "category": "Road Damage",  
  "area": "Yelahanka",  
  "centerLat": 13.12345,  
  "centerLng": 77.56789,  
  "reportIds": \["NF-102", "NF-117"\],  
  "summary": "Repeated pothole reports near school gate",  
  "clusterSeverity": "High",  
  "totalEvidenceItems": 4  
}

## **missions**

{  
  "id": "M-001",  
  "title": "Monsoon Watch",  
  "description": "Report and verify waterlogging, blocked drains, and dangerous potholes.",  
  "active": true,  
  "bonusPoints": 10,  
  "categories": \["Road Damage", "Drainage", "Water Leakage"\]  
}

---

# **9\. Key UI Screens**

## **1\. Landing Page**

Purpose: Explain product instantly.

Components:

* Hero: “Report once. Verify together. Resolve transparently.”  
* CTA: “Report an Issue”  
* CTA: “View Community Map”  
* Stats: open issues, verified issues, resolved issues  
* Feature cards:  
  * AI Evidence Packet  
  * Community Verification  
  * Resolver Copilot  
  * Closure Proof

## **2\. Report Issue Page**

Purpose: Citizen submits a report.

Components:

* Image upload  
* Description box  
* Location picker/manual location  
* Landmark input  
* “Analyze with Gemini” button  
* AI loading state

## **3\. AI Evidence Preview**

Purpose: Show the magic moment.

Components:

* Uploaded image  
* AI-generated title  
* Category/subcategory  
* Severity  
* Confidence  
* Risk explanation  
* Missing info  
* Suggested resolver  
* User confirmation/edit button  
* Submit button

## **4\. Report Detail Page**

Purpose: Track and validate one issue.

Components:

* Issue image  
* AI Evidence Packet  
* Status timeline  
* Map/location card  
* Community verification panel  
* Duplicate cluster notice  
* Comments/evidence additions  
* Closure status

## **5\. Community Map**

Purpose: Public transparency.

Components:

* Pins or list of reports  
* Filters by category, status, severity  
* Report cards  
* Cluster indicators if built

Fallback:  
If Google Maps integration slows the team, use a list \+ embedded static map/card layout.

## **6\. Admin Dashboard**

Purpose: Resolver view.

Components:

* Priority queue  
* High-severity cards  
* Aging issue alerts  
* Verification score  
* Suggested resolver  
* Status update buttons  
* Resolver Copilot panel

## **7\. Resolver Copilot Panel**

Purpose: Show agentic action.

Components:

* Recommended action  
* Suggested department  
* Escalation needed: yes/no  
* Admin routing note  
* Citizen update message  
* Copy button

## **8\. Closure Verification Panel**

Purpose: Confirm actual resolution.

Components:

* Before image  
* After image  
* “Verify with Gemini” button  
* Result: Resolved / Partially Resolved / Unresolved / Unclear  
* Confidence  
* Reason  
* Next action

## **9\. Impact Dashboard**

Purpose: Show community-level value.

Components:

* Total reports  
* Verified reports  
* Resolved issues  
* High-severity open issues  
* Top categories  
* Average time to verification  
* Local mission progress  
* Impact summary

## **10\. User Profile / Civic Karma**

Purpose: Gamification without spam.

Components:

* Civic Karma score  
* Badges  
* Reports submitted  
* Verifications added  
* Closures confirmed  
* Mission progress

---

# **10\. Scoring Logic**

## **Severity score**

Severity Score \=  
Issue Type Risk  
\+ Public Safety Risk  
\+ Location Sensitivity  
\+ Evidence Confidence  
\+ Time Sensitivity

Simple implementation:

| Signal | Points |
| ----- | ----- |
| Issue type risk | 0–25 |
| Safety risk | 0–25 |
| Location sensitivity | 0–15 |
| Evidence confidence | 0–20 |
| Time sensitivity | 0–15 |

Severity bands:

| Score | Severity |
| ----- | ----- |
| 0–30 | Low |
| 31–60 | Medium |
| 61–85 | High |
| 86–100 | Critical |

## **Verification score**

Verification Score \=  
Photo confirmations  
\+ Independent users  
\+ Location consistency  
\+ Useful details  
\+ Recency  
\- Spam/duplicate penalty

| Signal | Points |
| ----- | ----- |
| Fresh photo verification | \+25 |
| Independent user confirmation | \+15 |
| Same location within 100m | \+15 |
| Useful landmark/detail | \+10 |
| Recent verification | \+10 |
| Same user duplicate spam | \-15 |
| Contradictory evidence | \-20 |

## **Priority score**

Priority Score \=  
0.45 × Severity Score  
\+ 0.25 × Verification Score  
\+ 0.15 × Issue Age Score  
\+ 0.10 × Location Sensitivity  
\+ 0.05 × Equity Adjustment

Equity adjustment should be small and simple. Use it to avoid only prioritizing the loudest areas.

Examples:

* \+5 if under-reported locality  
* \+5 if near school/hospital/bus stop  
* \+5 if issue has safety risk but low verification due to low community activity

## **Duplicate probability**

Simple version:

Duplicate Probability \=  
0.4 × Category Match  
\+ 0.3 × Location Proximity  
\+ 0.2 × Text Similarity  
\+ 0.1 × Time Window Similarity

Rules:

* Same category \+ within 100m \+ similar keywords \= likely duplicate  
* Same category \+ within 300m \= needs review  
* Different category \= probably not duplicate

## **Civic Karma**

Reward quality, not volume.

| Action | Points |
| ----- | ----- |
| Valid report submitted | \+10 |
| Report includes photo and location | \+5 |
| Adds useful verification | \+15 |
| Adds fresh photo evidence | \+20 |
| Confirms closure | \+25 |
| Correctly identifies duplicate | \+10 |
| Participates in mission | \+10 |
| Spam/false report | \-15 |
| Repeated duplicate report | \-10 |

Important rule:

Do not reward “most complaints.” Reward verified civic contribution.

---

# **11\. Gemini Prompt Templates**

## **Issue Analysis Prompt**

You are a civic issue analysis agent for a hyperlocal issue resolution platform.

Analyze the uploaded image and user description. Return only valid JSON.

Do not overclaim. If the evidence is unclear, lower the confidence and ask for more information.

Return:  
{  
  "title": "",  
  "category": "",  
  "subCategory": "",  
  "citizenSummary": "",  
  "evidenceObserved": \[\],  
  "severity": "Low | Medium | High | Critical",  
  "severityScore": 0,  
  "confidence": 0,  
  "publicRisk": "",  
  "missingInfo": \[\],  
  "suggestedResolver": "",  
  "recommendedNextAction": "",  
  "privacyConcerns": \[\]  
}

## **Resolver Copilot Prompt**

You are a resolver copilot for a civic operations dashboard.

Given the report details, severity, verification score, age, and status, recommend the next operational action.

Return only valid JSON:  
{  
  "recommendedAction": "",  
  "suggestedDepartment": "",  
  "escalationNeeded": true,  
  "adminNote": "",  
  "citizenUpdate": "",  
  "slaRisk": "Low | Medium | High",  
  "reasoningSummary": ""  
}

## **Closure Verification Prompt**

You are a closure verification agent.

Compare the before image, after image, and original report description. Determine whether the issue appears resolved.

Return only valid JSON:  
{  
  "closureStatus": "Verified Resolved | Partially Resolved | Unresolved | Unclear",  
  "confidence": 0,  
  "observedChange": "",  
  "remainingConcern": "",  
  "recommendedNextStep": ""  
}

## **Impact Insight Prompt**

You are a civic analytics agent.

Given aggregated reports for a locality, generate short operational insights.

Return only valid JSON:  
{  
  "topHotspots": \[\],  
  "mostCommonIssues": \[\],  
  "highRiskOpenIssues": \[\],  
  "communityImpactSummary": "",  
  "recommendedLocalMission": "",  
  "adminPrioritySummary": ""  
}

---

# **12\. Day-by-Day Build Plan**

## **Day 1: Product Lock \+ Setup**

Goal:  
Set up the skeleton and freeze scope.

Build:

* GitHub repo  
* React/Next app  
* Tailwind  
* Firebase project  
* Firestore collections  
* Firebase Storage  
* Gemini API setup  
* Basic page routes

Pages:

* Home  
* Report  
* Map/List  
* Report Detail  
* Admin  
* Dashboard  
* Profile

Deliverables:

* App runs locally  
* Firebase connected  
* Gemini test call works  
* Mock data seeded

Acceptance criteria:

* Team can add/view mock reports  
* No unresolved architectural decisions

Fallback:  
If Firebase takes time, start with local JSON/mock data and plug Firebase later.

---

## **Day 2: Citizen Report \+ Gemini Evidence Packet**

Goal:  
Build the core magic moment.

Build:

* Image upload  
* Description input  
* Location/landmark input  
* Gemini issue analysis  
* AI Evidence Preview  
* Save report

Deliverables:

* User uploads image  
* Gemini returns structured JSON  
* Report saved with AI fields

Acceptance criteria:

* At least 3 issue types work in demo:  
  * pothole  
  * garbage overflow  
  * broken streetlight or water leakage

Fallback:  
If image analysis is unstable, use curated sample images and allow manual category edit.

---

## **Day 3: Report Detail \+ Status Timeline \+ Map/List**

Goal:  
Make the citizen flow feel real.

Build:

* Report detail page  
* Status timeline  
* Report cards  
* Map/list view  
* Filters by category/status/severity

Deliverables:

* Submitted reports appear on map/list  
* Clicking report opens detail  
* Timeline shows status changes

Acceptance criteria:

* Report can move from Submitted to AI Reviewed  
* User can see tracking clearly

Fallback:  
If Google Maps slows down, use cards with location text and a simple map placeholder.

---

## **Day 4: Community Verification \+ Civic Karma**

Goal:  
Add collaboration and responsible gamification.

Build:

* “I see this too” verification  
* Add comment/photo evidence  
* Verification score calculation  
* Civic Karma update  
* Badge logic  
* Mission cards

Deliverables:

* Verification updates report score  
* User earns Karma for useful actions  
* Badge appears after threshold

Acceptance criteria:

* Report can move from AI Reviewed to Community Verified  
* Points are not awarded just for spammy report volume

Fallback:  
Use simple confirm/comment flow without photo verification.

---

## **Day 5: Admin Dashboard \+ Resolver Copilot**

Goal:  
Show resolution actionability.

Build:

* Admin dashboard  
* Priority queue  
* Sort by priority/severity/age  
* Resolver Copilot Gemini prompt  
* Suggested department/action  
* Status update buttons

Deliverables:

* Admin sees high-risk reports first  
* Copilot generates routing note  
* Admin can move status to Routed/In Progress/Resolved Claim

Acceptance criteria:

* One report can complete admin flow  
* Copilot output is visible and copyable

Fallback:  
Use pre-generated routing note template if Gemini is slow.

---

## **Day 6: Duplicate Detection \+ Closure Verification \+ Impact Dashboard**

Goal:  
Add strongest differentiators.

Build:

* Duplicate detection  
* Duplicate warning UI  
* Cluster card  
* Closure image upload  
* Gemini before/after verification  
* Impact dashboard stats

Deliverables:

* Similar nearby issue is flagged  
* Closure verification returns result  
* Dashboard updates resolved count

Acceptance criteria:

* Demo can show duplicate prevention  
* Demo can show closure proof  
* Dashboard reflects impact

Fallback:  
Use rule-based duplicate check only.  
If closure comparison fails, show manual closure plus AI-generated summary.

---

## **Day 7: Polish \+ Deploy \+ Submit Assets**

Goal:  
Make the project judge-ready.

Build:

* Mobile polish  
* Loading states  
* Error handling  
* Seed 10–15 realistic demo reports  
* README  
* Google Doc  
* Demo script  
* Deployment  
* Final QA

Deliverables:

* Deployed app link  
* GitHub repo  
* Google Doc link  
* 3–5 minute demo script/video  
* Submission-ready project

Acceptance criteria:

* App works from deployed URL  
* Demo can be completed without debugging  
* All required links accessible  
* No overclaiming in README/Google Doc

---

# **13\. Team Allocation**

## **4-person team**

### **Person 1: AI \+ prompts \+ backend logic**

Owns:

* Gemini integration  
* Issue analysis prompt  
* Resolver Copilot prompt  
* Closure verification prompt  
* Scoring functions

Deliverables:

* analyzeIssue()  
* generateResolverAction()  
* verifyClosure()  
* calculatePriorityScore()

### **Person 2: Citizen frontend**

Owns:

* Landing page  
* Report issue page  
* AI Evidence Preview  
* Report detail page  
* Status timeline

Deliverables:

* Complete citizen journey

### **Person 3: Admin \+ dashboard**

Owns:

* Admin dashboard  
* Resolver Copilot panel  
* Status controls  
* Impact dashboard  
* Charts/cards

Deliverables:

* Complete resolver/admin journey

### **Person 4: Maps \+ community \+ gamification**

Owns:

* Community map/list  
* Verification flow  
* Duplicate detection UI  
* Civic Karma  
* Badges/missions

Deliverables:

* Community validation and engagement layer

## **3-person team**

### **Person 1: AI/backend**

Gemini, Firebase, scoring, prompts, status logic.

### **Person 2: Citizen \+ map frontend**

Landing, report form, AI preview, report detail, map/list.

### **Person 3: Admin \+ gamification \+ submission**

Admin dashboard, resolver copilot UI, impact dashboard, Civic Karma, README, Google Doc, demo script.

---

# **14\. Seed Demo Data**

Create 10–15 reports so the dashboard feels alive.

| ID | Issue | Category | Severity | Status |
| ----- | ----- | ----- | ----- | ----- |
| NF-101 | Garbage overflow near market | Waste | Medium | Routed |
| NF-102 | Pothole near school gate | Road Damage | High | Community Verified |
| NF-103 | Broken streetlight in lane | Streetlight | High | In Progress |
| NF-104 | Water leakage near bus stop | Water | High | AI Reviewed |
| NF-105 | Blocked drain near apartment | Drainage | Medium | Community Verified |
| NF-106 | Illegal dumping at corner | Waste | Medium | Submitted |
| NF-107 | Damaged footpath | Infrastructure | Medium | Routed |
| NF-108 | Waterlogging after rain | Drainage | Critical | Escalated |
| NF-109 | Open manhole | Public Safety | Critical | In Progress |
| NF-110 | Street sign damaged | Infrastructure | Low | Resolved |

Best demo issue:

**Pothole near school gate**

Why:

* Easy to understand  
* Safety risk is obvious  
* Severity scoring makes sense  
* Duplicate detection is plausible  
* Closure before/after is easy to show

---

# **15\. Final Demo Script**

## **0:00–0:30 — Problem**

“Most civic apps digitize complaints but do not improve resolution. Citizens report potholes, broken streetlights, garbage overflow, and water leaks, but reports often become fragmented, duplicated, and hard to track.”

## **0:30–1:15 — Citizen report**

“Here, a citizen uploads a photo of a pothole near a school gate, adds a short description, and confirms location.”

Show:

* image upload  
* description  
* location  
* Analyze with Gemini

## **1:15–2:00 — AI Evidence Packet**

“Gemini converts the raw report into structured civic intelligence: category, severity, confidence, risk, missing information, and suggested resolver.”

Show:

* category: Road Damage / Pothole  
* severity: High  
* confidence  
* public risk  
* suggested resolver

## **2:00–2:30 — Duplicate detection**

“The system checks whether this is already reported nearby. Instead of creating noise, it can merge evidence into an existing issue cluster.”

Show:

* duplicate suggestion  
* add evidence / continue as new

## **2:30–3:00 — Community verification**

“Citizens nearby can verify with additional evidence. NammaFix rewards useful validation, not complaint volume.”

Show:

* verification added  
* verification score increases  
* Civic Karma earned

## **3:00–3:45 — Admin dashboard \+ Resolver Copilot**

“The admin sees issues prioritized by severity, verification strength, age, and location sensitivity. Resolver Copilot suggests the next action and prepares a routing note.”

Show:

* admin queue  
* high priority issue  
* generated routing note  
* status moves to Routed/In Progress

## **3:45–4:30 — Closure verification**

“When a fix is claimed, before/after proof is uploaded. Gemini checks whether the issue appears resolved, partially resolved, or unresolved.”

Show:

* before image  
* after image  
* closure verification result

## **4:30–5:00 — Impact dashboard**

“The dashboard updates resolved issues, verified reports, local impact, and citizen contributions. NammaFix is not just a complaint portal. It is an AI-powered civic resolution layer.”

Final line:

**“Report once. Verify together. Resolve transparently.”**

---

# **16\. README Structure**

\# NammaFix AI

\#\# Problem  
Local civic issues such as potholes, water leakage, broken streetlights, waste overflow, and drainage problems are often reported through fragmented channels. Reports are hard to validate, difficult to prioritize, and rarely transparent through resolution.

\#\# Solution  
NammaFix AI is a Gemini-powered civic resolution layer that helps citizens report, validate, prioritize, route, track, and verify closure of local issues.

\#\# Key Features  
\- Image-based issue reporting  
\- Gemini-powered issue categorization  
\- AI Evidence Packet  
\- Severity and priority scoring  
\- Duplicate detection  
\- Community verification  
\- Resolver Copilot  
\- Status timeline  
\- Closure verification  
\- Civic Karma and badges  
\- Impact dashboard

\#\# Google Technologies Used  
\- Google AI Studio  
\- Gemini API  
\- Google Maps API  
\- Firebase Firestore  
\- Firebase Storage  
\- Firebase Hosting

\#\# Agentic Workflow  
Citizen report → Gemini analysis → Evidence Packet → Duplicate check → Community verification → Resolver Copilot → Status tracking → Closure verification → Impact dashboard

\#\# Setup  
1\. npm install  
2\. Add environment variables  
3\. npm run dev

\#\# Originality  
Core product workflow, prompts, scoring logic, UI, and implementation were built by our team for Vibe2Ship. Open-source libraries were used only for standard implementation components.

---

# **17\. Google Doc Submission Structure**

## **Problem Statement Selected**

Community Hero – Hyperlocal Problem Solver

## **Solution Overview**

NammaFix AI is a Gemini-powered civic resolution platform that helps citizens report local issues, validate them with community evidence, prioritize them using AI-assisted severity scoring, route them through a resolver workflow, track progress, and verify closure with before/after evidence.

## **Key Features**

* Image/video-based civic issue reporting  
* AI-powered issue categorization  
* AI Evidence Packet  
* Geolocation and map/list view  
* Duplicate detection  
* Community verification  
* Severity and priority scoring  
* Resolver Copilot  
* Real-time status timeline  
* Closure verification  
* Civic Karma and badges  
* Impact dashboard

## **Technologies Used**

* React or Next.js  
* Tailwind CSS  
* Firebase Firestore  
* Firebase Storage  
* Google Maps API  
* Gemini API  
* Recharts or Chart.js  
* GitHub

## **Google Technologies Utilized**

* Google AI Studio  
* Gemini API  
* Google Maps API  
* Firebase Firestore  
* Firebase Storage  
* Firebase Hosting

## **Agentic Workflow**

NammaFix AI uses Gemini-powered agents for intake, evidence generation, severity scoring, duplicate detection, resolver guidance, closure verification, and impact insights.

## **Responsible AI and Product Design**

The system avoids rewarding complaint volume. Civic Karma rewards useful evidence, verification, duplicate prevention, and closure confirmation. Low-confidence AI outputs are routed for human/community review. The MVP does not claim real government integration but generates resolver-ready action notes.

## **Impact**

NammaFix AI improves civic issue handling by reducing duplicate noise, improving report quality, supporting community validation, making prioritization transparent, assisting resolvers, and verifying whether issues are actually fixed.

---

# **18\. Final QA Checklist**

## **Citizen flow**

* User can upload image  
* User can add description and location  
* Gemini generates AI Evidence Packet  
* User can submit report  
* Report appears in list/map  
* Report detail page opens  
* Status timeline is visible

## **AI flow**

* Issue analysis returns valid JSON  
* Severity and confidence are displayed  
* Missing information is handled  
* Resolver Copilot generates useful note  
* Closure verification works on before/after images  
* App has fallback if Gemini fails

## **Admin flow**

* Admin can view report queue  
* Queue sorts by priority/severity  
* Admin can update status  
* Resolver note is visible  
* Closure proof can be uploaded

## **Community flow**

* User can verify issue  
* Verification score updates  
* Civic Karma updates  
* Badge logic works

## **Dashboard**

* Open/verified/resolved counts show correctly  
* High-severity count visible  
* Top categories visible  
* Impact summary visible

## **Submission**

* App deployed  
* GitHub repo accessible  
* Google Doc accessible to anyone with link  
* README complete  
* Demo script ready  
* Final submit only after checking all links

---

# **19\. Risk Register**

| Risk | Probability | Impact | Mitigation | Fallback |
| ----- | ----- | ----- | ----- | ----- |
| Gemini JSON errors | Medium | High | Strict JSON prompt, parser fallback | Manual/default fields |
| Image analysis weak | Medium | High | Use curated demo images | Allow manual correction |
| Firebase setup delay | Medium | Medium | Start with mock data | LocalStorage/demo JSON |
| Maps integration delay | Medium | Medium | Keep map simple | List/card view |
| Scope creep | High | High | Freeze P0 first | Cut P2 immediately |
| Deployment failure | Medium | High | Deploy by Day 6 | Vercel/Firebase backup |
| Overclaiming | Medium | High | Use honest wording | Mark as simulated/future |
| Demo instability | Medium | High | Seed data and rehearse | Use pre-created reports |
| Duplicate detection complexity | Medium | Medium | Rule-based approach | Manual duplicate demo |
| Closure verification inconsistency | Medium | Medium | Use curated before/after images | Show AI suggestion \+ manual admin decision |

---

# **20\. Final Build Recommendation**

## **Build this exact MVP**

**NammaFix AI: Gemini-powered civic resolution layer**

Core features:

1. Citizen report form  
2. Gemini AI Evidence Packet  
3. Report detail and status timeline  
4. Community verification  
5. Admin priority dashboard  
6. Resolver Copilot  
7. Duplicate detection  
8. Closure verification  
9. Civic Karma  
10. Impact dashboard

## **Definitely do not build**

* Real municipal integration  
* MCP  
* Agent Gateway  
* Agent Sandbox  
* Legal evidence chain  
* Cryptographic identity  
* Full multilingual voice  
* Advanced RAG  
* Complex ward demographics  
* Public ward shaming rankings

## **Strongest demo moment**

**Gemini turns a raw civic issue photo into a structured, actionable AI Evidence Packet, then carries it through verification, routing, tracking, and closure proof.**

## **Strongest judging pitch**

**NammaFix AI is not another complaint app. It is a Gemini-powered civic resolution layer that improves the full lifecycle of a local issue: report, validate, prioritize, route, track, verify closure, and measure community impact.**

