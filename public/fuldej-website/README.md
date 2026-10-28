# Fuldej Integrated Services Ltd — Corporate Website Package

**Official Domain:** [https://fuldej.com.ng](https://fuldej.com.ng)  
**Corporate Affairs Commission (CAC) Registration:** RC 7360949  
**Target Hosting:** Truehost WebHosting Starter (Apache / cPanel Shared Hosting)

---

## 1. Project Overview & Architecture

This package contains the complete, lightweight, semantic, and production-ready corporate website for **Fuldej Integrated Services Ltd**, a Nigerian multidisciplinary technology and business development enterprise.

The codebase is built strictly with standard **HTML5, CSS3, Vanilla JavaScript, and PHP**:
- **Zero Node.js dependency** at runtime.
- **Zero build step required** — upload directly to cPanel `public_html`.
- Fully responsive across smartphones (320px+), tablets, laptops, and wide monitors.
- Accessible heading hierarchy, ARIA navigation states, and high color contrast.
- Centralized CSS variables for painless brand updating.

---

## 2. Directory Structure

```
fuldej-website/
├── index.html              # Homepage
├── about.html              # Corporate Overview, Mission, Values & Governance
├── services.html           # 6 Core Professional Divisions
├── projects.html           # Initiatives (SmartGrowth AI, SmartGreen, MGDI)
├── partnerships.html       # Strategic Alliances & Institutional Engagement
├── contact.html            # Contact Form & Office Coordinates
├── privacy.html            # Corporate Privacy Policy
├── 404.html                # Custom 404 Error Page
├── contact-submit.php      # Server-Side Contact Form Handler
├── robots.txt              # Search Engine Crawler Directives
├── sitemap.xml             # XML Sitemap (Canonical URLs)
├── .htaccess               # Apache Configuration (Caching, Security & Clean URLs)
├── DEPLOYMENT_GUIDE.md     # Step-by-Step Truehost cPanel Upload Guide
└── assets/
    ├── css/
    │   └── style.css       # Complete Corporate Stylesheet with CSS Variables
    ├── js/
    │   └── main.js         # Mobile Menu, Active Links, AJAX Form Handler
    ├── images/
    │   ├── fuldej_company_logo.jpg            # Official Fuldej Brand Logo
    │   ├── MGDI_Logo_updated_66e1dc7b.png     # MGDI Initiative Official Logo
    │   ├── SmartGrowthAI_Logo__1__b01bd855.png # SmartGrowth AI Official Logo
    │   └── Smartgreen_logo_18dde11c.jpg       # SmartGreen Official Logo
    └── docs/
        └── COMPANY_PROFILE__FULDEJ_INTEGRATED.pdf # Downloadable CAC Profile
```

---

## 3. How to Update Content & Styling

### A. Updating Brand Colors
All colors are centralized in `assets/css/style.css` under the `:root` selector:
```css
:root {
  --color-primary: #142B4A;       /* Deep Navy Blue */
  --color-accent: #168A78;        /* Tasteful Teal */
  --color-background: #FFFFFF;    /* Clean White */
  --color-surface: #F8FAFC;       /* Light Neutral */
  --color-text: #263445;          /* Crisp Body Text */
}
```
Modifying a variable here updates the color globally across all pages.

### B. Updating Contact Details & Address
Open `index.html`, `about.html`, `services.html`, `projects.html`, `partnerships.html`, and `contact.html`. Search for the contact information block in the footer or contact section:
- **Email:** `info@fuldej.com.ng`
- **Phone:** `+234 803 265 3578` / `+234 903 098 6923`
- **Office Address:** `White Container, BUK Old Campus Area, Opposite Laundry Junction, Kano State, Nigeria.`

### C. Updating Services
Open `services.html`. Each service is encapsulated within a `<div class="service-card" id="...">`. You can edit the title, paragraph description, and feature list with ordinary text editors.

### D. Updating Initiatives & Projects
Open `projects.html`. Each initiative card includes a status badge (`badge-pilot`, `badge-concept`, `badge-flagship`), objectives, target beneficiaries, and key activities.

### E. Replacing Logos or Images
Replace the corresponding file inside `assets/images/`:
- Fuldej logo: `assets/images/fuldej_company_logo.jpg`
- Partner marks: `assets/images/MGDI_Logo_updated_66e1dc7b.png`, `SmartGrowthAI_Logo__1__b01bd855.png`, `Smartgreen_logo_18dde11c.jpg`

---

## 4. Truehost cPanel Deployment Quick Steps

1. Compress the contents of `fuldej-website` into a ZIP file (or use `fuldej-website.zip`).
2. Log into your **cPanel** dashboard (provided by Truehost Nigeria).
3. Open **File Manager** and open `public_html`.
4. Click **Upload**, select the ZIP file, and upload.
5. In `public_html`, right-click the ZIP and select **Extract**.
6. Ensure that `index.html`, `about.html`, and `assets/` reside directly inside `public_html` (not inside a nested subfolder).
7. In cPanel, navigate to **SSL/TLS Status** and run **AutoSSL** to enable free HTTPS.
8. Test the live site at `https://fuldej.com.ng`.

Refer to `DEPLOYMENT_GUIDE.md` for full technical instructions.
