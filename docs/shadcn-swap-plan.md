# shadcn/ui Component Swap Plan

This project already includes shadcn-style primitives under `src/components/ui`.
We will gradually replace local primitives with these standardized components to ensure consistent API and styling.

## Current shadcn-style components
- Button: `components/ui/button.jsx`
- Badge: `components/ui/badge.jsx`
- Card: `components/ui/Card.jsx` (existing; compatible)
- Dialog: `components/ui/dialog.jsx`
- Progress: `components/ui/progress.jsx`
- Tooltip: `components/ui/Tooltip.jsx` (existing; compatible)
- Slider: `components/ui/Slider.jsx` and alias re-export `components/ui/slider.jsx`

## Replacement Map
- atoms/Button.jsx → ui/button.jsx
- atoms/ProgressBar.jsx → ui/progress.jsx
- organisms/EndSessionModal.jsx (Radix dialog) → ui/dialog.jsx (DONE)
- ui/Tooltip.jsx already aligned
- ui/Card.jsx already aligned

## Rollout Steps
1. Audit imports and usage in components.
2. Replace imports to use `@/components/ui/*` modules.
3. Verify visual parity and adjust classNames.
4. Remove deprecated local components when no longer referenced.

## Notes
- Keep gradients, glass, and glow utilities from Tailwind tokens.
- Prefer subtle motion and transitions for professional feel.
- Consider code-splitting heavier UI and Lottie animations.
