import { CONFIG } from '@/lib/config'

export function Footer() {
  return (
    <footer className="border-t border-[#E8DDD0] bg-[#F5F0E6]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p
              className="text-xl text-[#1C1412] mb-3"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}
            >
              CALMA
            </p>
            <p className="text-sm text-[#7A6B5D] leading-relaxed">
              Производство и продажа замороженных круассанов для кафе, ресторанов и отелей Бишкека.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#7A6B5D] mb-4 font-medium">Контакты</p>
            <ul className="space-y-2 text-sm text-[#1C1412]">
              <li>
                <a href={`tel:${CONFIG.PHONE}`} className="hover:text-[#8B4513] transition-colors">
                  {CONFIG.PHONE}
                </a>
              </li>
              <li>
                <a
                  href={CONFIG.WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8B4513] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="text-[#7A6B5D]">{CONFIG.ADDRESS}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#7A6B5D] mb-4 font-medium">Для бизнеса</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#catalog" className="text-[#1C1412] hover:text-[#8B4513] transition-colors">
                  Каталог продукции
                </a>
              </li>
              <li>
                <a href="#how" className="text-[#1C1412] hover:text-[#8B4513] transition-colors">
                  Как заказать
                </a>
              </li>
              <li>
                <a href="#order" className="text-[#1C1412] hover:text-[#8B4513] transition-colors">
                  Оформить заказ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#E8DDD0] flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#7A6B5D]">
          <p>© {new Date().getFullYear()} CALMA. Все права защищены.</p>
          <p>Бишкек, Кыргызстан</p>
        </div>
      </div>
    </footer>
  )
}
