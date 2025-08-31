import { UrlPathConfigs } from '@configs/routes-config/UrlPathConfigs'

import type { MetaType } from '@type/route-types/MetaType'

export const MetaConfigs: Record<UrlPathConfigs, MetaType> = {
  [UrlPathConfigs.INDEX]: {
    pageName: 'top',
    title: 'アプリトップページ(todo)',
    description: 'トップページ(todo)',
  },
} as const
