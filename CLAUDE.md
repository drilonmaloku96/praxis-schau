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
├── .gitignore                          # Excludes PHP files, OS files, logs, node_modules
├── CLAUDE.md                           # This file
├── optimize-images.js                  # Image optimization script (uses sharp)
├── package.json                        # Node.js dependencies (sharp for image optimization)
├── package-lock.json                   # Dependency lock file
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
└── images/                             # Optimized image assets
    ├── Home/                           # Home page images
    ├── Team/                           # Team member photos
    ├── Kieferorthopaedie/              # KFO page images
    ├── Leistungen/                     # Services page images
    ├── OSAS/                           # OSAS page images
    └── PraxisLogo.png                  # Practice logo
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
- **Logo**: `images/PraxisLogo.png` — blue tooth icon
  - Navbar: 45px height (desktop), 28px height (mobile ≤768px)
  - Footer: 60px height, white-inverted with filter
  - Mobile navbar logo container: max-width 90px with overflow hidden
- **Practice Images**: Real photos in Home/, Kieferorthopaedie/, Leistungen/, OSAS/ folders
- **Team Photos**: Professional headshots in Team/ folder (13 team members)
- **All images optimized**: Compressed via optimize-images.js script (98% reduction for JPGs)
- **Lazy loading**: All images use `loading="lazy"` and `decoding="async"` for performance
- When adding new images: run `node optimize-images.js` to compress them

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
- **Mobile Navbar** (≤768px):
  - Height: 55px (reduced from 70px for compact design)
  - Logo: 28px height, max-width 90px container
  - Hamburger menu appears at top: 55px
  - Main content margin-top: 55px to prevent overlap
- CSS in style.css uses attribute selectors with `!important` to override inline grid styles on mobile:
  - `[style*="grid-template-columns: repeat(3, 1fr)"]` → `1fr`
  - `[style*="grid-template-columns"]` → `1fr`
  - Images: `max-width: 100% !important; height: auto !important`
  - Service cards get reduced padding on mobile
  - Lists constrained to `max-width: 100%` with word-wrap

## Performance Optimization

### Image Optimization
- **optimize-images.js**: Node.js script using `sharp` library to compress images
- Automatically resizes images to max-width 1920px
- JPEGs: 80% quality, progressive encoding (reduced from 6-9MB to 80-150KB per image)
- PNGs: 80% quality, compression level 9 (reduced by 65-80%)
- Team photos: Reduced from 350KB-1.2MB to 120-360KB
- **Usage**: `node optimize-images.js` (processes all images in /images directory)

### Lazy Loading
- All images use `loading="lazy"` attribute (browser-native lazy loading)
- All images use `decoding="async"` for non-blocking image decoding
- Images only load when they enter/near the viewport
- Significantly reduces initial page load time and bandwidth usage

### Results
- Initial page load: ~98% faster for image-heavy pages
- Total image size: Reduced from ~50MB to <1MB across entire site
- Mobile performance: Dramatically improved on slower connections

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

## Recent Updates
- ✅ Fixed mobile navbar logo overflow and positioning (Feb 2026)
- ✅ Corrected team member name: Isabella → Isabelle
- ✅ Optimized all images (98% size reduction)
- ✅ Implemented lazy loading across entire site
- ✅ Replaced placeholder images with actual practice photos
- ✅ Added image optimization tooling (optimize-images.js)

## Pending / TODO
- [ ] Verify contact form submissions are received in Netlify dashboard
- [ ] Optional: Add CAPTCHA for spam protection on contact form
- [ ] Optional: Add team member descriptions in team.html (currently placeholders)
- [ ] Optional: Monitor Core Web Vitals after optimizations
