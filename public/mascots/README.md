# CALMA Mascots

## Структура

```
public/mascots/
  characters/
    leo/     ← Лео (мастер-пекарь) — реквизит УЖЕ В РУКАХ
    max/     ← Макс (помощник)     — реквизит УЖЕ В РУКАХ
    luna/    ← Луна (контроль)     — реквизит УЖЕ В РУКАХ
  scenes/    ← готовые сцены (Hero, Footer) — НЕ переиспользуются
  _placeholder/ ← SVG-заглушки (авто, не коммитить)
```

## Финальный список файлов

### Персонажи (15 файлов)

```
characters/leo/   idle  open-box  carry-tray  inspect  knead
characters/max/   walk  push  pull-rope  carry-box
characters/luna/  idle  point  tag  qr-stand
```

Персонаж нарисован сразу с нужным реквизитом в руках. Никаких отдельных props/.

### Сцены (2 файла)

```
scenes/hero.webp   — Лео + круассан справа, левая половина пустая (под заголовок)
scenes/footer.webp — все трое отдыхают с мешком муки
```

## Требования к картинкам

- Прозрачный фон (PNG исходник → WebP output)
- Квадратный канвас 1:1
- Персонаж выровнен по **нижнему центру** (стоит на нижнем крае)
- Рекомендуемый размер исходника: 1024×1024 px
- Сцены — широкоформатные, 2400×1200 или аналогичное

## Как добавить новые картинки

1. Положи PNG в `raw-mascots/<dir>/<name>.png`
2. Запусти:
   ```bash
   npm run mascots:build
   ```
   Скрипт: resize → WebP q85 → `public/mascots/characters/<char>/`

## Именование

- Файлы персонажей: `<action>.webp` (kebab-case)
- Сцены: `<name>.webp`
- Заглушки: `<char>-<action>.svg`, `scene-<name>.svg`

## Использование в коде

```tsx
// Персонаж (реквизит в руках)
<MiniBaker char="leo" action="idle" size={64} position="bottom-right" trigger="scroll" breathe />

// Персонаж с параллаксом
<MiniBaker char="luna" action="tag" size={56} position="bottom-right" trigger="scroll" breathe parallax={15} />

// Ручной показ (например, при клике)
const [show, setShow] = useState(false)
<MiniBaker char="max" action="push" size={52} position="bottom-left" trigger="manual" show={show} />

// Сцена (Hero / Footer)
<MiniBaker src="/mascots/scenes/hero.webp" char="leo" action="idle"
  size={240} position="bottom-right" breathe={false} />
```

## ГЛАВНЫЙ ЗАКОН

Маскот **НИКОГДА** не перекрывает товар, текст или CTA. Только край блока — снизу или сбоку.

## Тень на полу

Тень реализована как статичный эллипс (`div` с `border-radius: 50%`, `rgba(0,0,0,0.18)`, `filter: blur(4px)`) под персонажем — **не** часть картинки. Это позволяет персонажу «дышать» (y:[0,-2,0]) пока тень остаётся на полу.
