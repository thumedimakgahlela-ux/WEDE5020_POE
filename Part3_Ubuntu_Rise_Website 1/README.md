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

**Live site:** https://ubuntu-rise-foundation.netlify.app  *(update to your real URL after deploying)*

## New website features (Part 3)
- **Services page:** service cards are built with JavaScript from a data array, with live search, category filter and sort (A-Z / cost). A "Learn more" modal, plus an FAQ accordion.
- **About page:** tabbed Mission / Vision / Aims panel, a photo gallery with a keyboard-friendly lightbox, and an embedded YouTube video.
- **Contact page:** validated message form that compiles an email (recipient: ubuntu.rise@gmail.com) and opens it in the user's email app, with a copy-to-clipboard fallback. Interactive Leaflet/OpenStreetMap map with a marker and popup.
- **Enquiry page:** validated form with conditional fields. *Donating* calculates a sponsorship cost (programme price x participants x months). *Community service* checks the chosen date against operating hours and responds with availability.
- **Animations:** hero entrance, accordion slide, tab fade, gallery zoom, button hover (all disabled for users who prefer reduced motion).

## SEO and technical improvements
Unique `<title>` and meta description per page, one `<h1>` per page with H2/H3 hierarchy, Open Graph tags, canonical URLs, JSON-LD (`NGO`) structured data, descriptive image filenames and alt text, internal links in a footer, `robots.txt`, `sitemap.xml`, lazy-loaded images with width/height, deferred scripts, a Netlify `_headers` file for security headers, and `rel`/`referrerpolicy` on embeds.

## Changelog
All edits made after Part 2 feedback. *(Add the lecturer's exact feedback comments in the "Feedback addressed" column where they apply.)*

| Date | File(s) | Change | Reason / feedback addressed |
|------|---------|--------|-----------------------------|
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
| 2026-11-01 | all pages | Added a `keywords` meta tag with page-specific keywords | Rubric: meta keywords |
| 2026-11-01 | index.html, services.html, enquiry.html | Shortened title tags to about 60 characters and meta descriptions to under 160 characters | Rubric: optimised title tags and meta descriptions |
| 2026-11-01 | README.md | Added Harvard-style References section | Rubric: references |

## Deployment
Deployed to Netlify (drag the project folder onto https://app.netlify.com/drop, or connect the GitHub repository). After deploying, replace `https://ubuntu-rise-foundation.netlify.app` in the HTML pages, `sitemap.xml` and `robots.txt` with the real URL.

## Sitemap
Home page, About page, Services page, Contact page, Enquiry page

## References
*(Harvard style. Add your own "Accessed" dates before submitting, and add the source of each photograph if it was not taken by you.)*

- Agafonkin, V. 2023. *Leaflet: an open-source JavaScript library for interactive maps*. Available at: https://leafletjs.com [Accessed: DD Month 2026].
- Google Search Central. n.d. *SEO Starter Guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide [Accessed: DD Month 2026].
- MDN Web Docs. n.d. *The Dialog element*. Mozilla. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog [Accessed: DD Month 2026].
- Netlify. n.d. *Custom headers*. Available at: https://docs.netlify.com/routing/headers/ [Accessed: DD Month 2026].
- OpenStreetMap contributors. n.d. *OpenStreetMap*. Available at: https://www.openstreetmap.org [Accessed: DD Month 2026].
- Schema.org. n.d. *NGO*. Available at: https://schema.org/NGO [Accessed: DD Month 2026].
- Sitemaps.org. n.d. *Sitemaps XML format*. Available at: https://www.sitemaps.org/protocol.html [Accessed: DD Month 2026].
- W3C Web Accessibility Initiative. n.d. *ARIA Authoring Practices Guide: Accordion and Tabs patterns*. Available at: https://www.w3.org/WAI/ARIA/apg/ [Accessed: DD Month 2026].
- The Independent Institute of Education. 2026. *WEDE5020 Portfolio of Evidence Part 3 brief*. Unpublished.
