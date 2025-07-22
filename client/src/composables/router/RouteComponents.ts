
import { UrlPathConfigs } from "@/configs/routes-config/UrlPathConfigs"
import type { Component } from 'vue';
import IndexPage from '@/components/05-pages/IndexPage.vue';

export const RouteComponentRecord: Record<UrlPathConfigs, Component> = {
  [UrlPathConfigs.INDEX]: IndexPage
}

