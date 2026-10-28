# Fuldej Integrated Services & Media — Corporate Portfolio & Integrated System

A modern, responsive corporate and media portfolio website for **Fuldej Integrated Service Ltd**, featuring a showcase of professional photography and videography alongside an integrated studio management system (interactive booking scheduler, instant quote & package builder, secure client gallery proofing portal, and shoot dispatch manager).

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The brand identity and architecture synthesize the uploaded corporate documentation (Fuldej Integrated Service Ltd, Kano, Nigeria, CAC: 7360949) with the MGDI Initiative branding and a professional photography & media production suite.

- **Brand & Positioning**: **Fuldej Integrated Service Ltd** corporate presence with a dedicated **Fuldej Media & Visuals** arm and **MGDI Initiative** technology/community showcase.
- **Top Header Bar**: Streamlined top trust bar showing only the real-time Live Desk WAT status (`WAT UTC+1 · Kano HQ Open / After Hours`) and an authentic WhatsApp reach-out button linking directly to `+234 903 098 6923` (`https://wa.me/2349030986923`), with statutory verification housed cleanly in the site navigation, compliance sections, and footer.
- **Visual Aesthetic**: Deep obsidian slate (`#0B0F19`) editorial dark mode with crisp typography, subtle hairline borders, and luminous cyan/emerald accents echoing the verified MGDI Initiative identity.
- **Integrated System Scope**:
  1. *Public Portfolio Gallery* with high-res Lightbox & EXIF technical metadata viewer.
  2. *Interactive Booking & Shoot Scheduler* with date/time selection, venue details, and service tiers.
  3. *Custom Package & Quotation Calculator* with instant itemized cost breakdowns (in NGN ₦ and USD $).
  4. *Private Client Proofing Portal* (passcode protected, selection favors, feedback markup, download requests).
  5. *Studio Dispatch / CRM Dashboard* to review inquiries, update shoot lifecycle states, and manage deliverables.

---

## 1. Overview & Core Concept

- **What It Does**: Unifies Fuldej Integrated Service Ltd's multidisciplinary engineering, ICT, and sustainable initiatives with its high-end corporate, industrial, and documentary photography portfolio. It equips clients with direct booking, custom quote calculations, and an interactive proofing gallery.
- **Target Audience / Persona**:
  - Corporate clients, industrial partners, government agencies, and NGOs seeking professional documentation, aerial surveying, event coverage, and brand storytelling.
  - Development partners and investors reviewing Fuldej's corporate credentials, leadership, and MGDI initiative.
  - Active media clients logging in to review uncompressed proofs, select deliverables, and download finals.
- **Key Value**: Replaces scattered email threads and manual invoices with an all-in-one digital showcase and booking/proofing workflow anchored in corporate credibility.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Portfolio Exploration**:
   - Filter portfolio by discipline: *All*, *Industrial & Engineering*, *Corporate Leadership*, *Community & MGDI*, *Architecture & Infrastructure*, *Documentary & Culture*.
   - Click any photograph to launch the Fullscreen Modal Lightbox with EXIF camera data (Camera model, lens, aperture, shutter speed, ISO, location, client).
2. **Integrated Booking Scheduler**:
   - Step 1: Select Shoot Type (e.g., Executive Portraits, Industrial Site Documentation, Conference/Event, Drone Inspection).
   - Step 2: Choose preferred date & time window.
   - Step 3: Enter shoot location, deliverables checklist, and contact details.
   - Step 4: Instant booking confirmation with reference ID and calendar export.
3. **Interactive Package & Quote Builder**:
   - Toggle base packages (*Essentials*, *Executive Commercial*, *Comprehensive Media Production*).
   - Customize add-ons (Licensed Drone Pilot, 4K Highlight Reel, Same-Day Rush Delivery, Additional Retouched Stills).
   - Live price estimator with printable PDF/quotation summary.
4. **Client Proofing & Delivery Portal**:
   - Client enters their access code (e.g. `FULDEJ-2026`) to access their private shoot session.
   - Interactive photo selection: heart favorites, flag for revision, leave photo-specific retouching notes.
   - Batch export selection list for final color grading.
5. **Corporate Profile & Strategic Initiatives**:
   - Company background, CAC verification badge (7360949), Kano State office address, bank/legal credentials.
   - Leadership spotlight: MD Ishaq Ibrahim Jaafar, Fahad Isyaku Umar, and the multidisciplinary engineering team.
   - Strategic Initiatives: MGDI Initiative (with official logo asset), SmartGrowth AI, and SmartGreen.

### Visual Identity & Theme

- **Color Distribution (60-30-10)**:
  - *60% Dominant Neutral Canvas*: Deep Obsidian Slate (`#0B0F19`) and Midnight Blue (`#0F172A`).
  - *30% Structural Surfaces*: Translucent dark cards (`rgba(255,255,255,0.03)`), hairline borders (`rgba(255,255,255,0.08)`), muted slate typography (`#94A3B8`).
  - *10% Focal Accent*: Electric Blue (`#2563EB`) to Vibrant Cyan (`#06B6D4`) and Emerald (`#10B981`) gradient highlights matching the MGDI logo mark.
- **Typography**:
  - *Display Headings*: `Plus Jakarta Sans` / `Outfit` with tight geometric tracking (`tracking-tight font-semibold`).
  - *Prose & Body*: `Plus Jakarta Sans` (14px–16px, 1.6 line height).
  - *Technical / EXIF / Dates*: Monospace tabular numerals (`font-mono tabular-nums`).
- **Zero-Pill Restraint**: Metadata (dates, categories, focal specs) rendered as crisp text with quiet bullet separators (`·` or `/`), never rounded candy capsules.
- **Top Bar Contract**:
  - Zone 1: Fuldej Wordmark & MGDI badge emblem.
  - Zone 2: Navigation Links (`Portfolio`, `Services & Pricing`, `Book Shoot`, `Client Portal`, `About Fuldej`).
  - Zone 3: Single Primary Action (`Book a Session`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Unified Corporate & Photography Architecture**:
  - *Approach*: Combine Fuldej's corporate engineering & initiative credentials with the photography portfolio rather than building a generic photographer's landing page.
  - *Why*: Bridges corporate credibility (CAC registration, Kano headquarters, multidisciplinary leadership) with high-value commercial media production.
- **Decision 2: Integrated Client Proofing & Management State**:
  - *Approach*: Built-in mock-backed reactive store with local persistence for client proofing sessions, favorites, and booking requests.
  - *Why*: Provides immediate, realistic client interaction without requiring external SaaS subscriptions (Pixieset/HoneyBook), fully demonstrable and testable inside AI Studio.
- **Decision 3: Curated High-Definition Photography Collections**:
  - *Approach*: Curate realistic industrial, corporate, documentary, and architectural media items with complete EXIF details, photographer notes, and responsive image handling with resilient fallbacks.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Fuldej Web Application                        │
└────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┴───────────────────────────┐
        ▼                                                       ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│     Navigation & Top Bar      │               │       Global State Store      │
│  - Wordmark & MGDI Emblem     │               │  - Active View / Tab State    │
│  - Single-line Nav Links      │               │  - Lightbox Active Image      │
│  - Quick 'Book Session' CTA   │               │  - Booking Inquiries Store    │
└───────────────────────────────┘               │  - Client Proofing Session    │
                │                               │  - Custom Quote Configuration │
                ▼                               └───────────────────────────────┘
┌───────────────────────────────────────────────────────────────────────┐
│                          Main View Controller                         │
│                                                                       │
│  ┌───────────────────────┐  ┌──────────────────────┐  ┌────────────┐  │
│  │ Portfolio & Lightbox  │  │ Interactive Booking  │  │   Quote    │  │
│  │ - Masonry Grid        │  │ - Calendar Date Pick │  │ Calculator │  │
│  │ - Category Filtering  │  │ - Time Slots         │  │ - Packages │  │
│  │ - EXIF Metadata Modal │  │ - Service Packages   │  │ - Add-ons  │  │
│  └───────────────────────┘  └──────────────────────┘  └────────────┘  │
│                                                                       │
│  ┌───────────────────────┐  ┌──────────────────────┐  ┌────────────┐  │
│  │ Client Proof Portal   │  │ Corporate Profile    │  │ Studio     │  │
│  │ - Passcode Auth       │  │ - CAC 7360949 Info   │  │ Manager    │  │
│  │ - Favorite / Select   │  │ - Leadership Team    │  │ - Inquiries│  │
│  │ - Revision Feedback   │  │ - MGDI & Initiatives │  │ - Proofs   │  │
│  └───────────────────────┘  └──────────────────────┘  └────────────┘  │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│                      Footer & Contact Directory                       │
│  - Head Office: BUK Old Campus Area, Kano State, Nigeria             │
│  - Regulatory: CAC 7360949 · SCUML · FIRS · SMEDAN                   │
│  - Direct Inquiries: fuldejintegrated@gmail.com / +2348032653578      │
└───────────────────────────────────────────────────────────────────────┘
```

### Data Model & Entities

- `PortfolioItem`: id, title, category, imageSrc, client, location, date, aspect, exif (camera, lens, shutter, aperture, iso), description.
- `BookingInquiry`: id, clientName, email, phone, shootType, preferredDate, timeSlot, location, estimatedBudget, notes, status (`pending`, `confirmed`, `completed`).
- `ClientProofSession`: sessionCode (`FULDEJ-2026`), clientName, projectTitle, shootDate, images (with `isFavorite`, `status`, `clientNotes`).
- `QuoteConfig`: basePackageId, hours, addOns (drone, highlightVideo, rushDelivery, rawFiles), totalEstimate.
