# Main Screen Layout — Physiotherapy Tracking (Desktop/Tablet)

A balanced, responsive layout with 60% visual weight on the real-time camera and 40% on guidance/feedback, aligned to the design system (Human + AI Harmony).

## Component Hierarchy
- HeaderBar
  - Brand title (gradient text)
  - StatusBadge (Active/Paused)
  - Help & Settings icons
- Main Grid (12 columns)
  - Left (col-span-12 lg:col-span-7)
    - CameraFeed (16:9, glass frame, subtle glow)
    - Overlay: “Tracking posture… ✅” pill
    - Metrics Grid (2 x 3 on md+)
      - Reps Completed
      - Sets
      - Timer
      - Status (Auto-detect)
      - Quality Score (with Radix Progress; brand gradient fill)
  - Right (col-span-12 lg:col-span-5)
    - ExerciseReference (label: “Ideal Movement”)
    - AI Feedback Bar (aria-live)
    - Session Controls (End/Save/Restart/Pause)
- Footer
  - Lightweight attribution / hint text

## Grid & Spacing
- Container: centered, max 1280px
- Grid: 12 columns, gap-6 (24px)
- Desktop (≥1024px): 7/5 split (≈60/40)
- Tablet (≥768px): stack sections vertically; metrics grid in 3 columns
- Mobile (<768px): single-column list — camera, then key metrics, feedback, controls

## Motion Principles
- Use Framer Motion `layout` on main grid for smooth reflows
- Soft entrances: fade + lift 300–600ms
- Micro-interactions:
  - Camera hover: slight scale (1.02) + glow
  - Rep value: gentle hover glow
  - Buttons: hover lift (-1px) + press scale(0.97)
  - Feedback changes: slide/fade with AnimatePresence

## Visual Style
- Glassmorphism: frosted panels with AI halo (`.glass`, `shadow-ai`)
- Brand gradient: violet blend for primary CTAs and progress fills
- Corner radius: rounded-2xl on large surfaces, rounded-lg on controls

## Accessibility
- `aria-live="polite"` in feedback bar
- Contrast ≥ 4.5:1 for text on surfaces
- Touch targets ≥ 44px (buttons)

## Code References
- Page: `src/pages/TrackingPage.jsx`
- Header: `src/components/HeaderBar.jsx`, `src/components/StatusBadge.jsx`
- Metrics: `src/components/MetricCard.jsx`, `src/components/MetricsPanel.jsx`
- Feedback: `src/components/FeedbackBar.jsx`
- Controls: `src/components/SessionFooter.jsx`
- Styles: `tailwind.config.js`, `src/index.css`, `src/styles/motion.js`
