📄 README.md — Sales Proposal Generator (AI + OCR Enabled)
🚀 Sales Proposal Generator

Generate high-quality business proposals instantly from uploaded PDFs — including scanned PDFs via OCR (Tesseract.js).
Built with React + Vite, featuring a clean corporate UI and offline-first extraction.

📌 Features
🔍 Document Upload & Extraction

Upload any PDF (text-based or scanned)
Local extraction using pdf.js
Automatic OCR fallback for scanned/image-only PDFs using Tesseract.js
No backend required — everything runs in the browser

🤖 AI-Style Smart Proposal Generation

Executive Summary
Problem Understanding
Recommendations (keyword-based)
Pricing Tiers (3-tier model)
Timeline & Milestones
Terms & Conditions
Next Steps / CTA

🎨 Beautiful UI

Clean corporate theme
Proposal Preview layout
Color-coded timeline
Editable sections
Download/Print as HTML/PDF
Save Draft (session-based)

📁 Zero Server Upload
Your documents never leave your browser.

🛠️ Tech Stack
Area	Technology
Frontend Framework	React (Vite)
UI Layer	TailwindCSS
PDF Processing	pdf.js
OCR Engine	Tesseract.js
Proposal Engine	Custom heuristic generator
Routing	React Router (SPA)

⚙️ Installation
1️⃣ Clone the repo
git clone https://github.com/VIKHYATH-KS/Sales-Proposal.git
cd Sales-Proposal

2️⃣ Install dependencies
npm install

3️⃣ Run the project
npm start


Your app will start at:
http://localhost:5173


(or whatever port Vite selects)

📤 Deploy
🌐 Deployment Options
The app is fully frontend-only — ideal for:
Vercel (recommended)
Netlify
GitHub Pages
Let me know if you want deployment instructions.

📷 Screenshots

You can add your own screenshots later.
Example placeholders:

Upload PDF Page	Generated Proposal Page

	
💡 How It Works
🧠 Workflow
User uploads PDF
extractTextFromPDF() runs:
pdf.js text extraction
OCR fallback if needed
Text store in sessionStorage
Proposal Generation engine creates:
Summary
Problem definition
Recommendations
Pricing
Timeline
UI renders a corporate-style proposal

📌 Project Structure
src/
  pages/
    upload-document/
    proposal-generation/
    proposal-preview/
  services/
    pdfExtractor.js     → PDF + OCR logic
    proposalGenerator.js → Smart local generator
public/
  pdf.worker.min.mjs     → pdf.js worker

✨ Roadmap

 API-based LLM enhancement for higher-quality proposals
 Cloud OCR for heavy enterprise documents
 User accounts + saved proposals
 Project dashboard
 Dark mode

📝 License

MIT License
You are free to use, modify, and distribute.

💬 Support
If you want help deploying, improving UI, or adding AI-based proposal generation — just ask!
vikhyath010@gmail.com
