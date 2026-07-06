export function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://calma.kg/#business',
        name: 'CALMA',
        description: 'Производитель и поставщик замороженной выпечки для кафе, ресторанов и отелей Бишкека. Круассаны, самсы, чизкейки, супы.',
        url: 'https://calma.kg',
        telephone: '+996500547727',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Бишкек',
          addressCountry: 'KG',
        },
        areaServed: {
          '@type': 'City',
          name: 'Бишкек',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Замороженная выпечка оптом',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Замороженные круассаны',
                description: 'Слоёные круассаны для кафе и ресторанов. Разные форматы: микро, мини, стандарт, XL.',
                category: 'Выпечка',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Самсы замороженные',
                description: 'Самсы с мясом и курицей, слоёное и песочное тесто.',
                category: 'Выпечка',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Чизкейки',
                description: 'Порционные чизкейки для кафе.',
                category: 'Десерты',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Замороженные супы',
                description: 'Борщ, солянка, чечевичный, томятм и другие супы для общепита.',
                category: 'Супы',
              },
            },
          ],
        },
        sameAs: [
          'https://instagram.com/calma.kg',
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
