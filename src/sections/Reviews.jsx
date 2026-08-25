import { useTranslation } from 'react-i18next'
import { tavernInfo } from '../data/tavernInfo'

function Reviews() {
  const { t } = useTranslation()

  return (
    <section
      id="resenas"
      className="scroll-mt-24 bg-[#18130f] px-5 py-14 sm:px-6 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="section-eyebrow">
          {t('reviews.eyebrow')}
        </p>

        <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-display max-w-4xl text-[clamp(2.75rem,5vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-[#f5efe6] whitespace-pre-line">
            {t('reviews.title')}
          </h2>

          {tavernInfo.googleReviews.url && (
            <a
              href={tavernInfo.googleReviews.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('reviews.buttonAriaLabel')}
              className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-[#c89b5c]/60 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#f5efe6] transition hover:border-[#c89b5c] hover:bg-[#c89b5c] hover:text-[#18130f]"
            >
              {t('reviews.buttonText')}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default Reviews