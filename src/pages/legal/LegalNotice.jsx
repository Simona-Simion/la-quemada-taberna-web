import { useTranslation } from 'react-i18next'

import LegalPageLayout from '../../components/legal/LegalPageLayout'
import LegalDraftNotice from '../../components/legal/LegalDraftNotice'
import LegalSection from '../../components/legal/LegalSection'
import { tavernInfo } from '../../data/tavernInfo'

function LegalNotice() {
  const { t } = useTranslation()

  const {
    tradeName,
    legalName,
    taxId,
    legalForm,
    legalAddress,
    registryDetails,
    privacyEmail,
  } = tavernInfo.legal

  const hasRequiredLegalData = Boolean(
    legalName && taxId && legalAddress && privacyEmail
  )

  return (
    <LegalPageLayout
      eyebrow={t('legalNotice.eyebrow')}
      title={t('legalNotice.title')}
    >
      {!hasRequiredLegalData && <LegalDraftNotice />}

      <LegalSection title={t('legalNotice.identification.title')}>
        <dl className="grid gap-4">
          <div>
            <dt className="text-sm font-semibold text-[#c89b5c]">
              {t('legalNotice.identification.tradeName')}
            </dt>
            <dd className="mt-1">{tradeName}</dd>
          </div>

          {legalName && (
            <div>
              <dt className="text-sm font-semibold text-[#c89b5c]">
                {t('legalNotice.identification.legalName')}
              </dt>
              <dd className="mt-1">{legalName}</dd>
            </div>
          )}

          {taxId && (
            <div>
              <dt className="text-sm font-semibold text-[#c89b5c]">
                {t('legalNotice.identification.taxId')}
              </dt>
              <dd className="mt-1">{taxId}</dd>
            </div>
          )}

          {legalForm && (
            <div>
              <dt className="text-sm font-semibold text-[#c89b5c]">
                {t('legalNotice.identification.legalForm')}
              </dt>
              <dd className="mt-1">{legalForm}</dd>
            </div>
          )}

          {legalAddress && (
            <div>
              <dt className="text-sm font-semibold text-[#c89b5c]">
                {t('legalNotice.identification.address')}
              </dt>
              <dd className="mt-1">{legalAddress}</dd>
            </div>
          )}

          <div>
            <dt className="text-sm font-semibold text-[#c89b5c]">
              {t('legalNotice.identification.email')}
            </dt>
            <dd className="mt-1">
              <a
                href={`mailto:${privacyEmail}`}
                className="break-all transition hover:text-[#c89b5c]"
              >
                {privacyEmail}
              </a>
            </dd>
          </div>

          {registryDetails && (
            <div>
              <dt className="text-sm font-semibold text-[#c89b5c]">
                {t('legalNotice.identification.registry')}
              </dt>
              <dd className="mt-1">{registryDetails}</dd>
            </div>
          )}
        </dl>
      </LegalSection>

      <LegalSection title={t('legalNotice.purpose.title')}>
        <p>{t('legalNotice.purpose.description', { tradeName })}</p>
      </LegalSection>

      <LegalSection title={t('legalNotice.usage.title')}>
        <p>{t('legalNotice.usage.description')}</p>
      </LegalSection>

      <LegalSection title={t('legalNotice.content.title')}>
        <p>{t('legalNotice.content.description')}</p>
      </LegalSection>

      <LegalSection title={t('legalNotice.intellectualProperty.title')}>
        <p>{t('legalNotice.intellectualProperty.description')}</p>
      </LegalSection>

      <LegalSection title={t('legalNotice.externalLinks.title')}>
        <p>{t('legalNotice.externalLinks.description')}</p>
      </LegalSection>

      <LegalSection title={t('legalNotice.law.title')}>
        <p>{t('legalNotice.law.description')}</p>
      </LegalSection>
    </LegalPageLayout>
  )
}

export default LegalNotice
