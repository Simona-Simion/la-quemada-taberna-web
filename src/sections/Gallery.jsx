import SectionHeader from '../components/SectionHeader'

function Gallery() {
  return (
    <section id="galeria" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Galería"
          title="Platos, barra y ambiente."
          description="Aquí irán las fotos reales de la taberna."
        />
      </div>
    </section>
  )
}

export default Gallery