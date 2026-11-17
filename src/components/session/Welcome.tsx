import { useIsMobile } from '../../app/viewport.js'
import { useTranslate } from '../../i18n/index.js'
import { ChatInput } from '../chatInput/ChatInput.js'
import { MobileHeader } from './MobileHeader.js'
import { WenwenBrandLogo } from '../base/icons.js'
import styles from './Welcome.module.css'

/** 新对话：品牌标志 + 问候语 + 输入框（模型选择在输入框内），极简无多余元素 */
export const Welcome = () => {
  const t = useTranslate()
  const isMobile = useIsMobile()
  return (
    <div className={styles.container}>
      {isMobile ? <MobileHeader /> : null}
      <div className={styles.welcome}>
        <div className={styles.logo}>
          <WenwenBrandLogo size={isMobile ? 44 : 52} />
        </div>
        <div className={styles.greeting}>{t('welcomeMessageChat250808')}</div>
        <div className={styles.inputWrap}>
          <ChatInput sessionId={null} />
        </div>
        {isMobile ? <div className={styles.caveat}>{t('contentCaveat')}</div> : null}
      </div>
    </div>
  )
}
