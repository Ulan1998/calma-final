# ANIMATION_MAP.md

**Status:** PLANNED — не генерировать webm до утверждения
**Версия:** 1.0
**Дата:** 2026-07-02

Каждая строка = одна анимация персонажа или сцены.
Перед генерацией через Higgsfield — утвердить эту таблицу.

Fallback обязателен для Safari / iOS (нет поддержки webm с альфа-каналом).

---

# ТАБЛИЦА АНИМАЦИЙ

| animation_file | section | character | trigger | loop | fallback | status |
|----------------|---------|-----------|---------|------|----------|--------|
| `hero.mp4` | Hero | built-in video (Leo, Max, Luna) | autoplay | yes | none | ✅ ready |
| `leo_knead.webm` | Benefits | Leo | section enters viewport | no | `leo_knead.png` | 🔲 planned |
| `leo_open_box.webm` | Benefits | Leo | scroll to tile 1 | no | `leo_open_box.png` | 🔲 planned |
| `leo_inspect.webm` | Benefits | Leo | scroll to tile 3 | no | `leo_inspect.png` | 🔲 planned |
| `max_push_card.webm` | Catalog | Max | product card enters viewport | no | `max_push_card.png` | 🔲 planned |
| `max_carry_box.webm` | Catalog | Max | add to cart (first item) | no | `max_carry_box.png` | 🔲 planned |
| `luna_tag.webm` | Order | Luna | order form enters viewport | no | `luna_tag.png` | 🔲 planned |
| `luna_qr_stand.webm` | Payment | Luna | open payment modal | no | `luna_qr_stand.png` | 🔲 planned |
| `footer_rest.webm` | Footer | Leo + Max + Luna | footer enters viewport | no | `footer_rest.png` | 🔲 planned |

---

# ДЕТАЛИ ПО КАЖДОЙ АНИМАЦИИ

## hero.mp4
- **Файл:** `public/hero.mp4`
- **Статус:** ✅ ГОТОВ (финао 6)
- **Длина:** ~10 сек, loop
- **Содержит:** упаковка CALMA, сырой круассан, кран, огромная печь, готовый круассан, Leo + Max + Luna
- **Правило:** PNG поверх Hero запрещены

---

## leo_knead.webm + leo_knead.png
- **Секция:** Benefits, tile 1 (Собственное производство)
- **Действие:** Лео месит тесто — руки движутся вперёд-назад
- **Позиция:** bottom-right tile
- **Длина:** 1.5–2 сек, не зациклена
- **Размер:** 390×390 с прозрачным фоном
- **Master ref:** `leo_master.png` → `leo_knead.png`
- **Fallback:** `leo_knead.png` (статичный кадр из середины анимации)

---

## leo_open_box.webm + leo_open_box.png
- **Секция:** Benefits, tile 2 (Доставка)
- **Действие:** Лео открывает крышку огромной коробки CALMA
- **Позиция:** bottom-right tile
- **Длина:** 1.5 сек, не зациклена
- **Fallback:** `leo_open_box.png`

---

## leo_inspect.webm + leo_inspect.png
- **Секция:** Benefits, tile 3 (Гибкие объёмы)
- **Действие:** Лео рассматривает круассан — поднимает, смотрит
- **Позиция:** bottom-right tile
- **Длина:** 1.5 сек, не зациклена
- **Fallback:** `leo_inspect.png`

---

## max_push_card.webm + max_push_card.png
- **Секция:** Catalog
- **Действие:** Макс толкает карточку-коробку когда она въезжает в viewport
- **Позиция:** bottom-left каждой карточки (только первой, остальные по stagger)
- **Длина:** 1 сек, не зациклена
- **Fallback:** `max_push_card.png`

---

## max_carry_box.webm + max_carry_box.png
- **Секция:** Catalog / Cart
- **Действие:** Макс несёт коробку — появляется при первом "Добавить в корзину"
- **Trigger:** `manual` — вызывается из `setHelperVisible(true)` в ProductCard
- **Позиция:** bottom-left экрана
- **Длина:** 1.5 сек, не зациклена
- **Fallback:** `max_carry_box.png`

---

## luna_tag.webm + luna_tag.png
- **Секция:** Order (форма заказа)
- **Действие:** Луна показывает бирку качества — держит поднятую карточку
- **Trigger:** section enters viewport
- **Позиция:** bottom-right рядом с формой
- **Длина:** 1.5 сек, не зациклена
- **Fallback:** `luna_tag.png`

---

## luna_qr_stand.webm + luna_qr_stand.png
- **Секция:** Payment (QR modal)
- **Действие:** Луна ставит QR-стойку — сначала несёт, потом устанавливает
- **Trigger:** `mount` — при открытии QrPaymentModal
- **Позиция:** слева от QR-кода
- **Длина:** 1.5 сек, не зациклена
- **Fallback:** `luna_qr_stand.png`

---

## footer_rest.webm + footer_rest.png
- **Секция:** Footer
- **Действие:** Все трое сидят/стоят у огромного мешка муки и отдыхают
- **Trigger:** footer enters viewport
- **Позиция:** bottom-right footer
- **Длина:** 2 сек, не зациклена (входная анимация), потом статика
- **Fallback:** `footer_rest.png` (финальный кадр — все трое рядом)

---

# ПРАВИЛА FALLBACK

```
Safari / iOS не поддерживают webm с alpha channel.

Для каждого webm обязателен статичный PNG fallback.

Логика:
  if (canPlayWebm) {
    <video src="leo_knead.webm" />
  } else {
    <img src="leo_knead.png" />
  }

Или использовать:
  <video>
    <source src="leo_knead.webm" type="video/webm" />
    <source src="leo_knead.mp4" type="video/mp4" />  // HEVC с alpha для Safari
  </video>
```

---

# СТРУКТУРА ФАЙЛОВ (целевая)

```
public/mascots/
  leo/
    master.png         ✅ существует как leo/baker.png
    knead.webm         🔲 нужно сгенерировать
    knead.png          🔲 fallback
    open_box.webm      🔲
    open_box.png       🔲
    inspect.webm       🔲
    inspect.png        🔲
    carry_tray.webm    🔲 (MISSING ASSET из CALMA_BIBLE)
    carry_tray.png     🔲
  max/
    master.png         🔲 нужен master reference
    push_card.webm     🔲
    push_card.png      🔲
    carry_box.webm     🔲
    carry_box.png      🔲
    walk.webm          🔲 (MISSING ASSET из CALMA_BIBLE)
    walk.png           🔲
  luna/
    master.png         🔲 нужен master reference
    tag.webm           🔲
    tag.png            🔲
    qr_stand.webm      🔲
    qr_stand.png       🔲
  scenes/
    footer_rest.webm   🔲
    footer_rest.png    🔲
```

---

# ОЧЕРЁДНОСТЬ ГЕНЕРАЦИИ В HIGGSFIELD

1. `footer_rest` — все трое вместе, задаёт общий тон
2. `leo_knead` — самая важная для Benefits
3. `luna_qr_stand` — Payment flow
4. `max_carry_box` — Cart trigger
5. Остальные

**Перед каждой генерацией:** передать master reference персонажа + описание из этого файла.
