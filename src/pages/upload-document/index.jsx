// src/pages/upload-document/index.jsx
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { extractTextFromPDF, isValidPDF } from "../../services/pdfExtractor";

export default function UploadDocumentPage() {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]); 
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState("");
  const [lastExtractInfo, setLastExtractInfo] = useState(null);

  const addFiles = useCallback(
    (files) => {
      setError(null);
      const arr = Array.from(files || []).filter((f) => f);
      if (!arr.length) return;

      const newItems = arr.map((file) => ({
        file,
        name: file.name,
        size: file.size,
        status: "pending",
      }));

      const combined = (fileList || []).concat(newItems).slice(0, 5);
      setFileList(combined);
    },
    [fileList]
  );

  function onInputChange(e) {
    addFiles(e.target.files);
    e.target.value = null;
  }

  function onDrop(e) {
    e.preventDefault();
    if (e.dataTransfer?.files) {
      addFiles(e.dataTransfer.files);
    }
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  async function handleGenerateProposal() {
    setError(null);
    setLastExtractInfo(null);

    if (!fileList || fileList.length === 0) {
      setError("Please add at least one PDF before generating a proposal.");
      return;
    }

    const first = fileList[0].file;
    if (!isValidPDF(first)) {
      setError("Selected file is not a valid PDF.");
      return;
    }

    try {
      setIsProcessing(true);
      setProgressMsg("Extracting text from PDF...");
      console.log("[upload] Starting extraction for:", first.name, first.size);

      setFileList((prev) => {
        const copy = [...prev];
        if (copy[0]) copy[0].status = "processing";
        return copy;
      });

      const extracted = await extractTextFromPDF(first);
      console.log("[upload] Extraction result:", {
        pageCount: extracted?.pageCount,
        truncated: extracted?.truncated,
        textLength: extracted?.text?.length || 0,
      });

      try {
        const textToSave = extracted?.text || "";
        const MAX_SAVE_CHARS = 400000;

        if (textToSave.length > MAX_SAVE_CHARS) {
          sessionStorage.setItem("uploadedPdfText", textToSave.slice(0, MAX_SAVE_CHARS));
          sessionStorage.setItem("uploadedPdfTextTruncated", "true");
        } else {
          sessionStorage.setItem("uploadedPdfText", textToSave);
          sessionStorage.removeItem("uploadedPdfTextTruncated");
        }
      } catch (e) {
        console.error("[upload] Failed to write extracted text:", e);
        try {
          const fallback = (extracted?.text || "").slice(0, 1000);
          sessionStorage.setItem("uploadedPdfText", fallback);
          sessionStorage.setItem("uploadedPdfTextTruncated", "true");
        } catch (e2) {
          console.error("[upload] fallback write failed:", e2);
        }
      }

      sessionStorage.setItem("uploadedPdfFileName", first.name || "");
      sessionStorage.setItem("uploadedPdfPageCount", String(extracted?.pageCount || 0));

      const saved = sessionStorage.getItem("uploadedPdfText");
      console.log("[upload] saved length:", saved ? saved.length : "null");

      setFileList((prev) => {
        const copy = [...prev];
        if (copy[0]) copy[0].status = saved && saved.length > 0 ? "uploaded" : "failed";
        return copy;
      });

      setLastExtractInfo({
        savedLength: saved ? saved.length : 0,
        pageCount: extracted?.pageCount || 0,
        truncated: extracted?.truncated || false,
      });

      if (!saved || saved.length === 0) {
        setError("Extraction succeeded but text could not be saved.");
        return;
      }

      navigate("/proposal-generation");
    } catch (err) {
      console.error("[upload] Extraction error:", err);
      setError(err?.message || "Failed to extract PDF text");
      setFileList((prev) => {
        const copy = [...prev];
        if (copy[0]) copy[0].status = "failed";
        return copy;
      });
    } finally {
      setIsProcessing(false);
      setProgressMsg("");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Sales Proposal Generator</h1>
              <p className="text-sm text-gray-600">
                Upload a client brief or RFP PDF to generate a professional proposal.
              </p>
            </div>
            <span className="px-3 py-1 text-xs bg-blue-600 text-white rounded">Beta</span>
          </div>
        </header>

        <main className="grid md:grid-cols-3 gap-6">
          <section className="md:col-span-2">
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="rounded-lg border border-dashed border-gray-300 bg-white p-8 shadow-sm"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-md flex items-center justify-center bg-blue-50 text-blue-700">
                  ↑
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-medium text-gray-900">Drop PDF here or click to upload</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    We extract text locally — no upload to any server.
                  </p>
                  <div className="mt-4">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={onInputChange}
                      className="block"
                      id="fileInput"
                    />
                  </div>
                </div>
              </div>

              {fileList.length > 0 && (
                <div className="mt-6 space-y-3">
                  {fileList.map((f, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded border flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{f.name}</div>
                        <div className="text-xs text-gray-500">{Math.round(f.size / 1024)} KB • {f.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {progressMsg && (
                <div className="mt-4 text-sm text-gray-700">{progressMsg}</div>
              )}

              {lastExtractInfo && (
                <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                  <div>Saved text length: {lastExtractInfo.savedLength}</div>
                  <div>Pages extracted: {lastExtractInfo.pageCount}</div>
                  <div>Truncated: {String(lastExtractInfo.truncated)}</div>
                </div>
              )}

              {error && (
                <div className="mt-4 text-sm text-red-700 bg-red-50 p-3 rounded">
                  {error}
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="bg-white p-5 rounded shadow">
              <h3 className="text-sm font-semibold text-gray-700">Summary</h3>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <div>Files: {fileList.length}</div>
                <div>Selected: {fileList[0]?.name || "—"}</div>
              </div>

              <button
                onClick={handleGenerateProposal}
                disabled={isProcessing || fileList.length === 0}
                className="mt-4 w-full px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded disabled:opacity-60"
              >
                {isProcessing ? "Processing..." : "✨ Generate Proposal"}
              </button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
