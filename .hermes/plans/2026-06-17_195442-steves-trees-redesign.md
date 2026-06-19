# Steve's Trees Website Redesign — Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task. Do not deploy until the visual prototype is approved.

**Goal:** Fix the broken live site and deliver a modern, professional Steve's Trees website that Mateo will approve, using a design-approved throwaway HTML prototype before any production Next.js code.

**Architecture:** Static Next.js 16 export to `docs/` for GitHub Pages, Tailwind CSS v4 with custom theme colors, real job photos from `public/`, call-only CTAs.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Lucide icons, GitHub Pages.

---

## Current Diagnosis

### Why the live site looks like 1990

1. **Deployed site is missing its CSS.** The live HTML at `https://labington-icarus.github.io/steve-trees-website/` references an old `_next/static/chunks/3jxwj-nycf-lu.css` file that no longer exists on GitHub Pages. After the most recent local rebuild, the CSS chunk was renamed to `0k1ia7r-hwhyy.css` but this was never pushed. Result: no styles load, layout collapses, images/text stack vertically, looks broken.
2. **The design prototype is much better than the current deployed build.** The prototype in `design/index.html` uses a modern split hero, earthy palette, and clean typography. It was never translated faithfully into the Next.js build.
3. **The Next.js build changed styling direction after the prototype was approved.** The current components use a full-width dark hero, forest/lime palette, and dense sections. Mateo already rejected this direction once ("career-ruining").

### Why extraction is not the root cause

- `web_extract` is configured to `brave-free`, which is search-only. That only blocks *reference site scraping*, not local design quality.
- Browser tools failed because no CDP endpoint is running (`localhost:9222` refused). This is fixable.
- The actual blocker is **deviating from the approved prototype and not pushing the new build correctly**.

---

## Design Direction (locked)

Based on the approved `design/index.html` prototype and competitor analysis of Fredericksburg tree-service sites:

- **Layout:** Split hero (text left, hero image right on desktop), generous whitespace, max-width `max-w-6xl`, single-column mobile stack.
- **Palette:** warm cream background `#F5E6C8`, forest green `#1A4A32`, pine `#2E7D4A`, antique gold `#C9A227`, ink `#111111`. Derived from the real Steve's Trees logo.
- **Typography:** Inter (Google Fonts), large tight hero headline, restrained body, minimal all-caps eyebrow labels.
- **Imagery:** Real job photos. Hero uses the dramatic crane/tree-over-house shot (`job5.jpg`). Gallery uses all 8 job photos in a 4-column grid.
- **CTA:** Call-only. Phone number `(540) 642-6612` as primary button, sticky mobile call bar. No quote form.
- **Offer:** "$100 Off Tree Services — Mention This Site" badge above the headline.
- **Trust:** Insured, Fast Response, Free Estimates.
- **Services:** Tree Removal, Tree Trimming, Stump Grinding, Hardscaping — four clean cards.
- **Service area:** pill tags for Fredericksburg, Spotsylvania, Stafford, Locust Grove, Massaponax, Thornburg, Falmouth.

### What made the reference sites good or bad

| Site | What to copy | What to avoid |
|---|---|---|
| fredericksburgtreeservice.org | Simple headline, local trust copy, free-estimates, years-in-business | Dated builder template, weak visual hierarchy |
| bransonstreeservice.com | Strong "Quality. Safety. Honesty. Integrity." tagline, clear service menu | Cluttered hero, form overload, too many competing CTAs |
| topnotchtreeva.com | Prominent phone CTA, accreditation badges, service area pills | Busy layout, dated graphics |

---

## Plan

### Phase 1 — Fix the broken live site immediately

**Task 1.1: Rebuild and push the current codebase**
- Run `npm run build` in `/home/marsskinner/dev/steves-trees`.
- Verify the generated `docs/index.html` references the *new* CSS chunk (`_next/static/chunks/*.css`) and that the file exists in `docs/_next/static/chunks/`.
- Commit and push to `origin/main` so GitHub Pages updates.
- Verification: `curl https://labington-icarus.github.io/steve-trees-website/` returns HTML whose CSS `href` returns HTTP 200.

**Task 1.2: Add a build-time smoke test**
- Create `scripts/build-smoke.sh` that:
  1. Runs `npm run build`
  2. Greps `docs/index.html` for the CSS chunk filename
  3. Confirms the CSS file exists in `docs/_next/static/chunks/`
  4. Confirms `docs/logo.png`, `docs/job5.jpg`, etc. exist
- Make it executable and run it before every future push.
- Verification: script exits 0 and prints all checks.

### Phase 2 — Reset to the approved visual prototype

**Task 2.1: Rebuild the HTML/CSS prototype in `design/index.html`**
- File: `/home/marsskinner/dev/steves-trees/design/index.html`
- Use Tailwind CDN, Inter font, the exact palette above, and real assets from `public/`.
- Include all sections: navbar, split hero with offer badge, trust bar, services, gallery, why us, service area, call CTA, footer, sticky mobile bar.
- Verification: open `design/index.html` via local `http.server`, take a headless Chrome screenshot, confirm no console errors.

**Task 2.2: Get Mateo's approval on the prototype**
- Serve `design/index.html` through a Cloudflare tunnel so Mateo can preview on his phone.
- Ask for explicit approval on: layout, headline, colors, hero photo, offer badge, CTA style, gallery, footer.
- Do not proceed to Phase 3 until approved.

### Phase 3 — Translate the approved prototype to Next.js

**Task 3.1: Reset Next.js styles and components**
- Rewrite `app/globals.css` to use the approved Tailwind v4 theme tokens (`--color-cream`, `--color-forest`, `--color-pine`, `--color-gold`, `--color-ink`, `--color-charcoal`).
- Rewrite `app/page.tsx` to compose the new sections.
- Delete or rewrite all files in `app/sections/` to match the prototype exactly.

**Task 3.2: Implement sections one by one**
- `Navbar.tsx`: transparent-to-cream on scroll, logo left, call button right, mobile hamburger menu.
- `Hero.tsx`: two-column split hero, left text stack, right hero image card with offer overlay.
- `TrustBar.tsx`: three trust items (Insured, Fast Response, Free Estimates) with simple icons.
- `Services.tsx`: four light cards on cream background.
- `Gallery.tsx`: 4-column photo grid, 8 real job photos, hover labels.
- `WhyUs.tsx`: clean three-point section with icons.
- `ServiceArea.tsx`: pill tags on forest-green background.
- `CallCta.tsx`: centered call CTA on cream background.
- `Footer.tsx`: simple footer with logo, phone, copyright.
- `StickyCallBar.tsx`: mobile-only sticky bottom call bar.

**Task 3.3: Fix GitHub Pages asset paths**
- Keep `app/lib/imgSrc.ts` helper to prefix `basePath` for all local images.
- Use `imgSrc()` in every `Image` component and `<img>` tag.
- Keep `next.config.ts` with `basePath: "/steve-trees-website"`, `assetPrefix: "/steve-trees-website/"`, `output: "export"`, `distDir: "docs"`, `images: { unoptimized: true }`.
- Verification: after build, `grep -o '/steve-trees-website/[^"]*' docs/index.html | xargs -I {} test -f docs{}` passes.

### Phase 4 — Add the scroll-driven tree-fall animation (future)

**Task 4.1: Generate the falling-tree video**
- Use Higgsfield CLI (`higgsfield video generate ...`) or any available video-generation tool to create a short clip of a tree falling, ending with the Steve's Trees logo reveal.
- Keep file under `public/tree-reveal.mp4` with MP4 + WebM sources.

**Task 4.2: Implement pinned scroll hero**
- Use GSAP ScrollTrigger with `pin: true, scrub: true` to map scroll progress to the video frame/logo reveal.
- Add `prefers-reduced-motion` fallback that shows a static hero.
- Verification: test in browser, confirm smooth scrub and no jank on mobile.

**Task 4.3: Only add this after the main site is approved**
- This is a nice-to-have enhancement. Do not let it delay the core redesign.

---

## Verification Checklist

- [ ] Live site CSS loads correctly (HTTP 200, styles render).
- [ ] `design/index.html` matches the approved prototype visually.
- [ ] Next.js build outputs to `docs/` and all referenced assets exist.
- [ ] GitHub Pages deploy shows the same styling as local build.
- [ ] Mobile screenshot looks good (sticky call bar, no horizontal scroll, readable text).
- [ ] No broken image links.
- [ ] All CTAs are call-only; no quote form.

## Risks and Open Questions

1. **Mateo must approve the prototype first.** Without approval, any Next.js work risks rejection.
2. **GitHub Pages cache can be stale.** A push may take 1–5 minutes to reflect. Verify via curl with cache-busting query param if needed.
3. **Tailwind v4 syntax is new.** Current `globals.css` uses `@theme` and `@import "tailwindcss"` which Next.js 16 + Tailwind v4 supports. Do not revert to v3 syntax.
4. **Open Design MCP skill:** It is installed but not required for this fix. The design direction is already locked by the approved prototype and the skill references. We can wire it fully later if Mateo wants collaborative UI tooling.

---

## Files Likely to Change

- `app/globals.css`
- `app/page.tsx`
- `app/layout.tsx`
- `app/sections/*.tsx`
- `app/lib/imgSrc.ts`
- `design/index.html`
- `next.config.ts`
- `scripts/build-smoke.sh`
- `.github/workflows/` (optional: add deploy check)

## Rollback

If the new build is rejected:
1. Stop all pushes.
2. Revert `docs/` to the previous Git commit state.
3. Return to `design/index.html` and iterate on the prototype until approved.
