export const UrlPathConfigs = {
  INDEX: '/',
} as const
export type UrlPathConfigs = (typeof UrlPathConfigs)[keyof typeof UrlPathConfigs];

