'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/config'

// ── Product data from original site ──────────────────────────────────────────

const B = [
  '/product-imgs/baked-1.jpg','/product-imgs/baked-2.jpg','/product-imgs/baked-3.jpg',
  '/product-imgs/baked-4.jpg','/product-imgs/baked-5.jpg',
]

type P = Product & { sub: string; img: string; cat: string }

const PRODUCTS: P[] = [
  // Круассаны без начинки
  {id:'plain-micro', cat:'plain',  name:'Микро',             sub:'40 г · 25 шт/кг', price:600, priceTypyn:60000, unit:'кг', minQty:1, img:'/croissant-plain.png'},
  {id:'plain-mini',  cat:'plain',  name:'Мини',              sub:'60 г',             price:600, priceTypyn:60000, unit:'кг', minQty:1, img:'/croissant-plain.png'},
  {id:'plain-mid',   cat:'plain',  name:'Средний',           sub:'90 г',             price:600, priceTypyn:60000, unit:'кг', minQty:1, img:'/croissant-plain.png'},
  {id:'plain-big',   cat:'plain',  name:'Большой',           sub:'120 г',            price:600, priceTypyn:60000, unit:'кг', minQty:1, img:'/croissant-plain.png'},
  {id:'plain-xl',    cat:'plain',  name:'XL',                sub:'150 г',            price:600, priceTypyn:60000, unit:'кг', minQty:1, img:'/croissant-plain.png'},
  // Круассаны с начинкой
  {id:'filled-micro',  cat:'filled', name:'Микро',           sub:'40 г · 10 шт/кг', price:650, priceTypyn:65000, unit:'кг', minQty:1, img:'/croissant-plain.png'},
  {id:'chocolate',     cat:'filled', name:'Шоколад',         sub:'120 г',            price:700, priceTypyn:70000, unit:'кг', minQty:1, img:'/croissant-chocolate.png'},
  {id:'hotdog',        cat:'filled', name:'Хот-дог',         sub:'120 г',            price:700, priceTypyn:70000, unit:'кг', minQty:1, img:'/croissant-hotdog.png'},
  {id:'curd-berry',    cat:'filled', name:'Творог-клубника', sub:'100 г',            price:650, priceTypyn:65000, unit:'кг', minQty:1, img:'/croissant-berry.png'},
  {id:'vanilla',       cat:'filled', name:'Ваниль',          sub:'100 г',            price:650, priceTypyn:65000, unit:'кг', minQty:1, img:'/croissant-vanilla.png'},
  {id:'curd',          cat:'filled', name:'Творог',          sub:'100 г',            price:650, priceTypyn:65000, unit:'кг', minQty:1, img:'/croissant-vanilla.png'},
  {id:'curd-orange',   cat:'filled', name:'Творог-апельсин', sub:'100 г',            price:650, priceTypyn:65000, unit:'кг', minQty:1, img:'/croissant-berry.png'},
  // Супы
  {id:'soup-borsch',   cat:'soups', name:'Борщ',           sub:'500 г', price:290, priceTypyn:29000, unit:'шт', minQty:1, img:B[1]},
  {id:'soup-solyanka', cat:'soups', name:'Солянка',        sub:'500 г', price:290, priceTypyn:29000, unit:'шт', minQty:1, img:B[2]},
  {id:'soup-lentil',   cat:'soups', name:'Чечевичный',     sub:'500 г', price:260, priceTypyn:26000, unit:'шт', minQty:1, img:B[3]},
  {id:'soup-pea',      cat:'soups', name:'Гороховый',      sub:'500 г', price:260, priceTypyn:26000, unit:'шт', minQty:1, img:B[4]},
  {id:'soup-chicken',  cat:'soups', name:'Куриный',        sub:'500 г', price:260, priceTypyn:26000, unit:'шт', minQty:1, img:B[0]},
  {id:'soup-anti',     cat:'soups', name:'Антипохмельный', sub:'500 г', price:260, priceTypyn:26000, unit:'шт', minQty:1, img:B[1]},
  {id:'soup-tomyam',   cat:'soups', name:'Том ям',         sub:'500 г', price:370, priceTypyn:37000, unit:'шт', minQty:1, img:B[2]},
  // Тесто
  {id:'dough-croissant', cat:'dough', name:'Тесто для круассанов',   sub:'1 кг', price:600, priceTypyn:60000, unit:'кг', minQty:1, img:B[3]},
  {id:'dough-samsa',     cat:'dough', name:'Тесто для самс слоеное', sub:'1 кг', price:250, priceTypyn:25000, unit:'кг', minQty:1, img:B[2]},
  {id:'dough-viennese',  cat:'dough', name:'Венская выпечка',        sub:'1 кг', price:600, priceTypyn:60000, unit:'кг', minQty:1, img:B[3]},
  {id:'dough-napoleon',  cat:'dough', name:'Наполеон',                sub:'1 кг', price:600, priceTypyn:60000, unit:'кг', minQty:1, img:B[4]},
  // Киш
  {id:'quiche-chicken', cat:'quiche', name:'Курица-грибы', sub:'', price:600, priceTypyn:60000, unit:'шт', minQty:1, img:B[1]},
  {id:'quiche-salmon',  cat:'quiche', name:'Лосось-грибы', sub:'', price:600, priceTypyn:60000, unit:'шт', minQty:1, img:B[2]},
  // Десерты
  {id:'dessert-cheesecake-sb',   cat:'dessert', name:'Чизкейк Сан Себастьян', sub:'', price:0, priceTypyn:0, unit:'шт', minQty:1, img:B[0]},
  {id:'dessert-cheesecake-oreo', cat:'dessert', name:'Чизкейк Орео',          sub:'', price:0, priceTypyn:0, unit:'шт', minQty:1, img:B[1]},
  {id:'dessert-cheesecake-ny',   cat:'dessert', name:'Чизкейк Нью-Йорк',     sub:'', price:0, priceTypyn:0, unit:'шт', minQty:1, img:B[2]},
  {id:'dessert-choco-cake',      cat:'dessert', name:'Шоколадный торт',       sub:'', price:0, priceTypyn:0, unit:'шт', minQty:1, img:B[3]},
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
]

const fmt = (n: number) => n.toLocaleString('ru-RU')

// ── Product card ─────────────────────────────────────────────────────────────

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
      <div className="relative bg-[#ede9e3]" style={{ aspectRatio: '3/4' }}>
        <Image
          src={p.img}
          alt={p.name}
          fill
          className="object-cover"
          sizes="(max-width: 430px) 45vw, 200px"
        />
      </div>
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
