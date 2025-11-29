// src/utils/polishProposal.js
// Tries an AI polish pass (if enabled and key present), otherwise falls back to a safe local rewrite.

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || null;
const ENABLE_POLISH = import.meta.env.VITE_ENABLE_POLISH === "true";
const POLISH_MODEL = "gemini-1.5-flash";

/* tiny helper: attempt AI polish via AI Studio. Returns string */
async function callAiPolish(inputText, instruction, maxOutputTokens = 300) {
  if (!GEMINI_KEY) throw new Error("Gemini key not set for polish.");
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${POLISH_MODEL}:generateContent?key=${encodeURIComponent(GEMINI_KEY)}`;
  const payload = {
    instances: [
      { content: { text: `${instruction}\n\n${inputText}` } }
    ],
    parameters: { maxOutputTokens }
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    // try to parse error body
    let errText = `${res.status} ${res.statusText}`;
    try { const j = await res.json(); if (j?.error?.message) errText += ` - ${j.error.message}` } catch(e){}
    throw new Error("Polish API error: " + errText);
  }

  const data = await res.json();

  // Many AI Studio responses include candidates array
  if (data?.candidates?.[0]) {
    const cand = data.candidates[0];
    if (typeof cand.output === "string") return cand.output.trim();
    if (typeof cand.content === "string") return cand.content.trim();
    if (Array.isArray(cand.content)) return cand.content.map(c => c.text || "").join("").trim();
  }

  // fallback: stringify
  return JSON.stringify(data).slice(0, 2000);
}

/* Local (non-AI) lightweight polish */
function localPolishText(text) {
  if (!text) return "";
  // Normalize whitespace and keep first 3 sentences
  const s = String(text).replace(/\s+/g, " ").trim();
  const sentences = s.split(/(?<=[.!?])\s+/).filter(Boolean);
  return sentences.slice(0, 3).join(" ");
}

/**
 * polishProposal(cleanedProposal)
 * - cleanedProposal: object returned by cleanProposal()
 * Returns a new object with polished text fields.
 */
export async function polishProposal(cleanedProposal) {
  if (!cleanedProposal) return cleanedProposal;
  const out = JSON.parse(JSON.stringify(cleanedProposal)); // deep-ish clone

  const maybePolish = async (text, roleHint) => {
    if (!text) return text;
    if (ENABLE_POLISH && GEMINI_KEY) {
      try {
        const instruction = `Rewrite the following ${roleHint} into a concise, professional business tone for a sales proposal. Keep it to 2-3 sentences. Output only the polished text.`;
        const res = await callAiPolish(text, instruction, 180);
        // Strip any wrapping quotes
        return res.trim().replace(/^"|"$/g, "");
      } catch (e) {
        // fallback to local polish
        return localPolishText(text);
      }
    } else {
      return localPolishText(text);
    }
  };

  // Polish a few high-value fields
  out.proposal = out.proposal || {};
  out.recommendations = Array.isArray(out.recommendations) ? out.recommendations : [];

  out.proposal.executiveSummary = await maybePolish(out.proposal.executiveSummary, "executive summary");
  out.proposal.problemStatement = await maybePolish(out.proposal.problemStatement, "problem statement");
  out.proposal.proposedSolution = await maybePolish(out.proposal.proposedSolution, "proposed solution");

  // Polish recommendation descriptions
  for (let i = 0; i < out.recommendations.length; i++) {
    out.recommendations[i].description = await maybePolish(out.recommendations[i].description, "recommendation");
  }

  return out;
}
