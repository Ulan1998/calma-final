import { CONFIG, PRODUCTS, type Product } from './config'

export type SiteProduct = {
  id: string
  sku: string
  slug: string | null
  name: string
  description: string | null
  imageUrl: string | null
  displayPrice: number
  unit: string
  minQty: number
  badge: string | null
  siteCategory: {
    id: string
    name: string
    slug: string
    parentId: string | null
    parent: { id: string; name: string; slug: string } | null
  } | null
}

let cachedProducts: SiteProduct[] | null = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function fetchSiteProducts(): Promise<Product[]> {
  const now = Date.now()

  if (cachedProducts && now - cacheTime < CACHE_TTL) {
    return toProductArray(cachedProducts)
  }

  try {
    const res = await fetch(CONFIG.ERP_API, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) throw new Error(`ERP API ${res.status}`)

    const data = await res.json()
    cachedProducts = data.products ?? []
    cacheTime = now
    return toProductArray(cachedProducts!)
  } catch {
    // Fallback to hardcoded config
    return PRODUCTS
  }
}

function toProductArray(items: SiteProduct[]): Product[] {
  return items.map((p) => ({
    id: p.slug ?? p.sku,
    name: p.name,
    description: p.description ?? undefined,
    price: p.displayPrice,
    priceTypyn: p.displayPrice * 100,
    unit: p.unit,
    minQty: p.minQty,
    badge: p.badge ?? undefined,
    imageUrl: p.imageUrl ?? undefined,
    categorySlug: p.siteCategory?.slug ?? undefined,
    categoryName: p.siteCategory?.name ?? undefined,
  }))
}
