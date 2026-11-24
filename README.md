# ❄️ ColdChain Monitor V2.0 — Enterprise Refrigerated Freight Telemetry & Excursion Governance

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Vercel Live](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=for-the-badge&logo=vercel)](https://coldchain-monitor2.vercel.app)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![GxP Ready](https://img.shields.io/badge/GxP%20Compliance-Architecture-success?style=for-the-badge&logo=shield)](https://www.who.int/)

> **Applied AI Frontend Development Basics | OJT Capstone Project V2.0**  
> *Polaris School of Technology Bangalore*  
> Mentored under **Kshitij Sir** | Engineered by **Arnav Pratap Singh**

> ?? **Live Production Vercel URL:** [https://coldchain-monitor2.vercel.app](https://coldchain-monitor2.vercel.app)


---

## 📋 Overview

**ColdChain Monitor V2.0** is an enterprise-grade, responsive single-page platform designed for end-to-end refrigerated freight operations, IoT thermal telemetry, and excursion governance. Built to adhere strictly to WHO Good Distribution Practice (GDP) standards and the **ColdChain Monitor V2 Antigravity Playbook**, the application delivers a calm, high-contrast, data-dense interface tailored for mission-critical logistics operations.

The system monitors active consignments carrying pharmaceuticals, mRNA vaccines, biologics, dairy, seafood, and fresh produce. Whenever temperatures drift into warning margins or breach critical limits, automated incidents are raised, requiring documented inspection notes, warehouse verification, and managerial regulation.

---

## 🎨 Enterprise Design System

The V2.0 redesign replaces generic layouts with a bespoke CRM dashboard aesthetic:

* **Deep Navy Navigation (`#17243A`):** Structured sidebar categorizing operations, telemetry intelligence, and system governance.
* **Warm Off-White Canvas (`#F7F7F1`):** Soft, high-contrast workspace minimizing ocular fatigue across long dispatcher shifts.
* **Ice-Blue Primary Accents (`#3478F6`):** Focused action buttons, active navigation markers, and focus states.
* **Restrained Semantic Status Tokens:**
  * 🟢 **Normal / Compliant:** `#17845D` (Safe holding bounds)
  * 🟡 **Warning Margin:** `#B7791F` (`< 2.0°C` thermal boundary drift)
  * 🔴 **Critical Excursion:** `#C2413B` (`≥ 2.0°C` breach with active spoilage risk)
* **Inter Typography:** High legibility font stack optimized for tabular telemetry data and numerical precision.
* **Full Mobile Responsiveness:** Collapsible drawer sidebar with touch backdrop overlay on tablets and smartphones.

---

## 🌟 Key Modules & Capabilities

### 1. 🔐 Google OAuth 2.0 ("Continue with Google") & Dynamic Role Onboarding
* **Google Identity Services (GIS) Web SDK:** Native integration with Google's official OAuth 2.0 library (`https://accounts.google.com/gsi/client`) providing standard "Continue with Google" sign-in, JWT credential exchange, and automated profile image/name synchronization.
* **Pre-Configured Personnel Routing:**
  * `dhairyaps2009@gmail.com` ➔ Automatically assigned **Logistics Manager** role with Command Center fleet authority.
  * `sourabhjeevan0794@gmail.com` ➔ Automatically assigned **Warehouse Operator** role with Depot Bay inspection authority.
  * `arnavpratap60@gmail.com` ➔ Pre-authorized **Logistics Manager** backup.
* **Dynamic Role Onboarding:** When a new Google account signs in for the first time, an interactive onboarding dialog asks for their operational mandate (**Logistics Manager** or **Warehouse Operator**), dynamically tailoring their console workspace, navigation privileges, and audit permissions.
* **Session Persistence & Secure Logout:** User session stored safely in `localStorage["cc_user"]`; logging out clears session credentials and disables Google auto-select.

### 2. 📊 Executive Overview Dashboard & Dark Mode
* **Operational Header:** Contextual dispatcher greeting, station location, live date, and one-click **Light/Dark Mode** toggle.
* **5 Core KPI Cards:** Active Shipments, Compliant Range, Warning Alerts, Critical Breaches, and IoT Gateway reach.
* **Dynamic Adaptive Charts:** Real-time Chart.js thermal line visualization and compliance doughnut chart that automatically re-theme grid lines and labels in Dark/Light modes.
* **Incident & Activity Feeds:** High-priority alerts and dispatch activity stream.

### 3. 🚚 Comprehensive Shipment Fleet Management
* **Advanced Search & Filtering:** Filter across Shipment ID, Cargo Type, Origin Hub, Destination, and Thermal Condition.
* **Commodity Class Filtering:** Quick triage for Vaccines & Biologics, Produce & Confectionery, Dairy & Seafood.
* **Dual-Role Dispatch Broadcast:** Adding any new shipment instantly logs an alert notification broadcast to both Warehouse Operator and Logistics Manager.
* **One-Click CSV Export:** Export filtered shipment datasets directly to `.csv`.

### 4. 🚨 Incident & Spoilage Prevention Center
* **Severity Tabs:** Instant filtering across *All Alerts*, *Critical Only*, *Warnings Only*, *Cancellation Notices*, and *Resolved Archive*.
* **Responsive Badge Zeroing:** When an operator reviews Alerts or Approvals and navigates to another view, the notification badge automatically clears to zero.
* **Two-Step Resolution Flow:**
  * **Warehouse Operator:** Dispatches alert notices to Logistics Managers for packages in critical condition.
  * **Logistics Manager:** Regulates consignment temperature back within safe cooling bounds and enters audit resolutions.

### 5. ☣️ Dedicated Spoiled & Quarantined Cargo Hub
* **Quarantine Inventory:** Dedicated view for irreparable consignments suffering catastrophic thermal excursion or cold chain breakdown.
* **Spoiled KPIs:** Quarantined packages, cumulative cargo value lost, biological hazard classifications, and compliance risk flags.
* **"Declare Spoiled" Workflow:** Authorized managers can officially quarantine critical shipments, lock their telemetry, and log incident notes into GxP records.
* **Regulatory Spoilage CSV Export:** Instant audit download for insurer claims and health authority filings.

### 6. ⚡ Two-Person Cancellation Approval Queue
* **Strict Governance Workflow:** Logistics Managers initiate cancellation requests with formal justifications (thermal shock, refrigeration compressor failure, route diversion).
* **Warehouse Terminal Verification:** Warehouse Operators at the destination depot inspect physical cargo and choose to **Approve** (moving the package to Cancelled Records) or **Reject** (keeping the consignment active in transit).
* **Audited Decision Timestamps:** Complete trail of requester, approver, reason, and notes.

### 7. 📡 IoT Hardware Fleet Module
* **Probe Health Directory:** Fleet status monitoring for 8 calibrated hardware sensors (`SEN-T101` through `SEN-T108`).
* **Telemetry Telemetry:** Battery discharge level (`%`), RF cellular signal (`dBm`), last ping timestamp, and firmware status.
* **Truthful Telemetry Disclaimer:** Clearly labeled **"Simulated IoT Telemetry"** indicator ensuring transparent distinction between simulated and real-world hardware data.

### 8. 📈 Analytics & Compliance Reports
* **GxP Compliance Scoring:** Fleet stability score calculated against WHO Good Distribution Practice guidelines.
* **Commodity Vulnerability Table:** Target safe bands and breach risk levels categorized by commodity.
* **Download Master Audit CSV:** Full regulatory audit export combining shipments, incident alerts, and cancellation decisions with audit timestamps.

### 9. ⚙️ Responsive Profile & System Preferences
* **Full Profile Customization:** Edit dispatcher Full Name, Email, Phone Number, Operating Hub/Station, and upload a custom avatar photo (persisted in browser storage).
* **Display Theme Switcher:** Choose between Corporate Light and Deep Navy Dark modes.
* **Role-Based Access Control:** Strict RBAC enforcing separate operational mandates for Logistics Manager vs. Warehouse Operator.

---

## 🔑 Operational Google Accounts

Authenticate immediately using the pre-configured accounts:

| Role | Google Email | Display Name | Operational Mandate |
|---|---|---|---|
| **Logistics Manager** | `dhairyaps2009@gmail.com` | Dhairya | Fleet oversight, route dispatch, emergency temperature regulation & security deletion |
| **Warehouse Operator** | `sourabhjeevan0794@gmail.com` | Sourabh Jeevan | Depot receiving, physical cargo inspection, alert dispatch & cancellation sign-off |
| **Logistics Manager (Alt)** | `arnavpratap60@gmail.com` | Arnav Pratap Singh | Auxiliary fleet command & supervisor sign-off |

*(Any other Google account that signs in will be prompted to select their operational mandate and receive their customized workspace).*

---

## 📁 Repository Structure

```text
ColdChain-Monitor2/
├── index.html                                        # Main V2.0 SPA entrypoint & semantic HTML5 layout
├── style.css                                         # Design system tokens, CRM sidebar & responsive styles
├── script.js                                         # Master controller, Google OAuth 2.0 & Chart.js engine
├── .env.example                                      # Google OAuth 2.0 Client ID template & redirect URIs
├── README.md                                         # Project documentation & operational manual
└── docs/                                             # PDF guides, presentations, PRD & V2 Playbook
    ├── 1_ColdChain_HTML_Explained_English.pdf
    ├── 1_ColdChain_HTML_Explained_Hinglish.pdf
    ├── 2_ColdChain_CSS_Explained_English.pdf
    ├── 2_ColdChain_CSS_Explained_Hinglish.pdf
    ├── 3_ColdChain_JavaScript_Explained_English.pdf
    ├── 3_ColdChain_JavaScript_Explained_Hinglish.pdf
    ├── 4_ColdChain_Feature_Showcase_English.pptx
    ├── 5_ColdChain_Login_to_End_Code_Walkthrough_Hinglish.pptx
    ├── 6_ColdChain_Login_to_End_Code_Walkthrough_English.pptx
    ├── ColdChain_Monitor_PRD_Arnav_Pratap_Singh.pdf
    └── ColdChain_Monitor_V2_Antigravity_Playbook.pdf
```

---

## 📚 Complete Project Documentation & Walkthroughs

All detailed study guides, architecture teardowns, slide decks, PRDs, and playbooks are preserved in the [`docs/`](./docs) directory:

| Document | Language | Format | Description |
|---|---|---|---|
| [**V2 Engineering Playbook**](./docs/ColdChain_Monitor_V2_Antigravity_Playbook.pdf) | English | PDF | Official Antigravity V2.0 Full Product Redesign & Engineering Playbook |
| [**Product Requirements Document (PRD)**](./docs/ColdChain_Monitor_PRD_Arnav_Pratap_Singh.pdf) | English | PDF | Core OJT Capstone PRD outlining business rules, personas, and deliverables |
| [**HTML Architecture Explained**](./docs/1_ColdChain_HTML_Explained_English.pdf) | English | PDF | Comprehensive breakdown of Semantic HTML5 elements and accessibility |
| [**HTML Architecture Explained**](./docs/1_ColdChain_HTML_Explained_Hinglish.pdf) | Hinglish | PDF | Deep dive into HTML structure explained in conversational Hinglish |
| [**CSS Styling & Design System**](./docs/2_ColdChain_CSS_Explained_English.pdf) | English | PDF | Layout principles, CSS variables, color contrast, and responsive grids |
| [**CSS Styling & Design System**](./docs/2_ColdChain_CSS_Explained_Hinglish.pdf) | Hinglish | PDF | CSS styling and layout mechanisms explained in Hinglish |
| [**JavaScript Controller & Logic**](./docs/3_ColdChain_JavaScript_Explained_English.pdf) | English | PDF | State management, array methods, DOM manipulation, and Chart.js telemetry |
| [**JavaScript Controller & Logic**](./docs/3_ColdChain_JavaScript_Explained_Hinglish.pdf) | Hinglish | PDF | Full JavaScript logic walkthrough explained in Hinglish |
| [**Feature Showcase Deck**](./docs/4_ColdChain_Feature_Showcase_English.pptx) | English | PPTX | High-level presentation deck demonstrating every feature and capability |
| [**End-to-End Walkthrough**](./docs/5_ColdChain_Login_to_End_Code_Walkthrough_Hinglish.pptx) | Hinglish | PPTX | Complete code walkthrough presentation from login to resolution in Hinglish |
| [**End-to-End Walkthrough**](./docs/6_ColdChain_Login_to_End_Code_Walkthrough_English.pptx) | English | PPTX | Complete code walkthrough presentation from login to resolution in English |

---

## 🚀 Getting Started

### Option 1: Direct File Launch
Double-click `index.html` or open it directly in any modern browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari).

### Option 2: Local HTTP Server
Using Python's built-in web server or VS Code Live Server:

```bash
# Clone the repository
git clone https://github.com/dhairya-arnav-ps601/ColdChain-Monitor2.git
cd ColdChain-Monitor2

# Run local web server
python -m http.server 8080

# Access in browser
http://localhost:8080
```

---

## 🛠️ Technology Stack & Standards

* **Semantic HTML5:** Native accessible structure (`<aside>`, `<header>`, `<main>`, `<section>`, `<table>`, `<dialog>`).
* **Modern CSS3:** CSS Custom Properties (Design Tokens), Flexbox, CSS Grid, mobile drawer animations.
* **Vanilla JavaScript (ES6+):** Pure DOM manipulation, defensive object parsing, event delegation, LocalStorage schema management.
* **Chart.js (v4.4.2):** Interactive real-time canvas visualizations for thermal trends, condition doughnut charts, and shipment diagnostics.
* **Bootstrap 5 (v5.3.3) & Bootstrap Icons (v1.11.3):** Responsive utilities and icon library.

---

## 👤 Author & Acknowledgements

* **Lead Architect & Developer:** Arnav Pratap Singh ([@dhairya-arnav-ps601](https://github.com/dhairya-arnav-ps601))
* **Academic Institution:** Polaris School of Technology, Bangalore
* **Program:** Applied AI Frontend Development Basics
* **Special Mentorship:** Sincere gratitude to **Kshitij Sir** for architectural guidance throughout the OJT Capstone journey.
