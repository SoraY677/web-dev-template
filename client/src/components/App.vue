<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
import { clientEnvConfig } from '@configs/ClientEnvConfig'
import { MetaConfigs } from '@configs/routes-config/MetaConfigs'
import type { UrlPathConfigs } from '@configs/routes-config/UrlPathConfigs'

import { useMeta } from '@composables/head/Meta'
import { useRoute } from '@composables/router'

const route = useRoute()
useMeta(clientEnvConfig.domain).setMeta(
  MetaConfigs[route.getCurrentPath() as UrlPathConfigs],
  route.getCurrentPath(),
)
</script>

<style scoped lang="scss">
</style>
