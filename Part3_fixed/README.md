# WEDE5020_POE
ST10521217 Thumedi Makgahlela

## Organisation overview
The group focuses on improving people's lives through community development, drawing inspiration from the African principle of ubuntu, which means "I am because we are."

## Website goals and objectives
Goals
- Raise awareness about the organisation's mission and community projects.
- Encourage donations to support programmes.
- Recruit volunteers and encourage community participation.
- Provide an easy way for the community to enquire about services and get in touch.
- Share information about the organisation's background, services and impact.

Key Performance Indicators (KPIs)
- Achieve at least 2,000 website visitors per month within the first six months.
- Receive 100 online enquiries per month (donations and community service).
- Recruit 50 new volunteers within six months.
- Maintain an average website loading time of under 3 seconds.
- Ensure the site displays correctly on mobile, tablet and desktop devices.

## Website features and functionality
The website includes the following pages:
- Home page – Introduction to the organisation, its tagline, and a call-to-action leading to the About page.
- About page – Organisation background, mission, and the goals it aims to achieve, supported by photos and captions.
- Services page – A list of the organisation's core services (youth empowerment, life-skills training, leadership programmes, career guidance and mentorship), with a link through to the Enquiry page.
- Contact page – An embedded location map, plus contact information cards for phone/WhatsApp numbers, email, and operating hours.
- Enquiry page – A form allowing visitors to submit their name, contact details, preferred service (donating or community service), date availability, and an optional message.

Functionality
- Mobile-friendly, responsive design that adapts layout, spacing and font sizes for smaller screens.
- Consistent navigation bar across all pages linking Home, About, Services, Contact and Enquiry.
- Embedded map (OpenStreetMap) on the Contact page showing the organisation's location.
- Enquiry form with required and optional fields, including a dropdown to select the type of enquiry.
- Consistent visual theme (green-and-gold colour palette, serif typography) applied across all pages via shared CSS.

## Timeline and milestones
Week	Activity
Week 1	Requirements gathering and planning.
Week 2	Wireframes and website design.
Week 3	Homepage and About us development.
Week 4	Services page development.
Week 5	Contact page (map and info cards) and Enquiry form development.
Week 6	Testing and bug fixes.
Week 7	Final review, code commenting and submission.

## Sitemap
Home page
About page
Services page
Contact page
Enquiry page


---

# Part 3: Functionality, SEO and deployment

**Live site:** https://thumedimakgahlela-ux.github.io/WEDE5020_POE/
**Repository:** https://github.com/thumedimakgahlela-ux/WEDE5020_POE

## New website features (Part 3)
- **Services page:** service cards are built with JavaScript from a data array, with live search, category filter and sort (A-Z / cost). A "Learn more" modal, plus an FAQ accordion.
- **About page:** tabbed Mission / Vision / Aims panel, a photo gallery with a keyboard-friendly lightbox, and an embedded YouTube video.
- **Contact page:** validated message form that compiles an email (recipient: ubuntu.rise@gmail.com) and opens it in the user's email app, with a copy-to-clipboard fallback. Interactive Leaflet/OpenStreetMap map with a marker and popup.
- **Enquiry page:** validated form with conditional fields. *Donating* calculates a sponsorship cost (programme price x participants x months). *Community service* checks the chosen date against operating hours and responds with availability.
- **Animations:** hero entrance, accordion slide, tab fade, gallery zoom, button hover (all disabled for users who prefer reduced motion).

## SEO and technical improvements
Unique `<title>` and meta description per page, one `<h1>` per page with H2/H3 hierarchy, Open Graph tags, canonical URLs, JSON-LD (`NGO`) structured data, descriptive image filenames and alt text, internal links in a footer, `robots.txt`, `sitemap.xml`, lazy-loaded images with width/height, deferred scripts, a Netlify `_headers` file for security headers, and `rel`/`referrerpolicy` on embeds.

## Responsive design
The site is desktop-first and adapted with media queries at the end of `css/style.css`.

| Breakpoint | Target | Layout | Typography | Navigation |
|------------|--------|--------|------------|------------|
| > 992px | Desktop | Centred 700-900px cards; service cards in an auto-fit grid | Site name 2.8em, h2 1.8em | Horizontal pill links |
| <= 992px | Small laptop / large tablet | Cards fill the width with 24px side margins | Site name 2.5rem | Horizontal pill links |
| <= 768px | Tablet | Reduced padding; map 280px; gallery thumbnails 130px | Site name 2.2rem, h1 1.7rem, h2 1.55rem | Collapses behind a **Menu** button; links stack full-width |
| <= 600px | Mobile | Single column: info cards, toolbar, service cards and form rows stack; gallery 2 columns; buttons full width | Site name 1.9rem, h1 1.5rem, h2 1.35rem, body 1rem | Stacked links with large tap targets |
| <= 400px | Small phones | Tighter padding; gallery 1 column; map 200px | Site name 1.6rem | Same as mobile |

Other techniques: `viewport` meta tag on every page; `box-sizing: border-box`; `max-width: 100%` on images, iframes and video; `overflow-wrap: anywhere` on contact details; 16px minimum form-field text; `prefers-reduced-motion` support.
Testing: every page was checked at 1280px, 768px, 375px and 320px widths with no horizontal scrolling.

## Project structure
```
WEDE5020_POE/
  index.html, about.html, services.html, contact.html, enquiry.html
  css/style.css        shared styles + media queries
  js/main.js           accordion, tabs, lightbox, mobile menu toggle
  js/services.js       dynamic service cards, search/filter/sort, modal
  js/forms.js          form validation, cost and availability results
  js/map.js            Leaflet / OpenStreetMap map
  images/              photos (descriptive file names)
  robots.txt, sitemap.xml, _headers
  README.md
```

## Technologies used
HTML5, CSS3 (flexbox, grid, media queries, pseudo-classes), JavaScript (ES5/ES6), Leaflet with OpenStreetMap tiles, embedded YouTube video, GitHub Pages.

## How to run locally
Download or clone the repository and open `index.html` in a browser. No build step is needed. Use the browser developer tools device toolbar (F12) to see the tablet and mobile layouts.

## Changelog
All edits made after Part 2 feedback. 
| Date | File(s) | Change | Reason / feedback addressed |
|------|---------|--------|-----------------------------|
| 2026-11-02 | css/style.css | Added media queries at 992px, 768px, 600px and 400px (plus landscape-phone and reduced-motion rules) covering layout, cards, toolbar, gallery, map, dialogs, forms and footer | Rubric: Media queries/breakpoints for tablet and mobile; Responsive layout |
| 2026-11-02 | css/style.css | Scaled heading, tagline, lead and body text down at each breakpoint; form fields kept at 16px | Rubric: Responsive typography |
| 2026-11-02 | all pages, js/main.js, css/style.css | Added a collapsible "Menu" button (aria-expanded) that stacks the nav links full-width on tablet and mobile | Rubric: Navigation menu adjustments |
| 2026-11-02 | css/style.css | Added `:focus-visible`, `:active` and hover states for nav, buttons, form fields, tabs and accordion | Rubric: Pseudo-classes |
| 2026-11-02 | all pages, sitemap.xml, robots.txt | Updated canonical, Open Graph, JSON-LD and sitemap URLs from the Netlify placeholder to the GitHub Pages URL | Live site is hosted on GitHub Pages |
| 2026-11-02 | README.md | Added responsive design table, project structure, references and this changelog entry | Rubric: README, Changelog and References |
| 2026-10-31 | all pages | Moved all page-specific `<style>` blocks into the single shared `css/style.css` and linked it on every page | Part 2 CSS was duplicated in every file even though `style.css` existed; easier to maintain and faster (cached) |
| 2026-10-31 | all pages | Replaced the repeated `<h1>` site title with a `div`; each page now has one unique `<h1>` | SEO: one H1 per page that describes that page |
| 2026-10-31 | all pages | Added `<main>`, skip-to-content link, `aria-current` on the active nav link, visible focus styles and a footer with internal links | Accessibility and internal linking |
| 2026-10-31 | all pages | Added unique title tags, meta descriptions, canonical link, Open Graph tags | SEO on-page requirements |
| 2026-10-31 | index.html | Added JSON-LD structured data and a "Donate or volunteer" button | SEO / clearer call to action |
| 2026-10-31 | services.html | Removed the text "find our contact details below" (no contact details were on the page) and replaced it with an FAQ and enquiry button | Content did not match the page |
| 2026-10-31 | services.html, js/services.js | Services now render dynamically with search, filter and sort; added service detail modal and FAQ accordion | Part 3: dynamic content and interactive elements |
| 2026-10-31 | about.html, js/main.js | Added tabs, gallery with lightbox and YouTube embed | Part 3: interactive elements and external services |
| 2026-10-31 | contact.html, js/map.js | Replaced the OpenStreetMap iframe (which had no location set) with an interactive Leaflet map and marker | Part 2 embed did not show a specific location |
| 2026-10-31 | contact.html, js/forms.js | Added contact form with validation and compiled email | Part 3: contact form requirement |
| 2026-10-31 | enquiry.html, js/forms.js | Added JavaScript validation (name, SA phone/email, numbers, future dates, message length), error messages, and a cost/availability response. Fixed the placeholder phone number that had one digit too many | Part 3: enquiry form requirement; placeholder error |
| 2026-10-31 | images/ | Renamed images from `Ubuntu picture 1.jpg` etc. to descriptive, space-free names; added width/height and lazy loading | SEO image optimisation and page speed |
| 2026-10-31 | robots.txt, sitemap.xml, _headers | Added crawler rules, sitemap, and security headers | SEO additional requests and security |

## Deployment
The site is deployed with GitHub Pages from the `WEDE5020_POE` repository: https://thumedimakgahlela-ux.github.io/WEDE5020_POE/. Canonical, Open Graph, JSON-LD, `sitemap.xml` and `robots.txt` URLs all use this address. (`_headers` only takes effect on Netlify; GitHub Pages ignores it.)

## Sitemap
Home page, About page, Services page, Contact page, Enquiry page

## References
Agafonkin, V. (2023) *Leaflet: an open-source JavaScript library for interactive maps*. Available at: https://leafletjs.com (Accessed: 2 November 2026).

Google (2026) *YouTube embedded players and player parameters*. Available at: https://developers.google.com/youtube/player_parameters (Accessed: 2 November 2026).

Mozilla Developer Network (MDN) (2025a) *Using media queries*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries (Accessed: 2 November 2026).

Mozilla Developer Network (MDN) (2025b) *Viewport meta tag*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag (Accessed: 2 November 2026).

Mozilla Developer Network (MDN) (2025c) *Pseudo-classes*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes (Accessed: 2 November 2026).

Mozilla Developer Network (MDN) (2025d) *The dialog element*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog (Accessed: 2 November 2026).

OpenStreetMap contributors (2026) *OpenStreetMap*. Available at: https://www.openstreetmap.org (Accessed: 2 November 2026).

Schema.org (2026) *NGO*. Available at: https://schema.org/NGO (Accessed: 2 November 2026).

World Wide Web Consortium (W3C) (2023) *Web Content Accessibility Guidelines (WCAG) 2.2*. Available at: https://www.w3.org/TR/WCAG22/ (Accessed: 2 November 2026).

World Wide Web Consortium (W3C) (2023) *WAI-ARIA Authoring Practices Guide: Accordion and Tabs patterns*. Available at: https://www.w3.org/WAI/ARIA/apg/ (Accessed: 2 November 2026).

Keep a Changelog (2026) *Keep a Changelog*. Available at: https://keepachangelog.com (Accessed: 2 November 2026).
