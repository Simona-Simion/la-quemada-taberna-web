import { useState } from 'react'
import { tavernInfo } from '../data/tavernInfo'

const navLinks = [
  { label: 'La Taberna', href: '#taberna' },
  { label: 'Historia', href: '#historia' },
  { label: 'Carta', href: '#carta' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Contacto', href: '#contacto' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#11100e]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
       
 <a
  href="#inicio"
  onClick={closeMenu}
  className="inline-flex items-center gap-4 bg-[#f5efe6] px-4 py-2 text-[#11100e]"
  aria-label="Ir al inicio"
>
  <img
    src={tavernInfo.brand.logoIcon}
    alt=""
    className="h-16 w-auto md:h-20"
  />

  <span className="flex flex-col leading-none">
    <span className="text-base font-black uppercase tracking-[0.18em] md:text-lg">
      La Quemada
    </span>

    <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.65em] text-[#8f2f24] md:text-xs">
      Taberna
    </span>
  </span>
</a>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#f5efe6] transition hover:border-[#c89b5c] hover:text-[#c89b5c]"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${
                isOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition ${
                isOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#11100e]">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="border-b border-white/10 py-4 text-2xl font-semibold text-[#f5efe6] transition hover:text-[#c89b5c]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar