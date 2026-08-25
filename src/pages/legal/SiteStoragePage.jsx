import { useTranslation } from 'react-i18next'

import LegalPageLayout from '../../components/legal/LegalPageLayout'
import LegalSection from '../../components/legal/LegalSection'
import { tavernInfo } from '../../data/tavernInfo'
import { languageStorageKey } from '../../utils/languagePreference'

function CookiePolicy() {
  const { t } = useTranslation()
  const { privacyEmail } = tavernInfo.legal

  return (
    <LegalPageLayout
      eyebrow={t('cookiePolicy.eyebrow')}
      title={t('cookiePolicy.title')}
    >
      <LegalSection title={t('cookiePolicy.currentUse.title')}>
        <p>{t('cookiePolicy.currentUse.description')}</p>
      </LegalSection>

      <LegalSection title={t('cookiePolicy.localStorage.title')}>
        <p>
          {t('cookiePolicy.localStorage.description', {
            storageKey: languageStorageKey,
          })}
        </p>
      </LegalSection>

      <LegalSection title={t('cookiePolicy.consent.title')}>
        <p>{t('cookiePolicy.consent.description')}</p>
      </LegalSection>

      <LegalSection title={t('cookiePolicy.externalLinks.title')}>
        <p>{t('cookiePolicy.externalLinks.description')}</p>
      </LegalSection>

      <LegalSection title={t('cookiePolicy.management.title')}>
        <p>{t('cookiePolicy.management.description')}</p>
      </LegalSection>

      <LegalSection title={t('cookiePolicy.changes.title')}>
        <p>{t('cookiePolicy.changes.description')}</p>
      </LegalSection>

      <LegalSection title={t('cookiePolicy.contact.title')}>
        <p>
          {t('cookiePolicy.contact.description')}{' '}
          <a
            href={`mailto:${privacyEmail}`}
            className="break-all transition hover:text-[#c89b5c]"
          >
            {privacyEmail}
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}

export default CookiePolicy
