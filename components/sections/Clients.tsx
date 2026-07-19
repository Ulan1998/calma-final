import Image from 'next/image'

const ROW1 = [1,2,4,5,6,7,8,16,18,21,22,23,27,28]
const ROW2 = [9,10,11,12,13,14,15,17,19,24,25,26,29,30,1]

// Doubled for seamless infinite loop (each row is 50% of full width)
const TRACK1 = [...ROW1, ...ROW1]
const TRACK2 = [...ROW2, ...ROW2]

export function Clients() {
  return (
    <section
      aria-label="Нашу продукцию выбирают заведения HoReCa Бишкека"
      className="py-8 px-0 md:py-14"
      style={{ background: 'var(--color-bg)' }}
    >
      <h2
        className="font-script text-center mb-5 px-5"
        style={{ fontSize: '2rem', fontStyle: 'italic', color: '#ab2b02', fontFamily: 'var(--font-script)' }}
      >
        Нам доверяют
      </h2>

      <div className="flex flex-col gap-3 overflow-hidden mx-[-20px]">
        {/* Row 1 — forward */}
        <div className="clients-track-1 flex" style={{ width: 'max-content' }}>
          {TRACK1.map((n, i) => (
            <div
              key={i}
              className="shrink-0 mx-2 rounded-full bg-white overflow-hidden flex items-center justify-center"
              style={{ width: 80, height: 80, border: '1px solid #E2D7C8', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
            >
              <Image
                src={`/logos/${n}.png`}
                alt=""
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Row 2 — reverse */}
        <div className="clients-track-2 flex" style={{ width: 'max-content' }}>
          {TRACK2.map((n, i) => (
            <div
              key={i}
              className="shrink-0 mx-2 rounded-full bg-white overflow-hidden flex items-center justify-center"
              style={{ width: 80, height: 80, border: '1px solid #E2D7C8', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
            >
              <Image
                src={`/logos/${n}.png`}
                alt=""
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
