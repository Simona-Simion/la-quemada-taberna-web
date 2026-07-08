import SectionHeader from '../components/SectionHeader'

function About() {
  return (
    <section id="taberna" className="scroll-mt-32 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="La Taberna"
          title="Una taberna pequeña, cercana y con alma de barrio."
          description="Espacio para completar con texto real sobre el local, la barra, el ambiente y la experiencia."
        />
      </div>
    </section>
  )
}

export default About