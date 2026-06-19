# Frontend Design Skill — CALMA

## Visual Direction

Premium light bakery aesthetic. Think Parisian patisserie meets modern B2B SaaS.
NOT a generic template. NOT default Tailwind. Every element should feel intentional.

## Design Tokens

```css
/* Colors */
--color-bg:        #FFFDF8;  /* warm white */
--color-surface:   #F5F0E6;  /* cream card bg */
--color-border:    #E8DDD0;  /* warm gray border */
--color-text:      #1C1412;  /* near-black */
--color-muted:     #7A6B5D;  /* warm gray */
--color-accent:    #8B4513;  /* saddle brown — primary CTA */
--color-accent-lt: #C49A6C;  /* light brown — hover / secondary */
--color-gold:      #C9A84C;  /* gold — price highlights */

/* Typography */
--font-display: 'Cormorant Garamond', Georgia, serif;   /* headings */
--font-body:    'DM Sans', system-ui, sans-serif;       /* body, UI */

/* Scale */
--text-xs:   0.75rem;
--text-sm:   0.875rem;
--text-base: 1rem;
--text-lg:   1.125rem;
--text-xl:   1.25rem;
--text-2xl:  1.5rem;
--text-3xl:  2rem;
--text-hero: clamp(3rem, 2rem + 5vw, 6rem);

/* Spacing (8px grid) */
--space-1: 0.5rem;
--space-2: 1rem;
--space-3: 1.5rem;
--space-4: 2rem;
--space-6: 3rem;
--space-8: 4rem;
--space-12: 6rem;
--space-16: 8rem;

/* Motion */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--duration-fast: 150ms;
--duration-base: 300ms;
--duration-slow: 600ms;
```

## Typography Rules

- Headlines (h1, h2): `font-display`, light or regular weight, generous letter-spacing (-0.02em)
- Body, labels, buttons: `font-body`, 400–500 weight
- Price / key numbers: `font-display` + `color-gold`
- Never use bold (700+) for display headings — it looks cheap

## Component Standards

### Buttons
- Primary: `bg-accent text-white` → hover `bg-accent-lt`, transition 150ms ease
- Secondary: `border border-accent text-accent` → hover `bg-surface`
- Rounded: `rounded-full` for CTAs, `rounded-lg` for form controls
- Padding: `px-6 py-3` minimum

### Cards
- Background: `bg-surface` (cream), NOT white
- Border: `border border-border` (1px)
- Shadow: `shadow-sm` max — avoid heavy card shadows
- Radius: `rounded-2xl`
- Hover: subtle lift with `translateY(-2px)` + shadow increase, 200ms

### Forms
- Input bg: `bg-white` with `border-border`
- Focus ring: `ring-2 ring-accent/30`
- Label: `font-body text-sm text-muted` above input
- Error: `text-red-600 text-sm`

## Animation Patterns (Framer Motion)

### Fade-in on scroll (use for sections, cards)
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}
// Wrap section in <motion.div viewport={{ once: true }} variants={fadeUp} initial="hidden" whileInView="visible">
```

### Staggered children (use for card grids)
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
```

### Hover card lift
```tsx
<motion.div whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} transition={{ duration: 0.2 }}>
```

### Button press
```tsx
<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
```

## Anti-Patterns (NEVER do)

- No gray-on-white default Tailwind cards
- No centered hero with generic gradient blob
- No uniform `rounded-md` on everything
- No `font-bold` on display headings
- No hard white (`#fff`) backgrounds — use `#FFFDF8`
- No `shadow-xl` on cards — it looks heavy and cheap
- No emoji in UI text

## Layout Principles

- Section padding: `py-16 md:py-24`
- Container: `max-w-6xl mx-auto px-4 md:px-8`
- Grid for products: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- Hero text: left-aligned on desktop, never centered unless intentional
- Use `gap` not `margin` between siblings

## Hierarchy Rule

Every page must have one dominant element. Hero h1 is the biggest thing. Everything else is smaller. No competing for attention.
