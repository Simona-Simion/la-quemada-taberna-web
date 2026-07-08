import SectionHeader from '../components/SectionHeader'

function Reviews() {
  return (
    <section id="resenas" className="scroll-mt-32 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Reseñas"
          title="Lo que dicen quienes ya han pasado por aquí."
          description="Aquí mostraremos reseñas reales de clientes."
        />
      </div>
    </section>
  )
}

export default Reviews