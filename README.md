# Muhammad Ayoub Portfolio

Personal portfolio website for Muhammad Ayoub, focused on React, Next.js, WordPress, WooCommerce, case studies, project listings, services, and lead capture.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Sass modules
- GSAP / motion utilities where used
- Formspree contact form integration
- JSON-driven content for portfolio, projects, and case studies

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev      # Start local development
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run lint checks
```

## Main Routes

- `/` - Homepage
- `/about` - About page
- `/services` - Services page
- `/projects` - Paginated project archive
- `/case-studies` - Paginated case-study listing
- `/case-studies/[slug]` - Case-study detail pages
- `/contact` - Contact / hire form
- `/privacy-policy` - Privacy policy
- `/terms-and-conditions` - Terms and conditions
- `/_not-found` - 404 page

`/hire-me` redirects to `/contact`.

## Content Files

- `src/data/portfolio.json` - Homepage/profile/services/testimonials/global content
- `src/data/projects.json` - Featured projects
- `src/data/projectsArchive.json` - Full projects archive rendered on `/projects`
- `src/data/caseStudies.json` - Case-study listing cards
- `src/data/caseStudyDetails.json` - Full case-study detail content
- `src/data/projectLinkStatus.json` - Link status/reference data for project URLs

Project and case-study content is intentionally separated so detailed pages do not bloat the homepage data file.

## Component Structure

- `src/components/landing` - Homepage sections, header, footer CTA, trust, work, services, process, FAQs
- `src/components/about` - About page styles
- `src/components/services` - Services page sections and page-specific data
- `src/components/projects` - Project archive, pagination, project cards
- `src/components/case-studies` - Case-study listing and detail components
- `src/components/contact` - Formspree contact form and contact page styles
- `src/components/legal` - Privacy and terms page styles

## Styling

Global design tokens live in:

- `src/styles/_foundation.scss`
- `src/styles/_globals.scss`
- `src/styles/_pages.scss`

Page-specific styling is kept in component-level Sass modules. The visual system uses the portfolio's black/white grainy editorial style, shared spacing/font tokens, and repeated homepage card patterns for consistency.

## Contact Form

The contact form uses Formspree with the configured form id:

```txt
mgojyyqd
```

Implementation:

- `src/components/contact/ContactForm.tsx`

## Resume Download

Resume links point to:

```txt
/ATS-react-front-Ayoub-CV_Resume.pdf
```

Buttons either download or open the PDF in a new browser tab depending on browser behavior.

## Verification

Run this before deployment:

```bash
npm run build
```

The app should generate static pages for the homepage, about, services, contact, legal pages, and case-study detail routes.
