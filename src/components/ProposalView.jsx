// src/components/ProposalView.jsx
import React from "react";

/**
 * Lightweight simple proposal UI (original style).
 * Expects `data` to contain { analysis, proposal, recommendations, metadata }.
 */
export default function ProposalView({ data }) {
  if (!data) return null;

  const { analysis = {}, proposal = {}, recommendations = [], metadata = {} } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-2">Generating Proposal</h2>
        <div className="text-sm text-slate-600">Processed: {metadata?.fileName || "uploaded document"}</div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Executive Summary</h3>
        <p className="whitespace-pre-wrap">{proposal.executiveSummary || "No executive summary provided."}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Problem Statement</h3>
        <p className="whitespace-pre-wrap">{proposal.problemStatement || "No problem statement provided."}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Proposed Solution</h3>
        <p className="whitespace-pre-wrap">{proposal.proposedSolution || "No proposed solution provided."}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Scope of Work</h3>
        <ul className="list-disc list-inside">
          {(proposal.scopeOfWork || []).length === 0 && <li>Not specified.</li>}
          {(proposal.scopeOfWork || []).map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Deliverables</h3>
        <ul className="list-disc list-inside">
          {(proposal.deliverables || []).length === 0 && <li>Not specified.</li>}
          {(proposal.deliverables || []).map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Timeline</h3>
        <div className="space-y-2">
          {(proposal.timeline || []).length === 0 && <div>No timeline provided.</div>}
          {(proposal.timeline || []).map((t, i) => (
            <div key={i} className="p-3 border rounded">
              <div className="font-semibold">{t.phase}</div>
              <div className="text-sm text-gray-500">{t.duration}</div>
              <p className="text-sm">{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Pricing</h3>
        {(proposal.pricing && proposal.pricing.breakdown) ? (
          <>
            <ul className="space-y-2">
              {proposal.pricing.breakdown.map((it, i) => (
                <li key={i} className="flex justify-between p-2 border rounded">
                  <span>{it.item}</span>
                  <span className="font-medium">{it.cost}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 font-semibold">Total: {proposal.pricing.total || "—"}</div>
          </>
        ) : (
          <div>No pricing provided.</div>
        )}
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
        <ul className="list-disc list-inside">
          {(recommendations || []).length === 0 && <li>No recommendations.</li>}
          {(recommendations || []).map((r, i) => (
            <li key={i}>
              <strong>{r.title}</strong> — {r.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="text-sm text-gray-500">
        Generated at: {metadata.generatedAt || "—"}
      </section>
    </div>
  );
}
