# Generator State — Iteration 002

## What Was Built
- CALMA B2B single-scroll landing: Hero, Manifesto (ink), Catalog, Benefits, HowItWorks (ink), OrderSection, Footer (ink)
- Cart context + QR payment modal (xPay) + ERP order webhook flow

## What Changed This Iteration
- Fixed: removed every emoji. Added `components/ui/icons.tsx` with SVG line icons
  (Cart, Close, Check, Croissant, Factory, Truck, Box, Card). Wired into Navbar
  cart badge, OrderSection (empty cart, line items, remove button), QrPaymentModal
  (close / paid / error states).
- Fixed: only one dark section before — now three ink sections (Manifesto, HowItWorks,
  Footer) for proper rhythm.
- Improved: Footer rebuilt on `--color-ink` with a large Cormorant CALMA wordmark,
  gold hairline on top, contacts + Bishkek address + WhatsApp, small copyright row.
- Improved: HowItWorks rebuilt as ink section — horizontal 4-step timeline
  (01 Заявка → 02 Доставка → 03 Выпечка → 04 Подача) with large gold Cormorant
  numerals and a gold connecting rail; collapses to a vertical timeline on mobile.
- Improved: Benefits rebuilt into a bento grid (one large 2x2 feature tile + smaller
  tiles of differing spans, one tile inverted to `--color-accent` with white text),
  SVG icons instead of emoji.
- Fixed: duplicate `id="about"`. Manifesto is now `id="manifesto"`; Benefits owns
  `id="about"` to match the navbar link.
- Fixed: broken Unsplash URL `photo-1620921575116-fb8902865891` replaced with a
  working photo.
- Fixed: weak phone validation. Added `lib/validate-phone.ts` `isValidKGPhone`
  (matches +996/0 with 5XX/7XX mobile prefixes); used in `canSubmit` with inline
  error hint in the order form.

## Known Issues
- Product images reuse a few Unsplash shots across catalog entries (no per-product
  photography available yet).

## Dev Server
- URL: http://localhost:3000
- Status: running (HTTP 200 verified)
- Command: npm run dev
