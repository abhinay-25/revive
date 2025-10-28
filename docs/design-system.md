# Revive Design System — Human + AI Harmony

A premium, health‑tech inspired system for physiotherapy tracking that blends human warmth with AI precision. This guide defines visual identity, components, and motion to ensure consistency and delight.

## Visual Identity

### Color Palette
- Primary `#6366F1` — main actions, progress, emphasis
- Accent `#8B5CF6` — highlights, brand gradient endpoint
- Dark BG `#0F172A` — dark base
- Surface Light `#F9FAFB` — light surfaces (cards, secondary layers)
- Success `#22C55E` — positive status, good rep
- Error `#EF4444` — posture alerts, failures
- Warning `#F59E0B` — cautionary hints
- Glass Overlay `rgba(255,255,255,0.08)` — frosted layers

Signature Gradient:
```
linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)
```
Use for hero, primary buttons, and progress fills.

### Typography
- Headings: Poppins / Inter (bold, rounded, futuristic)
- Body: Inter (regular/medium)
- Numeric Metrics: Orbitron / Rajdhani (digital gauge vibe)

Scale:
- h1: 2.5rem (md: 3rem) / 700
- h2: 1.75rem (md: 2rem) / 600
- p: 1rem, 1.6 line-height, #E5E7EB

Utility classes:
- `.h1`, `.h2`, `.ds-p` (implemented in `src/index.css`)
- Fonts are loaded in `index.html`; Tailwind families are exposed as `font-heading`, `font-body`, `font-numeric`.

### Layout & Spacing
- Grid: 12‑column responsive
- Container: centered, max‑width 1280px (`container` class)
- Padding: 1rem mobile, 2–3rem tablet/desktop
- Corners: `rounded-2xl`
- Rhythm: 16–24px vertical spacing (`gap-4` to `gap-6`)
- Composition: 60% camera/exercise, 40% metrics/feedback

### Glassmorphism & Shadows
Glass rules:
```
backdrop-filter: blur(10px);
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.10);
```
Utilities:
- `.glass`, `.glass-soft` (see `src/index.css`)

Shadows:
- AI Glow: `0 4px 30px rgba(99, 102, 241, 0.15)` (`shadow-ai` via Tailwind extension)
- Glow halo: `shadow-glow` utility for accents

### Motion & Interaction
Framer Motion usage guidelines:
- Entrances: subtle fade+lift (`float-in` keyframes or `variants.floatIn`)
- Hover: micro‑tilt or elevate; press: `scale(0.97)`
- Section transitions: smooth crossfade/lift between exercises

Micro‑interactions:
- Rep counter: hover emits glow (`whileHover` with textShadow) and slight scale
- AI feedback: AnimatePresence slide/fade on change (aria‑live supported)
- Status badge: gentle pulse (`animate-pulse-glow`)

Motion tokens (`src/styles/motion.js`):
- `transitions.quick/base/slow`, `springs.soft/firm`, `variants.floatIn`

### Accessibility
- Contrast ≥ 4.5:1; verify against backgrounds
- Touch targets ≥ 44px
- Announce live feedback: `role="status"` + `aria-live="polite"`
- Consider voice feedback toggle in future

### Reference Inspiration
- Camera Feed: Apple Fitness+
- Metrics: Fitbit dashboard
- Feedback: Calm App motion
- Buttons/Toggles: Tesla minimalism
- Glass Cards: macOS Control Center

## Implementation Notes
- Theming tokens added in `tailwind.config.js` (colors, fonts, shadows, animations)
- Fonts loaded in `index.html`
- Utilities and base styles in `src/index.css`
- Example components in `src/components/*` use the design system

## Usage Examples
- Primary button: `rounded-lg px-4 py-2 text-white gradient-brand shadow-ai`
- Glass card: `glass rounded-2xl p-4 shadow-ai`
- Heading: `<h1 class="h1">Title</h1>`
- Paragraph: `<p class="ds-p">...</p>`
- Metric number: `<div class="font-numeric text-3xl text-primary">42</div>`
