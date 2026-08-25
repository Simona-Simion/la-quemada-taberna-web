function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="font-display text-3xl font-semibold text-[#f5efe6]">
        {title}
      </h2>

      <div className="mt-4 space-y-4">
        {children}
      </div>
    </section>
  )
}

export default LegalSection
