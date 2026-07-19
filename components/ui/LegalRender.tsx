// Рендер тела юридического документа: "## " — подзаголовок, "- " — список.
// Используется и страницей /docs/[slug], и модальной шторкой в футере.
// Шрифт ≥15px — требование читаемости на мобильном.

export function LegalRender({ body }: { body: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {body.split('\n\n').map((block, i) => {
        if (block.startsWith('## ')) {
          return (
            <h2 key={i} className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '1.08rem', marginTop: 24, marginBottom: 4 }}>
              {block.slice(3)}
            </h2>
          )
        }
        const lines = block.split('\n')
        if (lines.every(l => l.startsWith('- '))) {
          return (
            <ul key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none', margin: 0 }}>
              {lines.map((l, j) => (
                <li key={j} className="font-body text-[var(--color-text)]" style={{ fontSize: '0.95rem', lineHeight: 1.75 }}>
                  {l.slice(2)}
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="font-body text-[var(--color-text)]" style={{ fontSize: '0.95rem', lineHeight: 1.75, margin: 0 }}>
            {block}
          </p>
        )
      })}
    </div>
  )
}
