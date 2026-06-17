# Steve's Trees — Website Design Plan

## Goal
Phone-call-first site for a local tree service. Must feel trustworthy, capable, and local — not generic template junk. One-page scroll.

## Brand Colors (from logo)
| Token | Hex | Role |
|-------|-----|------|
| Cream | `#F5E6C8` | page background, light sections |
| Forest | `#1A4A32` | primary text, nav, primary buttons |
| Pine | `#2E7D4A` | accent, hover states, secondary surfaces |
| Gold | `#C9A227` | CTA emphasis, discount badge, highlights |
| Black | `#111111` | footer, strong contrast moments |

## Typography
- **Headings:** tight sans, heavy weight, slightly negative letter-spacing.
- **Body:** clean sans, readable, 1.6 line-height.
- **Accent numerals / discount:** bold, gold where it converts.

## Design System Influences
Based on `nexu-io/open-design` **Warm Editorial** + **Atelier Zero** principles:
- warm paper-like backgrounds
- generous whitespace
- one dominant accent moment per viewport
- serif optional only for small editorial touches (not the headline)
- restrained shadows and radii
- hairline rules to separate sections

## Page Sections

### 1. Navbar
- Fixed top, transparent on hero, becomes cream with forest shadow on scroll.
- Logo left.
- Right: Services, Work, Quote, phone button.
- Mobile: hamburger → phone-first menu.

### 2. Hero
**Layout:** full viewport height. Split screen: left copy, right image/video surface.
**Left side:**
- small uppercase eyebrow: "Tree Removal & Hardscaping in Fredericksburg, VA"
- H1: "Big trees. Safe removal. Clean yard."
- subline: "Steve's crew handles tree trimming, removals, stump grinding, and hardscaping across Fredericksburg and surrounding areas."
- primary CTA: gold button "Call (540) 642-6612"
- secondary CTA: forest outline button "Free Quote"
- trust row: Insured · Local Crew · Free Estimates
- discount badge: "$100 Off Tree Services — Mention This Site"
**Right side:**
- full-height media container.
- **Phase 1:** job2.jpg (crane + logs) as static hero image with subtle parallax.
- **Phase 2:** replace with Higgsfield-generated video: dramatic wide shot, crane removing large tree near house, earthy tones matching palette.
- **Scroll animation overlay:** as user scrolls down, a SVG tree silhouette on the right side slowly "falls" (rotates) while the hero text cross-fades in. This happens in the first ~40vh of scroll. Not the whole page.

### 3. Services
Cream background, 4 cards in a row (2×2 on tablet, 1 col mobile).
Cards: Tree Removal, Tree Trimming, Stump Grinding, Hardscaping.
Each: forest icon, bold title, 2-line description, subtle hover lift.

### 4. Proof / Gallery
Dark forest section (`#1A4A32`) with cream text.
Headline: "Real jobs. Real results."
2×4 image grid of job-site photos (job1–job8), rounded corners.
Hover: slight scale + gold caption overlay with service type.

### 5. Why Steve's
Cream background.
Three pillars with icons:
- Insured crew
- Fast, local response
- Clean, done-right work
Plus one highlighted stat card: "Free estimates. No pressure."

### 6. Service Area
Forest bar with gold text.
Pill chips: Fredericksburg, Spotsylvania, Stafford, Locust Grove, Massaponax, Thornburg, Falmouth.

### 7. Quote Form
Cream section with simple form: Name, Phone, Email (optional), Service, Message.
No backend in first pass. Submit button shows "Thanks, we'll call you soon." placeholder.
Can wire to Formspree or email later.

### 8. Footer
Black background, cream text, logo, phone, copyright.

## Motion / Scroll Plan
- **Hero only:** SVG tree on right rotates from upright to fallen as user scrolls 0→40vh. Opposite: headline/badge fade/slide in from left.
- **Services cards:** stagger fade-in on scroll.
- **Gallery:** images scale slightly on hover.
- **Sticky mobile call bar:** gold button fixed to bottom on mobile.

## Before-Code Deliverable
Static HTML prototype at `/design/index.html` using Tailwind CDN. This lets Mateo approve layout, type, and color without seeing React code. Once approved, rebuild cleanly in Next.js.

## Photo Assignments
| Photo | Use |
|-------|-----|
| job2.jpg | Hero background (Phase 1) |
| job5.jpg | Gallery feature / possible alt hero |
| job4.jpg | Gallery — climbing/trimming |
| job1.jpg | Gallery — hauling/log work |
| job3.jpg, job6.jpg, job7.jpg, job8.jpg | Gallery grid |

## Anti-Patterns (from Open Design)
- No gradient hero backgrounds.
- No emojis.
- No more than one gold moment per viewport.
- No stock photos.
- No long paragraphs.
- Border radius: 12–24px max.
