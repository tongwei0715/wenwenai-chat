/** 模型清单与协议路由。DeepSeek 自家模型走官方协议，第三方模型走 OpenAI 兼容接口。 */

export type ModelGroup = 'deepseek' | 'third-party'
export type ModelProtocol = 'anthropic' | 'openai'

export type ModelDef = {
  /** 请求里发送的模型 id */
  id: string
  /** 选择器与输入框里的显示名 */
  label: string
  /** 分组：DeepSeek / 第三方 */
  group: ModelGroup
  /** 协议：anthropic 走 /anthropic/v1/messages；openai 走 /v1/chat/completions */
  protocol: ModelProtocol
  /** 是否支持深度思考（联网搜索仅 DeepSeek 官方协议支持） */
  thinking: boolean
  /** 是否支持联网搜索 */
  search: boolean
}

export const MODELS: ModelDef[] = [
  {
    id: 'deepseek-flash',
    label: '问问快答 Flash',
    group: 'deepseek',
    protocol: 'anthropic',
    thinking: true,
    search: true,
  },
  {
    id: 'deepseek-v4-pro',
    label: '问问深度 V4 Pro',
    group: 'deepseek',
    protocol: 'anthropic',
    thinking: true,
    search: true,
  },
  {
    id: 'deepseek-chat',
    label: 'DeepSeek V3',
    group: 'deepseek',
    protocol: 'openai',
    thinking: false,
    search: false,
  },
  {
    id: 'deepseek-reasoner',
    label: 'DeepSeek R1',
    group: 'deepseek',
    protocol: 'openai',
    thinking: true,
    search: false,
  },
  {
    id: 'gpt-4o',
    label: 'GPT-4o',
    group: 'third-party',
    protocol: 'openai',
    thinking: false,
    search: false,
  },
  {
    id: 'gpt-4o-mini',
    label: 'GPT-4o mini',
    group: 'third-party',
    protocol: 'openai',
    thinking: false,
    search: false,
  },
  {
    id: 'o3-mini',
    label: 'o3-mini',
    group: 'third-party',
    protocol: 'openai',
    thinking: false,
    search: false,
  },
  {
    id: 'claude-3-5-sonnet-20241022',
    label: 'Claude 3.5 Sonnet',
    group: 'third-party',
    protocol: 'openai',
    thinking: false,
    search: false,
  },
  {
    id: 'gemini-2.0-flash',
    label: 'Gemini 2.0 Flash',
    group: 'third-party',
    protocol: 'openai',
    thinking: false,
    search: false,
  },
  {
    id: 'qwen-max',
    label: '通义千问 Max',
    group: 'third-party',
    protocol: 'openai',
    thinking: false,
    search: false,
  },
  {
    id: 'kimi-k2-0711-preview',
    label: 'Kimi K2',
    group: 'third-party',
    protocol: 'openai',
    thinking: false,
    search: false,
  },
]

/** 默认模型：问问快答 Flash */
export const DEFAULT_MODEL = 'deepseek-flash'

export const getModel = (id: string | null | undefined): ModelDef =>
  MODELS.find((model) => model.id === id) ?? MODELS[0]

export const isAnthropicModel = (id: string | null | undefined): boolean =>
  getModel(id).protocol === 'anthropic'
