// src/components/ProposalView.jsx
import React, { useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ProposalView({ data }) {
  if (!data) return null;
  const { analysis, proposal, recommendations, metadata } = data;

  useEffect(() => {
    const btn = document.getElementById("downloadPdfBtn");
    if (!btn) return;
    const handler = async () => {
      const el = document.querySelector("#proposal-root");
      if (!el) return;
      const canvas = await html2canvas(el, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("proposal.pdf");
    };
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, [data]);

  return (
    <div id="proposal-root" className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Proposal Preview</h1>
          <p className="text-sm text-slate-500">Generated: {new Date(metadata?.generatedAt || Date.now()).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 2))}
            className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50"
          >
            Copy JSON
          </button>
          <button id="downloadPdfBtn" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
            Download PDF
          </button>
        </div>
      </header>

      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Executive Summary</h2>
        <p className="text-slate-700">{proposal.executiveSummary}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white rounded-lg shadow p-5">
            <h3 className="font-semibold mb-2">Proposed Solution</h3>
            <p className="text-slate-700">{proposal.proposedSolution}</p>

            <h4 className="mt-4 font-medium">Scope of Work</h4>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              {proposal.scopeOfWork?.map((s, i) => <li key={i}>{s}</li>)}
            </ul>

            <h4 className="mt-4 font-medium">Deliverables</h4>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              {proposal.deliverables?.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow p-5">
            <h3 className="font-semibold mb-2">Problem Statement</h3>
            <p className="text-slate-700">{proposal.problemStatement}</p>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold mb-2">Quick Facts</h4>
            <dl className="text-sm text-slate-700 space-y-2">
              <div className="flex justify-between"><dt>Budget</dt><dd>{analysis.budgetRange || "TBD"}</dd></div>
              <div className="flex justify-between"><dt>Timeline</dt><dd>{analysis.timeline || "TBD"}</dd></div>
              <div className="flex justify-between"><dt>Industry</dt><dd>{analysis.industry || "TBD"}</dd></div>
            </dl>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold mb-2">Recommendations</h4>
            <ul className="space-y-2">
              {recommendations?.map((r, i) => (
                <li key={i} className="border rounded p-2">
                  <div className="flex justify-between"><strong>{r.title}</strong><span className="text-xs text-slate-500">{r.priority}</span></div>
                  <p className="text-sm text-slate-600 mt-1">{r.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
