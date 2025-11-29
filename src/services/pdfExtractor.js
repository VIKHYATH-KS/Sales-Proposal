// src/services/pdfExtractor.js
// PDF text extraction with robust OCR fallback (Tesseract.js).
//
// This version handles multiple tesseract.js export shapes:
// - Preferred: createWorker() -> worker.load()/worker.recognize()
// - Fallback: Tesseract.recognize(image, 'eng') if worker methods absent
//
// Keep pdf.worker.min.mjs (or .js) in public/ and adjust workerSrc if needed.

import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";

// adjust to the worker file you put in public (mjs or js)
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export async function extractTextFromPDF(file, opts = {}) {
  if (!file) throw new Error("No file provided to extractTextFromPDF");

  const MAX_PAGES_TO_READ = opts.maxPages || 250;
  const MAX_OCR_PAGES = opts.maxOcrPages || 10;
  const OCR_TEXT_THRESHOLD = opts.ocrThreshold || 50;
  const OCR_SCALE = opts.ocrScale || 2.0;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages || 0;

    // First attempt: text extraction using pdfjs
    let fullText = "";
    const pagesToRead = Math.min(numPages, MAX_PAGES_TO_READ);
    for (let p = 1; p <= pagesToRead; p++) {
      try {
        const page = await pdfDoc.getPage(p);
        const content = await page.getTextContent();
        const pageText = (content && content.items) ? content.items.map((it) => it.str).join(" ") : "";
        fullText += pageText + "\n\n";
      } catch (pageErr) {
        console.warn(`pdfjs getTextContent failed for page ${p}:`, pageErr);
      }
    }

    const truncated = numPages > pagesToRead;

    // metadata 
    const emailMatches = (fullText.match(/[\w.+-]+@[\w-]+\.[\w.-]+/g) || []);
    const phoneMatches = (fullText.match(/(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g) || []);

    // If text is enough, skip OCR
    if ((fullText || "").trim().length >= OCR_TEXT_THRESHOLD) {
      console.log("PDF extraction produced sufficient text; skipping OCR. length=", (fullText || "").length);
      return {
        text: fullText,
        pageCount: numPages,
        truncated,
        ocr: { used: false, pagesProcessed: 0 },
        metadata: { emails: emailMatches, phones: phoneMatches },
      };
    }

    // Need OCR fallback
    console.log(`Extracted text short (len=${(fullText || "").length}). Starting OCR fallback (up to ${MAX_OCR_PAGES} pages).`);

    // dynamic import of tesseract
    let Tesseract;
    try {
      Tesseract = await import("tesseract.js");
    } catch (e) {
      console.error("Failed to import tesseract.js; OCR unavailable.", e);
      return {
        text: fullText,
        pageCount: numPages,
        truncated,
        ocr: { used: false, pagesProcessed: 0 },
        metadata: { emails: emailMatches, phones: phoneMatches },
      };
    }

    // Determine available API surface
    const pagesForOcr = Math.min(numPages, MAX_OCR_PAGES);
    let ocrText = "";
    let pagesProcessed = 0;

    // If createWorker exists, attempt worker-based flow (recommended)
    const createWorker = Tesseract && (Tesseract.createWorker || Tesseract.createWorker?.default || Tesseract.createWorker);
    if (createWorker) {
      try {
        const worker = createWorker({
          // logger: (m) => console.log("Tesseract:", m),
        });

        // worker may be a promise or immediate; ensure we have the object
        // Many tesseract versions return worker object directly.
        // call load / loadLanguage / initialize only if present.
        if (typeof worker.then === "function") {
          // createWorker returned a promise (rare) - await it
          // eslint-disable-next-line no-await-in-loop
          const resolved = await worker;
          // use resolved as worker
          // ensure methods exist
          if (resolved.load && resolved.loadLanguage && resolved.initialize) {
            await resolved.load();
            await resolved.loadLanguage("eng");
            await resolved.initialize("eng");
          } else {
            throw new Error("Tesseract worker resolved but required methods missing.");
          }

          for (let p = 1; p <= pagesForOcr; p++) {
            try {
              const page = await pdfDoc.getPage(p);
              const viewport = page.getViewport({ scale: OCR_SCALE });
              const canvas = (typeof OffscreenCanvas !== "undefined")
                ? new OffscreenCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
                : document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              canvas.width = Math.ceil(viewport.width);
              canvas.height = Math.ceil(viewport.height);
              const renderTask = page.render({ canvasContext: ctx, viewport });
              await renderTask.promise;

              let inputForTesseract = canvas;
              if (typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
                const blob = await canvas.convertToBlob();
                const bitmap = await createImageBitmap(blob);
                inputForTesseract = bitmap;
              }

              console.log(`OCR(worker): processing page ${p}/${pagesForOcr}`);
              const { data } = await resolved.recognize(inputForTesseract);
              ocrText += (data?.text || "") + "\n\n";
              pagesProcessed++;
            } catch (pageErr) {
              console.warn(`OCR(worker) failed on page ${p}:`, pageErr);
            }
          }

          try {
            await resolved.terminate();
          } catch (e) {
            console.warn("Failed to terminate tesseract worker (resolved):", e);
          }
        } else {
          // worker is immediate object with methods
          if (worker.load && worker.loadLanguage && worker.initialize) {
            await worker.load();
            await worker.loadLanguage("eng");
            await worker.initialize("eng");
          } else {
            throw new Error("Tesseract worker object missing load/loadLanguage/initialize methods.");
          }

          for (let p = 1; p <= pagesForOcr; p++) {
            try {
              const page = await pdfDoc.getPage(p);
              const viewport = page.getViewport({ scale: OCR_SCALE });
              const canvas = (typeof OffscreenCanvas !== "undefined")
                ? new OffscreenCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
                : document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              canvas.width = Math.ceil(viewport.width);
              canvas.height = Math.ceil(viewport.height);
              const renderTask = page.render({ canvasContext: ctx, viewport });
              await renderTask.promise;

              let inputForTesseract = canvas;
              if (typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
                const blob = await canvas.convertToBlob();
                const bitmap = await createImageBitmap(blob);
                inputForTesseract = bitmap;
              }

              console.log(`OCR(worker): processing page ${p}/${pagesForOcr}`);
              const { data } = await worker.recognize(inputForTesseract);
              ocrText += (data?.text || "") + "\n\n";
              pagesProcessed++;
            } catch (pageErr) {
              console.warn(`OCR(worker) failed on page ${p}:`, pageErr);
            }
          }

          try {
            await worker.terminate();
          } catch (e) {
            console.warn("Failed to terminate tesseract worker:", e);
          }
        }
      } catch (workerErr) {
        console.warn("Worker-based OCR failed; attempting recognize() fallback. Error:", workerErr);
        // fall through to recognize() fallback below
      }
    }

    // If we didn't get any OCR text yet, try the simple recognize() fallback
    if (!ocrText || ocrText.trim().length === 0) {
      const recognizeFn = Tesseract && (Tesseract.recognize || Tesseract.default?.recognize || Tesseract.recognize);
      if (recognizeFn) {
        console.log("Using Tesseract.recognize() fallback for OCR.");
        for (let p = 1; p <= pagesForOcr; p++) {
          try {
            const page = await pdfDoc.getPage(p);
            const viewport = page.getViewport({ scale: OCR_SCALE });
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = Math.ceil(viewport.width);
            canvas.height = Math.ceil(viewport.height);
            const renderTask = page.render({ canvasContext: ctx, viewport });
            await renderTask.promise;

            console.log(`OCR(recognize): processing page ${p}/${pagesForOcr}`);
            // use canvas directly
            const res = await recognizeFn(canvas, "eng", {});
            const textPage = res?.data?.text || res?.text || "";
            ocrText += textPage + "\n\n";
            pagesProcessed++;
          } catch (pageErr) {
            console.warn(`OCR(recognize) failed on page ${p}:`, pageErr);
          }
        }
      } else {
        console.warn("Tesseract fallback: no recognize() available.");
      }
    }

    const finalText = (ocrText && ocrText.trim().length > 0) ? ocrText : fullText;

    return {
      text: finalText,
      pageCount: numPages,
      truncated,
      ocr: { used: pagesProcessed > 0, pagesProcessed },
      metadata: { emails: emailMatches, phones: phoneMatches },
    };
  } catch (err) {
    console.error("extractTextFromPDF error:", err);
    throw err;
  }
}

export function isValidPDF(file) {
  if (!file) return false;
  const type = file.type || "";
  const name = file.name || "";
  return type === "application/pdf" || name.toLowerCase().endsWith(".pdf");
}
