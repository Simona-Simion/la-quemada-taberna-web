import { tavernInfo } from '../data/tavernInfo'
import SectionHeader from '../components/SectionHeader'

function Location() {
  return (
    <section id="ubicacion" className="scroll-mt-32 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Ubicación"
          title="Estamos en el Casco Antiguo de Zaragoza."
          description={tavernInfo.address.full}
        />

        <a
          href={tavernInfo.googleMaps.url}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex rounded-full bg-[#c89b5c] px-6 py-3 font-semibold text-[#11100e] transition hover:bg-[#d7ad70]"
        >
          {tavernInfo.googleMaps.label}
        </a>
      </div>
    </section>
  )
}

export default Location