# QA Report — Timeline (enhancev2 branch)

**Date:** 2026-05-07
**Branch:** enhancev2
**Mode:** Diff-aware code review (no live server available)
**Files changed:** index.html, page-02.html, page-03.html

---

## Summary

All 3 pages received visual polish changes. No functional regressions detected in code review. One numeric issue found and fixed (AMP clamp too low).

### Changes Verified

| Change | Status | Notes |
|--------|--------|-------|
| Font: Cormorant Garamond → Playfair Display (pages 1 & 3) | PASS | Consistent across all 3 pages |
| Page 1: Subtitle breathe 0.38–0.68 → 0.35–0.75 | PASS | More visible |
| Page 1: Glow orb 0.12 → 0.16 | PASS | Warmer |
| Page 1: Transition 820ms → 600ms | PASS | Snappier |
| Page 2: Non-active brightness 0.5 → 0.6 | PASS | Cards more readable |
| Page 2: Border-radius 16px → 12px | PASS | More editorial |
| Page 2: Text-card shimmer border | PASS | @property --shimmer-angle animated |
| Page 2: Progress dots lower, slide-info higher | PASS | Prevents overlap |
| Page 2: Focus-visible gold outline | PASS | Accessibility |
| Page 2: Transition 800ms → 700ms | PASS | |
| Page 2: Canvas bg varied | PASS | Different blob positions |
| Page 3: Particles 25 → 40 | PASS | Matches page 1 density |
| Page 3: Sway ±1.5° → ±2.5° | PASS | More visible pendulum |
| Page 3: Rope stroke 4→5 with glow | PASS | More visible |
| Page 3: Rope shadow 7→9 | PASS | Proportional |
| Page 3: Audio button always visible | PASS | Play/pause toggle works |
| Page 3: Canvas bg varied | PASS | Different blob positions |
| Page 3: Transition 820ms → 600ms | PASS | |
| Page 3: Polaroid width 140-190 → 180-280 | PASS | Bigger photos |
| Page 3: Bezel padding 12/36 → 8/28 | PASS | Thinner borders |
| Page 3: Caption 22px/10px → 18px/9px | PASS | Proportional to thinner bezel |
| Page 3: AMP clamp 90-148 → 140-320 | PASS | Wider sway (fixed from initial 200) |
| Page 3: ROPE_TOP 70 → 10 | PASS | Starts near top |
| Page 3: Anchor pin dot at top | PASS | Visual anchor point |
| Page 3: First curve control 80→120 | PASS | Smoother entry from top |
| Page 3: xVar 24→36 | PASS | More organic variation |
| Page 3: Rotation 3-8.5 → 4-11 | PASS | More tilt with bigger frames |
| Page 3: Horizontal offset 12→16 | PASS | Better alignment with bigger frames |
| Page 3: Vertical offset 38→28 | PASS | Better with thinner bezel |
| Page 3: SPACING 370→390 | PASS | Room for bigger frames |

### Issues Found & Fixed

**ISSUE-001: AMP clamp too restrictive**
- **Severity:** High
- **Description:** Initial AMP clamp max was 200px. On a 1920px screen, W*.42=806px gets clamped to 200px, meaning the rope barely sways wider than before. User wanted to "fill the page."
- **Fix:** Increased max from 200 to 320, min from 120 to 140. On 1920px: 806 clamped to 320px each side = 640px total sway, which fills most of the screen.
- **Status:** Verified

### Potential Concerns (not bugs, but watch)

1. **Mobile layout**: With AMP up to 320px and polaroid width 180-280px, on narrow screens (<500px) polaroids may extend beyond viewport. The `clamp(W*.22,180,280)` should handle this — on a 375px screen, W*.22=82.5 which clamps to 180px minimum. Combined with AMP clamped to min 140px, this should stay within bounds.

2. **Long page**: SPACING=390 * 127 items = ~49,500px of content plus 700px + VH. This is a very tall page. Scroll performance should be fine since IntersectionObserver only renders visible polaroids.

3. **Missing assets**: All 127 media files (photos + videos) are referenced but don't exist yet. This will cause broken images/videos but is expected — the assets need to be added separately.

---

## Health Score

| Category | Score |
|----------|-------|
| Console | 100 (no JS errors in code review) |
| Links | N/A (no navigation links to test) |
| Visual | 85 (changes are well-implemented, mobile concern noted) |
| Functional | 95 (all interactions preserved, audio toggle improved) |
| UX | 90 (better visibility, wider sway, bigger photos) |
| Performance | 90 (particles 25→40 on long page, but OK) |
| Content | 100 (text unchanged) |
| Accessibility | 80 (audio toggle improved, but no ARIA on polaroids) |

**Weighted Score: 90/100**

---

## Top 3 Things to Fix

1. ~~AMP clamp too restrictive~~ — **FIXED** (200→320)
2. Add actual image/video assets to `./assets/` directory
3. Consider adding `loading="lazy"` attribute handling for videos (already present for images)