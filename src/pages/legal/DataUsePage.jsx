import { useTranslation } from 'react-i18next'

import LegalPageLayout from '../../components/legal/LegalPageLayout'
import LegalDraftNotice from '../../components/legal/LegalDraftNotice'
import LegalSection from '../../components/legal/LegalSection'
import { tavernInfo } from '../../data/tavernInfo'

function PrivacyPolicy() {
  const { t } = useTranslation()
  const { tradeName, legalName, legalAddress, privacyEmail } = tavernInfo.legal

  const hasRequiredLegalData = Boolean(
    legalName && legalAddress && privacyEmail
  )

  return (
    <LegalPageLayout
      eyebrow={t('privacyPolicy.eyebrow')}
      title={t('privacyPolicy.title')}
    >
      {!hasRequiredLegalData && <LegalDraftNotice />}

      <LegalSection title={t('privacyPolicy.responsible.title')}>
        <dl className="grid gap-4">
          <div>
            <dt className="text-sm font-semibold text-[#c89b5c]">
              {t('privacyPolicy.responsible.tradeName')}
            </dt>
            <dd className="mt-1">{tradeName}</dd>
          </div>

          {legalName && (
            <div>
              <dt className="text-sm font-semibold text-[#c89b5c]">
                {t('privacyPolicy.responsible.legalName')}
              </dt>
              <dd className="mt-1">{legalName}</dd>
            </div>
          )}

          {legalAddress && (
            <div>
              <dt className="text-sm font-semibold text-[#c89b5c]">
                {t('privacyPolicy.responsible.address')}
              </dt>
              <dd className="mt-1">{legalAddress}</dd>
            </div>
          )}

          <div>
            <dt className="text-sm font-semibold text-[#c89b5c]">
              {t('privacyPolicy.responsible.email')}
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
        </dl>
      </LegalSection>

      <LegalSection title={t('privacyPolicy.data.title')}>
        <p>{t('privacyPolicy.data.intro')}</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t('privacyPolicy.data.contact')}</li>
          <li>{t('privacyPolicy.data.whatsapp')}</li>
          <li>{t('privacyPolicy.data.technical')}</li>
          <li>{t('privacyPolicy.data.language')}</li>
        </ul>
      </LegalSection>

      <LegalSection title={t('privacyPolicy.purposes.title')}>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t('privacyPolicy.purposes.contact')}</li>
          <li>{t('privacyPolicy.purposes.whatsapp')}</li>
          <li>{t('privacyPolicy.purposes.security')}</li>
          <li>{t('privacyPolicy.purposes.language')}</li>
        </ul>
      </LegalSection>

      <LegalSection title={t('privacyPolicy.legalBasis.title')}>
        <p>{t('privacyPolicy.legalBasis.description')}</p>
      </LegalSection>

      <LegalSection title={t('privacyPolicy.whatsapp.title')}>
        <p>{t('privacyPolicy.whatsapp.description')}</p>
      </LegalSection>

      <LegalSection title={t('privacyPolicy.recipients.title')}>
        <p>{t('privacyPolicy.recipients.description')}</p>
      </LegalSection>

      <LegalSection title={t('privacyPolicy.internationalTransfers.title')}>
        <p>{t('privacyPolicy.internationalTransfers.description')}</p>
      </LegalSection>

      <LegalSection title={t('privacyPolicy.retention.title')}>
        <p>{t('privacyPolicy.retention.description')}</p>
      </LegalSection>

      <LegalSection title={t('privacyPolicy.rights.title')}>
        <p>{t('privacyPolicy.rights.description', { privacyEmail })}</p>
      </LegalSection>

      <LegalSection title={t('privacyPolicy.externalServices.title')}>
        <p>{t('privacyPolicy.externalServices.description')}</p>
      </LegalSection>

      <LegalSection title={t('privacyPolicy.complaint.title')}>
        <p>{t('privacyPolicy.complaint.description')}</p>
      </LegalSection>

      <LegalSection title={t('privacyPolicy.changes.title')}>
        <p>{t('privacyPolicy.changes.description')}</p>
      </LegalSection>
    </LegalPageLayout>
  )
}

export default PrivacyPolicy