import { useIsMobile } from '../../app/viewport.js'
import { useTranslate, type TranslationKey } from '../../i18n/index.js'
import { ChatInput } from '../chatInput/ChatInput.js'
import { MobileHeader } from './MobileHeader.js'
import { WenwenBrandLogo } from '../base/icons.js'
import { setDraftText } from '../../services/chat/drafts.js'
import styles from './Welcome.module.css'

const QUICK_PROMPTS: TranslationKey[] = [
  'quickPromptCode',
  'quickPromptWrite',
  'quickPromptPlan',
  'quickPromptReview',
]

/** 新对话：品牌标志 + 问候语 + 快捷提问 + 输入框。桌面端居中；移动端输入框吸底 */
export const Welcome = () => {
  const t = useTranslate()
  const isMobile = useIsMobile()
  return (
    <div className={styles.container}>
      {isMobile ? <MobileHeader /> : null}
      <div className={styles.welcome}>
        <div className={styles.logo}>
          <WenwenBrandLogo size={56} />
        </div>
        <div className={styles.greeting}>{t('welcomeMessageChat250808')}</div>
        <div className={styles.tagline}>{t('welcomeTagline')}</div>
        {!isMobile ? (
          <div className={styles.prompts}>
            {QUICK_PROMPTS.map((key) => (
              <button
                key={key}
                type="button"
                className={styles.prompt}
                onClick={() => setDraftText(null, t(key))}
              >
                {t(key)}
              </button>
            ))}
          </div>
        ) : null}
        <ChatInput sessionId={null} />
        {isMobile ? <div className={styles.caveat}>{t('contentCaveat')}</div> : null}
      </div>
    </div>
  )
}
