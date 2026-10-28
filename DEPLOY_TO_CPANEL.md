# Deployment Guide: Fuldej Integrated Service Ltd (cPanel Shared Hosting)

This guide provides instructions for deploying the **Fuldej Integrated Service Ltd** portal to a conventional **cPanel shared hosting account** (such as Truehost, Namecheap, Bluehost, or any Apache/LiteSpeed web host), and keeping it synchronized with GitHub and AI Studio.

---

## 1. Project Architecture Assessment

- **Application Type**: Framework-based Single-Page Application (SPA).
- **Core Stack**: React 19, TypeScript, Tailwind CSS, Vite.
- **Node.js Server Requirement**: **None**. The production output is 100% static client-side HTML, CSS, JavaScript, and media assets. It runs directly on conventional Apache/LiteSpeed web servers without requiring a Node.js daemon.
- **Backend Email Processing**: Includes `contact-submit.php` for native cPanel PHP mail dispatch to `info@fuldej.com.ng`, backed up by client-side mailto and WhatsApp dispatch.
- **Credentials & API Keys**: Zero private secrets or sensitive API keys are exposed or required in the frontend build.

---

## 2. Production Build Output

- **Target Build Directory**: `dist/`
- **Single Archive Package**: `dist/fuldej-production-build.zip` (ready for 1-click upload and extraction in cPanel File Manager).
- **Primary Entry File**: `dist/index.html`
- **Server Configuration**: `dist/.htaccess` (handles HTTPS enforcement, SPA route fallbacks, Gzip/Deflate compression, and caching headers).

---

## 3. How to Build the Project

Run the following commands in the project root directory:

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Type-check the codebase
npm run lint

# 3. Generate the production static build
npm run build
```

This compiles all React components and packages static assets into the `dist/` folder.

---

## 4. How to Deploy to cPanel (Step-by-Step)

### Option A: Upload via cPanel File Manager (Fastest & Simplest)

1. Log in to your **cPanel dashboard**.
2. Open **File Manager** and navigate to your website's document root (typically `public_html/` or `public_html/fuldej.com.ng`).
3. If there are old placeholder files (like default `index.html`), delete or back them up.
4. Click **Upload** in the top toolbar and select:
   - `dist/fuldej-production-build.zip`
5. Once uploaded, right-click `fuldej-production-build.zip` in File Manager and select **Extract**.
6. Ensure the extracted files (including `.htaccess`, `index.html`, `contact-submit.php`, and the `assets/` directory) are located directly inside `public_html/` (not nested inside an extra subfolder).
7. Delete the `.zip` file from the server to save disk space.
8. Visit `https://fuldej.com.ng` in your browser.

---

### Option B: Automatic Updates via cPanel Git™ Version Control & GitHub

To deploy updates easily from AI Studio to GitHub and cPanel:

#### Step 1: Connect your repository to GitHub
Initialize and push this codebase to your GitHub repository:

```bash
git init
git add .
git commit -m "feat: production ready build for cPanel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fuldej-website.git
git push -u origin main
```

#### Step 2: Configure cPanel Git™ Version Control
1. In your **cPanel dashboard**, navigate to **Files > Git™ Version Control**.
2. Click **Create**.
3. Set:
   - **Clone URL**: `https://github.com/YOUR_USERNAME/fuldej-website.git`
   - **Repository Path**: `/home/username/repositories/fuldej-website`
   - **Repository Name**: `fuldej-website`
4. Click **Create**.

#### Step 3: Set up automatic deployment hook (`.cpanel.yml`)
When using cPanel Git deployment, create a file named `.cpanel.yml` in the repository root:

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/username/public_html/
    - /bin/cp -R dist/* $DEPLOYPATH
    - /bin/cp dist/.htaccess $DEPLOYPATH
```

Whenever you push commits to GitHub, you can click **Update from Remote** and **Deploy Head Commit** inside cPanel Git Version Control to update your live website instantly.

---

## 5. Summary of Files Inside `dist/`

| File / Folder | Purpose |
| :--- | :--- |
| `index.html` | Primary production HTML entry point. Mounts the React application. |
| `.htaccess` | Apache configuration: redirects HTTP to HTTPS, routes virtual paths to `index.html`, and enables Gzip compression. |
| `assets/` | Compiled JavaScript chunks, optimized CSS, images, videos, and CAC certificate PDFs. |
| `contact-submit.php` | Server-side PHP script that processes contact form inquiries and emails them directly to `info@fuldej.com.ng`. |
| `robots.txt` & `sitemap.xml` | Search engine optimization and crawler indexing instructions for Google and Bing. |
| `404.html` | Fallback error page. |

---

## 6. Pre-Flight Verification Checklist

- [x] `index.html` is included in the root of `dist/`.
- [x] `dist/.htaccess` includes `RewriteRule ^ index.html [L]` for SPA URL routing.
- [x] Relative asset paths (`./assets/...`) ensure compatibility across domains and subpaths.
- [x] CAC Certificate PDF is located in `assets/aistudio/` and downloads directly.
- [x] High-definition field videos and agro-commodities photos load without external URL dependencies.
- [x] No private API keys or secrets are embedded in the bundle.
- [x] TypeScript validation (`tsc --noEmit`) and production bundling (`vite build`) both pass with 0 errors.
