# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# ИСТОЧНИКИ ИСТИНЫ (в порядке приоритета)

1. `CALMA_BIBLE.md` — мир, персонажи, запреты
2. `CLAUDE.md` (этот файл) — архитектура, процесс, код
3. `CONTENT_LOCK.md` — все тексты и контент зафиксированы до верстки
4. `ANIMATION_MAP.md` — какой персонаж, где, когда, с каким fallback
5. Живой код

---

# ПРОЕКТ

B2B mobile-first сайт CALMA — замороженные круассаны для HoReCa (кафе, рестораны, отели) в Бишкеке, Кыргызстан.

**Целевая аудитория:** владельцы и менеджеры кафе/ресторанов/отелей.
**Цель сайта:** оформить заказ через форму или QR-оплату.

---

# СТЕК

- **Next.js 16** App Router
- **React 19** / TypeScript
- **Tailwind CSS v4**
- **Framer Motion v12** — ВСЕ анимации
- **Three.js / @react-three/fiber** — 3D (только если необходимо)
- **Lenis** — smooth scroll
- **Playwright** — E2E тесты

---

# КОМАНДЫ

```bash
npm run dev           # dev server http://localhost:3000
npm run build         # production build
npm run lint          # eslint
npm run mascots:build # optimize mascot PNGs (scripts/optimize-mascots.mjs)
npx playwright test   # E2E тесты
```

---

# АРХИТЕКТУРА

## Страница

`app/page.tsx` — единственная scroll-страница:

```
CartProvider
  Navbar
  main:
    Hero          ← видео hero.mp4, нет персонажей поверх видео
    Bakers        ← Manifesto-like секция с персонажами
    Manifesto     ← ink-секция
    Catalog       ← продукты, Max появляется при добавлении
    Benefits      ← bento-grid, Leo месит/открывает/проверяет
    HowItWorks    ← ink-секция, 4 шага
    OrderSection  ← форма заказа, Luna показывает тег
  Footer          ← все трое отдыхают
```

## Ключевые lib-файлы

| Файл | Назначение |
|------|-----------|
| `lib/config.ts` | `CONFIG` (URLs, phone), `PRODUCTS[]` — единственный источник данных |
| `lib/motion.ts` | `fadeUp`, `fadeIn`, `stagger`, `EASE` — переиспользуемые Framer Motion варианты |
| `lib/cart-context.tsx` | CartProvider, useCart — глобальная корзина |
| `lib/validate-phone.ts` | `isValidKGPhone` — KG phone validation |
| `lib/images.ts` | `productImage(index)` — URL картинки продукта |
| `lib/use-parallax.ts` | хук для parallax-смещения персонажей |

## Компоненты персонажей

```
components/ui/MiniBaker.tsx      ← главный компонент персонажа
components/ui/MascotLayer.tsx    ← слой позиционирования
components/ui/MascotWithProp.tsx ← персонаж с реквизитом
```

`MiniBaker` принимает:
- `char`: `"leo" | "max" | "luna"`
- `action`: `"idle" | "open-box" | "carry-tray" | "inspect" | "knead" | "walk" | "push" | "pull-rope" | "carry-box" | "point" | "tag" | "qr-stand"`
- `trigger`: `"scroll" | "mount" | "manual"`
- `position`: `"bottom-right" | "bottom-left" | "bottom-center" | "center-right"`
- `size`: px
- `breathe`: boolean (idle breathing animation)
- `parallax`: number (px смещение при скролле)

## Ассеты персонажей

```
public/mascots/
  characters/
    leo/   master.png, knead.png, box.png, idle.webp
    max/   (пусто — нужны файлы)
    luna/  (пусто — нужны файлы)
  scenes/
    hero.png
  _placeholder/  ← SVG-заглушки для разработки
```

**Финальные webm-анимации** → см. `ANIMATION_MAP.md`
**Fallback** для Safari/iOS → PNG из той же папки

---

# ИНТЕГРАЦИИ

| Сервис | URL / Header |
|--------|-------------|
| ERP (заказы) | `POST https://erp.calma.kg/api/webhooks/site-order` + `x-calma-secret: calma-site-2026` (через `/api/order` на сайте, `ERP_URL`/`ERP_SECRET` в Vercel env) |
| xPay QR | `POST https://erp.calma.kg/api/payments/qr/create` (`PAYMENTS_URL` в `lib/config.ts`) |
| xPay polling | `GET https://erp.calma.kg/api/payments/status/:qr_transaction_id` каждые 4s |
| WhatsApp | `https://wa.me/996500547727` |

xPay deeplink → **`window.open()`**, не `window.location.href`.

---

# ДИЗАЙН

Файл: `.claude/skills/frontend-design.md`

**Палитра:**
```
--color-bg:       #FFFDF8   warm white
--color-surface:  #F5F0E6   cream
--color-border:   #E8DDD0   warm gray
--color-text:     #1C1412   near-black
--color-muted:    #7A6B5D   warm gray
--color-accent:   #8B4513   saddle brown (CTA)
--color-accent-lt:#C49A6C   hover / secondary
--color-gold:     #C9A84C   prices, highlights
--color-ink:      тёмный фон для Manifesto/HowItWorks/Footer
```

**Шрифты:**
- `var(--font-display)` — Cormorant Garamond (заголовки)
- `var(--font-body)` — DM Sans (body, UI, кнопки)

---

# АНИМАЦИИ

Все анимации — Framer Motion. CSS transitions только для micro-hover.

**Варианты из `lib/motion.ts`:**
```tsx
fadeUp   → opacity 0→1, y 32→0, 0.7s ease-out-expo
fadeIn   → opacity 0→1, 0.6s
stagger  → staggerChildren (default 0.1s)
EASE     → [0.16, 1, 0.3, 1]
```

**Правила:**
- `viewport={{ once: true }}` — анимация срабатывает один раз
- Персонажи: `trigger="scroll"` → появился блок → действие → стоп. **Никаких бесконечных циклов**
- webm с прозрачностью → fallback PNG для Safari/iOS (или mp4/HEVC)

---

# ПРОДУКТЫ

Определены в `lib/config.ts → PRODUCTS[]`. Не дублировать в компонентах.

```
id 1: Классический круассан — 120 сом / шт / min 10
id 2: Круассан с шоколадом  — 150 сом / шт / min 10
id 3: Круассан с миндалём   — 160 сом / шт / min 10
id 4: Мини-круассаны        —  80 сом / шт / min 20
id 5: Сэндвич-круассан      — 140 сом / шт / min 10
id 6: Ассорти (микс)        — 130 сом / шт / min 30
```

⚠️ ID в конфиге — заглушки. Заменить на реальные UUID из calma-erp перед production.

---

# KOД — ПРАВИЛА

- Компоненты < 150 строк — выносить sub-компоненты
- Нет `any` типов
- URL только через `lib/config.ts`
- loading + error states обязательны в UI
- Валидация телефона через `lib/validate-phone.ts`

---

# PIPELINE

```
CALMA_BIBLE.md              ← не трогать, только читать
  ↓
/init → CLAUDE.md           ← этот файл
  ↓
CONTENT_LOCK.md             ← контент зафиксирован до верстки
  ↓
ANIMATION_MAP.md            ← карта анимаций до Higgsfield
  ↓
architect agent             ← архитектура, НЕ код
  ↓
Higgsfield micro-animations ← webm для каждой строки ANIMATION_MAP
  ↓
feature-dev Hero            ← только Hero, потом code-reviewer + perf
  ↓
feature-dev Catalog         ← + review
  ↓
feature-dev Benefits        ← + review
  ↓
feature-dev HowItWorks      ← + review
  ↓
feature-dev OrderSection    ← + review
  ↓
feature-dev Footer          ← + review
  ↓
/verify                     ← браузерная проверка
  ↓
e2e-runner (Playwright)
  ↓
Final audit:
  a11y-architect
  security-reviewer
  refactor-cleaner
  doc-updater
  ↓
production (Vercel)
```

**После каждой секции:** `code-reviewer` + `performance-optimizer`
**В конце один раз:** `a11y-architect`, `security-reviewer`, `refactor-cleaner`, `doc-updater`

---

# ЗАПРЕЩЕНО

См. полный список в `CALMA_BIBLE.md §17`. Ключевое:

- ❌ PNG-персонажи поверх Hero видео
- ❌ Бесконечные анимации персонажей
- ❌ Менять внешность Leo / Max / Luna
- ❌ Логотип на колпаке не `CALMA` (никаких CALMO, Calma, CALM)
- ❌ Разные стили рендера в одном сайте
- ❌ Disney / Pixar / аниме стиль
- ❌ Hardcode URLs (только через `lib/config.ts`)

---

# DEMO ROUTES (не для production)

```
/baker-test     ← тест компонента Baker3D
/mascots-demo   ← демо MiniBaker со всеми позами
/preview        ← предпросмотр
```

Удалить перед production или закрыть middleware.
