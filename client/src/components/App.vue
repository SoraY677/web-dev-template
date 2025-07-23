<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
import { useMeta } from '@/composables/head/Meta';
import { useRoute } from '@/composables/router';
import { envConfig } from '@/configs/EnvConfig';
import { MetaConfigs } from '@/configs/routes-config/MetaConfigs';
import type { UrlPathConfigs } from '@/configs/routes-config/UrlPathConfigs';

const route = useRoute()
useMeta(envConfig.domain).setMeta(
  MetaConfigs[route.getCurrentPath() as UrlPathConfigs],
  route.getCurrentPath()
)
</script>

<style scoped lang="scss">
</style>
