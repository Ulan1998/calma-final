/**
 * Curated Unsplash photography for CALMA.
 * All imagery is real photography — no emoji, no illustration.
 * Dimensions are requested via the `w` query param so next/image can
 * size correctly and avoid layout shift.
 */

export const heroImage = {
  src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=80",
  alt: "Свежий слоёный круассан крупным планом",
  width: 900,
  height: 1200,
} as const;

export const bakeryImage = {
  src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
  alt: "Интерьер ремесленной пекарни с выпечкой",
  width: 1200,
  height: 800,
} as const;

/** Six distinct viennoiserie shots, one per catalog product (by index). */
export const productImages: ReadonlyArray<string> = [
  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
  "https://images.unsplash.com/photo-1623334044303-241021148842?w=800&q=80",
  "https://images.unsplash.com/photo-1568051243858-533a607809a5?w=800&q=80",
  "https://images.unsplash.com/photo-1620921575116-fb8902865891?w=800&q=80",
  "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800&q=80",
  "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&q=80",
];

/** Editorial gallery / mosaic band imagery (full-bleed magazine moment). */
export const galleryImages: ReadonlyArray<string> = [
  "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1000&q=80",
  "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=1000&q=80",
  "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=1000&q=80",
  "https://images.unsplash.com/photo-1612203985729-70726954388c?w=1000&q=80",
];

/**
 * Resolve a product photo by index, falling back to the hero shot.
 */
export function productImage(index: number): string {
  return productImages[index] ?? heroImage.src;
}
