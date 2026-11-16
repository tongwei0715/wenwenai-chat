import clsx from 'clsx'
import type { ReactNode } from 'react'
import { useIsMobile } from '../../app/viewport.js'
import { useTranslate, type TranslationKey } from '../../i18n/index.js'
import { ChatInput } from '../chatInput/ChatInput.js'
import { MobileHeader } from './MobileHeader.js'
import { WenwenBrandLogo } from '../base/icons.js'
import { setDraftText } from '../../services/chat/drafts.js'
import { setModel, useSettings } from '../../services/settings.js'
import styles from './Welcome.module.css'

/** 快捷提问卡片：短标题 + 副标题 + 点击填入完整提示词 */
const QUICK_PROMPTS: {
  title: TranslationKey
  desc: TranslationKey
  prompt: TranslationKey
  icon: ReactNode
}[] = [
  {
    title: 'quickPromptCodeTitle',
    desc: 'quickPromptCodeDesc',
    prompt: 'quickPromptCode',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 6 3 12l5 6M16 6l5 6-5 6M13 4l-2 16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'quickPromptWriteTitle',
    desc: 'quickPromptWriteDesc',
    prompt: 'quickPromptWrite',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'quickPromptPlanTitle',
    desc: 'quickPromptPlanDesc',
    prompt: 'quickPromptPlan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M3 9h18M8 2v4M16 2v4M8 14h3M8 17.5h6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'quickPromptReviewTitle',
    desc: 'quickPromptReviewDesc',
    prompt: 'quickPromptReview',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v5h5M9 13h6M9 17h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

/** 新对话页：桌面端居中展示品牌、输入框与快捷卡片；移动端顶栏 + 引导卡片 + 底部输入框 */
export const Welcome = () => {
  const t = useTranslate()
  const isMobile = useIsMobile()
  const model = useSettings((state) => state.model)

  const handlePromptClick = (promptKey: TranslationKey) => {
    setDraftText(null, t(promptKey))
    requestAnimationFrame(() => {
      document.querySelector<HTMLTextAreaElement>('textarea')?.focus({ preventScroll: true })
    })
  }

  return (
    <div className={styles.container}>
      {isMobile ? (
        <MobileHeader />
      ) : (
        <div className={styles.desktopBar}>
          <div className={styles.modelSwitch} role="radiogroup" aria-label={t('settingsModel')}>
            <button
              type="button"
              role="radio"
              aria-checked={model === 'deepseek-flash'}
              className={clsx(
                styles.modelOption,
                model === 'deepseek-flash' && styles.modelOptionActive
              )}
              onClick={() => setModel('deepseek-flash')}
            >
              {t('modelFastShort')}
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={model === 'deepseek-v4-pro'}
              className={clsx(
                styles.modelOption,
                model === 'deepseek-v4-pro' && styles.modelOptionActive
              )}
              onClick={() => setModel('deepseek-v4-pro')}
            >
              {t('modelDeepShort')}
            </button>
          </div>
        </div>
      )}
      <div className={styles.welcome}>
        <div className={styles.hero}>
          <div className={styles.logo}>
            <WenwenBrandLogo size={isMobile ? 48 : 56} />
          </div>
          <div className={styles.greeting}>{t('welcomeMessageChat250808')}</div>
          <div className={styles.badges}>
            <span className={styles.badge}>{t('badgeThinking')}</span>
            <span className={styles.badge}>{t('badgeSearch')}</span>
            <span className={styles.badge}>{t('badgeCharts')}</span>
            <span className={styles.badge}>{t('badgeVoice')}</span>
            <span className={styles.badge}>{t('badgeMultimodal')}</span>
          </div>
        </div>
        <div className={styles.inputWrap}>
          <ChatInput sessionId={null} />
        </div>
        <div className={styles.prompts}>
          {QUICK_PROMPTS.map((item) => (
            <button
              key={item.title}
              type="button"
              className={styles.promptCard}
              onClick={() => handlePromptClick(item.prompt)}
            >
              <span className={styles.promptIcon}>{item.icon}</span>
              <span className={styles.promptTexts}>
                <span className={styles.promptTitle}>{t(item.title)}</span>
                <span className={styles.promptDesc}>{t(item.desc)}</span>
              </span>
            </button>
          ))}
        </div>
        {isMobile ? <div className={styles.caveat}>{t('contentCaveat')}</div> : null}
      </div>
    </div>
  )
}
