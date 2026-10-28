# Direct Deployment Guide: cPanel & XAMPP (Zero Dependencies)

This guide explains how to run and deploy the **Fuldej Integrated Service Ltd** website **directly into cPanel shared hosting and XAMPP without downloading dependencies, installing Node.js, or running npm commands**.

---

## 1. Zero-Dependency Direct Deployment

The production build is **100% pre-compiled**. You do **NOT** need:
- Node.js
- npm install
- Git commands
- Build tools on your cPanel or XAMPP computer

Everything is packaged and ready to run immediately in:
- **Folder**: `dist/`
- **ZIP File**: `fuldej-cpanel-xampp-ready.zip` (located in the project root and in `dist/`)

---

## 2. Running Directly in XAMPP (Local Machine)

### Step 1: Copy Files to XAMPP
1. Locate your XAMPP installation folder (usually `C:\xampp\htdocs\` on Windows or `/Applications/XAMPP/htdocs/` on macOS).
2. Create a folder named **`fuldej`** inside `htdocs` (or copy directly into `htdocs` if you want it at the root).
3. Copy all files and folders from inside `dist/` (or extract `fuldej-cpanel-xampp-ready.zip`) directly into:
   ```
   C:\xampp\htdocs\fuldej\
   ```
   Ensure `index.html`, `.htaccess`, `contact-submit.php`, and the `assets/` folder are inside `C:\xampp\htdocs\fuldej\`.

### Step 2: Start Apache in XAMPP
1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **Apache** (green indicator).

### Step 3: Open in Browser
Open your browser and navigate to:
```
http://localhost/fuldej/
```
The complete website—including the automated background video, ambient sound engine, CAC certificate viewer, interactive project marquee, and agro-commodities export catalog—will run at maximum speed with zero dependencies.

---

## 3. Deploying Directly to cPanel (Shared Hosting)

### Step 1: Upload via File Manager
1. Log into your **cPanel Account** (e.g. Truehost, Namecheap, etc.).
2. Open **File Manager** and open the **`public_html/`** directory.
3. Click **Upload** in the top cPanel toolbar.
4. Select and upload the file:
   ```
   fuldej-cpanel-xampp-ready.zip
   ```

### Step 2: Extract in `public_html`
1. In File Manager, right-click `fuldej-cpanel-xampp-ready.zip` and select **Extract**.
2. Confirm that the files are extracted directly into `public_html/`:
   - `index.html`
   - `.htaccess`
   - `contact-submit.php`
   - `assets/` (contains CSS, JavaScript, photos, videos, and PDF certificates)
   - `robots.txt` & `sitemap.xml`
3. Delete `fuldej-cpanel-xampp-ready.zip` to save hosting space.

### Step 3: Visit Live Website
Navigate to your domain:
```
https://fuldej.com.ng
```

---

## 4. Built-in Speed & Performance Architecture

The site is engineered for high Core Web Vitals speed scores on shared hosting:

1. **Pre-Minified & Tree-Shaken Bundles**:
   - Single optimized CSS bundle (`assets/index-CyyLB6j_.css`, ~14 KB gzipped).
   - Single high-performance JavaScript bundle (`assets/index-BGeInoHd.js`, ~179 KB gzipped).
   - Zero external CDN script delays.
2. **Apache Gzip & Deflate Compression**:
   - The included `.htaccess` automatically compresses HTML, CSS, JavaScript, JSON, and SVG before sending to the visitor, cutting bandwidth by up to 75%.
3. **Smart Browser Caching**:
   - Media assets, fonts, CSS, and JS chunks are cached by the visitor's browser for **1 year** with immutable content-hash IDs for instant sub-second reloads.
   - `index.html` has zero-stale cache headers (`no-cache, must-revalidate`), so whenever you update files, visitors see the changes immediately without clearing browser cache.
4. **Adaptive Dual-Environment Server Rules**:
   - **On Live cPanel**: Forces secure HTTPS (`https://fuldej.com.ng`).
   - **On Local XAMPP (`localhost`)**: SSL redirect is automatically bypassed so you never experience local SSL connection errors.
   - **Single-Page Application (SPA) Fallback**: Any direct access to sub-pages (`#commodities`, `#about`, `#services`) loads instantly without 404 errors.

---

## 5. Contact Form Processing (Dual Delivery)

- **On cPanel / XAMPP**: The form posts to `contact-submit.php`, sending the submission directly to **`info@fuldej.com.ng`** via server mail.
- **Fail-Safe Client Dispatch**: Also prepares the formatted email client (`mailto:info@fuldej.com.ng`) and WhatsApp reach-out (`+234 903 098 6923`), ensuring zero missed buyer inquiries regardless of server configuration.
