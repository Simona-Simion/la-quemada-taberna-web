import { tavernInfo } from '../data/tavernInfo'
import SectionHeader from '../components/SectionHeader'

function Contact() {
  return (
    <section id="contacto" className="scroll-mt-32 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Contacto"
          title="Ven a conocernos."
          description="Sin prisas, en barra y con ambiente de barrio."
        />

        <div className="mt-6 space-y-3 text-[#d8cfc2]">
          <p>{tavernInfo.address.full}</p>

          <a
            href={tavernInfo.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-[#c89b5c] hover:underline"
          >
            Instagram: {tavernInfo.instagram.username}
          </a>

          <p>{tavernInfo.hours.closedDay}</p>
        </div>
      </div>
    </section>
  )
}

export default Contact