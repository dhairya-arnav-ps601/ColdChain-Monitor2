/**
 * ===================================================================
 * COLDCHAIN MONITOR V2.0 - MASTER CONTROLLER (script.js)
 * Enterprise Cold-Chain Logistics, Excursion Governance & IoT Telemetry
 * Enhanced: Google Login, Editable Profile, Dark Mode, Spoiled Section,
 * Dual-Role Alerts, and Responsive Resetting Notification Badges
 * ===================================================================
 */

// 1. Authorized User Accounts & Google OAuth Configuration
const GOOGLE_CLIENT_ID = window.GOOGLE_CLIENT_ID || "330845958-coldchain-monitor.apps.googleusercontent.com";

const USERS = [
  { username: "Dhairya", name: "Dhairya", role: "Logistics Manager", email: "dhairyaps2009@gmail.com" },
  { username: "Sourabh", name: "Sourabh Jeevan", role: "Warehouse Operator", email: "sourabhjeevan0794@gmail.com" },
  { username: "Arnav", name: "Arnav Pratap Singh", role: "Logistics Manager", email: "arnavpratap60@gmail.com" }
];

// Pre-Mapped Operational Roles by Normalized Google Email Address
const PREMAPPED_ROLES = {
  "dhairyaps2009@gmail.com": { name: "Dhairya", role: "Logistics Manager", station: "Bengaluru Command Center (HQ)" },
  "sourabhjeevan0794@gmail.com": { name: "Sourabh Jeevan", role: "Warehouse Operator", station: "Bengaluru Depot Terminal (Bay 4B)" },
  "arnavpratap60@gmail.com": { name: "Arnav Pratap Singh", role: "Logistics Manager", station: "Polaris School of Technology Bangalore (Command HQ)" },
  "sourabh@coldchain.io": { name: "Sourabh Verma", role: "Warehouse Operator", station: "Polaris School of Technology Bangalore (Depot 4B)" }
};

// 2. Individual Profile Metadata (Default Templates)
const DEFAULT_PROFILES = {
  dhairyaps2009: {
    username: "Dhairya",
    name: "Dhairya",
    role: "Logistics Manager",
    badgeClass: "bg-primary",
    email: "dhairyaps2009@gmail.com",
    phone: "+91 98765 43210",
    station: "Bengaluru Command Center (HQ)",
    duty: "Fleet oversight, route dispatch, thermal regulation & incident authorization",
    photo: ""
  },
  sourabhjeevan0794: {
    username: "Sourabh",
    name: "Sourabh Jeevan",
    role: "Warehouse Operator",
    badgeClass: "bg-teal text-white",
    email: "sourabhjeevan0794@gmail.com",
    phone: "+91 98765 43211",
    station: "Bengaluru Depot Terminal (Bay 4B)",
    duty: "In-bound receiving, physical seal inspection, alert acknowledgement & cancellation decisions",
    photo: ""
  },
  Arnav: {
    username: "Arnav",
    name: "Arnav Pratap Singh",
    role: "Logistics Manager",
    badgeClass: "bg-primary",
    email: "arnavpratap60@gmail.com",
    phone: "852 8600 376",
    station: "Polaris School of Technology Bangalore (Command HQ)",
    duty: "Fleet oversight, route dispatch, thermal regulation & incident authorization",
    photo: ""
  }
};

// 3. Baseline Shipments Sample
const INITIAL_SHIPMENTS = [
  // --- 8 ACTIVE REFRIGERATED CONSIGNMENTS ---
  {
    id: "SHP-101",
    cargo: "Fresh Produce",
    origin: "Mumbai",
    dest: "Pune",
    min: 2,
    max: 8,
    status: "Active",
    readings: [
      { temp: 5.2, time: "10:00" },
      { temp: 6.1, time: "10:30" }
    ]
  },
  {
    id: "SHP-102",
    cargo: "mRNA Vaccines",
    origin: "Hyderabad",
    dest: "Bengaluru",
    min: -25,
    max: -15,
    status: "Active",
    readings: [
      { temp: -21.4, time: "09:00" },
      { temp: -20.5, time: "09:45" }
    ]
  },
  {
    id: "SHP-103",
    cargo: "Dairy Products",
    origin: "Anand",
    dest: "Delhi",
    min: 1,
    max: 4,
    status: "Active",
    readings: [
      { temp: 2.5, time: "08:00" },
      { temp: 7.2, time: "08:30" }
    ]
  },
  {
    id: "SHP-104",
    cargo: "Frozen Seafood",
    origin: "Kochi",
    dest: "Chennai",
    min: -18,
    max: -12,
    status: "Active",
    readings: [
      { temp: -15.1, time: "11:00" },
      { temp: -14.8, time: "11:30" }
    ]
  },
  {
    id: "SHP-105",
    cargo: "Blood Plasma & Biologics",
    origin: "Jaipur",
    dest: "Delhi",
    min: 2,
    max: 6,
    status: "Active",
    readings: [
      { temp: 4.2, time: "07:30" },
      { temp: 7.1, time: "08:15" }
    ]
  },
  {
    id: "SHP-106",
    cargo: "Insulin Vials",
    origin: "Ahmedabad",
    dest: "Kolkata",
    min: 2,
    max: 8,
    status: "Active",
    readings: [
      { temp: 5.0, time: "06:00" },
      { temp: 11.4, time: "07:00" }
    ]
  },
  {
    id: "SHP-107",
    cargo: "Chilled Poultry",
    origin: "Chandigarh",
    dest: "Lucknow",
    min: 0,
    max: 4,
    status: "Active",
    readings: [
      { temp: 1.8, time: "09:15" },
      { temp: 2.1, time: "10:00" }
    ]
  },
  {
    id: "SHP-108",
    cargo: "Premium Chocolates",
    origin: "Indore",
    dest: "Bhopal",
    min: 12,
    max: 18,
    status: "Active",
    readings: [
      { temp: 14.2, time: "10:45" },
      { temp: 15.5, time: "11:15" }
    ]
  },

  // --- 3 DELIVERED PACKAGES ---
  {
    id: "SHP-201",
    cargo: "Ice Cream & Desserts",
    origin: "Nagpur",
    dest: "Raipur",
    min: -22,
    max: -16,
    status: "Delivered",
    deliveredAt: "15/11/2026 14:30",
    readings: [
      { temp: -18.2, time: "14:15" }
    ]
  },
  {
    id: "SHP-202",
    cargo: "Diagnostic Test Kits",
    origin: "Bengaluru",
    dest: "Chennai",
    min: 2,
    max: 8,
    status: "Delivered",
    deliveredAt: "15/11/2026 16:15",
    readings: [
      { temp: 4.8, time: "16:00" }
    ]
  },
  {
    id: "SHP-203",
    cargo: "Frozen Organic Berries",
    origin: "Shimla",
    dest: "Delhi",
    min: -20,
    max: -14,
    status: "Delivered",
    deliveredAt: "15/11/2026 18:00",
    readings: [
      { temp: -16.5, time: "17:45" }
    ]
  },

  // --- 4 CANCELLED PACKAGES ---
  {
    id: "SHP-301",
    cargo: "Seasonal Cut Fruits",
    origin: "Nashik",
    dest: "Mumbai",
    min: 2,
    max: 6,
    status: "Cancelled",
    cancelReason: "Severe Spoilage / Thermal Shock",
    cancelNotes: "Cooling system failed near Igatpuri ghats. Ambient reached 18°C.",
    cancelRequestedBy: "Arnav (Logistics Manager)",
    cancelApprovedBy: "Sourabh (Warehouse Operator)",
    cancelledAt: "15/11/2026 11:20",
    readings: [
      { temp: 18.2, time: "11:00" }
    ]
  },
  {
    id: "SHP-302",
    cargo: "Live Bacterial Cultures",
    origin: "Vadodara",
    dest: "Surat",
    min: -20,
    max: -15,
    status: "Cancelled",
    cancelReason: "Refrigeration Unit Mechanical Failure",
    cancelNotes: "Compressor drive belt snapped; vehicle diverted safely to depot.",
    cancelRequestedBy: "Arnav (Logistics Manager)",
    cancelApprovedBy: "Sourabh (Warehouse Operator)",
    cancelledAt: "15/11/2026 13:45",
    readings: [
      { temp: -8.4, time: "13:30" }
    ]
  },
  {
    id: "SHP-303",
    cargo: "Imported Gourmet Butter",
    origin: "Goa",
    dest: "Pune",
    min: 1,
    max: 4,
    status: "Cancelled",
    cancelReason: "Damaged Cargo Seals",
    cancelNotes: "Container security seal compromised at toll plaza inspection.",
    cancelRequestedBy: "Arnav (Logistics Manager)",
    cancelApprovedBy: "Sourabh (Warehouse Operator)",
    cancelledAt: "15/11/2026 15:10",
    readings: [
      { temp: 3.2, time: "14:50" }
    ]
  },
  {
    id: "SHP-304",
    cargo: "Veterinary Vaccines",
    origin: "Mysuru",
    dest: "Hubballi",
    min: 2,
    max: 8,
    status: "Cancelled",
    cancelReason: "Route Diverted / Client Cancelled",
    cancelNotes: "Consignee cold warehouse flooded; order cancelled by client.",
    cancelRequestedBy: "Arnav (Logistics Manager)",
    cancelApprovedBy: "Sourabh (Warehouse Operator)",
    cancelledAt: "15/11/2026 17:30",
    readings: [
      { temp: 5.5, time: "17:15" }
    ]
  },

  // --- 2 INITIAL SPOILED QUARANTINE PACKAGES (Requirement 6) ---
  {
    id: "SHP-401",
    cargo: "Pasteurized Milk Batches",
    origin: "Belagavi",
    dest: "Hubballi",
    min: 1,
    max: 4,
    status: "Spoiled",
    spoilCause: "Severe Prolonged Thermal Breach (>2.0°C excursion)",
    spoilNotes: "Chiller compressor belt failed in transit. Core temperature climbed to 19.5°C; lactic souring verified.",
    spoilDeclaredBy: "Sourabh Verma (Warehouse Operator)",
    spoilQuarantineStatus: "Quarantined in Cold Depot Isolator",
    spoiledAt: "22/11/2026 14:15",
    readings: [
      { temp: 2.8, time: "08:00" },
      { temp: 19.5, time: "13:30" }
    ]
  },
  {
    id: "SHP-402",
    cargo: "Live Biopsy Reagents",
    origin: "Hyderabad",
    dest: "Bengaluru",
    min: 2,
    max: 8,
    status: "Spoiled",
    spoilCause: "Cargo Container Seal Rupture",
    spoilNotes: "Vial vacuum seal cracked in rough transit over Hosur highway. Active biohazard containment enforced.",
    spoilDeclaredBy: "Arnav Pratap Singh (Logistics Manager)",
    spoilQuarantineStatus: "Hazardous Biohazard Condemnation",
    spoiledAt: "23/11/2026 09:40",
    readings: [
      { temp: 4.1, time: "06:00" },
      { temp: 16.8, time: "09:00" }
    ]
  }
];

const INITIAL_CANCELLATIONS = [
  {
    id: "REQ-301",
    shipmentId: "SHP-301",
    cargo: "Seasonal Cut Fruits",
    reason: "Severe Spoilage / Thermal Shock",
    notes: "Cooling system failed near Igatpuri ghats. Ambient reached 18°C.",
    requestedBy: "Arnav (Logistics Manager)",
    resolvedBy: "Sourabh (Warehouse Operator)",
    resolvedAt: "15/11/2026 11:20",
    time: "15/11/2026 11:05",
    state: "Approved"
  },
  {
    id: "REQ-302",
    shipmentId: "SHP-302",
    cargo: "Live Bacterial Cultures",
    reason: "Refrigeration Unit Mechanical Failure",
    notes: "Compressor drive belt snapped; vehicle diverted safely to depot.",
    requestedBy: "Arnav (Logistics Manager)",
    resolvedBy: "Sourabh (Warehouse Operator)",
    resolvedAt: "15/11/2026 13:45",
    time: "15/11/2026 13:20",
    state: "Approved"
  },
  {
    id: "REQ-303",
    shipmentId: "SHP-303",
    cargo: "Imported Gourmet Butter",
    reason: "Damaged Cargo Seals",
    notes: "Container security seal compromised at toll plaza inspection.",
    requestedBy: "Arnav (Logistics Manager)",
    resolvedBy: "Sourabh (Warehouse Operator)",
    resolvedAt: "15/11/2026 15:10",
    time: "15/11/2026 14:50",
    state: "Approved"
  },
  {
    id: "REQ-304",
    shipmentId: "SHP-304",
    cargo: "Veterinary Vaccines",
    reason: "Route Diverted / Client Cancelled",
    notes: "Consignee cold warehouse flooded; order cancelled by client.",
    requestedBy: "Arnav (Logistics Manager)",
    resolvedBy: "Sourabh (Warehouse Operator)",
    resolvedAt: "15/11/2026 17:30",
    time: "15/11/2026 17:15",
    state: "Approved"
  }
];

const ALL_VIEWS = [
  "Dashboard",
  "Shipments",
  "Alerts",
  "Cancellations",
  "Delivered",
  "Cancelled",
  "Spoiled",
  "Devices",
  "Reports",
  "Settings"
];

const VIEW_METADATA = {
  Dashboard: { title: "Overview", breadcrumb: "Operations • Real-time Fleet Telemetry" },
  Shipments: { title: "Active Shipments", breadcrumb: "Fleet Operations • Live Transit Inventory" },
  Alerts: { title: "Alert Center", breadcrumb: "Thermal Excursions & Spoilage Prevention" },
  Cancellations: { title: "Approvals Queue", breadcrumb: "Two-Person Verification & Cancellation Governance" },
  Delivered: { title: "Delivered History", breadcrumb: "Completed Consignments & Compliance Log" },
  Cancelled: { title: "Cancelled Records", breadcrumb: "Terminated Shipments & Operator Approvals Archive" },
  Spoiled: { title: "Spoiled Cargo", breadcrumb: "Thermal Breach Spoilage & Quarantine Log" },
  Devices: { title: "IoT Device Fleet", breadcrumb: "Hardware Probe Health, RF Signal & Calibration" },
  Reports: { title: "Analytics & Reports", breadcrumb: "Regulatory Compliance Metrics & Audit Downloads" },
  Settings: { title: "Settings & Profile", breadcrumb: "Operator Identity & Telemetry Sensitivity Guidelines" }
};

const STORAGE_VER = "v6_spoiled_dark_sso";

/* ---------- Utility Helpers ---------- */
const $ = id => document.getElementById(id);
const nowTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const stamp = () => new Date().toLocaleDateString("en-GB") + " " + nowTime();
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));

/* ---------- Modal Controller (Bootstrap 5 + Fallback) ---------- */
function openModal(id) {
  const el = $(id);
  if (!el) return;
  try {
    if (window.bootstrap && window.bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(el).show();
      return;
    }
  } catch (err) {
    console.warn("Bootstrap modal fallback:", err);
  }
  el.classList.add("show");
  el.style.display = "block";
  el.setAttribute("aria-modal", "true");
  el.removeAttribute("aria-hidden");
}

function closeModal(id) {
  const el = $(id);
  if (!el) return;
  try {
    if (window.bootstrap && window.bootstrap.Modal) {
      const inst = bootstrap.Modal.getInstance(el);
      if (inst) inst.hide();
    }
  } catch (err) {
    // fallback
  }
  el.classList.remove("show");
  el.style.display = "none";
  el.removeAttribute("aria-modal");
  el.setAttribute("aria-hidden", "true");
  const backdrop = document.querySelector(".modal-backdrop");
  if (backdrop) backdrop.remove();
}

/* ---------- State Sanitizer & Loader ---------- */
function sanitizeShipment(s, idx) {
  if (!s || typeof s !== "object") return null;
  const id = String(s.id || `SHP-${101 + idx}`).trim();
  const cargo = String(s.cargo || s.cargoType || "Freight Cargo").trim();
  const origin = String(s.origin || s.source || "Origin Hub").trim();
  const dest = String(s.dest || s.destination || "Destination Hub").trim();
  const min = typeof s.min === "number" ? s.min : (typeof s.minTemperature === "number" ? s.minTemperature : 2.0);
  const max = typeof s.max === "number" ? s.max : (typeof s.maxTemperature === "number" ? s.maxTemperature : 8.0);
  
  let status = "Active";
  if (s.status === "Delivered") status = "Delivered";
  else if (s.status === "Cancelled") status = "Cancelled";
  else if (s.status === "Spoiled") status = "Spoiled";

  let readings = [];
  if (Array.isArray(s.readings) && s.readings.length > 0) {
    readings = s.readings.map(r => ({
      temp: typeof r.temp === "number" ? r.temp : (typeof r.temperature === "number" ? r.temperature : +(min + (max - min) / 2).toFixed(1)),
      time: String(r.time || nowTime()),
      alertDeleted: !!r.alertDeleted
    }));
  } else {
    readings = [{ temp: +(min + (max - min) / 2).toFixed(1), time: nowTime(), alertDeleted: false }];
  }

  return {
    id, cargo, origin, dest, min, max, status,
    deliveredAt: s.deliveredAt || "",
    cancelReason: s.cancelReason || "",
    cancelNotes: s.cancelNotes || "",
    cancelRequestedBy: s.cancelRequestedBy || "",
    cancelApprovedBy: s.cancelApprovedBy || "",
    cancelledAt: s.cancelledAt || "",
    spoilCause: s.spoilCause || "",
    spoilNotes: s.spoilNotes || "",
    spoilDeclaredBy: s.spoilDeclaredBy || "",
    spoilQuarantineStatus: s.spoilQuarantineStatus || "Quarantined in Isolator",
    spoiledAt: s.spoiledAt || "",
    readings
  };
}

function loadProfiles() {
  try {
    const raw = localStorage.getItem("cc_profiles");
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_PROFILES, ...parsed };
    }
  } catch (err) {
    // fallback
  }
  return { ...DEFAULT_PROFILES };
}

function loadInitialState() {
  let loadedShipments = [];
  try {
    const raw = localStorage.getItem("cc_shipments");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= 8) {
        loadedShipments = parsed.map((s, idx) => sanitizeShipment(s, idx)).filter(Boolean);
      }
    }
  } catch (err) {
    loadedShipments = [];
  }

  if (loadedShipments.length < 8) {
    loadedShipments = INITIAL_SHIPMENTS.map((s, idx) => sanitizeShipment(s, idx));
    localStorage.setItem("cc_shipments", JSON.stringify(loadedShipments));
  }

  let loadedAlerts = [];
  try {
    const rawA = localStorage.getItem("cc_alerts");
    if (rawA) {
      const parsedA = JSON.parse(rawA);
      if (Array.isArray(parsedA)) loadedAlerts = parsedA;
    }
  } catch (err) {
    loadedAlerts = [];
  }

  let loadedCancels = [];
  try {
    const rawC = localStorage.getItem("cc_cancellations");
    if (rawC) {
      const parsedC = JSON.parse(rawC);
      if (Array.isArray(parsedC)) loadedCancels = parsedC;
    }
  } catch (err) {
    loadedCancels = [];
  }
  if (!loadedCancels.length) {
    loadedCancels = INITIAL_CANCELLATIONS.map(c => ({ ...c }));
  }

  let loadedNotifications = [];
  try {
    const rawN = localStorage.getItem("cc_manager_notifications");
    if (rawN) {
      const parsedN = JSON.parse(rawN);
      if (Array.isArray(parsedN)) loadedNotifications = parsedN;
    }
  } catch (err) {
    loadedNotifications = [];
  }

  return { loadedShipments, loadedAlerts, loadedCancels, loadedNotifications };
}

const { loadedShipments, loadedAlerts, loadedCancels, loadedNotifications } = loadInitialState();
let shipments = loadedShipments;
let alerts = loadedAlerts;
let cancellations = loadedCancels;
let managerNotifications = loadedNotifications;
let PROFILES = loadProfiles();
let currentUser = loadUser();
let currentShipmentId = null;
let currentActiveView = "Dashboard";
let pendingDeleteShipmentId = null;
let activeAlertFilter = "ALL";
let seq = Date.now();

// Responsive Notification Reset Tracker (Requirement 8)
let unreadAlertCount = 0;
let unreadCancelCount = 0;
let hasViewedAlerts = false;
let hasViewedCancels = false;

// Theme tracker (Requirement 4)
let currentTheme = localStorage.getItem("cc_theme") || "light";

// Assign unique aid if missing
alerts.forEach(a => { if (!a.aid) a.aid = "ALT-" + (seq++); });

// Chart references
let overviewComplianceChartInstance = null;
let conditionDoughnutChartInstance = null;
let shipmentDetailChartInstance = null;

function latestOf(s) {
  if (!s || !Array.isArray(s.readings) || s.readings.length === 0) {
    return { temp: 0, time: "00:00" };
  }
  return s.readings[s.readings.length - 1];
}

const activeShipments = () => shipments.filter(s => s && s.status === "Active");

function loadUser() {
  try {
    const saved = localStorage.getItem("cc_user");
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (parsed && typeof parsed === "object" && parsed.email) {
      return parsed;
    }
    const targetName = typeof parsed === "string" ? parsed : (parsed && parsed.username ? parsed.username : null);
    if (!targetName) return null;
    return USERS.find(u => u.username.toLowerCase() === targetName.toLowerCase() || (u.email && u.email.toLowerCase() === targetName.toLowerCase())) || null;
  } catch (err) {
    return null;
  }
}

function saveState() {
  try {
    localStorage.setItem("cc_shipments", JSON.stringify(shipments));
    localStorage.setItem("cc_alerts", JSON.stringify(alerts));
    localStorage.setItem("cc_cancellations", JSON.stringify(cancellations));
    localStorage.setItem("cc_manager_notifications", JSON.stringify(managerNotifications));
    localStorage.setItem("cc_user", JSON.stringify(currentUser || null));
    localStorage.setItem("cc_profiles", JSON.stringify(PROFILES));
    localStorage.setItem("cc_theme", currentTheme);
    localStorage.setItem("cc_storage_ver", STORAGE_VER);
  } catch (err) {
    console.error("Storage save failed:", err);
  }
}

/* ---------- Excursion Evaluator (Normal, Warning <2.0°C, Critical >=2.0°C) ---------- */
function evaluateTemp(temp, min, max) {
  if (typeof temp !== "number" || isNaN(temp)) {
    return { status: "Normal", text: "text-secondary", delta: 0 };
  }
  if (temp >= min && temp <= max) {
    return { status: "Normal", text: "text-success", delta: 0 };
  }
  const diff = temp > max ? temp - max : min - temp;
  const isCrit = +diff.toFixed(1) >= 2.0;
  return {
    status: isCrit ? "Critical" : "Warning",
    text: isCrit ? "text-danger" : "text-warning",
    delta: +diff.toFixed(1)
  };
}

function statusPillHtml(status) {
  const icons = {
    Normal: "bi-shield-check",
    Warning: "bi-exclamation-triangle-fill",
    Critical: "bi-x-octagon-fill",
    Spoiled: "bi-radioactive"
  };
  return `<span class="status-pill status-pill-${status}"><i class="bi ${icons[status] || 'bi-info-circle'}"></i>${status}</span>`;
}

function randomReading(s) {
  const roll = Math.random();
  if (roll < 0.40) {
    return +(s.min + Math.random() * (s.max - s.min)).toFixed(1);
  }
  const isHigh = Math.random() < 0.5;
  if (roll < 0.75) {
    const diff = 0.2 + Math.random() * 1.6;
    return +(isHigh ? s.max + diff : s.min - diff).toFixed(1);
  }
  const diff = 2.0 + Math.random() * 3.0;
  return +(isHigh ? s.max + diff : s.min - diff).toFixed(1);
}

/* ===================================================================
   MAIN APPLICATION DOM CONTROLLER
   ================================================================== */
document.addEventListener("DOMContentLoaded", () => {

  // Global modal dismiss handler
  document.addEventListener("click", e => {
    const dismissBtn = e.target.closest("[data-bs-dismiss='modal']");
    if (dismissBtn) {
      const modalEl = dismissBtn.closest(".modal");
      if (modalEl) closeModal(modalEl.id);
    }
  });

  // Date banner update
  const dateEl = $("liveClockDate");
  if (dateEl) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('en-GB', options);
  }

  // Initialize Theme (Requirement 4)
  function applyTheme(theme) {
    currentTheme = theme;
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if ($("themeToggleIcon")) $("themeToggleIcon").className = "bi bi-sun";
    } else {
      document.documentElement.removeAttribute("data-theme");
      if ($("themeToggleIcon")) $("themeToggleIcon").className = "bi bi-moon-stars";
    }
    saveState();
    if (overviewComplianceChartInstance || conditionDoughnutChartInstance) {
      renderCharts(activeShipments(), 0, 0, 0, true);
    }
  }

  applyTheme(currentTheme);

  const toggleTheme = () => applyTheme(currentTheme === "dark" ? "light" : "dark");
  if ($("btnThemeToggle")) $("btnThemeToggle").onclick = toggleTheme;
  if ($("btnSettingsThemeToggle")) $("btnSettingsThemeToggle").onclick = toggleTheme;

  function runEvaluation() {
    activeShipments().forEach(s => {
      const latest = latestOf(s);
      const res = evaluateTemp(latest.temp, s.min, s.max);
      const exists = alerts.some(a => a.id === s.id && a.temp === latest.temp && a.time === latest.time);
      if (res.status !== "Normal" && !latest.alertDeleted && !exists) {
        alerts.unshift({
          aid: "ALT-" + (seq++),
          id: s.id,
          cargo: s.cargo,
          temp: latest.temp,
          status: res.status,
          time: latest.time,
          state: "Active",
          requested: false,
          requestNote: ""
        });
        if (currentActiveView !== "Alerts") {
          hasViewedAlerts = false; // new unread alert
        }
      }
    });
    saveState();
  }

  /* ---------- Authentication State & Profiles ---------- */
  function getUserProfile(user = currentUser) {
    if (!user) return null;
    const emailKey = (user.email || "").toLowerCase();
    const userKey = (user.username || "").toLowerCase();
    return PROFILES[emailKey] || PROFILES[userKey] || DEFAULT_PROFILES[user.username] || DEFAULT_PROFILES.dhairyaps2009 || {
      username: user.username || "User",
      name: user.name || "Operations Officer",
      role: user.role || "Logistics Manager",
      badgeClass: user.role === "Logistics Manager" ? "bg-primary" : "bg-teal text-white",
      email: user.email || "",
      phone: "+91 98765 00000",
      station: user.role === "Logistics Manager" ? "Bengaluru Command Center (HQ)" : "Bengaluru Depot Terminal (Bay 4B)",
      duty: "Cold-chain supervision & GxP governance",
      photo: user.avatar || ""
    };
  }

  function updateProfileUI() {
    if (!currentUser) return;
    const prof = getUserProfile(currentUser);

    $("navUserName").textContent = prof.name;
    $("welcomeUserName").textContent = (prof.name || "Officer").split(" ")[0];
    $("userRoleBadge").textContent = prof.role;

    // Render avatar: photo image or initial circle
    const avatarContainer = $("sidebarAvatarContainer");
    if (avatarContainer) {
      const avatarSrc = prof.photo || currentUser.avatar;
      if (avatarSrc) {
        avatarContainer.innerHTML = `<img src="${avatarSrc}" alt="${esc(prof.name)}" class="profile-avatar-img">`;
      } else {
        avatarContainer.innerHTML = `<span id="sidebarAvatarInitial">${(prof.name || "U").charAt(0).toUpperCase()}</span>`;
      }
    }
  }

  function setAuth(user) {
    currentUser = user;
    saveState();
    if (user) {
      $("loginSection").classList.add("d-none");
      $("appSection").classList.remove("d-none");

      updateProfileUI();

      // If manager logs in while on Cancellations view, switch to Dashboard
      if (user.role !== "Warehouse Operator" && currentActiveView === "Cancellations") {
        currentActiveView = "Dashboard";
      }

      switchView(currentActiveView);
    } else {
      $("loginSection").classList.remove("d-none");
      $("appSection").classList.add("d-none");
      try {
        if (window.google && window.google.accounts && window.google.accounts.id) {
          window.google.accounts.id.disableAutoSelect();
        }
      } catch (err) {
        console.warn("Google auto-select disable note:", err);
      }
    }
  }

  /* ---------- Google OAuth 2.0 & Role Onboarding Engine ---------- */
  let pendingOnboardingUser = null;

  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.warn("JWT parse exception:", e);
      return null;
    }
  }

  function handleGoogleLogin(email, name, photoUrl) {
    const normEmail = (email || "").trim().toLowerCase();
    if (!normEmail) return;

    // 1. Check pre-mapped operational roles
    if (PREMAPPED_ROLES[normEmail]) {
      const mapped = PREMAPPED_ROLES[normEmail];
      const userObj = {
        username: mapped.name.replace(/\s+/g, ""),
        name: name || mapped.name,
        role: mapped.role,
        email: normEmail,
        avatar: photoUrl || ""
      };
      if (!PROFILES[normEmail]) {
        PROFILES[normEmail] = {
          username: userObj.username,
          name: userObj.name,
          role: userObj.role,
          badgeClass: userObj.role === "Logistics Manager" ? "bg-primary" : "bg-teal text-white",
          email: normEmail,
          phone: "+91 98765 43210",
          station: mapped.station,
          duty: userObj.role === "Logistics Manager" ? "Fleet oversight, route dispatch & thermal regulation" : "In-bound receiving & physical inspection",
          photo: photoUrl || ""
        };
      }
      setAuth(userObj);
      return;
    }

    // 2. Check if this email already registered previously
    if (PROFILES[normEmail] && PROFILES[normEmail].role) {
      const savedProf = PROFILES[normEmail];
      const userObj = {
        username: savedProf.username || (name || normEmail.split("@")[0]).replace(/\s+/g, ""),
        name: name || savedProf.name,
        role: savedProf.role,
        email: normEmail,
        avatar: photoUrl || savedProf.photo || ""
      };
      setAuth(userObj);
      return;
    }

    // 3. New Google Account -> Trigger Role Onboarding Dialog
    pendingOnboardingUser = {
      email: normEmail,
      name: name || normEmail.split("@")[0],
      photo: photoUrl || ""
    };

    $("onboardingUserName").textContent = pendingOnboardingUser.name;
    $("onboardingUserEmail").textContent = pendingOnboardingUser.email;
    const avatarEl = $("onboardingUserAvatar");
    if (photoUrl) {
      avatarEl.innerHTML = `<img src="${photoUrl}" alt="${esc(pendingOnboardingUser.name)}" class="w-100 h-100 rounded-circle" style="object-fit: cover;">`;
    } else {
      avatarEl.textContent = (pendingOnboardingUser.name || "U").charAt(0).toUpperCase();
    }

    openModal("roleSelectionModal");
  }

  function handleOnboardingComplete(selectedRole) {
    if (!pendingOnboardingUser) return;
    const normEmail = pendingOnboardingUser.email;
    const userObj = {
      username: pendingOnboardingUser.name.replace(/\s+/g, ""),
      name: pendingOnboardingUser.name,
      role: selectedRole,
      email: normEmail,
      avatar: pendingOnboardingUser.photo || ""
    };

    PROFILES[normEmail] = {
      username: userObj.username,
      name: userObj.name,
      role: userObj.role,
      badgeClass: selectedRole === "Logistics Manager" ? "bg-primary" : "bg-teal text-white",
      email: normEmail,
      phone: "+91 98765 00000",
      station: selectedRole === "Logistics Manager" ? "Bengaluru Command Center (HQ)" : "Bengaluru Depot Terminal (Bay 4B)",
      duty: selectedRole === "Logistics Manager" ? "Fleet oversight, route dispatch & thermal regulation" : "In-bound receiving & physical inspection",
      photo: userObj.avatar
    };

    closeModal("roleSelectionModal");
    pendingOnboardingUser = null;
    setAuth(userObj);
  }

  // Role Selection Options
  $("optSelectLogisticsManager").onclick = () => handleOnboardingComplete("Logistics Manager");
  $("optSelectWarehouseOperator").onclick = () => handleOnboardingComplete("Warehouse Operator");
  $("btnCancelOnboarding").onclick = () => {
    closeModal("roleSelectionModal");
    pendingOnboardingUser = null;
  };

  // Google GIS Token Callback
  function handleGoogleCredentialResponse(response) {
    if (!response || !response.credential) return;
    const payload = parseJwt(response.credential);
    if (payload && payload.email) {
      handleGoogleLogin(payload.email, payload.name, payload.picture);
    }
  }

  // Initialize Google Identity Services (GIS)
  function initGoogleAuth() {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        const btnContainer = $("googleButtonContainer");
        if (btnContainer) {
          window.google.accounts.id.renderButton(btnContainer, {
            theme: document.documentElement.getAttribute("data-theme") === "dark" ? "filled_black" : "outline",
            size: "large",
            type: "standard",
            text: "continue_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: 320
          });
        }
      } catch (e) {
        console.warn("GIS initialization notice:", e);
      }
    }
  }

  initGoogleAuth();
  window.addEventListener("load", initGoogleAuth);

  // Button Listeners for Google Sign-In
  $("btnContinueWithGoogle").onclick = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      try { window.google.accounts.id.prompt(); } catch (err) {}
    }
    openModal("googleLoginModal");
  };

  $("quickAccountDhairya").onclick = () => {
    handleGoogleLogin("dhairyaps2009@gmail.com", "Dhairya", "");
  };

  $("quickAccountSourabh").onclick = () => {
    handleGoogleLogin("sourabhjeevan0794@gmail.com", "Sourabh Jeevan", "");
  };

  $("btnCustomGoogleEmail").onclick = () => {
    openModal("customEmailLoginModal");
  };

  $("googleAccountDhairya").onclick = () => {
    closeModal("googleLoginModal");
    handleGoogleLogin("dhairyaps2009@gmail.com", "Dhairya", "");
  };

  $("googleAccountSourabh").onclick = () => {
    closeModal("googleLoginModal");
    handleGoogleLogin("sourabhjeevan0794@gmail.com", "Sourabh Jeevan", "");
  };

  $("googleAccountArnav").onclick = () => {
    closeModal("googleLoginModal");
    handleGoogleLogin("arnavpratap60@gmail.com", "Arnav Pratap Singh", "");
  };

  $("btnModalUseAnotherGoogle").onclick = () => {
    closeModal("googleLoginModal");
    openModal("customEmailLoginModal");
  };

  $("customEmailLoginForm").onsubmit = (e) => {
    e.preventDefault();
    const email = $("customGoogleEmailInput").value.trim();
    const name = $("customGoogleNameInput").value.trim();
    if (!email || !email.includes("@")) {
      $("customEmailError").classList.remove("d-none");
      return;
    }
    $("customEmailError").classList.add("d-none");
    closeModal("customEmailLoginModal");
    handleGoogleLogin(email, name, "");
  };

  $("btnLogout").onclick = () => setAuth(null);

  /* ---------- Mobile Drawer Sidebar ---------- */
  const sidebar = $("appSidebar");
  const overlay = $("mobileOverlay");
  $("openSidebarBtn").onclick = () => {
    sidebar.classList.add("mobile-open");
    overlay.classList.add("active");
  };
  $("closeSidebarBtn").onclick = () => {
    sidebar.classList.remove("mobile-open");
    overlay.classList.remove("active");
  };
  overlay.onclick = () => {
    sidebar.classList.remove("mobile-open");
    overlay.classList.remove("active");
  };

  /* ---------- Responsive Editable Profile Management ---------- */
  function openUserProfileModal() {
    if (!currentUser) return;
    const prof = getUserProfile(currentUser);

    $("profModalName").textContent = prof.name;
    $("profModalRole").textContent = prof.role;
    $("profModalDuty").textContent = prof.duty || "Cold-chain logistics governance";

    // Set Avatar in Modal
    const modalAvatar = $("modalProfileAvatar");
    if (modalAvatar) {
      modalAvatar.src = prof.photo || currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(prof.name)}`;
    }

    const detailsList = $("profModalDetailsList");
    if (detailsList) {
      detailsList.innerHTML = `
        <dt class="col-4 text-secondary fw-semibold mb-2">Google Email</dt>
        <dd class="col-8 mb-2 text-dark font-monospace">${esc(prof.email || currentUser.email || "—")}</dd>
        <dt class="col-4 text-secondary fw-semibold mb-2">Phone</dt>
        <dd class="col-8 mb-2 text-dark font-monospace">${esc(prof.phone || "—")}</dd>
        <dt class="col-4 text-secondary fw-semibold mb-2">Station / Hub</dt>
        <dd class="col-8 mb-2 text-dark font-monospace">${esc(prof.station || "—")}</dd>
      `;
    }

    // Reset to view mode
    $("profileViewMode").classList.remove("d-none");
    $("modalProfileEditForm").classList.add("d-none");

    openModal("userProfileModal");
  }

  $("userProfileChip").onclick = openUserProfileModal;

  // Toggle edit profile mode inside modal
  $("btnToggleProfileEdit").onclick = () => {
    const prof = getUserProfile(currentUser);
    $("modalEditName").value = prof.name;
    $("modalEditEmail").value = prof.email || currentUser.email;
    $("modalEditPhone").value = prof.phone || "";
    $("modalEditStation").value = prof.station || "";
    $("modalEditAvatarPreview").src = prof.photo || currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(prof.name)}`;

    $("profileViewMode").classList.add("d-none");
    $("modalProfileEditForm").classList.remove("d-none");
  };

  $("btnCancelProfileEdit").onclick = () => {
    $("profileViewMode").classList.remove("d-none");
    $("modalProfileEditForm").classList.add("d-none");
  };

  // Photo upload handling (FileReader to base64)
  function handlePhotoUpload(fileInput, previewImgElement, targetUser) {
    const file = fileInput.files && fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        previewImgElement.src = dataUrl;
        if (currentUser) {
          currentUser.avatar = dataUrl;
          const key = (currentUser.email || currentUser.username || "").toLowerCase();
          const prof = getUserProfile(currentUser);
          prof.photo = dataUrl;
          PROFILES[key] = prof;
          PROFILES[currentUser.username] = prof;
          saveState();
          updateProfileUI();
        }
      };
      reader.readAsDataURL(file);
    }
  }

  $("modalPhotoUpload").onchange = (e) => {
    if (currentUser) handlePhotoUpload(e.target, $("modalEditAvatarPreview"), currentUser);
  };

  $("settingsPhotoUpload").onchange = (e) => {
    if (currentUser) handlePhotoUpload(e.target, $("settingsAvatarPreview"), currentUser);
  };

  // Save profile from Modal
  $("modalProfileEditForm").onsubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const prof = getUserProfile(currentUser);
    prof.name = $("modalEditName").value.trim();
    prof.email = $("modalEditEmail").value.trim();
    prof.phone = $("modalEditPhone").value.trim();
    prof.station = $("modalEditStation").value.trim();
    currentUser.name = prof.name;
    currentUser.email = prof.email;

    const key = (currentUser.email || currentUser.username || "").toLowerCase();
    PROFILES[key] = prof;
    PROFILES[currentUser.username] = prof;
    saveState();
    updateProfileUI();
    openUserProfileModal(); // Refresh modal view
  };

  // Save profile from Settings view
  $("settingsProfileForm").onsubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const prof = getUserProfile(currentUser);
    prof.name = $("settingsNameInput").value.trim();
    prof.email = $("settingsEmailInput").value.trim();
    prof.phone = $("settingsPhoneInput").value.trim();
    prof.station = $("settingsStationInput").value.trim();
    prof.duty = $("settingsDutyInput").value.trim();
    currentUser.name = prof.name;
    currentUser.email = prof.email;

    const key = (currentUser.email || currentUser.username || "").toLowerCase();
    PROFILES[key] = prof;
    PROFILES[currentUser.username] = prof;
    saveState();
    updateProfileUI();
    alert("Profile settings saved successfully!");
  };

  /* ---------- Master Navigation Switcher & Responsive Badge Reset (Requirement 8) ---------- */
  function switchView(name) {
    if (!ALL_VIEWS.includes(name)) name = "Dashboard";

    // Requirement 8: When leaving Alert section or Cancellations section, reset badge to zero!
    if (currentActiveView === "Alerts" && name !== "Alerts") {
      hasViewedAlerts = true;
    }
    if (currentActiveView === "Cancellations" && name !== "Cancellations") {
      hasViewedCancels = true;
    }

    currentActiveView = name;

    // If currently ON the section, mark as viewed so leaving resets it
    if (name === "Alerts") hasViewedAlerts = true;
    if (name === "Cancellations") hasViewedCancels = true;

    // Close mobile sidebar if open
    sidebar.classList.remove("mobile-open");
    overlay.classList.remove("active");

    // Update Topbar Title & Breadcrumb
    const meta = VIEW_METADATA[name] || { title: name, breadcrumb: "Operations" };
    $("topbarViewTitle").textContent = meta.title;
    $("topbarBreadcrumb").textContent = meta.breadcrumb;

    // Toggle view visibility
    ALL_VIEWS.forEach(v => {
      const viewEl = $("view" + v);
      const navBtn = $("nav" + v);
      if (viewEl) viewEl.classList.toggle("d-none", v !== name);
      if (navBtn) navBtn.classList.toggle("active", v === name);
    });

    renderAll();
  }

  // Bind Sidebar Nav Buttons
  ALL_VIEWS.forEach(v => {
    const btn = $("nav" + v);
    if (btn) btn.onclick = () => switchView(v);
  });

  $("btnQuickViewAllShipments").onclick = () => switchView("Shipments");
  $("kpiCriticalCard").onclick = () => switchView("Alerts");
  $("kpiCriticalCard").onkeydown = (e) => { if (e.key === "Enter") switchView("Alerts"); };

  /* ---------- Master Render Pipeline ---------- */
  function renderAll() {
    runEvaluation();
    updateBadges();
    renderOverview();
    renderShipmentsTable();
    renderAlerts();
    renderRequests();
    renderDelivered();
    renderCancelled();
    renderSpoiled();
    renderDevices();
    renderSettings();
  }

  /* ---------- Responsive Notification Badge Logic (Requirement 8) ---------- */
  function updateBadges() {
    // 1. Alerts Badge: If user viewed Alerts and is on another section, show 0!
    const activeAlertsCount = alerts.filter(a => a.state !== "Resolved").length;
    if (hasViewedAlerts && currentActiveView !== "Alerts") {
      $("navAlertsBadge").textContent = "0";
    } else {
      $("navAlertsBadge").textContent = activeAlertsCount;
    }

    // 2. Cancellation Queue Badge: If viewed and not on Cancellations, show 0!
    const pendingCancelCount = cancellations.filter(c => c.state === "Pending").length;
    if (hasViewedCancels && currentActiveView !== "Cancellations") {
      $("navCancelBadge").textContent = "0";
    } else {
      $("navCancelBadge").textContent = pendingCancelCount;
    }

    // 3. Other section badges
    $("sidebarShipmentsBadge").textContent = activeShipments().length;
    $("navDeliveredBadge").textContent = shipments.filter(s => s.status === "Delivered").length;
    $("navCancelledBadge").textContent = shipments.filter(s => s.status === "Cancelled").length;
    $("navSpoiledBadge").textContent = shipments.filter(s => s.status === "Spoiled").length;
  }

  /* ---------- Manager Notifications Banner (Clean Card) ---------- */
  function renderManagerNotifications() {
    const container = $("managerNotificationsContainer");
    if (!container) return;

    const isManager = currentUser && currentUser.role === "Logistics Manager";
    if (!isManager || !managerNotifications || managerNotifications.length === 0) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = `
      <div class="card border-0 shadow-sm mb-4" style="background: var(--cc-card-bg); border: 1px solid var(--cc-border) !important; border-radius: var(--cc-radius-md);">
        <div class="card-header bg-card py-2 px-3 d-flex justify-content-between align-items-center" style="border-bottom: 1px solid var(--cc-border);">
          <div class="fw-bold text-dark d-flex align-items-center gap-2 small">
            <i class="bi bi-bell-fill text-primary fs-6"></i>
            <span>Warehouse Operator Cancellation Decisions Dispatch</span>
            <span class="badge bg-primary rounded-pill">${managerNotifications.length}</span>
          </div>
          <button class="btn btn-sm btn-link text-decoration-none text-muted py-0 small" onclick="clearAllManagerNotifications()">
            <i class="bi bi-check2-all me-1"></i>Dismiss All
          </button>
        </div>
        <div class="card-body p-2">
          ${managerNotifications.map(n => {
            const isApproved = n.type === "Approved";
            return `
              <div class="alert ${isApproved ? "alert-success border-success" : "alert-danger border-danger"} d-flex justify-content-between align-items-start py-2 px-3 mb-2 shadow-xs" style="border-radius: 8px;">
                <div class="d-flex align-items-start gap-2">
                  <i class="bi ${isApproved ? "bi-check-circle-fill text-success" : "bi-x-circle-fill text-danger"} fs-5 mt-1"></i>
                  <div>
                    <div class="fw-bold ${isApproved ? "text-success" : "text-danger"}">${esc(n.title)}</div>
                    <div class="text-dark small">${esc(n.message)}</div>
                    <div class="text-muted" style="font-size: 0.72rem;">${esc(n.time)}</div>
                  </div>
                </div>
                <button type="button" class="btn btn-sm btn-link text-secondary p-0 ms-2" onclick="dismissManagerNotification('${n.id}')" title="Dismiss">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  window.dismissManagerNotification = (id) => {
    managerNotifications = managerNotifications.filter(n => n.id !== id);
    saveState();
    renderAll();
  };

  window.clearAllManagerNotifications = () => {
    managerNotifications = [];
    saveState();
    renderAll();
  };

  /* ---------- Overview Dashboard & Charts ---------- */
  function renderOverview() {
    renderManagerNotifications();

    let normal = 0, warn = 0, crit = 0;
    const active = activeShipments();

    active.forEach(s => {
      const cond = evaluateTemp(latestOf(s).temp, s.min, s.max);
      if (cond.status === "Normal") normal++;
      if (cond.status === "Warning") warn++;
      if (cond.status === "Critical") crit++;
    });

    $("statTotal").textContent = active.length;
    $("statNormal").textContent = normal;
    $("statWarning").textContent = warn;
    $("statCritical").textContent = crit;

    // Quick Freight Snapshot Table (First 5 active packages)
    const quickRows = active.slice(0, 5).map(s => {
      const latest = latestOf(s);
      const cond = evaluateTemp(latest.temp, s.min, s.max);
      return `
        <tr>
          <td class="fw-bold font-monospace text-primary"><i class="bi bi-upc-scan me-1 text-muted"></i>${esc(s.id)}</td>
          <td><strong>${esc(s.cargo)}</strong></td>
          <td class="small text-muted">${esc(s.origin)} <i class="bi bi-arrow-right text-muted mx-1"></i> ${esc(s.dest)}</td>
          <td class="font-monospace small">${s.min}°C to ${s.max}°C</td>
          <td class="fw-bold font-monospace ${cond.text}">${latest.temp > 0 ? "+" : ""}${latest.temp}°C</td>
          <td>${statusPillHtml(cond.status)}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-crm-outline py-0" onclick="showDetails('${s.id}')">
              Diagnostics
            </button>
          </td>
        </tr>
      `;
    });

    $("dashboardQuickTableBody").innerHTML = quickRows.join("") ||
      `<tr><td colspan="7" class="text-center text-muted py-3">No active refrigerated freight registered.</td></tr>`;

    renderCharts(active, normal, warn, crit);
  }

  function renderCharts(active, normal, warn, crit, forceUpdate = false) {
    if (!window.Chart) return;

    const isDark = currentTheme === "dark";
    const gridColor = isDark ? "#334155" : "#F1F5F9";
    const textColor = isDark ? "#94A3B8" : "#64748B";

    // 1. Temperature Compliance Chart
    const ctxOverview = document.getElementById("overviewComplianceChart");
    if (ctxOverview) {
      const labels = active.map(s => s.id);
      const currentTemps = active.map(s => latestOf(s).temp);
      const minBounds = active.map(s => s.min);
      const maxBounds = active.map(s => s.max);

      if (overviewComplianceChartInstance) {
        overviewComplianceChartInstance.destroy();
      }

      overviewComplianceChartInstance = new Chart(ctxOverview, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Current Reading (°C)",
              data: currentTemps,
              borderColor: "#3478F6",
              backgroundColor: "rgba(52, 120, 246, 0.15)",
              borderWidth: 2.5,
              tension: 0.3,
              pointRadius: 5,
              pointBackgroundColor: "#3478F6",
              fill: true
            },
            {
              label: "Max Safe Limit (°C)",
              data: maxBounds,
              borderColor: "#C2413B",
              borderDash: [5, 5],
              borderWidth: 1.5,
              pointRadius: 0,
              fill: false
            },
            {
              label: "Min Safe Limit (°C)",
              data: minBounds,
              borderColor: "#17845D",
              borderDash: [5, 5],
              borderWidth: 1.5,
              pointRadius: 0,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: { font: { family: "Inter", size: 11 }, color: textColor, boxWidth: 12 }
            },
            tooltip: {
              backgroundColor: isDark ? "#1E293B" : "#0F172A",
              titleFont: { family: "Inter" },
              bodyFont: { family: "Inter" }
            }
          },
          scales: {
            y: {
              title: { display: true, text: "Degrees Celsius (°C)", font: { family: "Inter", size: 10 }, color: textColor },
              grid: { color: gridColor },
              ticks: { color: textColor }
            },
            x: {
              grid: { display: false },
              ticks: { color: textColor }
            }
          }
        }
      });
    }

    // 2. Condition Doughnut Chart
    const ctxDoughnut = document.getElementById("conditionDoughnutChart");
    if (ctxDoughnut) {
      if (conditionDoughnutChartInstance) {
        conditionDoughnutChartInstance.destroy();
      }

      const total = normal + warn + crit;
      const normalPct = total > 0 ? Math.round((normal / total) * 100) : 100;
      $("conditionDoughnutSummary").innerHTML = `<strong>${normalPct}%</strong> of active freight is within safe bounds.`;

      conditionDoughnutChartInstance = new Chart(ctxDoughnut, {
        type: "doughnut",
        data: {
          labels: ["Compliant", "Warning Margin", "Critical Excursion"],
          datasets: [
            {
              data: [normal, warn, crit],
              backgroundColor: ["#17845D", "#B7791F", "#C2413B"],
              borderWidth: 2,
              borderColor: isDark ? "#1E293B" : "#FFFFFF"
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: {
              position: "bottom",
              labels: { font: { family: "Inter", size: 11 }, color: textColor, boxWidth: 10 }
            }
          }
        }
      });
    }
  }

  /* ---------- Full Shipments Table with Search, Filter & Role Controls ---------- */
  function renderShipmentsTable() {
    const q = ($("searchInput") ? $("searchInput").value : "").trim().toLowerCase();
    const statusFilter = $("statusFilter") ? $("statusFilter").value : "ALL";
    const cargoFilter = $("cargoFilter") ? $("cargoFilter").value : "ALL";

    const isOperator = currentUser && currentUser.role === "Warehouse Operator";
    const isManager = currentUser && currentUser.role === "Logistics Manager";

    const filtered = activeShipments().filter(s => {
      const latest = latestOf(s);
      const cond = evaluateTemp(latest.temp, s.min, s.max);

      const matchSearch = (s.id + " " + s.cargo + " " + s.origin + " " + s.dest).toLowerCase().includes(q);
      if (!matchSearch) return false;

      if (statusFilter !== "ALL" && cond.status !== statusFilter) return false;

      if (cargoFilter === "Vaccines" && !s.cargo.toLowerCase().includes("vaccine") && !s.cargo.toLowerCase().includes("biologics")) return false;
      if (cargoFilter === "Produce" && !s.cargo.toLowerCase().includes("produce") && !s.cargo.toLowerCase().includes("chocolates")) return false;
      if (cargoFilter === "Dairy" && !s.cargo.toLowerCase().includes("dairy") && !s.cargo.toLowerCase().includes("seafood") && !s.cargo.toLowerCase().includes("poultry")) return false;

      return true;
    });

    if ($("shipmentCountSummary")) {
      $("shipmentCountSummary").textContent = `Showing ${filtered.length} active consignments`;
    }

    const rows = filtered.map(s => {
      const latest = latestOf(s);
      const cond = evaluateTemp(latest.temp, s.min, s.max);
      const hasPendingCancel = cancellations.some(c => c.shipmentId === s.id && c.state === "Pending");

      let actionButtons = `
        <button class="btn btn-sm btn-crm-outline py-0" onclick="showDetails('${s.id}')" title="View Diagnostics & Telemetry Chart">
          Diagnostics
        </button>
      `;

      // Declare Spoiled option for critical/high excursions (Requirement 6)
      if (cond.status === "Critical") {
        actionButtons += `
          <button class="btn btn-sm btn-outline-danger py-0 ms-1" onclick="openDeclareSpoiledModal('${s.id}')" title="Quarantine / Declare Spoiled">
            <i class="bi bi-radioactive"></i>
          </button>
        `;
      }

      // Mark Delivered ONLY for Warehouse Operator
      if (isOperator) {
        actionButtons += `
          <button class="btn btn-sm btn-outline-success py-0 ms-1" onclick="markDelivered('${s.id}')" title="Mark Consignment as Delivered">
            <i class="bi bi-check-lg me-1"></i>Delivered
          </button>
        `;
      }

      // Cancel Request and Delete ONLY for Logistics Manager
      if (isManager) {
        if (hasPendingCancel) {
          actionButtons += `
            <button class="btn btn-sm btn-outline-secondary py-0 ms-1 disabled" disabled title="Cancellation request pending Warehouse Operator approval">
              <i class="bi bi-hourglass-split"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger py-0 ms-1" onclick="promptDeleteShipment('${s.id}')" title="Security Delete Consignment">
              <i class="bi bi-trash"></i>
            </button>
          `;
        } else {
          actionButtons += `
            <button class="btn btn-sm btn-outline-warning py-0 ms-1 text-dark" onclick="openCancelModal('${s.id}')" title="Request Shipment Cancellation">
              <i class="bi bi-x-circle"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger py-0 ms-1" onclick="promptDeleteShipment('${s.id}')" title="Security Delete Consignment">
              <i class="bi bi-trash"></i>
            </button>
          `;
        }
      }

      const cancelPendingBadge = hasPendingCancel ? `
        <span class="badge bg-warning text-dark border ms-1" title="Cancellation request pending Warehouse Operator approval">
          <i class="bi bi-hourglass-split me-1"></i>Cancel Pending
        </span>
      ` : "";

      return `
        <tr>
          <td class="fw-bold font-monospace text-primary">
            <i class="bi bi-upc-scan me-1 text-muted"></i>${esc(s.id)}
          </td>
          <td><strong>${esc(s.cargo)}</strong></td>
          <td class="small text-muted">${esc(s.origin)} <i class="bi bi-arrow-right text-muted mx-1"></i> ${esc(s.dest)}</td>
          <td class="font-monospace small">${s.min}°C to ${s.max}°C</td>
          <td class="fw-bold font-monospace ${cond.text}">${latest.temp > 0 ? "+" : ""}${latest.temp}°C</td>
          <td>${statusPillHtml(cond.status)}${cancelPendingBadge}</td>
          <td class="text-end text-nowrap">${actionButtons}</td>
        </tr>
      `;
    });

    $("shipmentTableBody").innerHTML = rows.join("") ||
      `<tr><td colspan="7" class="text-center text-muted py-4">No active shipments match the selected filters.</td></tr>`;
  }

  /* ---------- Alert Center View with Dual-Role Notifications (Requirement 7) ---------- */
  function renderAlerts() {
    const criticalCount = alerts.filter(a => a.status === "Critical" && a.state !== "Resolved").length;
    const warningCount = alerts.filter(a => a.status === "Warning" && a.state !== "Resolved").length;
    const requestCount = alerts.filter(a => (a.requested || a.type === "NewShipment") && a.state !== "Resolved").length;
    const resolvedCount = alerts.filter(a => a.state === "Resolved").length;

    $("alertStatCritical").textContent = criticalCount;
    $("alertStatWarning").textContent = warningCount;
    $("alertStatRequests").textContent = requestCount;
    $("alertStatResolved").textContent = resolvedCount;

    const isOperator = currentUser && currentUser.role === "Warehouse Operator";
    const isManager = currentUser && currentUser.role === "Logistics Manager";

    const filteredAlerts = alerts.filter(a => {
      if (activeAlertFilter === "Critical") return a.status === "Critical" && a.state !== "Resolved";
      if (activeAlertFilter === "Warning") return a.status === "Warning" && a.state !== "Resolved";
      if (activeAlertFilter === "Cancellations") return a.type === "Cancellation";
      if (activeAlertFilter === "Resolved") return a.state === "Resolved";
      return true; // ALL
    });

    $("alertsList").innerHTML = filteredAlerts.map(a => {
      // 1. New Consignment Dispatch Notice (Requirement 7 - visible to both roles!)
      if (a.type === "NewShipment") {
        return `
          <div class="alert-card-v2 NewShipment">
            <div class="d-flex flex-wrap justify-content-between align-items-start gap-2">
              <div class="d-flex align-items-start gap-3">
                <i class="bi bi-box-arrow-in-right text-primary fs-4 mt-1"></i>
                <div>
                  <div class="d-flex align-items-center gap-2 mb-1">
                    <strong class="fs-6 font-monospace text-dark">${esc(a.id)}</strong>
                    <span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25">New Consignment</span>
                    <span class="badge ${a.state === 'Resolved' ? 'bg-secondary' : 'bg-success'}">${a.state === 'Resolved' ? 'Acknowledged' : 'Active Notice'}</span>
                  </div>
                  <div class="fw-semibold text-primary mb-1">${esc(a.title)}</div>
                  <div class="text-dark small mb-1">${esc(a.message)}</div>
                  <div class="small text-muted">
                    <i class="bi bi-broadcast me-1"></i>Telemetry started at: <strong>${esc(a.time)}</strong> | Dispatched by: <strong>${esc(a.resolvedBy || "System")}</strong>
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center gap-1">
                ${a.state !== "Resolved" ? `
                  <button class="btn btn-sm btn-crm-outline" onclick="acknowledgeAlert('${a.aid}')">
                    <i class="bi bi-check2 me-1"></i>Acknowledge
                  </button>
                ` : '<span class="badge bg-secondary">Read</span>'}
                <button class="btn btn-sm btn-outline-danger py-1" onclick="deleteAlert('${a.aid}')" title="Delete Notice">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }

      // 2. Cancellation Decision Notice
      if (a.type === "Cancellation") {
        const isApproved = a.decision === "Approved";
        return `
          <div class="alert-card-v2 Cancellation ${isApproved ? 'border-success' : 'border-danger'}">
            <div class="d-flex flex-wrap justify-content-between align-items-start gap-2">
              <div class="d-flex align-items-start gap-3">
                <i class="bi ${isApproved ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'} fs-4 mt-1"></i>
                <div>
                  <div class="d-flex align-items-center gap-2 mb-1">
                    <strong class="fs-6 font-monospace text-dark">${esc(a.id)}</strong>
                    ${a.cargo ? `<span class="badge bg-light text-dark border">${esc(a.cargo)}</span>` : ""}
                    <span class="badge ${isApproved ? 'bg-success' : 'bg-danger'}">${esc(a.decision)}</span>
                    <span class="badge ${a.state === 'Resolved' ? 'bg-secondary' : 'bg-primary'}">${a.state === 'Resolved' ? 'Acknowledged' : 'New Notice'}</span>
                  </div>
                  <div class="fw-semibold ${isApproved ? 'text-success' : 'text-danger'} mb-1">${esc(a.title)}</div>
                  <div class="text-dark small mb-1">${esc(a.message)}</div>
                  <div class="small text-muted">
                    <i class="bi bi-person-check me-1"></i>Decision authority: <strong>${esc(a.resolvedBy || "Warehouse Operator")}</strong> | <i class="bi bi-clock me-1"></i>${esc(a.time)}
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center gap-1">
                ${a.state !== "Resolved" ? `
                  <button class="btn btn-sm btn-crm-outline" onclick="acknowledgeAlert('${a.aid}')">
                    <i class="bi bi-check2 me-1"></i>Acknowledge
                  </button>
                ` : '<span class="badge bg-secondary">Read</span>'}
                <button class="btn btn-sm btn-outline-danger py-1" onclick="deleteAlert('${a.aid}')" title="Delete Notice">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }

      // 3. Standard Temperature Excursion Alert
      const isResolved = a.state === "Resolved";

      const managerNotificationHtml = (isManager && a.requested && !isResolved) ? `
        <div class="alert alert-warning py-2 px-3 my-2 small d-flex align-items-center gap-2 border-warning rounded-3">
          <i class="bi bi-envelope-exclamation-fill text-danger fs-5"></i>
          <div>
            <strong>Warehouse Operator Notice:</strong> Package is in <span class="text-danger fw-bold">${esc(a.status)}</span> condition. Immediate regulation requested.
          </div>
        </div>
      ` : "";

      let actionControlHtml = "";
      if (!isResolved) {
        if (isOperator) {
          if (!a.requested) {
            actionControlHtml = `
              <button class="btn btn-sm btn-warning py-1" onclick="sendAlertRequest('${a.aid}')" title="Dispatch alert notice to Logistics Manager">
                <i class="bi bi-send me-1"></i>Send Request
              </button>
            `;
          } else {
            actionControlHtml = `
              <span class="badge bg-warning text-dark border p-2">
                <i class="bi bi-check2-circle me-1"></i>Request Dispatched
              </span>
            `;
          }
        } else if (isManager) {
          actionControlHtml = `
            <button class="btn btn-sm btn-crm-primary py-1" onclick="openResolveModal('${a.aid}')">
              <i class="bi bi-sliders me-1"></i>Regulate &amp; Resolve
            </button>
          `;
        }
      } else {
        actionControlHtml = '<span class="badge bg-secondary p-2">Resolved</span>';
      }

      return `
        <div class="alert-card-v2 ${a.status} ${a.state}">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div>
              <div class="d-flex align-items-center gap-2 mb-1">
                <strong class="font-monospace fs-6 text-dark">${esc(a.id)}</strong>
                <span class="badge bg-light text-dark border">${esc(a.cargo)}</span>
                ${statusPillHtml(a.status)}
              </div>
              <div class="small text-muted">
                Observed Excursion: <strong class="text-danger fs-6">${a.temp}°C</strong> | Time: <strong>${esc(a.time)}</strong> | State: <strong>${esc(a.state)}</strong>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2">
              ${actionControlHtml}
              <button class="btn btn-sm btn-outline-danger py-1" onclick="deleteAlert('${a.aid}')" title="Delete Alert">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
          ${managerNotificationHtml}
        </div>
      `;
    }).join("") || '<p class="text-muted small text-center my-4">No alerts recorded in this filter view. All shipments within bounds.</p>';
  }

  // Severity Tab Click Handlers
  const alertTabMap = {
    filterAlertAll: "ALL",
    filterAlertCritical: "Critical",
    filterAlertWarning: "Warning",
    filterAlertCancellations: "Cancellations",
    filterAlertResolved: "Resolved"
  };

  Object.keys(alertTabMap).forEach(btnId => {
    const btn = $(btnId);
    if (btn) {
      btn.onclick = () => {
        activeAlertFilter = alertTabMap[btnId];
        Object.keys(alertTabMap).forEach(b => {
          const tab = $(b);
          if (tab) {
            tab.className = b === btnId
              ? "btn btn-sm btn-link text-decoration-none fw-semibold active text-primary border-bottom border-primary pb-2 rounded-0"
              : "btn btn-sm btn-link text-decoration-none text-muted pb-2 rounded-0";
          }
        });
        renderAlerts();
      };
    }
  });

  window.acknowledgeAlert = (aid) => {
    const a = alerts.find(item => item.aid === aid);
    if (!a) return;
    a.state = "Resolved";
    saveState();
    renderAll();
  };

  window.sendAlertRequest = (aid) => {
    const a = alerts.find(item => item.aid === aid);
    if (!a) return;
    a.requested = true;
    a.requestNote = `Package is in ${a.status} condition, please resolve it.`;
    saveState();
    renderAll();
    alert(`Notice sent to Logistics Manager: Consignment ${a.id} is in ${a.status} condition.`);
  };

  $("btnDeleteAllAlerts").onclick = () => {
    if (!alerts.length) return alert("No active alerts to delete.");
    if (confirm(`Are you sure you want to clear all ${alerts.length} incident notices?`)) {
      alerts.forEach(a => {
        const shipment = shipments.find(s => s.id === a.id);
        const reading = shipment && shipment.readings && shipment.readings.find(r => r.time === a.time && r.temp === a.temp);
        if (reading) reading.alertDeleted = true;
      });
      alerts = [];
      saveState();
      renderAll();
    }
  };

  window.deleteAlert = (aid) => {
    const a = alerts.find(item => item.aid === aid);
    if (!a || !confirm(`Remove alert record ${a.aid}?`)) return;
    const shipment = shipments.find(s => s.id === a.id);
    const reading = shipment && shipment.readings && shipment.readings.find(r => r.time === a.time && r.temp === a.temp);
    if (reading) reading.alertDeleted = true;
    alerts = alerts.filter(item => item.aid !== aid);
    saveState();
    renderAll();
  };

  /* ---------- Cancellation Approvals Queue ---------- */
  function renderRequests() {
    const pending = cancellations.filter(c => c.state === "Pending").length;
    $("pendingCancelBadge").textContent = `${pending} Pending Decisions`;

    const isOperator = currentUser && currentUser.role === "Warehouse Operator";

    $("cancellationsList").innerHTML = cancellations.map(c => {
      const isPending = c.state === "Pending";
      const isApproved = c.state === "Approved";
      const badgeClass = isPending ? "bg-warning text-dark" : (isApproved ? "bg-success" : "bg-danger");

      return `
        <div class="alert-card-v2 mb-3 bg-card ${isApproved ? 'border-success' : (isPending ? 'border-warning' : 'border-danger')}">
          <div class="d-flex flex-wrap justify-content-between align-items-start gap-2">
            <div>
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="fs-6 fw-bold font-monospace text-dark">${esc(c.shipmentId)}</span>
                ${c.cargo ? `<span class="badge bg-light text-dark border">${esc(c.cargo)}</span>` : ""}
                <span class="badge ${badgeClass} px-2 py-1">${c.state}</span>
              </div>
              <div class="small mb-1">
                <strong>Justification:</strong> <span class="fw-semibold text-danger">${esc(c.reason)}</span>
              </div>
              <div class="small text-muted mb-2">
                <i class="bi bi-person me-1"></i>Requested by: <strong>${esc(c.requestedBy)}</strong> | <i class="bi bi-clock me-1"></i>${esc(c.time)}
              </div>
              ${c.notes ? `<div class="small text-secondary fst-italic mb-2 bg-light p-2 rounded-3 border">"${esc(c.notes)}"</div>` : ""}
              ${c.resolvedBy ? `<div class="small text-dark mt-1"><strong>Decision by:</strong> ${esc(c.resolvedBy)} at ${esc(c.resolvedAt || "")}</div>` : ""}
            </div>
            <div>
              ${isPending && isOperator ? `
                <div class="btn-group">
                  <button class="btn btn-sm btn-success px-3" onclick="handleCancelRequest('${c.id}', true)">
                    <i class="bi bi-check-circle me-1"></i>Approve Cancellation
                  </button>
                  <button class="btn btn-sm btn-outline-danger px-3 ms-1" onclick="handleCancelRequest('${c.id}', false)">
                    <i class="bi bi-x-circle me-1"></i>Reject
                  </button>
                </div>
              ` : `<span class="badge ${badgeClass} p-2">${c.state}</span>`}
            </div>
          </div>
        </div>
      `;
    }).join("") || '<p class="text-muted small text-center my-4">No cancellation requests currently pending approval.</p>';
  }

  window.handleCancelRequest = (reqId, approved) => {
    const req = cancellations.find(c => c.id === reqId);
    if (!req) return;

    const opName = currentUser ? currentUser.name : "Sourabh Verma";
    const s = shipments.find(item => item.id === req.shipmentId);

    if (approved) {
      req.state = "Approved";
      req.resolvedBy = `${opName} (Warehouse Operator)`;
      req.resolvedAt = stamp();

      if (s) {
        s.status = "Cancelled";
        s.cancelReason = req.reason;
        s.cancelNotes = req.notes;
        s.cancelRequestedBy = req.requestedBy;
        s.cancelApprovedBy = `${opName} (Warehouse Operator)`;
        s.cancelledAt = stamp();
      }

      alerts = alerts.filter(a => !(a.id === req.shipmentId && a.type !== "Cancellation" && a.state !== "Resolved"));

      alerts.unshift({
        aid: "ALT-CAN-" + (seq++),
        id: req.shipmentId,
        cargo: s ? s.cargo : (req.cargo || ""),
        type: "Cancellation",
        decision: "Approved",
        status: "Approved",
        state: "Active",
        title: `Cancellation Request Approved: ${req.shipmentId}`,
        message: `Cancellation for consignment ${req.shipmentId}${s ? ` (${s.cargo})` : ""} was APPROVED by Warehouse Operator (${opName}). Package moved to Cancelled Records.`,
        time: stamp(),
        resolvedBy: `${opName} (Warehouse Operator)`
      });

      managerNotifications.unshift({
        id: "NOTIF-" + (seq++),
        shipmentId: req.shipmentId,
        type: "Approved",
        title: `Cancellation Approved: ${req.shipmentId}`,
        message: `Cancellation for consignment ${req.shipmentId}${s ? ` (${s.cargo})` : ""} was APPROVED by Warehouse Operator (${opName}).`,
        time: stamp()
      });

      alert(`Cancellation request for ${req.shipmentId} APPROVED.`);
    } else {
      req.state = "Rejected";
      req.resolvedBy = `${opName} (Warehouse Operator)`;
      req.resolvedAt = stamp();

      alerts.unshift({
        aid: "ALT-CAN-" + (seq++),
        id: req.shipmentId,
        cargo: s ? s.cargo : (req.cargo || ""),
        type: "Cancellation",
        decision: "Rejected",
        status: "Rejected",
        state: "Active",
        title: `Cancellation Request Rejected: ${req.shipmentId}`,
        message: `Cancellation for consignment ${req.shipmentId}${s ? ` (${s.cargo})` : ""} was REJECTED by Warehouse Operator (${opName}). Package remains Active in transit.`,
        time: stamp(),
        resolvedBy: `${opName} (Warehouse Operator)`
      });

      managerNotifications.unshift({
        id: "NOTIF-" + (seq++),
        shipmentId: req.shipmentId,
        type: "Rejected",
        title: `Cancellation Rejected: ${req.shipmentId}`,
        message: `Cancellation request for package ${req.shipmentId} was REJECTED by Warehouse Operator (${opName}).`,
        time: stamp()
      });

      alert(`Cancellation request for ${req.shipmentId} REJECTED.`);
    }

    saveState();
    renderAll();
  };

  /* ---------- Delivered Section ---------- */
  function renderDelivered() {
    const list = shipments.filter(s => s.status === "Delivered");
    $("deliveredBody").innerHTML = list.map(s => `
      <tr>
        <td class="fw-bold font-monospace text-primary"><i class="bi bi-check2-circle text-success me-1"></i>${esc(s.id)}</td>
        <td><strong>${esc(s.cargo)}</strong></td>
        <td class="small text-muted">${esc(s.origin)} <i class="bi bi-arrow-right text-muted mx-1"></i> ${esc(s.dest)}</td>
        <td class="font-monospace small">${s.min}°C to ${s.max}°C</td>
        <td class="fw-bold font-monospace">${latestOf(s).temp}°C</td>
        <td class="small text-muted">${esc(s.deliveredAt || "—")}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-crm-outline py-0" onclick="showDetails('${s.id}')">Diagnostics</button>
          ${currentUser && currentUser.role === "Logistics Manager" ? `
            <button class="btn btn-sm btn-outline-danger py-0 ms-1" onclick="promptDeleteShipment('${s.id}')" title="Delete record">
              <i class="bi bi-trash"></i>
            </button>
          ` : ""}
        </td>
      </tr>`).join("") || `<tr><td colspan="7" class="text-center text-muted py-4">No delivered consignments recorded in archive.</td></tr>`;
  }

  /* ---------- Cancelled Section ---------- */
  function renderCancelled() {
    const list = shipments.filter(s => s.status === "Cancelled");
    $("cancelledBody").innerHTML = list.map(s => `
      <tr>
        <td class="fw-bold font-monospace text-danger text-decoration-line-through">${esc(s.id)}</td>
        <td><strong>${esc(s.cargo)}</strong></td>
        <td class="small text-muted">${esc(s.origin)} <i class="bi bi-arrow-right text-muted mx-1"></i> ${esc(s.dest)}</td>
        <td class="fw-semibold text-danger">${esc(s.cancelReason || "—")}</td>
        <td class="small fst-italic text-muted">${esc(s.cancelNotes || "—")}</td>
        <td class="small text-muted">${esc(s.cancelRequestedBy || "—")}</td>
        <td class="small text-success fw-semibold">${esc(s.cancelApprovedBy || "Sourabh Verma")}</td>
        <td class="small text-muted">${esc(s.cancelledAt || "—")}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-crm-outline py-0" onclick="showDetails('${s.id}')">Diagnostics</button>
          ${currentUser && currentUser.role === "Logistics Manager" ? `
            <button class="btn btn-sm btn-outline-danger py-0 ms-1" onclick="promptDeleteShipment('${s.id}')" title="Delete record">
              <i class="bi bi-trash"></i>
            </button>
          ` : ""}
        </td>
      </tr>`).join("") || `<tr><td colspan="9" class="text-center text-muted py-4">No cancelled consignments recorded.</td></tr>`;
  }

  /* ---------- Spoiled Cargo Section (Requirement 6) ---------- */
  function renderSpoiled() {
    const list = shipments.filter(s => s.status === "Spoiled");
    $("spoiledCountTotal").textContent = list.length;
    $("spoiledBody").innerHTML = list.map(s => {
      const peakReading = s.readings.reduce((max, r) => r.temp > max ? r.temp : max, s.readings[0] ? s.readings[0].temp : 0);
      return `
        <tr>
          <td class="fw-bold font-monospace text-danger"><i class="bi bi-radioactive me-1"></i>${esc(s.id)}</td>
          <td><strong>${esc(s.cargo)}</strong></td>
          <td class="small text-muted">${esc(s.origin)} <i class="bi bi-arrow-right text-muted mx-1"></i> ${esc(s.dest)}</td>
          <td class="small font-monospace text-danger">Allowed: ${s.min} to ${s.max}°C (Peak: +${peakReading}°C)</td>
          <td class="small fw-semibold text-danger">${esc(s.spoilCause || "Severe Excursion")}</td>
          <td class="small text-muted">${esc(s.spoilDeclaredBy || "Inspection Team")}</td>
          <td><span class="status-pill status-pill-Spoiled">${esc(s.spoilQuarantineStatus || "Quarantined")}</span></td>
          <td class="small text-muted">${esc(s.spoiledAt || "—")}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-crm-outline py-0" onclick="showDetails('${s.id}')">Diagnostics</button>
            ${currentUser && currentUser.role === "Logistics Manager" ? `
              <button class="btn btn-sm btn-outline-danger py-0 ms-1" onclick="promptDeleteShipment('${s.id}')" title="Delete record">
                <i class="bi bi-trash"></i>
              </button>
            ` : ""}
          </td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="9" class="text-center text-muted py-4">No spoiled cargo recorded in quarantine log.</td></tr>`;
  }

  window.openDeclareSpoiledModal = (id) => {
    const s = shipments.find(item => item.id === id);
    if (!s) return;
    $("spoilTargetShipmentId").value = s.id;
    $("spoilTargetLabel").textContent = `${s.id} (${s.cargo})`;
    $("spoilNotes").value = "";
    openModal("declareSpoiledModal");
  };

  $("declareSpoiledForm").onsubmit = (e) => {
    e.preventDefault();
    const id = $("spoilTargetShipmentId").value;
    const s = shipments.find(item => item.id === id);
    if (!s) return;

    const cause = $("spoilCauseSelect").value;
    const status = $("spoilQuarantineStatus").value;
    const notes = $("spoilNotes").value.trim();
    const declaredBy = currentUser ? `${currentUser.name} (${currentUser.role})` : "Inspection Officer";

    s.status = "Spoiled";
    s.spoilCause = cause;
    s.spoilQuarantineStatus = status;
    s.spoilNotes = notes;
    s.spoilDeclaredBy = declaredBy;
    s.spoiledAt = stamp();

    // Close any active alerts for this package
    alerts = alerts.filter(a => !(a.id === id && a.state !== "Resolved"));

    // Add entry to alerts so team is notified
    alerts.unshift({
      aid: "ALT-SPOIL-" + (seq++),
      id: s.id,
      cargo: s.cargo,
      type: "Spoiled",
      status: "Critical",
      state: "Active",
      title: `Consignment Declared Spoiled: ${s.id}`,
      message: `Consignment ${s.id} (${s.cargo}) has been condemned due to "${cause}" and transferred to ${status}.`,
      time: stamp(),
      resolvedBy: declaredBy
    });

    closeModal("declareSpoiledModal");
    saveState();
    renderAll();
    alert(`Consignment ${s.id} has been moved to Spoiled Cargo quarantine archive.`);
  };

  /* ---------- IoT Device Fleet Module ---------- */
  function renderDevices() {
    const grid = $("deviceFleetGrid");
    if (!grid) return;

    const active = activeShipments();
    grid.innerHTML = active.map((s, idx) => {
      const sensorId = `SEN-T${101 + idx}`;
      const latest = latestOf(s);
      const cond = evaluateTemp(latest.temp, s.min, s.max);
      const battery = 88 - (idx * 4);
      const signal = -64 - (idx * 3);

      return `
        <div class="col-12 col-md-6 col-lg-3">
          <div class="device-card-v2">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-bold font-monospace text-primary">${sensorId}</span>
              <span class="badge bg-success-subtle text-success border border-success"><i class="bi bi-wifi me-1"></i>Online</span>
            </div>
            <div class="small text-muted mb-2">Cargo: <strong>${esc(s.cargo)}</strong> (${esc(s.id)})</div>
            <div class="d-flex justify-content-between small text-muted mb-1">
              <span>Battery: <strong>${battery}%</strong></span>
              <span>RF: <strong>${signal} dBm</strong></span>
            </div>
            <div class="device-signal-bar mb-3">
              <div class="device-signal-fill" style="width: ${battery}%;"></div>
            </div>
            <div class="d-flex justify-content-between align-items-center small pt-2 border-top">
              <span class="text-muted">Last Ping: <strong>${latest.time}</strong></span>
              <span class="fw-bold font-monospace ${cond.text}">${latest.temp > 0 ? "+" : ""}${latest.temp}°C</span>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  /* ---------- Settings & Profile View (Requirement 2) ---------- */
  function renderSettings() {
    if (!currentUser) return;
    const prof = getUserProfile(currentUser);

    if ($("settingsNameInput")) $("settingsNameInput").value = prof.name;
    if ($("settingsEmailInput")) $("settingsEmailInput").value = prof.email || currentUser.email || "";
    if ($("settingsPhoneInput")) $("settingsPhoneInput").value = prof.phone || "";
    if ($("settingsStationInput")) $("settingsStationInput").value = prof.station || "";
    if ($("settingsDutyInput")) $("settingsDutyInput").value = prof.duty || "";
    if ($("settingsAvatarPreview")) {
      $("settingsAvatarPreview").src = prof.photo || currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(prof.name)}`;
    }
  }

  /* ---------- CSV Export Functionality ---------- */
  function exportToCSV(filename, rows) {
    const processRow = row => row.map(val => {
      let v = String(val ?? "");
      if (v.search(/("|,|\n)/g) >= 0) v = `"${v.replace(/"/g, '""')}"`;
      return v;
    }).join(",");

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(processRow).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if ($("btnExportShipmentsCSV")) {
    $("btnExportShipmentsCSV").onclick = () => {
      const headers = ["Shipment ID", "Cargo", "Origin", "Destination", "Min Temp (°C)", "Max Temp (°C)", "Latest Temp (°C)", "Status"];
      const rows = [headers, ...activeShipments().map(s => [
        s.id, s.cargo, s.origin, s.dest, s.min, s.max, latestOf(s).temp, s.status
      ])];
      exportToCSV(`coldchain_active_shipments_${Date.now()}.csv`, rows);
    };
  }

  if ($("btnExportDeliveredCSV")) {
    $("btnExportDeliveredCSV").onclick = () => {
      const headers = ["Shipment ID", "Cargo", "Origin", "Destination", "Safe Limits", "Final Temp (°C)", "Delivered At"];
      const list = shipments.filter(s => s.status === "Delivered");
      const rows = [headers, ...list.map(s => [
        s.id, s.cargo, s.origin, s.dest, `${s.min}°C to ${s.max}°C`, latestOf(s).temp, s.deliveredAt
      ])];
      exportToCSV(`coldchain_delivered_archive_${Date.now()}.csv`, rows);
    };
  }

  if ($("btnExportCancelledCSV")) {
    $("btnExportCancelledCSV").onclick = () => {
      const headers = ["Shipment ID", "Cargo", "Origin", "Destination", "Reason", "Remarks", "Requested By", "Approved By", "Cancelled At"];
      const list = shipments.filter(s => s.status === "Cancelled");
      const rows = [headers, ...list.map(s => [
        s.id, s.cargo, s.origin, s.dest, s.cancelReason, s.cancelNotes, s.cancelRequestedBy, s.cancelApprovedBy, s.cancelledAt
      ])];
      exportToCSV(`coldchain_cancelled_audit_${Date.now()}.csv`, rows);
    };
  }

  if ($("btnExportSpoiledCSV")) {
    $("btnExportSpoiledCSV").onclick = () => {
      const headers = ["Consignment ID", "Cargo", "Route", "Safe Limits", "Spoilage Cause", "Declared By", "Quarantine Status", "Spoiled At"];
      const list = shipments.filter(s => s.status === "Spoiled");
      const rows = [headers, ...list.map(s => [
        s.id, s.cargo, `${s.origin} -> ${s.dest}`, `${s.min}°C to ${s.max}°C`, s.spoilCause, s.spoilDeclaredBy, s.spoilQuarantineStatus, s.spoiledAt
      ])];
      exportToCSV(`coldchain_spoiled_quarantine_log_${Date.now()}.csv`, rows);
    };
  }

  if ($("btnDownloadFullAudit")) {
    $("btnDownloadFullAudit").onclick = () => {
      const headers = ["Record Type", "ID", "Cargo", "Route", "Telemetry", "Decision / State", "Audit Timestamp"];
      const rows = [headers];
      shipments.forEach(s => {
        rows.push(["Shipment", s.id, s.cargo, `${s.origin} -> ${s.dest}`, `${latestOf(s).temp}°C`, s.status, stamp()]);
      });
      cancellations.forEach(c => {
        rows.push(["Cancellation Request", c.shipmentId, c.cargo, "N/A", c.reason, c.state, c.time]);
      });
      alerts.forEach(a => {
        rows.push(["Incident Alert", a.id, a.cargo, "N/A", `${a.temp}°C`, a.state, a.time]);
      });
      exportToCSV(`coldchain_master_gxp_audit_${Date.now()}.csv`, rows);
    };
  }

  /* ---------- Resolve Modal (Manager Regulate Temp) ---------- */
  window.openResolveModal = (aid) => {
    const alertItem = alerts.find(a => a.aid === aid && a.state !== "Resolved");
    const shipment = alertItem && shipments.find(s => s.id === alertItem.id);
    if (!shipment) return;

    $("resolveAlertId").value = aid;
    $("resolveShipmentId").value = shipment.id;
    $("resShipmentRef").textContent = shipment.id;
    $("resCargo").textContent = shipment.cargo;
    $("resSafeRange").textContent = `${shipment.min}°C to ${shipment.max}°C`;
    $("resCurrentTemp").textContent = `${alertItem.temp}°C`;
    $("regulatedTempInput").value = "";
    $("resolveWarningBox").classList.add("d-none");
    openModal("resolveModal");
  };

  $("resolveForm").onsubmit = (e) => {
    e.preventDefault();
    const shipment = shipments.find(s => s.id === $("resolveShipmentId").value);
    const alertItem = alerts.find(a => a.aid === $("resolveAlertId").value);
    const regTemp = parseFloat($("regulatedTempInput").value);

    if (isNaN(regTemp) || regTemp < shipment.min || regTemp > shipment.max) {
      $("resolveWarningMsg").textContent = `Warning: Regulated reading must be within authorized range (${shipment.min}°C to ${shipment.max}°C).`;
      $("resolveWarningBox").classList.remove("d-none");
      return;
    }

    shipment.readings.push({ temp: regTemp, time: nowTime(), alertDeleted: false });
    if (alertItem) alertItem.state = "Resolved";
    saveState();
    closeModal("resolveModal");
    renderAll();
  };

  /* ---------- Cancel Shipment Modal (Manager Initiates Request) ---------- */
  window.openCancelModal = (id) => {
    const s = shipments.find(item => item.id === id);
    if (!s) return;
    $("cancelShipmentId").value = s.id;
    $("cancelShipmentLabel").textContent = `${s.id} (${s.cargo})`;
    $("cancelReasonSelect").selectedIndex = 0;
    $("customReasonBox").classList.add("d-none");
    $("customReasonError").classList.add("d-none");
    $("customReasonInput").value = "";
    $("cancelReasonNotes").value = "";
    openModal("cancelRequestModal");
  };

  $("cancelReasonSelect").onchange = () => {
    const isNone = $("cancelReasonSelect").value === "NONE";
    $("customReasonBox").classList.toggle("d-none", !isNone);
    $("customReasonError").classList.add("d-none");
    if (isNone) $("customReasonInput").focus();
  };

  $("cancelRequestForm").onsubmit = (e) => {
    e.preventDefault();
    const shipmentId = $("cancelShipmentId").value;
    let reason = $("cancelReasonSelect").value;
    if (reason === "NONE") {
      reason = $("customReasonInput").value.trim();
      if (!reason) {
        $("customReasonError").classList.remove("d-none");
        $("customReasonInput").focus();
        return;
      }
    }
    const notes = $("cancelReasonNotes").value.trim();
    const s = shipments.find(item => item.id === shipmentId);

    cancellations.unshift({
      id: "REQ-" + (seq++),
      shipmentId,
      cargo: s ? s.cargo : "",
      reason,
      notes,
      requestedBy: currentUser ? `${currentUser.name} (${currentUser.role})` : "Logistics Manager",
      time: stamp(),
      state: "Pending"
    });

    closeModal("cancelRequestModal");
    saveState();
    hasViewedCancels = false; // unread cancellation
    renderAll();
    alert(`Cancellation request for consignment ${shipmentId} dispatched to Warehouse Operator for terminal verification.`);
  };

  /* ---------- Register New Shipment & Dual-Role Notification (Requirement 7) ---------- */
  const setupAddModal = () => {
    $("addShipmentForm").reset();
    $("addShipmentError").classList.add("d-none");
    openModal("addShipmentModal");
  };

  $("btnOpenAddShipment").onclick = setupAddModal;
  if ($("btnOpenAddShipmentFromList")) {
    $("btnOpenAddShipmentFromList").onclick = setupAddModal;
  }

  $("addShipmentForm").onsubmit = (e) => {
    e.preventDefault();
    const id = $("newShipmentId").value.trim().toUpperCase();
    const cargo = $("newCargo").value.trim();
    const origin = $("newOrigin").value.trim();
    const dest = $("newDest").value.trim();
    const min = parseFloat($("newMinTemp").value);
    const max = parseFloat($("newMaxTemp").value);
    const initialTemp = parseFloat($("newInitialTemp").value);
    let msg = "";

    if (!/^[A-Z0-9-]{3,12}$/.test(id)) msg = "Consignment ID must be 3 to 12 alphanumeric characters or dashes.";
    else if (shipments.some(s => s.id === id)) msg = "Consignment ID already exists in the system.";
    else if (min >= max) msg = "Minimum temperature threshold must be strictly below maximum.";
    else if (isNaN(initialTemp)) msg = "Please enter a valid initial telemetry reading.";

    if (msg) {
      $("addShipmentError").textContent = msg;
      $("addShipmentError").classList.remove("d-none");
      return;
    }
    $("addShipmentError").classList.add("d-none");

    shipments.unshift({
      id,
      cargo,
      origin,
      dest,
      min,
      max,
      status: "Active",
      readings: [{ temp: initialTemp, time: nowTime(), alertDeleted: false }]
    });

    // Requirement 7: Dispatch notification to BOTH Warehouse Operator and Logistics Manager on their Alert section!
    alerts.unshift({
      aid: "NOTIF-NEW-" + (seq++),
      id: id,
      cargo: cargo,
      type: "NewShipment",
      status: "Normal",
      state: "Active",
      isNewShipment: true,
      title: `New Consignment Dispatched: ${id}`,
      message: `Consignment ${id} (${cargo}) on route ${origin} → ${dest} has been registered and activated. Both Logistics Manager and Warehouse Operator have been notified.`,
      time: stamp(),
      resolvedBy: `${currentUser ? currentUser.name : "Dispatch"} (${currentUser ? currentUser.role : "Command HQ"})`
    });

    hasViewedAlerts = false; // New unread notification for the Alert section!

    saveState();
    closeModal("addShipmentModal");
    $("addShipmentForm").reset();
    renderAll();
    alert(`New consignment ${id} registered successfully! Notification sent to both Logistics and Warehouse Operator alert queues.`);
  };

  /* ---------- Mark Delivered (Operator Action) ---------- */
  window.markDelivered = (id) => {
    const s = shipments.find(item => item.id === id);
    if (s && confirm(`Mark consignment ${id} as delivered? It will move to the Delivered History archive.`)) {
      s.status = "Delivered";
      s.deliveredAt = stamp();
      saveState();
      renderAll();
    }
  };

  /* ---------- Delete Authorization (Manager Action) ---------- */
  window.promptDeleteShipment = (id) => {
    pendingDeleteShipmentId = id;
    $("deleteTargetShipmentId").textContent = id;
    $("deleteAuthConfirmEmail").value = "";
    $("deleteAuthError").classList.add("d-none");
    openModal("deleteAuthModal");
  };

  $("deleteAuthForm").onsubmit = (e) => {
    e.preventDefault();
    const inputEmail = ($("deleteAuthConfirmEmail").value || "").trim().toLowerCase();

    if (!currentUser || currentUser.role !== "Logistics Manager") {
      $("deleteAuthError").textContent = "Access denied: Only active Logistics Managers are authorized to delete consignments.";
      $("deleteAuthError").classList.remove("d-none");
      return;
    }

    if (inputEmail !== (currentUser.email || "").toLowerCase()) {
      $("deleteAuthError").textContent = `Email mismatch: Please enter your active manager email (${currentUser.email}) to confirm.`;
      $("deleteAuthError").classList.remove("d-none");
      return;
    }

    const targetId = pendingDeleteShipmentId;
    shipments = shipments.filter(item => item.id !== targetId);
    alerts = alerts.filter(a => a.id !== targetId);
    cancellations = cancellations.filter(c => c.shipmentId !== targetId);
    managerNotifications = managerNotifications.filter(n => n.shipmentId !== targetId);
    saveState();
    closeModal("deleteAuthModal");
    pendingDeleteShipmentId = null;
    renderAll();
  };

  $("btnDeleteDelivered").onclick = () => {
    const count = shipments.filter(s => s.status === "Delivered").length;
    if (!count) return alert("No delivered consignments to clear.");
    if (confirm(`Permanently remove all ${count} delivered records from the archive?`)) {
      shipments = shipments.filter(s => s.status !== "Delivered");
      saveState();
      renderAll();
    }
  };

  /* ---------- Detailed Diagnostics Modal with Chart ---------- */
  window.showDetails = (id) => {
    currentShipmentId = id;
    const s = shipments.find(item => item.id === id);
    if (!s) return;

    $("modalTitle").textContent = `${s.id} — ${s.cargo}`;
    $("modalLimits").textContent = `${s.min}°C to ${s.max}°C`;
    $("modalCurrent").textContent = `${latestOf(s).temp}°C`;
    $("modalSensorId").textContent = `SEN-IoT-${s.id.replace('SHP-', '')}`;
    $("addPingForm").classList.toggle("d-none", s.status !== "Active");

    $("modalHistoryList").innerHTML = s.readings.slice().reverse().map(r => {
      const cond = evaluateTemp(r.temp, s.min, s.max);
      const deltaText = cond.delta > 0 ? `+${cond.delta}°C breach` : "Within limits";
      return `
        <tr>
          <td class="font-monospace small text-muted">${esc(r.time)}</td>
          <td class="font-monospace fw-bold ${cond.text}">${r.temp > 0 ? "+" : ""}${r.temp}°C</td>
          <td class="small text-muted">${deltaText}</td>
          <td>${statusPillHtml(cond.status)}</td>
        </tr>
      `;
    }).join("");

    renderShipmentDetailChart(s);
    openModal("detailsModal");
  };

  function renderShipmentDetailChart(s) {
    if (!window.Chart) return;
    const ctx = document.getElementById("shipmentDetailChart");
    if (!ctx) return;

    if (shipmentDetailChartInstance) {
      shipmentDetailChartInstance.destroy();
    }

    const isDark = currentTheme === "dark";
    const labels = s.readings.map(r => r.time);
    const data = s.readings.map(r => r.temp);
    const minLine = s.readings.map(() => s.min);
    const maxLine = s.readings.map(() => s.max);

    shipmentDetailChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Observed Temp (°C)",
            data,
            borderColor: "#3478F6",
            backgroundColor: "rgba(52, 120, 246, 0.15)",
            borderWidth: 2.5,
            tension: 0.2,
            pointRadius: 4,
            pointBackgroundColor: "#3478F6",
            fill: true
          },
          {
            label: "Max Safe Bound",
            data: maxLine,
            borderColor: "#C2413B",
            borderDash: [4, 4],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false
          },
          {
            label: "Min Safe Bound",
            data: minLine,
            borderColor: "#17845D",
            borderDash: [4, 4],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top", labels: { font: { family: "Inter", size: 10 }, color: isDark ? "#94A3B8" : "#64748B" } }
        },
        scales: {
          y: { grid: { color: isDark ? "#334155" : "#F8FAFC" }, ticks: { color: isDark ? "#94A3B8" : "#64748B" } },
          x: { grid: { display: false }, ticks: { color: isDark ? "#94A3B8" : "#64748B" } }
        }
      }
    });
  }

  $("addPingForm").onsubmit = (e) => {
    e.preventDefault();
    const s = shipments.find(item => item.id === currentShipmentId);
    if (!s) return;
    const val = parseFloat($("manualTempInput").value);
    if (isNaN(val)) return;
    s.readings.push({ temp: val, time: nowTime(), alertDeleted: false });
    $("manualTempInput").value = "";
    saveState();
    window.showDetails(currentShipmentId);
    renderAll();
  };

  /* ---------- IoT Simulation Trigger ---------- */
  $("btnSimulatePing").onclick = () => {
    const list = activeShipments();
    if (!list.length) return;
    list.forEach(s => s.readings.push({ temp: randomReading(s), time: nowTime(), alertDeleted: false }));
    renderAll();
  };

  if ($("searchInput")) $("searchInput").oninput = renderShipmentsTable;
  if ($("statusFilter")) $("statusFilter").onchange = renderShipmentsTable;
  if ($("cargoFilter")) $("cargoFilter").onchange = renderShipmentsTable;

  // Initialize Auth
  setAuth(currentUser);
});
