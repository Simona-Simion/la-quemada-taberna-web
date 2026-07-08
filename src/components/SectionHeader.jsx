function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-4xl">
      <p className="text-sm uppercase tracking-[0.3em] text-[#c89b5c]">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-bold leading-tight text-[#f5efe6] md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#d8cfc2] md:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeader