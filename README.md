# StepWise — Interactive Shoe Storefront

A React shoe-storefront showcase combining product selection, image-based 360° previews, local cart interactions, and animated page sections. Product content is defined locally, with separate components for the hero, catalog, featured content, services, and newsletter UI.

**Stack:** React 18 · Vite 6 · Tailwind CSS 3 · GSAP · Swiper · React Slick

## Highlights

- Responsive hero slider built with React Slick.
- Swiper product carousel with navigation and responsive slide counts.
- Product cards with price, sale styling, color selection, and shoe sizes.
- Pointer-driven CSS perspective tilt on product cards.
- Eight-frame shoe previews with drag interaction and an expanded preview modal.
- Motion Lab section with automatic rotation and pause/resume control.
- In-memory add-to-cart state and an item-count badge.
- GSAP/ScrollTrigger animations for multiple page sections.

## Run locally

Install Node.js and npm, then:

```sh
git clone https://github.com/itzhoman/StepWise.git
cd StepWise
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173). 

## Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production app |
| `npm run lint` | Run the configured lint command |
| `npm run preview` | Preview the Vite production bundle |

No automated test script is currently defined in `package.json`.

## Project structure

| Path | Responsibility |
| --- | --- |
| `src/App.jsx` | Composes storefront sections |
| `src/components/Product.jsx` | Product selection, preview modal, carousel, and local cart state |
| `src/components/Experience.jsx` | Eight-angle viewer with drag and automatic rotation |
| `src/components/Hero.jsx` | Hero slider and animation |
| `src/components/` | Header, Featured, ProductCard, Services, Subscribe, Footer |
| `src/index.js` | Navigation, product, service, and slider data |
| `src/design/` | Reusable buttons, service cards, and carousel styling |
| `src/assets/` | Local images and SVG components |
| `public/shoes360/` | Shoe-image sequences used by the interactive viewers |
| `tailwind.config.js` | Tailwind theme and styling configuration |

## Customize

- Edit product and section data in `src/index.js`.
- Update prices, image sequences, and color-filter presets in `Product.jsx`.
- Replace each eight-image sequence in `public/shoes360/` when changing shoe models.
- Adjust animation timing in the section components.

## Current scope

The 360° experience switches between image frames; it is not a WebGL model viewer. Color changes use CSS filters. Cart state resets on refresh, and the cart badge does not implement checkout. Payment, inventory, authentication, and newsletter submission are not connected to a backend.

## Repository

[Source on GitHub](https://github.com/itzhoman/StepWise) · [Hooman Hajimohamadi](https://github.com/itzhoman)

Documentation reviewed against source commit [`113996b`](https://github.com/itzhoman/StepWise/commit/113996b16ccaef4fb44e3b88745bc209f0959f25).
