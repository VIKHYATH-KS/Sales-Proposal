// src/utils/cleanProposal.js

export function trimStr(s, max = 300) {
  if (!s && s !== "") return null;
  const t = String(s).trim();
  return t.length > max ? t.slice(0, max).trim() + "…" : t;
}

function normalizeCurrency(str) {
  if (!str) return null;
  const m = String(str).match(/\$\s?[\d,]+(?:\.\d{1,2})?/);
  return m ? m[0].replace(/\s+/g, "") : String(str).trim();
}

function removeEmpty(obj) {
  if (!obj || typeof obj !== "object") return obj;
  const out = Array.isArray(obj) ? [] : {};
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v === null || v === undefined) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    if (typeof v === "object" && Object.keys(v).length === 0) continue;
    out[k] = (typeof v === "object") ? removeEmpty(v) : v;
  }
  return out;
}

/**
 * Clean and normalize the parsed proposal object.
 * Returns { cleaned, confidence }
 */
export function cleanProposal(parsed) {
  const p = parsed || {};
  const analysis = p.analysis || {};
  const proposal = p.proposal || {};
  const recs = Array.isArray(p.recommendations) ? p.recommendations : [];

  const cleaned = {
    analysis: {
      budgetRange: normalizeCurrency(analysis.budgetRange),
      timeline: trimStr(analysis.timeline, 80),
      industry: trimStr(analysis.industry, 80),
      keyFeatures: Array.isArray(analysis.keyFeatures) ? analysis.keyFeatures.map(s => trimStr(s, 80)).filter(Boolean) : [],
      businessGoals: Array.isArray(analysis.businessGoals) ? analysis.businessGoals.map(s => trimStr(s, 120)).filter(Boolean) : [],
      technicalRequirements: Array.isArray(analysis.technicalRequirements) ? analysis.technicalRequirements.map(s => trimStr(s,120)).filter(Boolean) : [],
    },
    proposal: {
      executiveSummary: trimStr(proposal.executiveSummary, 600),
      problemStatement: trimStr(proposal.problemStatement, 400),
      proposedSolution: trimStr(proposal.proposedSolution, 800),
      scopeOfWork: Array.isArray(proposal.scopeOfWork) ? proposal.scopeOfWork.map(s => trimStr(s, 180)).filter(Boolean) : [],
      deliverables: Array.isArray(proposal.deliverables) ? proposal.deliverables.map(s => trimStr(s, 180)).filter(Boolean) : [],
      timeline: Array.isArray(proposal.timeline) ? proposal.timeline.map(t => ({
        phase: trimStr(t.phase, 80),
        duration: trimStr(t.duration, 40),
        description: trimStr(t.description, 220)
      })) : [],
      pricing: {
        breakdown: Array.isArray(proposal.pricing?.breakdown)
          ? proposal.pricing.breakdown.map(b => ({ item: trimStr(b.item,120), cost: trimStr(b.cost,40) }))
          : [],
        total: normalizeCurrency(proposal.pricing?.total) || "TBD"
      },
      termsAndConditions: Array.isArray(proposal.termsAndConditions)
        ? proposal.termsAndConditions.map(t => trimStr(t,200)).filter(Boolean)
        : []
    },
    recommendations: recs.map(r => ({
      title: trimStr(r.title, 120),
      description: trimStr(r.description, 300),
      impact: trimStr(r.impact, 40) || "Medium",
      priority: trimStr(String(r.priority || "3"), 5)
    })),
    metadata: p.metadata || {}
  };

  // Remove empty fields
  const finalClean = removeEmpty(cleaned);

  // Confidence score calculation
  let score = 0;
  if (finalClean.analysis?.budgetRange) score += 25;
  if (finalClean.analysis?.timeline) score += 20;
  if (finalClean.proposal?.executiveSummary) score += 20;
  if ((finalClean.proposal?.scopeOfWork || []).length >= 2) score += 15;
  if ((finalClean.proposal?.deliverables || []).length >= 1) score += 10;
  if ((finalClean.recommendations || []).length >= 1) score += 10;
  if (score > 100) score = 100;

  let label = "Low";
  if (score >= 75) label = "High";
  else if (score >= 40) label = "Medium";

  return { cleaned: finalClean, confidence: { score, label } };
}
