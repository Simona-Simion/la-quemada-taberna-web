import { tavernInfo } from '../data/tavernInfo'

function Hero() {
  return (
    <section id="inicio" className="min-h-[85vh] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-sm uppercase tracking-[0.45em] text-[#c89b5c]">
          {tavernInfo.hero.eyebrow}
        </p>

        <h1 className="max-w-5xl text-5xl font-bold leading-tight text-[#f5efe6] md:text-7xl lg:text-8xl">
          {tavernInfo.hero.title}
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#d8cfc2] md:text-xl">
          {tavernInfo.hero.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#ubicacion"
            className="rounded-full bg-[#c89b5c] px-7 py-3 font-semibold text-[#11100e] transition hover:bg-[#d7ad70]"
          >
            {tavernInfo.hero.primaryButton}
          </a>

          <a
            href="#carta"
            className="rounded-full border border-[#c89b5c] px-7 py-3 font-semibold text-[#c89b5c] transition hover:bg-[#c89b5c] hover:text-[#11100e]"
          >
            {tavernInfo.hero.secondaryButton}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero