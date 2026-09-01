import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { PRODUCTS } from './src/data/catalog.ts'
import { FAQ } from './src/data/content.ts'
import { COMPANY } from './src/data/legal.ts'

export const SITE = 'https://crimeacollagen.ru'

const abs = (path: string) => SITE + (path.startsWith('/') ? path : '/' + path)

/**
 * Schema.org for the page, generated from the very modules the page renders
 * from. Written by hand it would drift from the catalogue the first time a
 * price moved, and a price in the markup that contradicts the price on screen
 * is read by search engines as deception rather than as an oversight.
 *
 * It is injected into index.html at build time rather than rendered by React:
 * the page is client-rendered, and Yandex in particular is unreliable about
 * executing JavaScript before it decides what the page is.
 */
function schema(): Plugin {
  const seller = {
    '@type': 'Organization',
    '@id': `${SITE}/#seller`,
    name: 'Collagen Live · Крым',
    legalName: COMPANY.entity,
    taxID: COMPANY.inn,
    url: SITE,
    telephone: COMPANY.phone,
    image: abs('/media/plate-wide.jpg'),
    description:
      'Официальный дистрибьютор Collagen Live Wellness в Крыму: пищевой коллаген в форме желе.',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Республика Крым' },
      { '@type': 'AdministrativeArea', name: 'Севастополь' },
    ],
  }

  const catalogue = {
    '@type': 'ItemList',
    '@id': `${SITE}/#catalogue`,
    name: 'Collagen Live Wellness — вкусы и наборы',
    itemListElement: PRODUCTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `Collagen Live Wellness — ${p.name}`,
        description: p.note,
        image: abs(p.img),
        brand: { '@type': 'Brand', name: 'Collagen Live' },
        category: 'Пищевой коллаген',
        offers: {
          '@type': 'Offer',
          url: `${SITE}/#shop`,
          price: p.price,
          priceCurrency: 'RUB',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@id': `${SITE}/#seller` },
        },
      },
    })),
  }

  const faq = {
    '@type': 'FAQPage',
    '@id': `${SITE}/#faq`,
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return {
    name: 'collagen-schema',
    transformIndexHtml() {
      const graph = { '@context': 'https://schema.org', '@graph': [seller, catalogue, faq] }
      return [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          /* U+2028/U+2029 are valid in JSON and fatal inside a <script>. */
          children: JSON.stringify(graph).replace(/\u2028|\u2029/g, ''),
          injectTo: 'head' as const,
        },
      ]
    },
  }
}

// Served from the root of crimeacollagen.ru (see public/CNAME) and from the
// root in dev, so the default base holds everywhere.
export default defineConfig({
  plugins: [react(), schema()],
  server: { host: '127.0.0.1', port: 5190, strictPort: true },
  preview: { host: '127.0.0.1', port: 5191, strictPort: true },
})
