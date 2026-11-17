import clsx from 'clsx'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import { useAnchoredPosition, useDismiss } from '../base/anchored.js'
import { IconChevronDownOutline14 } from '../base/icons.js'
import { useModelList } from '../../services/api/models.js'
import { setModel, useSettings } from '../../services/settings.js'
import { openSettings } from '../settings/settingsDialogState.js'
import { useTranslate } from '../../i18n/index.js'
import styles from './ModelSelector.module.css'

/**
 * 输入框里的模型选择器：显示当前模型，点击展开下拉。
 * 模型列表来自填入 API Key 后自动拉取（GET /models），不预填模型名称。
 */
export const ModelSelector = () => {
  const t = useTranslate()
  const model = useSettings((state) => state.model)
  const { models, status } = useModelList()
  const [open, setOpen] = useState(false)
  const { anchorRef, floatingRef, position } = useAnchoredPosition<HTMLButtonElement, HTMLDivElement>(
    open,
    { align: 'start', offset: 6, maxHeight: 320, minSpace: 200 }
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
        <span className={styles.triggerLabel}>{model}</span>
        <IconChevronDownOutline14 />
      </button>
      {open
        ? createPortal(
            <div ref={floatingRef} className={styles.menu} style={position ?? undefined} role="menu">
              {status === 'loading' ? (
                <div className={styles.hint}>{t('modelListLoading')}</div>
              ) : models.length === 0 ? (
                <>
                  <div className={styles.hint}>{t('modelListEmpty')}</div>
                  <button
                    type="button"
                    className={styles.option}
                    onClick={() => {
                      setOpen(false)
                      openSettings('data')
                    }}
                  >
                    <span className={styles.optionLabel}>{t('modelListGoSettings')}</span>
                  </button>
                </>
              ) : (
                models.map((id) => (
                  <button
                    key={id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={id === model}
                    className={clsx(styles.option, id === model && styles.optionActive)}
                    onClick={() => {
                      setOpen(false)
                      setModel(id)
                    }}
                  >
                    <span className={styles.optionLabel}>{id}</span>
                    {id === model ? (
                      <span className={styles.optionCheck} aria-hidden>
                        ✓
                      </span>
                    ) : null}
                  </button>
                ))
              )}
            </div>,
            document.body
          )
        : null}
    </>
  )
}
