function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-4xl">
      <p className="section-eyebrow">
        {eyebrow}
      </p>

      <h2 className="section-title mt-5">
        {title}
      </h2>

      {description && (
        <p className="section-text mt-7 max-w-3xl">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeader