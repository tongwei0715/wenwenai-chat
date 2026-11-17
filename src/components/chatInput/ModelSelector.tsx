import clsx from 'clsx'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import { useAnchoredPosition, useDismiss } from '../base/anchored.js'
import { IconChevronDownOutline14 } from '../base/icons.js'
import { MODELS, getModel, type ModelGroup } from '../../services/api/models.js'
import { setModel, useSettings } from '../../services/settings.js'
import { useTranslate } from '../../i18n/index.js'
import styles from './ModelSelector.module.css'

const GROUPS: { key: ModelGroup; order: number }[] = [
  { key: 'deepseek', order: 0 },
  { key: 'third-party', order: 1 },
]

/** 输入框里的模型选择器：显示当前模型，点击展开分组下拉，供用户选择 DeepSeek 与第三方模型 */
export const ModelSelector = () => {
  const t = useTranslate()
  const model = useSettings((state) => state.model)
  const current = getModel(model)
  const [open, setOpen] = useState(false)
  const { anchorRef, floatingRef, position } = useAnchoredPosition<HTMLButtonElement, HTMLDivElement>(
    open,
    { align: 'start', offset: 6, maxHeight: 360, minSpace: 200 }
  )
  useDismiss(open, [anchorRef, floatingRef], () => setOpen(false))

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        className={clsx(styles.trigger, open && styles.triggerOpen)}
        aria-label={t('settingsModel')}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.triggerLabel}>{current.label}</span>
        <IconChevronDownOutline14 />
      </button>
      {open
        ? createPortal(
            <div ref={floatingRef} className={styles.menu} style={position ?? undefined} role="menu">
              {GROUPS.map(({ key, order }) => {
                const items = MODELS.filter((item) => item.group === key)
                if (items.length === 0) {
                  return null
                }
                return (
                  <div key={key} className={styles.group}>
                    <div className={styles.groupLabel}>{t(order === 0 ? 'modelGroupDeepseek' : 'modelGroupThirdParty')}</div>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        role="menuitemradio"
                        aria-checked={item.id === model}
                        className={clsx(styles.option, item.id === model && styles.optionActive)}
                        onClick={() => {
                          setOpen(false)
                          setModel(item.id)
                        }}
                      >
                        <span className={styles.optionLabel}>{item.label}</span>
                        {item.id === model ? (
                          <span className={styles.optionCheck} aria-hidden>
                            ✓
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                )
              })}
            </div>,
            document.body
          )
        : null}
    </>
  )
}
