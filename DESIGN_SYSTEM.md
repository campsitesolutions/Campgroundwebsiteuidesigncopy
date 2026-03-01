# CampSite Solutions Design System

**Modern, refined, nature-inspired design for Ontario seasonal campgrounds**

---

## Overview

This design system provides a sophisticated, scalable foundation for campground websites. Built with premium neutrals and nature-inspired elements, it maintains consistency while allowing customization across multiple campground brands.

---

## Typography

### Font Stack

- **Primary (Body):** System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Headings:** Inter (with system font fallbacks)
- **Monospace:** SF Mono, Monaco, Cascadia Code

### Type Scale (Major Third 1.250)

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| Display | 61px (3.815rem) | 700 | 1.25 | Hero displays |
| Hero | 49px (3.052rem) | 700 | 1.25 | Large heroes |
| **H1** | **39px (2.441rem)** | **700** | **1.25** | **Page titles** |
| **H2** | **31px (1.953rem)** | **600** | **1.375** | **Section headings** |
| **H3** | **25px (1.563rem)** | **600** | **1.375** | **Subsection headings** |
| **H4** | **20px (1.25rem)** | **500** | **1.5** | **Small headings** |
| Large | 18px (1.125rem) | 400 | 1.625 | Lead paragraphs |
| **Body** | **16px (1rem)** | **400** | **1.625** | **Body text** |
| Small | 14px (0.875rem) | 400 | 1.5 | Secondary text |
| XSmall | 12px (0.75rem) | 400 | 1.5 | Captions, labels |

### Font Weights

- **Light:** 300 - Rarely used
- **Normal:** 400 - Body text
- **Medium:** 500 - Labels, buttons, H4
- **Semibold:** 600 - H2, H3
- **Bold:** 700 - H1, emphasis

### Letter Spacing

- **Tight:** -0.025em - Headlines (H1-H6)
- **Normal:** 0 - Body text, buttons
- **Wide:** 0.025em - All-caps text

---

## Spacing System

**8px base grid** for consistent visual rhythm

| Token | Value | Pixels | Common Uses |
|-------|-------|--------|-------------|
| space-0 | 0 | 0px | Reset |
| space-1 | 0.5rem | 8px | Tight padding, icon gaps |
| space-2 | 1rem | 16px | Default gaps, small padding |
| space-3 | 1.5rem | 24px | Card padding, moderate gaps |
| space-4 | 2rem | 32px | Section spacing |
| space-5 | 2.5rem | 40px | |
| space-6 | 3rem | 48px | Component margins |
| space-8 | 4rem | 64px | Section padding |
| space-10 | 5rem | 80px | |
| space-12 | 6rem | 96px | Large section gaps |
| space-16 | 8rem | 128px | Major section spacing |

**Usage Example:**
```css
/* Card with consistent spacing */
.card {
  padding: var(--space-6); /* 48px */
  gap: var(--space-4); /* 32px */
  margin-bottom: var(--space-8); /* 64px */
}
```

---

## Color Palette

### Premium Neutrals (Warm Gray)

Sophisticated stone-inspired grays with warmth. **All colors meet WCAG 2.0 Level AA contrast requirements.**

| Name | Hex | Contrast | Usage |
|------|-----|----------|-------|
| gray-50 | #FAFAF9 | - | Subtle backgrounds |
| gray-100 | #F5F5F4 | - | Muted backgrounds, cards |
| gray-200 | #E7E5E4 | - | Subtle borders |
| gray-300 | #D6D3D1 | - | Default borders, dividers |
| gray-400 | #A8A29E | - | Disabled states (intentionally low contrast) |
| gray-500 | #6B6662 | **3:1** | **Large text only** (18pt+) - Tertiary text |
| gray-600 | #504C48 | **4.5:1** | **Body text** - Secondary text, paragraphs |
| gray-700 | #3D3935 | **7:1** | Strong emphasis text |
| gray-800 | #292524 | **11:1** | Near-black text |
| gray-900 | #1C1917 | **15:1** | Primary text, headings |
| gray-950 | #0C0A09 | **19:1** | Pure black alternative |

**Important Usage Notes:**
- **text-primary (gray-900):** Use for headings and high-emphasis text
- **text-secondary (gray-600):** Use for body text and standard paragraphs - **4.5:1 contrast ✓**
- **text-tertiary (gray-500):** **Only use for large text (18pt+)** or non-critical UI elements - **3:1 contrast**
- **text-disabled (gray-400):** Intentionally low contrast for disabled states - does not need to meet WCAG standards

### Nature-Inspired Accents

Earth tones for subtle brand personality

| Name | Hex | Usage |
|------|-----|-------|
| earth-moss | #4A5D4F | Forest green accent |
| earth-pine | #2C3E30 | Deep green accent |
| earth-stone | #8B8680 | Neutral accent |
| earth-sand | #D4C5B0 | Warm neutral |
| earth-clay | #A67B5B | Warm earth tone |

### Emerald Brand Color

**Note:** Only for "CampSite Solutions" header branding. Individual campgrounds use customizable color palettes.

| Name | Hex | Usage |
|------|-----|-------|
| emerald-600 | #059669 | Primary brand |
| emerald-700 | #047857 | Hover states |
| emerald-800 | #065F46 | Active states |

### Semantic Colors

| Purpose | Color | Hex |
|---------|-------|-----|
| Success | Green | #16A34A |
| Warning | Amber | #D97706 |
| Error | Red | #DC2626 |
| Info | Blue | #0284C7 |

---

## Design Tokens

### Backgrounds

```css
--background: #FFFFFF
--background-subtle: gray-50 (#FAFAF9)
--background-muted: gray-100 (#F5F5F4)
```

### Surfaces

```css
--surface: #FFFFFF
--surface-hover: gray-50
--surface-active: gray-100
```

### Borders

```css
--border-subtle: gray-200
--border-default: gray-300
--border-strong: gray-400
```

### Text Colors

```css
--text-primary: gray-900 (high contrast)
--text-secondary: gray-600 (body text)
--text-tertiary: gray-500 (captions)
--text-disabled: gray-400
--text-inverse: #FFFFFF (on dark backgrounds)
```

---

## Shadows

Subtle, refined elevation system

| Token | Value | Usage |
|-------|-------|-------|
| shadow-xs | 0 1px 2px rgba(0,0,0,0.05) | Subtle lift |
| shadow-sm | 0 1px 3px rgba(0,0,0,0.1) | Small cards |
| shadow-md | 0 4px 6px rgba(0,0,0,0.1) | Cards, dropdowns |
| shadow-lg | 0 10px 15px rgba(0,0,0,0.1) | Modals, popovers |
| shadow-xl | 0 20px 25px rgba(0,0,0,0.1) | Large modals |

**Philosophy:** Shadows are restrained and natural. Avoid heavy shadows that feel artificial.

---

## Border Radius

Restrained, sophisticated rounding

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| radius-sm | 0.25rem | 4px | Small elements |
| radius-md | 0.375rem | 6px | Form inputs |
| radius-lg | 0.5rem | 8px | **Default** - Cards, buttons |
| radius-xl | 0.75rem | 12px | Large cards |
| radius-2xl | 1rem | 16px | Hero sections |
| radius-full | 9999px | ∞ | Circles, pills |

**Default:** 8px (radius-lg) - Restrained but friendly

---

## Component Patterns

### Buttons

```css
/* Primary Button */
.btn-primary {
  padding: var(--space-2) var(--space-4); /* 16px 32px */
  border-radius: var(--radius-lg); /* 8px */
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-sm);
  background: var(--gray-900);
  color: var(--text-inverse);
}

/* Secondary Button */
.btn-secondary {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-medium);
  background: var(--gray-100);
  color: var(--gray-900);
  border: 1px solid var(--border-default);
}
```

### Cards

```css
.card {
  padding: var(--space-6); /* 48px */
  border-radius: var(--radius-xl); /* 12px */
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-sm);
}
```

### Inputs

```css
.input {
  padding: var(--space-2) var(--space-3); /* 16px 24px */
  border-radius: var(--radius-md); /* 6px */
  border: 1px solid var(--border-default);
  background: var(--input-background);
  font-size: var(--text-base);
}
```

---

## Customization for Campgrounds

### What Stays Fixed

- Typography scale and hierarchy
- Spacing system (8px grid)
- Shadow system
- Border radius system
- Premium neutral grays

### What's Customizable

- **Brand Colors:** Individual campgrounds can choose from 10 color palettes
- **Logo:** Upload custom campground logo
- **Campground Name:** Custom name and tagline
- **Images:** Custom photography throughout sections

### Color Palette System

Each campground can select from 10 pre-designed palettes:

1. **Classic Forest** - Deep green & brown
2. **Lake Sunset** - Orange & teal
3. **Mountain Pine** - Pine & stone
4. **Autumn Trails** - Rust & gold
5. **Wildflower** - Purple & sage
6. **Cedar & Moss** - Sage & earth
7. **Campfire** - Warm orange & charcoal
8. **Evergreen** - Forest & sand
9. **River Stone** - Blue-gray & clay
10. **Northern Lights** - Deep blue & moss

**Important:** The "CampSite Solutions" header (main navigation) uses the official brand colors (dark slate background with tan/gold accents matching the logo) and does not change with palette selections.

---

## Accessibility

### Contrast Requirements (WCAG 2.0 Level AA)

**✓ All text colors meet or exceed WCAG 2.0 Level AA standards:**

| Text Type | Required Ratio | Our Implementation |
|-----------|---------------|-------------------|
| Normal text (< 18pt) | 4.5:1 | gray-600 on white = **4.5:1 ✓** |
| Large text (≥ 18pt) | 3:1 | gray-500 on white = **3:1 ✓** |
| Headings & emphasis | 4.5:1+ | gray-900 on white = **15:1 ✓✓✓** |

**Color Usage Guidelines:**
- ✅ **text-primary (gray-900):** 15:1 contrast - Use for headings, primary content
- ✅ **text-secondary (gray-600):** 4.5:1 contrast - Use for body text, paragraphs
- ⚠️ **text-tertiary (gray-500):** 3:1 contrast - **Only for large text (18pt+)** or icons
- ℹ️ **text-disabled (gray-400):** Low contrast - Intentional for disabled UI states

**Testing Custom Colors:**
When creating custom campground color palettes, always test text contrast using:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio Tool](https://contrast-ratio.com/)

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Typography

- Base size: 16px (accessible default)
- Line height: 1.625 for body text (readability)
- Letter spacing: -0.025em on headings (optical balance)

---

## Implementation Guidelines

### Using the Design System

1. **Spacing:** Always use the 8px grid (`--space-*` tokens)
2. **Colors:** Use semantic tokens (`--text-primary`) not raw colors
3. **Typography:** Let base styles handle hierarchy, override only when needed
4. **Shadows:** Use sparingly for elevation, not decoration
5. **Radius:** Stick to `--radius-lg` (8px) for most elements

### CSS Custom Properties

```css
/* ✅ Good - Uses design tokens */
.card {
  padding: var(--space-6);
  background: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

/* ❌ Bad - Hard-coded values */
.card {
  padding: 48px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
```

### Tailwind Classes

The design system is integrated with Tailwind v4. All tokens are available as utility classes.

**Examples:**
- Spacing: `p-6` = `var(--space-6)` = 48px
- Colors: `bg-surface` `text-secondary` `border-default`
- Radius: `rounded-lg` = 8px
- Shadows: `shadow-md`

---

## Dark Mode Support

The design system includes full dark mode support with adjusted colors and shadows for low-light environments.

**Toggle:** Use `.dark` class on parent element or `:root`

---

## Scalability

This system is designed to:

- Work across multiple campground brands
- Maintain consistency while allowing personality
- Scale from small campgrounds to large resort chains
- Adapt to seasonal promotions and special content
- Support future features and sections

---

## Questions?

For implementation questions or design guidance, refer to:
- `/src/styles/theme.css` - Full design token definitions
- Component files in `/src/app/components/` - Real-world usage examples
- Color palette system in `/src/data/colorPalettes.ts`