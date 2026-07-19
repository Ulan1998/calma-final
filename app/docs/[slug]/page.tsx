import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LEGAL_DOCS, getLegalDoc } from '@/lib/legal'
import { LegalRender } from '@/components/ui/LegalRender'

export function generateStaticParams() {
  return LEGAL_DOCS.map(d => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getLegalDoc(slug)
  return { title: doc ? `${doc.title} — CALMA` : 'Документ — CALMA' }
}

export default async function LegalDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getLegalDoc(slug)
  if (!doc) notFound()

  return (
    <main className="bg-[var(--color-bg)] min-h-svh">
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px 80px' }}>
        <Link
          href="/"
          className="font-body inline-flex items-center gap-2"
          style={{ fontSize: '0.85rem', color: '#ab2b02', textDecoration: 'none', marginBottom: 24 }}
        >
          ← На главную
        </Link>

        <h1
          className="font-body font-bold text-[var(--color-text)]"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.2, marginTop: 12, marginBottom: 6, letterSpacing: '-0.02em' }}
        >
          {doc.title}
        </h1>
        <p className="font-body text-[var(--color-muted)]" style={{ fontSize: '0.78rem', marginBottom: 8 }}>
          Редакция от {doc.updated}
        </p>

        <div style={{ marginTop: 20 }}>
          <LegalRender body={doc.body} />
        </div>

        {/* Другие документы */}
        <div style={{ marginTop: 48, borderTop: '1px solid var(--color-border)', paddingTop: 20 }}>
          <p className="font-body font-semibold text-[var(--color-muted)]" style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            Юридические документы
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LEGAL_DOCS.filter(d => d.slug !== doc.slug).map(d => (
              <Link key={d.slug} href={`/docs/${d.slug}`} className="font-body" style={{ fontSize: '0.85rem', color: '#ab2b02', textDecoration: 'none' }}>
                {d.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
