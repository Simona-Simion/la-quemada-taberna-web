import { tavernInfo } from '../data/tavernInfo'
import SectionHeader from '../components/SectionHeader'

function History() {
  return (
    <section id="historia" className="scroll-mt-32 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={tavernInfo.history.eyebrow}
          title={tavernInfo.history.title}
        />

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-[#d8cfc2] md:text-lg">
          {tavernInfo.history.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default History