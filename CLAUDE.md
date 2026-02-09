# Praxis Schau - Kieferorthopädie Website

## Project Overview
German orthodontic/dental practice website (Praxis Schau). Static HTML/CSS/JS site with no build tools or frameworks. Hosted on Netlify with custom domain.

## Deployment & Hosting
- **GitHub**: https://github.com/drilonmaloku96/praxis-schau.git (private repo)
- **Hosting**: Netlify (free tier, auto-deploys from GitHub main branch)
- **Domain**: praxis-schau.de (registered on Namecheap)
- **DNS**: Namecheap nameservers pointed to Netlify DNS (dns1-4.p06.nsone.net)
- **SSL**: Let's Encrypt via Netlify (automatic)
- **Contact Form**: Netlify Forms (data-netlify="true"), 100 free submissions/month

## File Structure
```
websiteproj/
├── index.html                          # Home page
├── netlify.toml                        # Netlify config (publish = ".")
├── .gitignore                          # Excludes PHP files, OS files, logs
├── CLAUDE.md                           # This file
├── css/
│   └── style.css                       # All styles + mobile breakpoints
├── js/
│   └── script.js                       # Nav highlight, counters, hamburger menu, form handling
├── pages/
│   ├── kieferorthopadie.html           # KFO services (turquoise accent)
│   ├── cmd.html                        # CMD treatment (red accent)
│   ├── osas.html                       # Sleep apnea/OSAS (yellow accent)
│   ├── zusaetzliche-leistungen.html    # Additional services (green accent)
│   ├── kontakt.html                    # Contact page with Netlify form
│   ├── danke.html                      # Thank-you page after form submission
│   └── team.html                       # Team member cards
└── images/                             # Image assets (if any)
```

## Page Accent Colors
Each service page has its own accent color used for links, buttons, and gradients:
- **Kieferorthopädie**: Turquoise `#4a9ca8`
- **CMD**: Red `#b85450`
- **OSAS**: Yellow `#c4a434`
- **Zusätzliche Leistungen**: Green `#4a9c5a`
- **General/Navigation**: Blue `#4a6fa5`

## Design System & Card Style
All service pages follow a unified card-based layout (template: zusaetzliche-leistungen.html):

### Cards
- White background
- `border-radius: 15px`
- `padding: 2.5rem`
- `box-shadow: 0 5px 20px rgba(0,0,0,0.08)`
- **NO colored border-top or border-left** (removed intentionally — user wants clean, modern look)

### Schnellnavigation Box
- White background, same shadow as cards
- Centered list with accent-colored anchor links
- No colored left border

### Mid-Page Contact Cards
- Gradient background using the page's accent color
- Contains 3 mini white cards: Telefon, E-Mail, Sprechzeiten
- CTA button linking to contact page
- Uses inline `grid-template-columns: repeat(3, 1fr)` (collapses to 1fr on mobile via CSS)

### Section IDs
- Each card section has an ID with `scroll-margin-top: 100px` for smooth anchor navigation from Schnellnavigation

## Images & Branding
- **Logo**: `images/PraxisLogo.png` — blue tooth icon, used in navbar (45px height) and footer (60px, white-inverted)
- **ALL other images are currently gray placeholders** from placehold.co (Unsplash images were removed for copyright reasons)
- User plans to add their own photos later
- When replacing: maintain `border-radius: 15px`, `max-width: 100%`, `height: auto` on mobile

## Contact Information
- **Email**: kfo-forst@posteo.de
- **Phone**: 03562 9876002
- **Address**: Robert-Koch-Straße 35, 03149 Forst (Lausitz)

## Contact Form
- Uses **Netlify Forms** (NOT PHP — the old contact.php was removed)
- Form has `data-netlify="true"` and `name="kontakt"` attributes
- Fields: Name, E-Mail, Telefon, Betreff (dropdown), Nachricht
- On submit, redirects to `/pages/danke.html`
- The old `handlePHPFormSubmit` function was removed from script.js

## Mobile Responsiveness
- Primary breakpoint: `768px`
- Secondary breakpoint: `1024px`
- CSS in style.css uses attribute selectors with `!important` to override inline grid styles on mobile:
  - `[style*="grid-template-columns: repeat(3, 1fr)"]` → `1fr`
  - `[style*="grid-template-columns"]` → `1fr`
  - Images: `max-width: 100% !important; height: auto !important`
  - Service cards get reduced padding on mobile
  - Lists constrained to `max-width: 100%` with word-wrap

## JavaScript (js/script.js)
Functions:
- `initNavigationHighlight()` — highlights active nav item based on current page
- `initCounters()` / `animateCounter()` — animated number counters on home page
- `initHamburgerMenu()` — mobile hamburger menu toggle
- `validateCMDForm()` — CMD self-test form validation
- `handleFormSubmit()` — general form handler
- `toggleDropdown()` — navigation dropdown toggle

## Important Notes
- Inline styles are used extensively in HTML files (established pattern in this project)
- When adding new cards/sections, follow the existing inline style patterns for consistency
- The user prefers clean, modern design without colored accent borders on cards
- All text content is in German
- GDPR considerations: no external tracking, form data handled by Netlify only

## Pending / TODO
- [ ] Replace gray placeholder images with actual practice photos
- [ ] Verify contact form submissions are received in Netlify dashboard
- [ ] Optional: Add CAPTCHA for spam protection on contact form
- [ ] Optional: Add Google Maps embed to contact page
