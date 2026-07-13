import { NextRequest, NextResponse } from 'next/server'

const ERP_URL    = process.env.ERP_URL    ?? 'https://calma-erp.vercel.app/api/webhooks/site-order'
const ERP_SECRET = process.env.ERP_SECRET ?? 'calma-site-2026'

const SKU_MAP: Record<string, string> = {
  'plain-micro':        'PLAIN-MICRO',
  'plain-mini':         'PLAIN-MINI',
  'plain-mid':          'PLAIN-MID',
  'plain-big':          'PLAIN-BIG',
  'plain-xl':           'PLAIN-XL',
  'filled-micro':       'FILL-MICRO',
  'chocolate':          'CHOC',
  'hotdog':             'HOTDOG',
  'curd-berry':         'CURD-BERRY',
  'vanilla':            'VANILLA',
  'curd':               'CURD',
  'curd-orange':        'CURD-ORG',
  'soup-borsch':        'SOUP-BORSCH',
  'soup-solyanka':      'SOUP-SOL',
  'soup-lentil':        'SOUP-LENTIL',
  'soup-pea':           'SOUP-PEA',
  'soup-chicken':       'SOUP-CHICK',
  'soup-anti':          'SOUP-ANTI',
  'soup-tomyam':        'SOUP-TOMYAM',
  'dough-croissant':    'DOUGH-CROIS',
  'dough-samsa':        'DOUGH-SAMSA',
  'quiche-chicken':          'QUICHE-CHICK',
  'quiche-salmon':           'QUICHE-SAL',
  'dessert-cheesecake-sb':   'CAKE-SB',
  'dessert-cheesecake-oreo': 'CAKE-OREO',
  'dessert-cheesecake-ny':   'CAKE-NY',
  'dessert-choco-cake':      'CAKE-CHOC',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Transform calma-v2 payload → ERP format (matches working HTML version)
    const erpBody = {
      customerPhone:   body.phone,
      customerName:    body.name,
      customerAddress: body.notes || undefined,
      items: (body.items as { productId: string; qty: number }[]).map(i => ({
        productSku: SKU_MAP[i.productId] ?? i.productId.toUpperCase(),
        qtyKg:      i.qty,
      })),
    }

    const res = await fetch(ERP_URL, {
      method: 'POST',
      headers: {
        'Content-Type':   'application/json',
        'x-calma-secret': ERP_SECRET,
      },
      body: JSON.stringify(erpBody),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return NextResponse.json(
        { error: (data as { error?: string }).error ?? `Ошибка ERP (${res.status})` },
        { status: res.status },
      )
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Не удалось отправить заказ' }, { status: 500 })
  }
}
