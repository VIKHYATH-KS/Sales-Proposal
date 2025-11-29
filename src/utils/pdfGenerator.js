// src/utils/pdfGenerator.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * generateAgencyPdf(rootElement, filename)
 * - rootElement: DOM node that contains the proposal view (we will snapshot sections inside)
 * - filename: "proposal.pdf"
 */
export async function generateAgencyPdf(rootElement, filename = "proposal.pdf") {
  if (!rootElement) throw new Error("Missing rootElement for PDF generation.");
  const doc = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  // target sections (these class names are used in the premium component)
  const selectors = [
    ".proposal-cover",
    ".executive-summary-section",
    ".proposal-details-section",
    ".pricing-section",
    ".recommendations-section"
  ];

  // collect nodes; if none found, snapshot entire rootElement
  const nodes = selectors.map(sel => rootElement.querySelector(sel)).filter(Boolean);
  if (nodes.length === 0) nodes.push(rootElement);

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    // render node to canvas (scale=2 for crispness)
    const canvas = await html2canvas(node, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const imgProps = doc.getImageProperties(imgData);
    const imgW = pageW;
    const imgH = (imgProps.height * imgW) / imgProps.width;

    if (imgH <= pageH) {
      doc.addImage(imgData, "PNG", 0, 0, imgW, imgH);
    } else {
      // If image is taller than page, slice vertically
      const canvasH = canvas.height;
      let y = 0;
      // px per pdf-px ratio
      const pxPerPdfPx = canvas.height / imgH;
      while (y < canvasH) {
        const sliceCanvas = document.createElement("canvas");
        const sliceH = Math.min(canvasH - y, Math.floor(pageH * pxPerPdfPx));
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceH;
        const ctx = sliceCanvas.getContext("2d");
        ctx.drawImage(canvas, 0, y, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
        const sliceData = sliceCanvas.toDataURL("image/png");
        const sliceImgProps = doc.getImageProperties(sliceData);
        const sliceImgW = pageW;
        const sliceImgH = (sliceImgProps.height * sliceImgW) / sliceImgProps.width;
        doc.addImage(sliceData, "PNG", 0, 0, sliceImgW, sliceImgH);
        y += sliceH;
        if (y < canvasH) doc.addPage();
      }
    }

    if (i < nodes.length - 1) doc.addPage();
  }

  doc.save(filename);
}
