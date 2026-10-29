# 🚀 Shivam's Digital Portfolio & Universal Resume Platform

A modern, responsive, and high-performance **Digital Portfolio & Resume Website** built with **HTML5, CSS3, and JavaScript (Vanilla JS)**.

Designed from the ground up to showcase developer profiles (preconfigured for **Shivam Pandey — B.Tech CSE (AI & ML)**) while functioning as a **universal digital resume template** that *anybody* can customize, export, and deploy in minutes!

---

## ✨ Key Features

- 🎨 **Modern Developer Aesthetic**: Sleek glassmorphism cards, glowing gradient badges, micro-animations, and smooth transitions.
- 🌓 **Dark / Light Theme Toggle**: Persistent theme state with `localStorage` memory and smooth color mode switching.
- 🛠️ **In-Browser Resume Customizer**:
  - Anyone can open the **"Customize Resume"** modal to change names, titles, bio, skills, projects, experience, and education in real time.
  - Edits save instantly to browser `localStorage`.
  - **Export JSON**: Download your tailored resume data file (`my_resume_data.json`).
  - **Import JSON**: Upload your saved `.json` file to restore your portfolio instantly.
  - **One-Click Reset**: Easily toggle between Shivam's preset and a clean template.
- 📄 **ATS-Ready 1-Click PDF Export**:
  - Click **"Print / PDF"** to generate an ATS-friendly, clean single or two-page printed resume.
  - Custom `@media print` CSS cleanly strips web navigation, theme toggles, and backgrounds for ink-friendly printing.
- 🔍 **Live Skills Search & Highlighting**: Instant keystroke search to filter skills (Python, OpenCV, Java, HTML5, etc.).
- ⌨️ **Dynamic Typewriter Header**: Rotating animated titles displaying key engineering domains.
- 📱 **100% Mobile & Tablet Responsive**: Optimized flexbox and grid layouts for phones, tablets, and ultrawide screens.
- ⚡ **Zero Dependencies & Blazing Fast**: Pure vanilla HTML/CSS/JS with zero build steps or heavyweight frameworks (100/100 Lighthouse performance).

---

## 📁 Project Directory Structure

```text
my resume/
├── index.html              # Main semantic HTML5 webpage
├── css/
│   └── style.css           # Styling, themes, animations & @media print rules
├── js/
│   ├── defaultData.js      # Structured resume data (Shivam Pandey default data)
│   └── script.js           # Dynamic DOM renderer, customizer logic & animations
├── assets/
│   ├── avatar.svg          # Modern avatar vector illustration
│   └── favicon.svg         # Tab favicon logo
├── resume-data.json        # Portable JSON format resume template
├── shivamresume (1).pdf    # Original reference resume
└── README.md               # Documentation & deployment guide
```

---

## 🏃 How to Run Locally

You do **not** need any compilers, npm packages, or build steps.

### Option 1: Direct Browser Opening (Quickest)
1. Navigate to the `my resume` folder on your computer.
2. Double-click **`index.html`** to launch it directly in Chrome, Edge, Brave, or Firefox.

### Option 2: Live Server (Recommended for Live Reloading)
If you have VS Code installed:
1. Open the folder in **VS Code**.
2. Right-click `index.html` and click **"Open with Live Server"**.

Alternatively, via PowerShell / Terminal:
```powershell
# Using Python (if installed)
python -m http.server 8000

# Or using npx
npx serve
```
Then visit: `http://localhost:8000`

---

## ✏️ How Anyone Can Make This Their Own Resume

There are two easy ways:

### Method A: Through the Website (No Coding Required)
1. Open the website.
2. Click the **"Customize Resume"** button in the navigation bar.
3. Edit your name, contact links, bio, skills, projects, and education.
4. Click **"Apply & Save Changes"** — the site updates immediately!
5. Click **"Export JSON"** to save your personal resume data for future use.

### Method B: Directly in the Code
1. Open `js/defaultData.js` in any text editor (VS Code, Notepad, etc.).
2. Replace the text under `name`, `titles`, `skills`, `projects`, etc. with your own details.
3. Save the file and refresh your browser!

---

## 🌐 Free 1-Click Deployment Guide

You can host this website online for free using any of these popular platforms:

### 1. Deploying to GitHub Pages (Recommended)
1. Initialize Git in the project folder (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit of digital resume portfolio"
   ```
2. Create a new public repository on [GitHub](https://github.com/new) named `my-digital-resume` (or `<your-username>.github.io`).
3. Link your remote repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/my-digital-resume.git
   git push -u origin main
   ```
4. On GitHub, go to **Settings** > **Pages**.
5. Under **Branch**, select `main` and root `/`, then click **Save**.
6. Your portfolio will be live at:
   `https://<your-username>.github.io/my-digital-resume/`

---

### 2. Deploying to Netlify (Drag-and-Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Simply **drag and drop** the entire `my resume` folder into the upload box.
3. In 5 seconds, Netlify generates a free live URL (e.g., `https://your-resume.netlify.app`) with free SSL!

---

### 3. Deploying to Vercel
1. Install Vercel CLI or visit [vercel.com](https://vercel.com).
2. Import your GitHub repository or run `npx vercel` in the project folder.
3. Keep default settings and click **Deploy**.

---

## 📄 License & Attribution

Designed and engineered with ❤️ using semantic HTML5, modern CSS3, and Vanilla JavaScript. Feel free to clone, customize, and share!
