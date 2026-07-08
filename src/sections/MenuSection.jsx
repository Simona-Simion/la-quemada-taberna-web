import SectionHeader from '../components/SectionHeader'
import { menuInfo } from '../data/menu'

function MenuSection() {
  return (
    <section id="carta" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={menuInfo.eyebrow}
          title={menuInfo.title}
          description={menuInfo.description}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {menuInfo.pdfs.map((pdf) => (
            <article
              key={pdf.title}
              className="group relative min-h-80 overflow-hidden border border-white/10 bg-[#181613]"
            >
              <img
                src={pdf.image}
                alt={pdf.title}
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-75"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/45 to-black/20" />

              <img
                src={pdf.seal}
                alt={pdf.sealAlt}
                className="absolute right-5 top-5 h-16 w-auto bg-[#f5efe6] p-1 opacity-90 md:h-20"
              />

              <div className="relative flex min-h-80 flex-col justify-end p-7">
                <p className="text-sm uppercase tracking-[0.35em] text-[#c89b5c]">
                  PDF
                </p>

                <h3 className="mt-4 max-w-sm text-4xl font-bold leading-tight text-[#f5efe6] md:text-5xl">
                  {pdf.title}
                </h3>

                <p className="mt-4 max-w-md text-base leading-relaxed text-[#d8cfc2]">
                  {pdf.subtitle}
                </p>

                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex w-fit rounded-full bg-[#c89b5c] px-6 py-3 text-sm font-semibold text-[#11100e] transition hover:bg-[#d7ad70]"
                >
                  {pdf.buttonText}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#c89b5c]">
            En la barra
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {menuInfo.highlights.map((item) => (
              <div
                key={item}
                className="border-l border-[#c89b5c]/50 bg-white/5 px-5 py-4 text-[#f5efe6]"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[#d8cfc2]">
            {menuInfo.note}
          </p>
        </div>
      </div>
    </section>
  )
}

export default MenuSection