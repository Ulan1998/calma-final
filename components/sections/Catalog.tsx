'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/config'

// ── Product data from original site ──────────────────────────────────────────

const B = [
  '/product-imgs/baked-1.jpg','/product-imgs/baked-2.jpg','/product-imgs/baked-3.jpg',
  '/product-imgs/baked-4.jpg','/product-imgs/baked-5.jpg',
]

// Размерная стрелка поверх фото: координаты объекта в % (измерены по пикселям
// реальных фото — не на глаз), поэтому стрелка совпадает с фактическим краем.
type Arrow = { leftPct: number; rightPct: number; arrowY: number; guideEndY: number; label: string }
type Photo = { src: string; arrows?: Arrow[] }
type P = Product & { sub: string; photos: Photo[]; cat: string }

const CP = (name: string) => `/catalog-preview/${name}.png`

// целый круассан выше среза по кадру → стрелка идёт над самым верхним объектом
const arrowTop = (objectTopPct: number) => Math.max(2, objectTopPct - 15)

// Готовый круассан — чистое фото без разметки, размеры показываем только
// на замороженном варианте (см. frozenPhoto).
function readyPhoto(src: string): Photo {
  return { src }
}

function frozenPhoto(src: string, whole: [number, number, number], cm: number): Photo {
  const [left, right, top] = whole
  return { src, arrows: [{ leftPct: left, rightPct: right, arrowY: arrowTop(top), guideEndY: top, label: `${cm} см` }] }
}

const PRODUCTS: P[] = [
  // Круассаны без начинки — общее чистое фото, размеры разные по факту веса
  {id:'plain-micro', cat:'plain',  name:'Микро',             sub:'40 г · 25 шт/кг', price:600, priceTypyn:60000, unit:'кг', minQty:1,
    photos:[readyPhoto(CP('croissant-plain-ready')), frozenPhoto(CP('croissant-frozen-preview'), [10.22,94.11,36.26], 7)]},
  {id:'plain-mini',  cat:'plain',  name:'Мини',              sub:'60 г',             price:600, priceTypyn:60000, unit:'кг', minQty:1,
    photos:[readyPhoto(CP('croissant-plain-ready')), frozenPhoto(CP('croissant-frozen-preview'), [10.22,94.11,36.26], 8)]},
  {id:'plain-mid',   cat:'plain',  name:'Средний',           sub:'90 г',             price:600, priceTypyn:60000, unit:'кг', minQty:1,
    photos:[readyPhoto(CP('croissant-plain-ready')), frozenPhoto(CP('croissant-frozen-preview'), [10.22,94.11,36.26], 11)]},
  {id:'plain-big',   cat:'plain',  name:'Большой',           sub:'120 г',            price:600, priceTypyn:60000, unit:'кг', minQty:1,
    photos:[readyPhoto(CP('croissant-plain-ready')), frozenPhoto(CP('croissant-frozen-preview'), [10.22,94.11,36.26], 13)]},
  {id:'plain-xl',    cat:'plain',  name:'XL',                sub:'150 г',            price:600, priceTypyn:60000, unit:'кг', minQty:1,
    photos:[readyPhoto(CP('croissant-plain-ready')), frozenPhoto(CP('croissant-frozen-preview'), [10.22,94.11,36.26], 16)]},
  // Круассаны с начинкой — слайдер "готовый / замороженный"
  {id:'filled-micro',  cat:'filled', name:'Микро',           sub:'40 г · 10 шт/кг', price:650, priceTypyn:65000, unit:'кг', minQty:1,
    photos:[readyPhoto(CP('croissant-plain-ready')), frozenPhoto(CP('croissant-filled-micro-frozen'), [23.11,82.97,41.51], 7)]},
  {id:'chocolate',     cat:'filled', name:'Шоколад',         sub:'120 г',            price:700, priceTypyn:70000, unit:'кг', minQty:1,
    photos:[readyPhoto(CP('croissant-chocolate-ready')), frozenPhoto(CP('croissant-chocolate-frozen'), [9.39,99.91,40.68], 13)]},
  {id:'hotdog',        cat:'filled', name:'Хот-дог',         sub:'120 г',            price:700, priceTypyn:70000, unit:'кг', minQty:1,
    photos:[readyPhoto(CP('croissant-hotdog-ready')), frozenPhoto(CP('croissant-hotdog-frozen'), [11.6,92.27,40.12], 13)]},
  {id:'curd-berry',    cat:'filled', name:'Творог-клубника', sub:'100 г',            price:650, priceTypyn:65000, unit:'кг', minQty:1,
    photos:[readyPhoto(CP('croissant-curd-strawberry-ready')), frozenPhoto(CP('croissant-curd-strawberry-frozen'), [10.04,99.91,40.54], 12)]},
  {id:'vanilla',       cat:'filled', name:'Ваниль',          sub:'100 г',            price:650, priceTypyn:65000, unit:'кг', minQty:1,
    photos:[readyPhoto(CP('croissant-vanilla-ready')), frozenPhoto(CP('croissant-vanilla-frozen'), [13.9,97.33,42.27], 12)]},
  {id:'curd',          cat:'filled', name:'Творог',          sub:'100 г',            price:650, priceTypyn:65000, unit:'кг', minQty:1,
    photos:[readyPhoto(CP('croissant-curd-ready')), frozenPhoto(CP('croissant-curd-frozen'), [10.41,96.69,38.88], 12)]},
  {id:'curd-orange',   cat:'filled', name:'Творог-апельсин', sub:'100 г',            price:650, priceTypyn:65000, unit:'кг', minQty:1,
    photos:[readyPhoto(CP('croissant-curd-orange-ready')), frozenPhoto(CP('croissant-curd-orange-frozen'), [10.41,97.88,38.05], 12)]},
  // Супы
  {id:'soup-borsch',   cat:'soups', name:'Борщ',           sub:'500 г', price:290, priceTypyn:29000, unit:'шт', minQty:1, photos:[{src:B[1]}]},
  {id:'soup-solyanka', cat:'soups', name:'Солянка',        sub:'500 г', price:290, priceTypyn:29000, unit:'шт', minQty:1, photos:[{src:B[2]}]},
  {id:'soup-lentil',   cat:'soups', name:'Чечевичный',     sub:'500 г', price:260, priceTypyn:26000, unit:'шт', minQty:1, photos:[{src:B[3]}]},
  {id:'soup-pea',      cat:'soups', name:'Гороховый',      sub:'500 г', price:260, priceTypyn:26000, unit:'шт', minQty:1, photos:[{src:B[4]}]},
  {id:'soup-chicken',  cat:'soups', name:'Куриный',        sub:'500 г', price:260, priceTypyn:26000, unit:'шт', minQty:1, photos:[{src:B[0]}]},
  {id:'soup-anti',     cat:'soups', name:'Антипохмельный', sub:'500 г', price:260, priceTypyn:26000, unit:'шт', minQty:1, photos:[{src:B[1]}]},
  {id:'soup-tomyam',   cat:'soups', name:'Том ям',         sub:'500 г', price:370, priceTypyn:37000, unit:'шт', minQty:1, photos:[{src:B[2]}]},
  // Тесто — одна фотография, без слайдера и без стрелок
  {id:'dough-croissant', cat:'dough', name:'Тесто для круассанов',   sub:'1 кг', price:600, priceTypyn:60000, unit:'кг', minQty:1, photos:[{src:CP('dough-croissant')}]},
  {id:'dough-samsa',     cat:'dough', name:'Тесто для самс слоеное', sub:'1 кг', price:250, priceTypyn:25000, unit:'кг', minQty:1, photos:[{src:CP('dough-samsa')}]},
  {id:'dough-viennese',  cat:'dough', name:'Венская выпечка',        sub:'1 кг', price:600, priceTypyn:60000, unit:'кг', minQty:1, photos:[{src:CP('dough-viennese')}]},
  {id:'dough-napoleon',  cat:'dough', name:'Наполеон',                sub:'1 кг', price:600, priceTypyn:60000, unit:'кг', minQty:1, photos:[{src:CP('dough-napoleon')}]},
  // Киш
  {id:'quiche-chicken', cat:'quiche', name:'Курица-грибы', sub:'', price:600, priceTypyn:60000, unit:'шт', minQty:1, photos:[{src:B[1]}]},
  {id:'quiche-salmon',  cat:'quiche', name:'Лосось-грибы', sub:'', price:600, priceTypyn:60000, unit:'шт', minQty:1, photos:[{src:B[2]}]},
  // Десерты
  {id:'dessert-cheesecake-sb',   cat:'dessert', name:'Чизкейк Сан Себастьян', sub:'1 порция · 170–185 г', price:210, priceTypyn:21000, unit:'шт', minQty:1, photos:[{src:CP('dessert-san-sebastian')}]},
  {id:'dessert-cheesecake-oreo', cat:'dessert', name:'Чизкейк Орео',          sub:'1 порция · 170–185 г', price:210, priceTypyn:21000, unit:'шт', minQty:1, photos:[{src:CP('dessert-oreo')}]},
  {id:'dessert-cheesecake-ny',   cat:'dessert', name:'Чизкейк Нью-Йорк',     sub:'1 порция · 170–185 г', price:200, priceTypyn:20000, unit:'шт', minQty:1, photos:[{src:CP('dessert-ny')}]},
  {id:'dessert-choco-cake',      cat:'dessert', name:'Шоколадный торт',       sub:'1 порция · 170–185 г', price:220, priceTypyn:22000, unit:'шт', minQty:1, photos:[{src:CP('dessert-choco')}]},
  // Булочки
  {id:'bun-white', cat:'buns', name:'Бургерная булочка белая', sub:'140 г', price:30, priceTypyn:3000, unit:'шт', minQty:1, photos:[{src:B[4]}]},
  {id:'bun-black', cat:'buns', name:'Черная булочка бургерная', sub:'140 г', price:32, priceTypyn:3200, unit:'шт', minQty:1, photos:[{src:B[0]}]},
]

const PMAP = Object.fromEntries(PRODUCTS.map(p => [p.id, p]))

type SubDef = { id: string; label: string | null }
type GroupDef = { label: string; icon: string; subs: SubDef[] }
type CatDef = { id: string; label: string; icon: string; subs: SubDef[]; groups?: GroupDef[] }

const CATS: CatDef[] = [
  { id:'croissants', label:'Замороженные круассаны', icon:'🥐',
    subs:[{id:'plain',label:'Без начинки'},{id:'filled',label:'С начинкой'}] },
  { id:'dough',      label:'Тесто',                   icon:'🫓', subs:[{id:'dough',label:null}] },
  { id:'dessert',    label:'Десерты',                 icon:'🍰', subs:[{id:'dessert',label:null}] },
  { id:'buns',       label:'Булочки',                 icon:'🥯', subs:[{id:'buns',label:null}] },
]

const fmt = (n: number) => n.toLocaleString('ru-RU')

// ── Product card ─────────────────────────────────────────────────────────────

const ARROW_BROWN = '#6b4426'

// Стрелка с наконечниками + пунктирные направляющие вниз к объекту + подпись —
// координаты в % от размера фото, измерены по пикселям (см. detect-bounds2.py).
function SizeArrow({ a }: { a: Arrow }) {
  const y = a.arrowY
  const midPct = (a.leftPct + a.rightPct) / 2
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
      <line x1={`${a.leftPct}%`} y1={`${y}%`} x2={`${a.leftPct}%`} y2={`${a.guideEndY}%`} stroke={ARROW_BROWN} strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
      <line x1={`${a.rightPct}%`} y1={`${y}%`} x2={`${a.rightPct}%`} y2={`${a.guideEndY}%`} stroke={ARROW_BROWN} strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
      <line x1={`${a.leftPct}%`} y1={`${y}%`} x2={`${a.rightPct}%`} y2={`${y}%`} stroke={ARROW_BROWN} strokeWidth="1.5" markerStart="url(#arrowhead-l)" markerEnd="url(#arrowhead-r)" />
      <defs>
        <marker id="arrowhead-l" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6" fill="none" stroke={ARROW_BROWN} strokeWidth="1.5" />
        </marker>
        <marker id="arrowhead-r" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke={ARROW_BROWN} strokeWidth="1.5" />
        </marker>
      </defs>
      <text x={`${midPct}%`} y={`${y}%`} textAnchor="middle" dy="-6" fontSize="13" fontWeight="700" fill={ARROW_BROWN}>
        {a.label}
      </text>
    </svg>
  )
}

function PCardImage({ photos, alt }: { photos: Photo[]; alt: string }) {
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollTo(i: number) {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  function onScroll() {
    const el = trackRef.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    setActive(i)
  }

  if (photos.length <= 1) {
    return (
      <div className="relative bg-[#ede9e3]" style={{ aspectRatio: '3/4' }}>
        <Image src={photos[0].src} alt={alt} fill className="object-contain" sizes="(max-width: 430px) 45vw, 200px" />
      </div>
    )
  }

  return (
    <div className="relative bg-[#ede9e3]" style={{ aspectRatio: '3/4' }}>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {photos.map((photo, i) => (
          <div key={photo.src + i} className="relative shrink-0 w-full h-full snap-start">
            <Image src={photo.src} alt={alt} fill className="object-contain" sizes="(max-width: 430px) 45vw, 200px" />
            {photo.arrows?.map((a, ai) => <SizeArrow key={ai} a={a} />)}
          </div>
        ))}
      </div>

      {active > 0 && (
        <button
          onClick={() => scrollTo(active - 1)}
          aria-label="Предыдущее фото"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full"
          style={{ width: 24, height: 24, background: 'rgba(255,255,255,0.9)', border: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.25)', cursor: 'pointer' }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#1C1412" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18"/></svg>
        </button>
      )}
      {active < photos.length - 1 && (
        <button
          onClick={() => scrollTo(active + 1)}
          aria-label="Следующее фото"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full"
          style={{ width: 24, height: 24, background: 'rgba(255,255,255,0.9)', border: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.25)', cursor: 'pointer' }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#1C1412" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
        </button>
      )}

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {photos.map((_, i) => (
          <span
            key={i}
            className="rounded-full transition-all"
            style={{
              width: i === active ? 14 : 6, height: 6,
              background: i === active ? '#ab2b02' : 'rgba(255,255,255,0.85)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function PCard({ p, qty, onPlus, onMinus }: {
  p: P
  qty: number
  onPlus: () => void
  onMinus: () => void
}) {
  const priceStr = p.unit === 'шт' ? `${fmt(p.price)} с/шт` : `${fmt(p.price)} с/кг`
  const isHot = qty > 0

  return (
    <div
      className="rounded-[20px] overflow-hidden flex flex-col border"
      style={{
        background: '#fff',
        boxShadow: isHot ? '0 4px 18px rgba(171,43,2,0.13)' : '0 2px 12px rgba(0,0,0,0.06)',
        borderColor: isHot ? '#ab2b02' : 'var(--color-border)',
        borderWidth: isHot ? 2 : 1.5,
        outline: 'none',
      }}
    >
      <PCardImage photos={p.photos} alt={p.name} />
      <div className="flex flex-col flex-1 p-3 pb-4">
        <p className="font-body font-bold text-[var(--color-text)] mb-1" style={{ fontSize: '1rem', lineHeight: 1.25 }}>{p.name}</p>
        {p.sub && (
          <p className="font-body text-[var(--color-muted)] mb-1" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
            {p.sub} · <span className="font-bold" style={{ color: '#ab2b02' }}>{priceStr}</span>
          </p>
        )}
        {!p.sub && (
          <p className="font-body font-bold mb-1" style={{ fontSize: '0.8rem', color: '#ab2b02' }}>{priceStr}</p>
        )}

        {/* Counter */}
        <div className="mt-auto flex items-center justify-between rounded-full p-1" style={{ background: 'var(--color-bg)' }}>
          <button
            onClick={onMinus}
            disabled={qty === 0}
            aria-label="Убрать"
            className="flex items-center justify-center rounded-full transition-transform active:scale-[0.84]"
            style={{ width: 44, height: 44, background: qty === 0 ? undefined : '#e8e0d8', color: 'var(--color-text)', opacity: qty === 0 ? 0.35 : 1, border: 'none', cursor: qty === 0 ? 'not-allowed' : 'pointer', flexShrink: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <span className="flex-1 text-center font-body font-bold" style={{ fontSize: '0.92rem' }}>
            {qty} {p.unit}
          </span>
          <button
            onClick={onPlus}
            aria-label="Добавить"
            className="flex items-center justify-center rounded-full transition-transform active:scale-[0.84]"
            style={{ width: 44, height: 44, background: '#ab2b02', color: '#fff', border: 'none', cursor: 'pointer', flexShrink: 0, boxShadow: '0 3px 10px rgba(171,43,2,0.33)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Collapsible sub-group (e.g. Тесто для самсы inside Тесто) ────────────────

function SubGroup({ group, qtys, onPlus, onMinus }: {
  group: GroupDef
  qtys: Record<string, number>
  onPlus: (id: string) => void
  onMinus: (id: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="mt-3 rounded-[14px] overflow-hidden"
      style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}
    >
      <button
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{group.icon}</span>
          <span className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '0.9rem' }}>{group.label}</span>
        </div>
        <span
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: 24, height: 24,
            background: open ? '#ab2b02' : 'rgba(171,43,2,0.10)',
            color: open ? '#fff' : '#ab2b02',
            transition: 'background 0.2s',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" width="12" height="12" style={{ transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'none' }}>
            <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {open && (
        <div className="px-3 pb-3">
          {group.subs.map(sub => {
            const items = PRODUCTS.filter(p => p.cat === sub.id)
            if (!items.length) return null
            return (
              <div key={sub.id}>
                {sub.label && (
                  <p
                    className="font-body font-bold uppercase tracking-[0.08em] mb-2 mt-2 px-2 py-1 inline-block rounded-lg"
                    style={{ fontSize: '0.72rem', color: '#ab2b02', background: 'rgba(171,43,2,0.07)' }}
                  >
                    {sub.label}
                  </p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-1">
                  {items.map(p => (
                    <PCard
                      key={p.id}
                      p={p}
                      qty={qtys[p.id] ?? 0}
                      onPlus={() => onPlus(p.id)}
                      onMinus={() => onMinus(p.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Accordion item ────────────────────────────────────────────────────────────

function AccItem({ cat, qtys, onPlus, onMinus }: {
  cat: CatDef
  qtys: Record<string, number>
  onPlus: (id: string) => void
  onMinus: (id: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="rounded-[18px] overflow-hidden mb-3"
      style={{ background: '#fff', border: '1px solid var(--color-border)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <button
        className="w-full flex items-center justify-between gap-3 px-5 py-[18px] text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3">
          <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{cat.icon}</span>
          <span className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '1rem' }}>{cat.label}</span>
        </div>
        <span
          className="flex items-center justify-center rounded-full shrink-0 transition-colors"
          style={{
            width: 28, height: 28,
            background: open ? '#ab2b02' : 'rgba(171,43,2,0.10)',
            color: open ? '#fff' : '#ab2b02',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{ transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'none' }}>
            <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {open && (
        <div className="px-3 pb-4">
          {cat.groups?.map(group => (
            <SubGroup
              key={group.label}
              group={group}
              qtys={qtys}
              onPlus={onPlus}
              onMinus={onMinus}
            />
          ))}
          <div style={{ height: 12 }} />
          {cat.subs.map(sub => {
            const items = PRODUCTS.filter(p => p.cat === sub.id)
            if (!items.length) return null
            return (
              <div key={sub.id}>
                {sub.label && (
                  <p
                    className="font-body font-bold uppercase tracking-[0.08em] mb-2 mt-3 px-2 py-1 inline-block rounded-lg"
                    style={{ fontSize: '0.72rem', color: '#ab2b02', background: 'rgba(171,43,2,0.07)' }}
                  >
                    {sub.label}
                  </p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-1">
                  {items.map(p => (
                    <PCard
                      key={p.id}
                      p={p}
                      qty={qtys[p.id] ?? 0}
                      onPlus={() => onPlus(p.id)}
                      onMinus={() => onMinus(p.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Main Catalog ──────────────────────────────────────────────────────────────

export function Catalog() {
  const { items, add, remove, setQty } = useCart()

  const qtys: Record<string, number> = {}
  for (const item of items) {
    qtys[item.product.id] = item.qty
  }

  function handlePlus(id: string) {
    const p = PMAP[id]
    if (!p) return
    const cur = qtys[id] ?? 0
    if (cur === 0) {
      add(p)
    } else {
      setQty(id, cur + 1)
    }
  }

  function handleMinus(id: string) {
    const cur = qtys[id] ?? 0
    if (cur <= 1) {
      remove(id)
    } else {
      setQty(id, cur - 1)
    }
  }

  return (
    <section id="catalog" className="py-8 px-5 bg-[var(--color-bg)] md:py-14 md:px-8">
      <div className="md:max-w-5xl md:mx-auto">

      <h2
        className="font-script text-center mb-5"
        style={{ fontSize: '2rem', fontStyle: 'italic', color: '#ab2b02', fontFamily: 'var(--font-script)' }}
      >
        Каталог
      </h2>

      <div
        className="sticky top-2 z-10 mx-auto mb-4 w-fit max-w-full rounded-full px-4 py-2 text-center font-body font-semibold backdrop-blur"
        style={{ background: 'rgba(171,43,2,0.08)', color: '#ab2b02', fontSize: '0.72rem' }}
      >
        Круассаны: мин. заказ 3 кг · Смешивать можно
      </div>

      <div>
        {CATS.map(cat => (
          <AccItem
            key={cat.id}
            cat={cat}
            qtys={qtys}
            onPlus={handlePlus}
            onMinus={handleMinus}
          />
        ))}
      </div>
      </div>
    </section>
  )
}
