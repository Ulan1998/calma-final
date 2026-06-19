# CALMA — Claude Code Instructions

## Project

B2B сайт для CALMA — производство и продажа замороженных круассанов в Бишкеке (Кыргызстан).
Клиенты: кафе, рестораны, отели.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion (for ALL animations)
- Deployed to Vercel

## Design

Always follow `.claude/skills/frontend-design.md`.

Key rule: this site must look like a $10K agency build. No generic templates.
Colors, fonts, spacing — all defined in the design skill. Do not deviate.

## Integrations

### ERP (order creation)
- Endpoint: `POST https://calma-erp.vercel.app/api/webhooks/site-order`
- Header: `x-calma-secret: calma-site-2026`
- Body: `{ name, phone, items: [{ productId, qty }], notes }`

### Payments (xPay QR)
- Service: `https://calma-payments-production.up.railway.app`
- Flow: create order in ERP → get orderId → create QR → poll status every 4s
- Endpoints:
  - `POST /qr/create` → `{ qrCode, qrTransactionId, deeplink }`
  - `GET /status/:qr_transaction_id` → `{ status }` (PENDING | PAID | EXPIRED)
- deeplink: открывать через `window.open()`, НЕ `window.location.href`

### WhatsApp
- Number: `996500547727`
- CTA: `https://wa.me/996500547727`

## Animation Rules

Use Framer Motion for:
- Section reveal on scroll (fadeUp, once: true)
- Card grid stagger (staggerChildren: 0.08)
- Button hover/tap (scale)
- Overlay transitions (payment modal open/close)

Never use CSS transitions for complex sequences — use Framer Motion.

## File Structure

```
app/
  layout.tsx       # fonts, metadata, global styles
  page.tsx         # home page (single scroll)
  globals.css      # design tokens as CSS vars
components/
  layout/
    Navbar.tsx
    Footer.tsx
  sections/
    Hero.tsx
    Catalog.tsx
    Benefits.tsx
    HowItWorks.tsx
    OrderForm.tsx
  ui/
    Button.tsx
    ProductCard.tsx
    QrPaymentModal.tsx
```

## Code Style

- No `any` types
- Components < 150 lines — extract sub-components
- No hardcoded strings for URLs — use `lib/config.ts`
- Always handle loading and error states in UI
