# Vexport Global Exports | Official B2B Agro & Spices Portal

[![Website](https://img.shields.io/badge/Website-vexport.co.in-0A3622.svg)](https://vexport.co.in)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success.svg)]()
[![License](https://img.shields.io/badge/License-Proprietary-blue.svg)]()

> India's premier export house for APEDA & Spices Board registered agricultural commodities: Sangli Turmeric, Malabar Black Pepper, Alleppey Cardamom, Guntur Chillies, 1121 XXL Basmati Rice, Jumbo Kabuli Chickpeas, and Lasalgaon Export Red Onions.

---

## 🌟 Key Features

1. **3-Step Smart Produce Router:** Real-time commodity filtering with live packhouse readiness status, packaging types, container capacity, and sea transit times across major global discharge ports (Jebel Ali, Dammam, Rotterdam, Singapore, New York).
2. **Interactive Catalog & Deep Specifications:** Category tabs for Whole Spices, Ground Spices, Basmati Rice, Pulses, Fresh Cold-Chain Produce, and Value-Added Products (Dehydrated, Herbal, IQF).
3. **Dynamic Product Detail Engine (`product-detail.html`):** Parameter-driven product profiles (`?product=sangli-turmeric`, `?product=1121-basmati-rice`, etc.) with image galleries, zoom inspection, technical HPLC laboratory specs, incoterms, packaging options, and pre-filled inquiry triggers.
4. **Instant RFQ Modal & Rate Sheet Drawer:** Rapid commercial quote requests and indicative FOB/CIF Nhava Sheva rate estimations.
5. **Smart WhatsApp Desk:** Quick prompt chips pre-filled for container inquiries, FOB price requests, and export catalogs.
6. **Non-Technical Visual Admin Studio (`/admin/`):** Full browser-based CMS allowing any team member to add products, modify descriptions, update HS codes, edit Mandi rate ranges, and export updated catalog files without writing code.

---

## 📁 Repository Structure

```
├── admin/
│   ├── index.html            # Visual Admin CMS Dashboard for non-technical team members
│   ├── admin.js              # Admin controller for adding/editing products & data export
│   ├── decap.html            # Decap CMS standalone entry point
│   └── config.yml            # Decap CMS YAML configuration
├── assets/
│   ├── css/
│   │   ├── style.css         # Master styling & design system
│   │   └── product-detail.css # Dynamic product profile styles
│   ├── js/
│   │   ├── app.js            # Main interactive engine (modals, drawers, router, tabs)
│   │   ├── product-data.js   # Authoritative product specifications dataset
│   │   └── product-detail.js # Dynamic product page renderer
│   └── images/               # High-resolution export photography & batch photos
├── index.html                # Master homepage
├── product-detail.html       # Dynamic product profile view
├── sync-to-github.bat        # 1-Click Windows batch script to push local edits to GitHub
├── sync-to-github.ps1        # 1-Click PowerShell script to push local edits to GitHub
└── README.md                 # Documentation & team onboarding guide
```

---

## 👥 How Team Members Can Add or Edit Products

### Option 1: Using the Visual Admin Panel (Zero Code)
1. Open `admin/index.html` in your browser (or visit `yourwebsite.com/admin/`).
2. Click **"Add New Product"** or click **"Edit"** on any existing commodity.
3. Fill in the form fields (Product Name, Category, Origin, HS Code, MOQ, Packaging).
4. Click **"Save Product Changes"**.
5. Click **"Export / Download Data"** to download the updated `product-data.js` and place it into `assets/js/`.

### Option 2: Editing Directly in GitHub (Browser VS Code)
1. Navigate to this repository on GitHub: `https://github.com/shanawazvibecode/vexport-website`.
2. Press the `.` (period) key on your keyboard. This opens GitHub's web-based Visual Studio Code in your browser.
3. Open `assets/js/product-data.js` to modify text, specs, or add new commodities.
4. Click the Source Control tab on the left and hit **Commit & Push**.
5. When connected to Vercel/Cloudflare, your live website will update in under 15 seconds.

### Option 3: Local Editing via Antigravity / IDE
1. Make your changes in code or let the AI assist you.
2. Double-click `sync-to-github.bat` or run:
   ```powershell
   .\sync-to-github.ps1 "Updated product specifications"
   ```
3. All files will be automatically staged, committed, and pushed to GitHub.

---

## 🚀 How to Host on Vercel (When Ready)

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New Project"** and select `vexport-website`.
3. Keep default settings (Framework Preset: *Other*) and click **Deploy**.
4. In under 1 minute, your website will be live 24/7 with a free global CDN and SSL certificate.
5. In **Settings → Domains**, add your custom domain (`vexport.co.in`).
