import { create } from 'zustand'

/** 默认模型（尚未从 API 获取到模型列表前的兜底值） */
export const DEFAULT_MODEL = 'deepseek-flash'

/**
 * 协议路由：DeepSeek 官方 Anthropic 兼容模型走 /anthropic/v1/messages，
 * 其余（deepseek-chat / deepseek-reasoner / 第三方模型）走 OpenAI 兼容 /v1/chat/completions。
 * 仅作内部请求路由判断，不用于界面展示，也不预填模型名称。
 */
export const isAnthropicModel = (id: string | null | undefined): boolean =>
  id === 'deepseek-flash' || id === 'deepseek-v4-pro'

export type ModelListStatus = 'idle' | 'loading' | 'ready' | 'error'

type ModelListState = {
  /** 从 API（GET /models）获取的可用模型 id 列表，填入 Key 后自动回写 */
  models: string[]
  status: ModelListStatus
}

export const useModelList = create<ModelListState>(() => ({ models: [], status: 'idle' }))

export const setModelList = (models: string[]) => {
  useModelList.setState({ models, status: 'ready' })
}

export const setModelListStatus = (status: ModelListStatus) => {
  useModelList.setState({ status })
}
