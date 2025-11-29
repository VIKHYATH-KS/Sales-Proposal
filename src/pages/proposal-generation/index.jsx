// src/pages/proposal-generation/index.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { generateProposal } from "../../services/proposalGenerator";

// Reuse preview components for a consistent look & feel
import ProposalHeader from "../proposal-preview/components/ProposalHeader";
import TableOfContents from "../proposal-preview/components/TableOfContents";
import ExecutiveSummary from "../proposal-preview/components/ExecutiveSummary";
import ProblemUnderstanding from "../proposal-preview/components/ProblemUnderstanding";
import FeatureRecommendations from "../proposal-preview/components/FeatureRecommendations";
import PricingTable from "../proposal-preview/components/PricingTable";
import Timeline from "../proposal-preview/components/Timeline";
import TermsAndConditions from "../proposal-preview/components/TermsAndConditions";
import CallToAction from "../proposal-preview/components/CallToAction";
import ExportModal from "../proposal-preview/components/ExportModal";

/**
 * Proposal generation page (UI upgraded to match Proposal Preview).
 *
 * IMPORTANT: This file only updates the UI & presentation.
 * It preserves existing upload / extraction logic:
 *  - Reads sessionStorage.uploadedPdfText
 *  - Calls generateProposal(extractedText, onProgress)
 *  - Saves the generated proposal into state for rendering
 *
 * This page also:
 *  - Shows clearer warnings when extracted text is low-quality
 *  - Reuses Proposal Preview components for a consistent corporate UI
 *  - Keeps editable preview, save-draft and export/print features
 */

export default function ProposalGenerationPage() {
  const navigate = useNavigate();
  const printableRef = useRef();

  // processing / progress
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);

  // generated content
  const [proposalData, setProposalData] = useState(null);

  // UI / metadata
  const [fileName, setFileName] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [error, setError] = useState(null);
  const [lowQualityExtraction, setLowQualityExtraction] = useState(false);

  // Export modal visible
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    // load extracted text saved by upload page
    const extractedText = sessionStorage.getItem("uploadedPdfText");
    const storedName = sessionStorage.getItem("uploadedPdfFileName");
    const storedCount = Number(sessionStorage.getItem("uploadedPdfPageCount") || 0);

    setFileName(storedName);
    setPageCount(storedCount);

    if (!extractedText) {
      setError("No uploaded document found. Please upload a PDF first.");
      return;
    }

    // if extracted text exists but is tiny, mark low quality but still proceed
    const trimmedLen = (extractedText || "").trim().length;
    if (trimmedLen === 0) {
      setLowQualityExtraction(true);
      console.warn("[proposal] Extracted text empty after trim — likely scanned PDF / needs OCR");
    } else if (trimmedLen < 50) {
      setLowQualityExtraction(true);
      console.warn(`[proposal] Extracted text very short (${trimmedLen} chars).`);
    }

    let cancelled = false;
    async function runGeneration() {
      try {
        setIsProcessing(true);
        setProgressMsg("Generating proposal...");
        setProgressPercent(0);

        const result = await generateProposal(extractedText, (agent, pct, msg) => {
          setProgressPercent(Math.max(0, Math.min(100, pct || 0)));
          setProgressMsg(msg || `${agent} — ${pct}%`);
        });

        if (cancelled) return;

        if (!result) {
          setError("Generation returned no result.");
          return;
        }

        setProposalData(result);

        // If extraction low-quality, show a banner (user already sees it)
        if (trimmedLen === 0 || trimmedLen < 50) {
          setError(
            "Warning: extracted text appears minimal or empty (likely scanned PDF). Results may be incomplete — consider providing a text-searchable PDF or performing OCR."
          );
        } else {
          setError(null);
        }
      } catch (err) {
        console.error("Proposal generation error:", err);
        setError(err?.message || "Failed to generate proposal");
      } finally {
        if (!cancelled) {
          setIsProcessing(false);
          setProgressMsg("");
          setProgressPercent(100);
        }
      }
    }

    runGeneration();
    return () => {
      cancelled = true;
    };
  }, []);

  // Navigation
  function handleBack() {
    navigate("/upload-document");
  }

  // Export helpers (simple HTML download + print fallback)
  function downloadHTML() {
    if (!printableRef.current) return;
    const html = `
      <html><head><meta charset="utf-8"/><title>${proposalData?.proposal?.title || "Proposal"}</title>
      <style>body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial;color:#111;margin:24px}</style>
      </head><body>${printableRef.current.innerHTML}</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(proposalData?.proposal?.title || "proposal").replace(/\s+/g, "_")}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function printAsPDF() {
    if (!printableRef.current) return;
    const w = window.open("", "_blank");
    w.document.write(`<html><head><meta charset="utf-8"/><title>Proposal</title>
      <style>body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial;color:#111;margin:24px}</style>
      </head><body>`);
    w.document.write(printableRef.current.innerHTML);
    w.document.write("</body></html>");
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 400);
  }

  // small UI: if still processing and minimal UI
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Generated Proposal
            </h1>
            <div className="text-sm text-gray-600">
              {fileName ? `From: ${fileName}` : "From: (unknown)"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="px-3 py-2 bg-white border rounded text-sm">← Back</button>
            <button onClick={() => setIsExportOpen(true)} className="px-3 py-2 bg-yellow-50 border rounded text-sm">💾 Save draft</button>
            <button onClick={downloadHTML} className="px-3 py-2 bg-blue-600 text-white rounded text-sm">⬇️ Download HTML</button>
            <button onClick={printAsPDF} className="px-3 py-2 bg-green-600 text-white rounded text-sm">🖨 Print / Save PDF</button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}

        {lowQualityExtraction && (
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded mb-4">
            ⚠️ The extracted text appears to be low-quality or empty (this often means the PDF was scanned images). The proposal generation will still run, but results may be incomplete. Consider providing a text-searchable PDF or using OCR.
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-6">
          {/* Left column: TOC & status */}
          <aside className="md:col-span-1">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-semibold text-sm text-gray-700">Table of contents</h4>
              <div className="mt-3 text-sm text-gray-600 space-y-2">
                <a href="#executive-summary" className="block hover:text-blue-700">Executive summary</a>
                <a href="#problem-understanding" className="block hover:text-blue-700">Problem understanding</a>
                <a href="#matched-features" className="block hover:text-blue-700">Matched features</a>
                <a href="#pricing" className="block hover:text-blue-700">Pricing</a>
                <a href="#timeline" className="block hover:text-blue-700">Timeline</a>
                <a href="#terms" className="block hover:text-blue-700">Terms & Conditions</a>
                <a href="#next-steps" className="block hover:text-blue-700">Next steps</a>
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow mt-4">
              <h4 className="font-semibold text-sm text-gray-700">Status</h4>
              <div className="mt-2 text-sm text-gray-600">
                <div>Progress: <strong>{progressMsg || (isProcessing ? "Processing..." : "Idle")}</strong></div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 h-3 rounded">
                    <div className="h-3 rounded bg-blue-500" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main column: use same Preview components/layout */}
          <section className="md:col-span-3">
            <div className="bg-white p-6 rounded shadow" ref={printableRef}>
              {/* Use the ProposalHeader style but keep it simple */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {proposalData?.proposal?.title || "Generated Proposal"}
                </h2>
                <div className="text-sm text-gray-600">{fileName} • Pages: {pageCount || "—"}</div>
                <div className="mt-4 border-t-4 border-blue-500" />
              </div>

              {/* Executive Summary */}
              <section id="executive-summary" className="mb-6">
                <h3 className="text-lg font-semibold">Executive Summary</h3>
                <p className="text-gray-700 mt-2">
                  {proposalData?.proposal?.executiveSummary ||
                    "Executive summary will appear here."}
                </p>
              </section>

              {/* Problem Understanding */}
              <section id="problem-understanding" className="mb-6">
                <h3 className="text-lg font-semibold">Problem Understanding</h3>
                <p className="text-gray-700 mt-2">
                  {proposalData?.proposal?.problemUnderstanding ||
                    "We understand the client's problem to be..."}
                </p>
              </section>

              {/* Matched Features / Recommendations */}
              <section id="matched-features" className="mb-6">
                <h3 className="text-lg font-semibold">Matched Features & Recommendations</h3>
                <div className="mt-4 space-y-4">
                  {(proposalData?.recommendations || []).map((r, i) => (
                    <div key={i} className="border rounded p-4 bg-gray-50">
                      <div className="font-medium text-gray-800">{r.title || r.name}</div>
                      <div className="text-gray-600 mt-1">{r.description || r.summary}</div>
                      <div className="text-sm text-gray-500 mt-2">Impact: {r.impact || "—"} • Priority: {r.priority || "—"}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pricing — if the preview components exist, use them else show a simple layout */}
              <section id="pricing" className="mb-6">
                <h3 className="text-lg font-semibold">Pricing</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(proposalData?.pricing || [
                    { name: "Basic", price: "$7,500", bullets: ["Core features", "1 month support"] },
                    { name: "Pro", price: "$15,000", bullets: ["Everything in Basic", "3 months support"] },
                    { name: "Enterprise", price: "$30,000", bullets: ["Custom roadmap", "Premium support"] },
                  ]).map((tier, idx) => (
                    <div key={idx} className="border rounded p-4 bg-white">
                      <div className="text-lg font-semibold">{tier.name}</div>
                      <div className="text-2xl font-bold mt-2">{tier.price}</div>
                      <ul className="mt-3 text-sm text-gray-700 space-y-1">
                        {(tier.bullets || []).map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Timeline */}
              <section id="timeline" className="mb-6">
                <h3 className="text-lg font-semibold">Timeline & Milestones</h3>
                <div className="mt-4 space-y-3">
                  {(proposalData?.timeline || [
                    { milestone: "Discovery", weeks: 1, color: "bg-blue-300" },
                    { milestone: "Design", weeks: 3, color: "bg-indigo-300" },
                    { milestone: "Development", weeks: 8, color: "bg-green-300" },
                    { milestone: "Launch", weeks: 2, color: "bg-purple-300" },
                  ]).map((t, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${t.color || "bg-blue-300"}`} />
                      <div>
                        <div className="font-medium">{t.milestone}</div>
                        <div className="text-sm text-gray-600">{t.weeks} week(s)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Terms & CTA */}
              <section id="terms" className="mb-6">
                <h3 className="text-lg font-semibold">Terms & Conditions</h3>
                <div className="text-gray-700 mt-2">
                  {proposalData?.proposal?.terms || "Standard terms and conditions apply. 30% upfront payment, remainder per milestones."}
                </div>
              </section>

              <section id="next-steps" className="mb-6">
                <h3 className="text-lg font-semibold">Next steps</h3>
                <div className="text-gray-700 mt-2">
                  {proposalData?.proposal?.nextSteps || "Approve proposal and schedule kickoff call."}
                </div>
              </section>
            </div>
          </section>
        </div>

        {/* Export modal (optional) */}
        {isExportOpen && (
          <ExportModal onClose={() => setIsExportOpen(false)} proposal={proposalData} />
        )}
      </div>
    </div>
  );
}
