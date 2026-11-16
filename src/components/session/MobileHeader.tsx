import {
  IconMenuOutline20,
  IconNewChatOutline20,
  IconSettingsOutline16,
  WenwenBrandLogo,
} from '../base/icons.js'
import { useTranslate } from '../../i18n/index.js'
import { newChat } from '../../services/chat/store.js'
import { setModel, useSettings } from '../../services/settings.js'
import { openSettings } from '../settings/settingsDialogState.js'
import { IconButton } from '../base/IconButton.js'
import { openMobileSider } from '../sider/mobileSiderState.js'
import styles from './MobileHeader.module.css'

/** 移动端顶栏：左侧打开侧边栏；中间展示品牌与模型切换（欢迎页）或会话标题；右侧设置或新建对话 */
export const MobileHeader = ({ title }: { title?: string }) => {
  const t = useTranslate()
  const model = useSettings((state) => state.model)
  const isPro = model === 'deepseek-v4-pro'
  return (
    <div className={styles.header}>
      <IconButton
        size="xl"
        tone="primary"
        icon={<IconMenuOutline20 />}
        aria-label={t('expandSiderbarButton')}
        onClick={openMobileSider}
      />
      {title === undefined ? (
        <>
          <div className={styles.center}>
            <WenwenBrandLogo size={22} />
            <span className={styles.brandName}>{t('appName')}</span>
            <button
              type="button"
              className={styles.modelPill}
              onClick={() => setModel(isPro ? 'deepseek-flash' : 'deepseek-v4-pro')}
            >
              {t(isPro ? 'modelDeepShort' : 'modelFastShort')}
            </button>
          </div>
          <IconButton
            size="xl"
            tone="primary"
            icon={<IconSettingsOutline16 />}
            aria-label={t('settings')}
            onClick={() => openSettings('general')}
          />
        </>
      ) : (
        <>
          <div className={styles.title}>{title}</div>
          <IconButton
            size="xl"
            tone="primary"
            icon={<IconNewChatOutline20 />}
            aria-label={t('newChat')}
            onClick={newChat}
          />
        </>
      )}
    </div>
  )
}
