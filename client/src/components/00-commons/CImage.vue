<template>
  <img
    v-bind="props"
  />
</template>

<script setup lang="ts">
import type { ImageType } from '@/types/element/ImageType';

  const props = defineProps<ImageType>()
</script>

<style scoped>
</style>
