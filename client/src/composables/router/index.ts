import { UrlPathConfigs } from "@/configs/routes-config/UrlPathConfigs"
import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHistory } from 'vue-router'
import { MetaConfigs } from "@/configs/routes-config/MetaConfigs"
import { RouteComponentRecord } from "@composables/router/RouteComponents"

const generateRouteRecordRaw = (path: UrlPathConfigs): RouteRecordRaw => ({
    path: path,
    name: MetaConfigs[path].pageName,
    component: RouteComponentRecord[path] 
})
const routeRecordRaws: RouteRecordRaw[] = Object.values(UrlPathConfigs).map((key) => generateRouteRecordRaw(key))


export const router = createRouter({
  history: createWebHistory(),
  routes: routeRecordRaws,
})

