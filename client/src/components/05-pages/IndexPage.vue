<template>
  <CommonTemplate>
    <template v-slot:main>
      <div class="app-sample-container">
        <AppSample />
      </div>
    </template>
  </CommonTemplate>
</template>

<script setup lang="ts">
import CommonTemplate from '@components/04-templates/CommonTemplate.vue';
import AppSample from '@components/03-orgnisms/AppSample.vue';
</script>

<style scoped lang="scss">
.app-sample-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

}
</style>
