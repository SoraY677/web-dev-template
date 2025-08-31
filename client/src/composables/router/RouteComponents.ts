import { UrlPathConfigs } from '@configs/routes-config/UrlPathConfigs'

import IndexPage from '@components/05-pages/IndexPage.vue'

import type { Component } from 'vue'

export const RouteComponentRecord: Record<UrlPathConfigs, Component> = {
  [UrlPathConfigs.INDEX]: IndexPage,
}
