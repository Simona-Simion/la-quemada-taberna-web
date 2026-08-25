import { useTranslation } from 'react-i18next'

function LegalDraftNotice() {
  const { t } = useTranslation()

  return (
    <section className="border border-[#c89b5c]/25 bg-[#211b16]/40 p-6">
      <h2 className="text-lg font-semibold text-[#f5efe6]">
        {t('legal.draft.title')}
      </h2>

      <p className="mt-3 text-[#b8aa98]">
        {t('legal.draft.description')}
      </p>
    </section>
  )
}

export default LegalDraftNotice
