'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type Draft = Record<string, string>
type Mode = 'original' | 'draft'

const API_ROOT = process.env.NEXT_PUBLIC_ERP_API_ROOT || 'https://erp.calma.kg/api'
const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'PATH'])

function normalized(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function hash(value: string) {
  let result = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    result ^= value.charCodeAt(i)
    result = Math.imul(result, 16777619)
  }
  return (result >>> 0).toString(36)
}

function textNodes(doc: Document) {
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let node = walker.nextNode()
  while (node) {
    const text = node as Text
    const parent = text.parentElement
    if (parent && !SKIP.has(parent.tagName) && normalized(text.data).length > 1) nodes.push(text)
    node = walker.nextNode()
  }
  return nodes
}

export function ContentEditor({ token }: { token: string }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const originals = useRef<Record<string, string>>({})
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const decorateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [draft, setDraft] = useState<Draft>({})
  const draftRef = useRef<Draft>({})
  const [mode, setMode] = useState<Mode>('draft')
  const modeRef = useRef<Mode>('draft')
  const [status, setStatus] = useState('Загрузка…')
  const [changed, setChanged] = useState(0)

  const save = useCallback(async (next: Draft) => {
    setStatus('Сохраняем…')
    try {
      const response = await fetch(`${API_ROOT}/site/content-drafts/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: next }),
      })
      if (!response.ok) throw new Error('save failed')
      setStatus('Сохранено в облаке')
    } catch {
      setStatus('Нет связи — повторим сохранение')
    }
  }, [token])

  const scheduleSave = useCallback((next: Draft) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => save(next), 700)
  }, [save])

  const decorate = useCallback(() => {
    const doc = frame.current?.contentDocument
    if (!doc) return
    const counts: Record<string, number> = {}
    const originalMap: Record<string, string> = {}

    textNodes(doc).forEach((node) => {
      const original = normalized(node.data)
      const base = hash(original)
      counts[base] = (counts[base] || 0) + 1
      const key = `${base}-${counts[base]}`
      originalMap[key] = original
      const parent = node.parentElement
      if (!parent) return

      parent.dataset.contentKey = key
      parent.dataset.originalText = original
      parent.style.outlineOffset = '3px'
      parent.style.cursor = modeRef.current === 'draft' ? 'text' : ''
      parent.contentEditable = modeRef.current === 'draft' ? 'plaintext-only' : 'false'
      node.data = modeRef.current === 'draft' ? (draftRef.current[key] ?? original) : original

      parent.onmouseenter = () => {
        if (modeRef.current === 'draft') parent.style.outline = '2px solid #ab2b02'
      }
      parent.onmouseleave = () => { parent.style.outline = '' }
      parent.oninput = () => {
        const value = normalized(parent.innerText)
        const next = { ...draftRef.current }
        if (!value || value === original) delete next[key]
        else next[key] = value
        draftRef.current = next
        setDraft(next)
        setChanged(Object.keys(next).length)
        scheduleSave(next)
      }
      parent.onclick = (event) => {
        if (modeRef.current === 'draft') event.stopPropagation()
      }
    })
    originals.current = originalMap
    setChanged(Object.keys(draftRef.current).length)

    // FAQ answers and other animated blocks are mounted only after a click.
    // Re-scan when React adds them to the iframe DOM.
    if (!doc.body.dataset.contentEditorObserver) {
      doc.body.dataset.contentEditorObserver = 'ready'
      const observer = new MutationObserver((mutations) => {
        if (!mutations.some((mutation) => mutation.addedNodes.length > 0)) return
        if (decorateTimer.current) clearTimeout(decorateTimer.current)
        decorateTimer.current = setTimeout(() => decorate(), 380)
      })
      observer.observe(doc.body, { childList: true, subtree: true })
    }
  }, [scheduleSave])

  useEffect(() => {
    let active = true
    fetch(`${API_ROOT}/site/content-drafts/${token}`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        if (!active) return
        const loaded = (data.content || {}) as Draft
        draftRef.current = loaded
        setDraft(loaded)
        setChanged(Object.keys(loaded).length)
        setStatus(data.updatedAt ? 'Черновик загружен' : 'Новый черновик')
        decorate()
      })
      .catch(() => setStatus('Не удалось загрузить облачный черновик'))
    return () => { active = false }
  }, [token, decorate])

  const switchMode = (nextMode: Mode) => {
    modeRef.current = nextMode
    setMode(nextMode)
    decorate()
  }

  const download = () => {
    const rows = Object.entries(draft).map(([key, value]) => ({
      key,
      original: originals.current[key] || '',
      edited: value,
    }))
    const blob = new Blob([JSON.stringify({ token, changes: rows }, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'calma-content.json'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <main style={{ minHeight: '100svh', background: '#f2eee8', color: '#241a16', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 20, padding: '12px', background: '#fff', borderBottom: '1px solid #ddd', boxShadow: '0 2px 12px rgba(0,0,0,.08)' }}>
        <div style={{ maxWidth: 430, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <strong style={{ fontSize: 15 }}>Редактор текстов CALMA</strong>
            <span style={{ fontSize: 12, color: status.includes('Сохранено') ? '#137333' : '#6b625d' }}>● {status}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: 3, borderRadius: 12, background: '#eee9e4' }}>
            <button onClick={() => switchMode('original')} style={tabStyle(mode === 'original')}>Текущий сайт</button>
            <button onClick={() => switchMode('draft')} style={tabStyle(mode === 'draft')}>Моя версия · {changed}</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#6b625d' }}>{mode === 'draft' ? 'Нажмите на любой текст и исправьте его' : 'Оригинал без изменений'}</span>
            <button onClick={download} disabled={!changed} style={{ border: 0, borderRadius: 10, padding: '8px 10px', background: changed ? '#ab2b02' : '#c9c2bd', color: '#fff', fontWeight: 700 }}>Скачать</button>
          </div>
        </div>
      </header>
      <div style={{ width: '100%', maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: 'calc(100svh - 120px)' }}>
        <iframe ref={frame} src="/?editorPreview=1" title="CALMA" onLoad={decorate} style={{ width: '100%', height: 'calc(100svh - 128px)', border: 0, display: 'block' }} />
      </div>
    </main>
  )
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    border: 0,
    borderRadius: 9,
    padding: '10px 8px',
    fontWeight: 700,
    background: active ? '#fff' : 'transparent',
    color: active ? '#ab2b02' : '#6b625d',
    boxShadow: active ? '0 1px 5px rgba(0,0,0,.08)' : 'none',
  }
}
