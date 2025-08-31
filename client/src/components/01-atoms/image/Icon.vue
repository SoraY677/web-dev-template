<template>
  <div>
    <CImage
      :src="props.src"
      :width="props.width"
      :height="props.height"
      :alt="props.alt"
    />
  </div>
</template>

<script setup lang="ts">
import CImage from '@components/00-commons/CImage.vue'
import type { ImageType } from '@type/element/ImageType'

const props = defineProps<ImageType>()

</script>

<style scoped lang="scss">
</style>
