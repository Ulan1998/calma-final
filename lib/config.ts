export const CONFIG = {
  ERP_URL: 'https://erp.calma.kg/api/webhooks/site-order',
  ERP_API: 'https://erp.calma.kg/api/site/products',
  ERP_SECRET: 'calma-site-2026',
  PAYMENTS_URL: 'https://erp.calma.kg/api/payments',
  WHATSAPP: 'https://wa.me/996500547727',
  PHONE: '+996 500 547 727',
  INSTAGRAM: 'https://instagram.com/calma.kg',
  ADDRESS: 'Бишкек, Кыргызстан',
}

export type Product = {
  id: string
  name: string
  description?: string
  price: number      // сомы — для отображения
  priceTypyn: number // тыыны — для xPay
  unit: string
  minQty: number
  badge?: string
}

export const PRODUCT_SKU: Record<string, string> = {
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
  'dough-viennese':     'DOUGH-VIEN',
  'dough-napoleon':     'DOUGH-NAP',
  'quiche-chicken':     'QUICHE-CHICK',
  'quiche-salmon':      'QUICHE-SAL',
  'dessert-cheesecake-sb':   'CAKE-SB',
  'dessert-cheesecake-oreo': 'CAKE-OREO',
  'dessert-cheesecake-ny':   'CAKE-NY',
  'dessert-choco-cake':      'CAKE-CHOC',
  'bun-white':               'BUN-WHITE',
  'bun-black':               'BUN-BLACK',
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Классический круассан',
    description: 'Слоёный, с хрустящей корочкой и воздушным мякишем',
    price: 120,
    priceTypyn: 12000,
    unit: 'шт',
    minQty: 10,
    badge: 'Хит',
  },
  {
    id: '2',
    name: 'Круассан с шоколадом',
    description: 'Классическое тесто с начинкой из бельгийского шоколада',
    price: 150,
    priceTypyn: 15000,
    unit: 'шт',
    minQty: 10,
  },
  {
    id: '3',
    name: 'Круассан с миндалём',
    description: 'Хрустящий миндаль и крем франжипан внутри',
    price: 160,
    priceTypyn: 16000,
    unit: 'шт',
    minQty: 10,
    badge: 'Новинка',
  },
  {
    id: '4',
    name: 'Мини-круассаны',
    description: 'Порционные мини-круассаны — идеально для кофейных станций',
    price: 80,
    priceTypyn: 8000,
    unit: 'шт',
    minQty: 20,
  },
  {
    id: '5',
    name: 'Сэндвич-круассан',
    description: 'Увеличенный формат под горячие и холодные начинки',
    price: 140,
    priceTypyn: 14000,
    unit: 'шт',
    minQty: 10,
  },
  {
    id: '6',
    name: 'Ассорти (микс)',
    description: 'Набор из трёх видов круассанов в равных долях',
    price: 130,
    priceTypyn: 13000,
    unit: 'шт',
    minQty: 30,
  },
]
