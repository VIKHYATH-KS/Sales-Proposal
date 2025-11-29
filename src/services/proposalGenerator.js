// src/services/proposalGenerator.js
// Improved in-browser proposal generator (deterministic, higher-quality output).
//
// Exported API:
//   export async function generateProposal(pdfText = "", onProgress = () => {})
//
// - Preserves same signature as your previous mock.
// - Calls onProgress(agentId, percent, message) periodically so UI shows progress.
// - Returns a structured proposal object: { proposal, recommendations, pricing, timeline, metadata }.

function callProgress(onProgress, agent, pct, msg) {
  try {
    if (typeof onProgress === "function") onProgress(agent, pct, msg);
  } catch (e) {
    // ignore progress callback errors
    // eslint-disable-next-line no-console
    console.warn("progress callback error", e);
  }
}

function normalizeText(t = "") {
  return (t || "").replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").trim();
}

function splitSentences(text) {
  if (!text) return [];
  const maybe = text
    .replace(/\n+/g, ". ")
    .split(/(?<=[.?!])\s+(?=[A-Z0-9])/g)
    .map((s) => s.trim())
    .filter(Boolean);
  return maybe.length ? maybe : text.split(".").map((s) => s.trim()).filter(Boolean);
}

function summarizeByFirstSentences(text, n = 3, maxChars = 500) {
  text = normalizeText(text);
  const s = splitSentences(text);
  if (s.length === 0) return "";
  const out = [];
  for (let i = 0; i < s.length && out.join(" ").length < maxChars && out.length < n; i++) {
    out.push(s[i]);
  }
  return out.join(" ").trim();
}

function rewriteExecutiveSummary(shortSummary, clientName) {
  const opener = clientName ? `For ${clientName},` : "For the client,";
  const summary = shortSummary || "we propose a targeted set of improvements to achieve measurable business outcomes.";
  return `${opener} ${summary} Our approach focuses on clear milestones, measurable KPIs, and a practical delivery plan to reduce risk and accelerate time-to-value.`;
}

const RECOMMENDATION_MAP = [
  { keywords: ["seo", "search", "organic"], title: "SEO Focus", description: "Add technical SEO and structured data to improve visibility and organic traffic.", impact: "High", priority: "High" },
  { keywords: ["payment", "checkout", "wallet", "card"], title: "Payment Methods", description: "Add local wallet and alternative payment methods to reduce cart abandonment.", impact: "Medium", priority: "Medium" },
  { keywords: ["performance", "speed", "slow", "latency"], title: "Performance Optimization", description: "Improve page load speed, critical rendering path and caching to increase conversions and reduce bounce.", impact: "High", priority: "High" },
  { keywords: ["security", "vulnerability", "auth", "oauth"], title: "Security & Authentication", description: "Harden authentication flows, secure APIs and introduce regular security testing to protect customer data.", impact: "High", priority: "High" },
  { keywords: ["analytics", "tracking", "events"], title: "Analytics & Measurement", description: "Add accurate tracking and measurement to monitor conversions and A/B tests.", impact: "Medium", priority: "Medium" },
  { keywords: ["mobile", "responsive", "ios", "android"], title: "Mobile Experience", description: "Improve mobile responsiveness and UX to capture mobile-first users effectively.", impact: "Medium", priority: "Medium" },
  { keywords: ["ux", "ui", "design", "usability"], title: "UX Improvements", description: "Refine interaction design and flows to reduce friction and increase conversion rate.", impact: "High", priority: "High" },
];

function deriveRecommendations(text) {
  const t = (text || "").toLowerCase();
  const found = [];
  for (const r of RECOMMENDATION_MAP) {
    for (const k of r.keywords) {
      if (t.includes(k)) {
        found.push(r);
        break;
      }
    }
  }
  if (found.length === 0) {
    return [
      RECOMMENDATION_MAP[0],
      RECOMMENDATION_MAP[2],
    ];
  }
  const byTitle = {};
  for (const f of found) byTitle[f.title] = f;
  return Object.values(byTitle).slice(0, 5);
}

function createPricingTiers(text) {
  const t = (text || "").toLowerCase();
  const isEnterprise = t.includes("enterprise") || t.includes("scale") || (t.includes("company") && (t.length > 3000));
  if (isEnterprise) {
    return [
      { name: "Starter", price: "$12,000", bullets: ["Core platform", "Testing & deployment", "1 month support"] },
      { name: "Business", price: "$36,000", bullets: ["Everything in Starter", "Integrations", "3 months support"] },
      { name: "Enterprise", price: "$85,000", bullets: ["Custom roadmap", "Dedicated team", "SLA & long-term support"] },
    ];
  }
  return [
    { name: "Basic", price: "$7,500", bullets: ["Core features", "1 month support"] },
    { name: "Professional", price: "$15,000", bullets: ["Everything in Basic", "3 months support", "Integrations"] },
    { name: "Enterprise", price: "$30,000", bullets: ["Custom roadmap", "Premium support", "SLA"] },
  ];
}

function createTimeline(text, recommendations = []) {
  const baseWeeks = Math.max(4, Math.floor((text || "").length / 2000 * 12));
  const recWeight = Math.min(4, Math.ceil(recommendations.length / 2));
  const discovery = 1;
  const design = Math.max(2, Math.floor(baseWeeks * 0.2));
  const development = Math.max(4, Math.floor(baseWeeks * 0.6) + recWeight);
  const launch = 1 + Math.floor(recWeight / 2);
  return [
    { milestone: "Discovery", weeks: discovery, color: "bg-blue-300" },
    { milestone: "Design & Planning", weeks: design, color: "bg-indigo-300" },
    { milestone: "Development & QA", weeks: development, color: "bg-green-300" },
    { milestone: "Launch & Handover", weeks: launch, color: "bg-purple-300" },
  ];
}

function deriveTitle(pdfText) {
  const t = normalizeText(pdfText || "");
  if (!t) return "Sales Proposal";
  const lines = t.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  if (lines.length > 0) {
    const first = lines[0];
    if (first.length > 4 && first.length < 120 && first.split(" ").length < 10) {
      return first.length > 60 ? first.slice(0, 60) + "…" : first;
    }
  }
  return "Sales Proposal";
}

function deriveProblemUnderstanding(text) {
  const t = normalizeText(text || "");
  const match = t.match(/(challenges|problem|issues|pain points|need to|want to)([^.\n]{10,120})/i);
  if (match) {
    return `The client is facing ${match[1]}${match[2].trim()}. We will address these by focusing on the proposed recommendations.`;
  }
  const s = summarizeByFirstSentences(t, 2, 300);
  return s || "We understand the client's problem to be centered around improving business outcomes and reducing friction in key customer journeys.";
}

function enrichRecommendations(recommendations) {
  return recommendations.map((r) => {
    const action = `Proposed action: ${r.title === "SEO Focus" ? "Audit current pages, implement structured data, and prioritize high-traffic pages." :
      r.title === "Payment Methods" ? "Integrate local wallet providers and test mobile checkout flows." :
      r.title === "Performance Optimization" ? "Audit critical paths, implement caching and lazy loading for heavy assets." :
      r.title === "Security & Authentication" ? "Harden auth, enable MFA, and run penetration testing." :
      r.title === "Analytics & Measurement" ? "Instrument key events, implement conversion funnels and dashboards." :
      r.title === "Mobile Experience" ? "Prioritize responsive layouts and fast mobile deliverables." :
      r.title === "UX Improvements" ? "Run usability testing and refine critical flows." :
      "Define concrete deliverables and acceptance criteria."}`;
    return {
      ...r,
      action,
    };
  });
}

export async function generateProposal(pdfText = "", onProgress = () => {}) {
  callProgress(onProgress, "extractor", 5, "Preparing text");
  const text = normalizeText(pdfText || "");
  const startTime = Date.now();

  await new Promise((res) => setTimeout(res, 80));

  callProgress(onProgress, "analysis", 15, "Analyzing document structure");
  const title = deriveTitle(text);
  const clientNameMatch = text.match(/(Client|Company|Organization)[:\s-]*([A-Z][\w &.-]{2,60})/i);
  const clientName = clientNameMatch ? clientNameMatch[2].trim() : "";

  const executiveShort = summarizeByFirstSentences(text, 3, 400);
  const executiveSummary = rewriteExecutiveSummary(executiveShort, clientName);

  callProgress(onProgress, "analysis", 30, "Identifying opportunities");

  const problemUnderstanding = deriveProblemUnderstanding(text);

  const rawRecommendations = deriveRecommendations(text);
  const recommendations = enrichRecommendations(rawRecommendations);

  callProgress(onProgress, "analysis", 55, "Building recommendations");

  const pricing = createPricingTiers(text);
  callProgress(onProgress, "plan", 70, "Estimating timeline & pricing");

  const timeline = createTimeline(text, recommendations);
  callProgress(onProgress, "plan", 85, "Finalizing proposal");

  const nextSteps = "Approve the chosen pricing tier and schedule a 1-hour kickoff meeting to align scope and milestones.";
  const terms = "Standard terms: 30% upfront, milestone-based payments, and mutually agreeable change control. Final scope and SOW to be signed prior to work commencement.";

  const proposal = {
    title,
    clientName,
    executiveSummary,
    problemUnderstanding,
    terms,
    nextSteps,
  };

  await new Promise((res) => setTimeout(res, 120));

  callProgress(onProgress, "finalize", 100, "Proposal ready");

  const endTime = Date.now();

  return {
    proposal,
    recommendations,
    pricing,
    timeline,
    metadata: {
      generatedAt: new Date().toISOString(),
      inputLength: (text || "").length,
      tookMs: endTime - startTime,
    },
  };
}
