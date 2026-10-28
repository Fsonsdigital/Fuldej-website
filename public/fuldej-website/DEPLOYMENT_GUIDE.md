# Deployment & Hosting Guide — Fuldej Integrated Services Ltd

**Target Environment:** Truehost Nigeria (WebHosting Starter / Silver / Gold)  
**Control Panel:** cPanel  
**Document Root:** `/home/username/public_html`  
**Domain:** `https://fuldej.com.ng`

---

## 1. Pre-Deployment Verification Checklist

Before uploading to Truehost:
- [x] All 7 HTML pages present: `index.html`, `about.html`, `services.html`, `projects.html`, `partnerships.html`, `contact.html`, `privacy.html`.
- [x] 404 page created: `404.html`.
- [x] Stylesheet present: `assets/css/style.css`.
- [x] JavaScript present: `assets/js/main.js`.
- [x] Official image assets in `assets/images/` (Fuldej logo, MGDI, SmartGrowth AI, SmartGreen).
- [x] Official PDF profile in `assets/docs/COMPANY_PROFILE__FULDEJ_INTEGRATED.pdf`.
- [x] Search engine files: `robots.txt` and `sitemap.xml`.
- [x] Apache configuration file: `.htaccess`.
- [x] PHP processor: `contact-submit.php`.

---

## 2. Step-by-Step cPanel Deployment Guide

### Step 1: Obtain the ZIP Archive
Download the complete `fuldej-website.zip` archive containing the production website.

### Step 2: Log into Truehost cPanel
1. Navigate to your hosting cPanel URL (usually `https://fuldej.com.ng:2083` or via the Truehost client area portal).
2. Enter your cPanel username and password.

### Step 3: Open File Manager
1. In the **Files** section of cPanel, click **File Manager**.
2. In the left directory tree, locate and click on **`public_html`**.
3. *Note:* If you are deploying to an addon domain or subdomain, open the specific document root for `fuldej.com.ng`.

### Step 4: Upload and Extract Archive
1. Click the **Upload** icon on the top File Manager toolbar.
2. Select or drag-and-drop `fuldej-website.zip`.
3. Wait until the progress bar reaches 100% (green).
4. Return to File Manager and reload the view.
5. Right-click `fuldej-website.zip` and select **Extract**.
6. When prompted for the extraction path, confirm it extracts directly into `/public_html`.
7. Once extracted, verify that `index.html`, `about.html`, `services.html`, etc. and the `assets/` directory are at the top level of `public_html` (not inside an extra nested folder).
8. Delete the uploaded `.zip` file to keep your hosting clean and save disk space.

### Step 5: Verify File Permissions
Standard recommended cPanel permissions:
- Directories: `0755`
- Files: `0644`

### Step 6: Configure PHP Version
1. In cPanel, find **Select PHP Version** or **MultiPHP Manager**.
2. Ensure your domain is set to **PHP 8.1** or **PHP 8.2** (recommended for stability and security).
3. Ensure the standard `mail` function is enabled if using `contact-submit.php`.

### Step 7: Activate Free SSL Certificate
1. In cPanel, navigate to the **Security** section and click **SSL/TLS Status**.
2. Ensure all domain variants (`fuldej.com.ng`, `www.fuldej.com.ng`) are selected.
3. Click **Run AutoSSL**.
4. Within 5–15 minutes, Truehost/cPanel will issue a free Let's Encrypt / Sectigo SSL certificate.
5. Once active, a green lock icon will display next to your domain.

### Step 8: Enable HTTP to HTTPS Redirection
Once SSL is verified, open your `.htaccess` file in File Manager:
1. Click **Settings** in the top right of File Manager and check **Show Hidden Files (dotfiles)**.
2. Right-click `.htaccess` and click **Edit**.
3. Uncomment the two HTTPS rewrite lines:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
4. Save changes.

---

## 3. Post-Deployment Testing Protocol

1. **Navigation Test:** Click each link in the top menu and mobile drawer (Home, About Us, Services, Projects, Partnerships, Contact). Confirm zero broken links.
2. **Logo & Asset Test:** Confirm the Fuldej logo mark and partner marks appear crisp and medium-sized.
3. **Form Test:** Fill out the contact form on `contact.html` with a test email. Confirm that success alerts display cleanly.
4. **Mobile Responsiveness:** Inspect the site on mobile viewports (375px iPhone width, 768px tablet) to confirm no horizontal scrolling occurs.
5. **PDF Download Test:** Click the "Download CAC Profile (PDF)" link to verify the document downloads smoothly.

---

## 4. Maintenance & Routine Backups

Before performing future updates:
1. In cPanel, open **Backup** or **File Manager**.
2. Select your `public_html` contents, click **Compress**, and download a timestamped backup archive (e.g. `backup_fuldej_2026.zip`).
3. Maintain an offline copy of your website files for redundancy.
