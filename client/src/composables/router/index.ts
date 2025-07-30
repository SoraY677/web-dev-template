import { UrlPathConfigs } from '@/configs/routes-config/UrlPathConfigs'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { MetaConfigs } from '@/configs/routes-config/MetaConfigs'
import { RouteComponentRecord } from '@composables/router/RouteComponents'
import { useRoute as _useRoute } from 'vue-router'

const generateRouteRecordRaw = (path: UrlPathConfigs): RouteRecordRaw => ({
  path: path,
  name: MetaConfigs[path].pageName,
  component: RouteComponentRecord[path],
})
const routeRecordRaws: RouteRecordRaw[] = Object.values(UrlPathConfigs).map((key) => generateRouteRecordRaw(key))


export const router = createRouter({
  history: createWebHistory(),
  routes: routeRecordRaws,
})

export const useRoute = () => {
  const route = _useRoute()
  return {
    getCurrentPath: () => route.path,
  }
}
