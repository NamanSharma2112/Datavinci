# Grippi — landing page redesign concept

A redesign concept for [grippi.io](https://grippi.io). Not the official site. See **[docs/REDESIGN-NOTES.md](docs/REDESIGN-NOTES.md)** for what changed and why, plus bugs found on the live site.

![After](docs/after-hero.jpg)

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```

To deploy, import the repo on Vercel. No configuration is needed.

## Before sharing

1. Put your name and LinkedIn in `concept.author` / `concept.authorUrl` in `content/site.ts` (shown in the footer).
2. All copy, numbers, pricing and testimonials come from grippi.io (captured Nov 2026). Re-check pricing and stats if time has passed.

## Stack

- **Next.js 16** (App Router, static) · **React 19** · **TypeScript** · **Tailwind CSS v4** · **Motion**
- Fonts: Figtree + Inter (Grippi's own), self-hosted via Fontsource
- [ObsidianUI](https://www.obsidianui.dev) (MIT): number animation, segmented control and sparkline, adapted from its Analytics Dashboard
- [Libraries.dev](https://libraries.dev): `thinking-orbs` (AI loading states) and `border-beam` (Ask Grippi composer while answering; the Agency plan button)
- Card stack: interaction inspired by Bencho's "Card swap", original implementation (`components/ui/card-swap.tsx`)
- [Aceternity UI](https://ui.aceternity.com): Infinite Moving Cards (platform strip) and World Map (closing section, dots built server-side with `dotted-map`)
- Platform marks: [simple-icons](https://simpleicons.org) (CC0)

## Structure

```
app/                 layout, page, tokens (light + dark) in globals.css
components/sections  nav, hero, dashboard/ (interactive app), platforms, real-number, ask,
                     features, agencies, proof, pricing, faq, final-cta, footer
components/ui        button, reveal, count-up, theme, logo, icons, marquee, beam CTA
content/site.ts      every word on the page
docs/                redesign notes and before/after screenshots
```
