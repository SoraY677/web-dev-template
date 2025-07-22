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
import type { ImageType } from '@/types/element/ImageType';
import CImage from '@components/00-commons/CImage.vue';

const props = defineProps<ImageType>()

</script>

<style scoped lang="scss">
</style>
