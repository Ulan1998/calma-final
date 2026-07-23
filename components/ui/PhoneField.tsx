'use client'

// Поле телефона с несъёмным префиксом +996. В value хранится только локальная
// часть (цифры/пробелы после кода страны). Полный номер собирает родитель:
// `+996${value.replace(/\D/g, '')}` — его и валидировать через isValidKGPhone.

type PhoneFieldProps = {
  value: string
  onChange: (local: string) => void
  invalid?: boolean
  id?: string
}

export function PhoneField({ value, onChange, invalid, id }: PhoneFieldProps) {
  return (
    <div className="flex items-stretch">
      <span
        className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[var(--color-border)] font-body font-semibold text-sm select-none"
        style={{ background: 'var(--color-surface)', color: 'var(--color-muted)' }}
        aria-hidden="true"
      >
        +996
      </span>
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        value={value}
        onChange={e => onChange(e.target.value.replace(/[^\d\s]/g, ''))}
        placeholder="700 000 000"
        required
        aria-invalid={invalid}
        aria-label="Номер телефона"
        className="flex-1 min-w-0 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-r-xl px-4 py-3 font-body text-sm text-[var(--color-text)] placeholder-[var(--color-border)] focus:outline-none focus:border-[#ab2b02] transition"
      />
    </div>
  )
}

// Собрать полный E.164-подобный номер из локальной части.
export const toFullKGPhone = (local: string): string => `+996${local.replace(/\D/g, '')}`
