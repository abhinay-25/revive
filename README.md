# Physio Tracker UI

Next‑gen React 18 + Vite frontend, optimized for design, animation, responsiveness, and developer productivity.

## Stack
- React 18 + Vite
- Tailwind CSS v3 (dark mode via class)
- Framer Motion
- Zustand
- Radix UI primitives (slider, progress, dialog)
- Lucide Icons
- ESLint + Prettier + Husky + lint-staged

## Quick start
```powershell
# from repo root
cd c:\revive\physio-tracker-ui
npm install
npm run dev
```
Open http://localhost:5173

## Design System
See `docs/design-system.md` for the full visual identity and implementation details.

## Tailwind
- Custom colors: `primary`, `accent`, `bgDark`, `glass`
- Utilities: `.glass`, `.glass-soft`, `.shadow-glow`, `.h1`, `.h2`, `.muted`

## Shadcn UI (optional)
You can add shadcn/ui components later:
```powershell
npx shadcn@latest init -y
npx shadcn@latest add button card progress dialog slider
```
If the CLI asks for Vite alias, follow https://ui.shadcn.com/docs/installation/vite

## Project structure
```
src/
  assets/{icons,videos,lotties}
  components/
  hooks/
  pages/
  store/
```

## Verify animation
See `src/components/MotionTest.jsx` rendered on the homepage.

## Git
The project is configured and already linked to `origin https://github.com/abhinay-25/revive.git`.
