<template>
  <div class="sample-main">
    <AppIcon/>
    <p>RAXSY APPS</p>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '../02-molecules/AppIcon.vue';

</script>

<style scoped lang="scss">
.sample-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  background-color: black;
  color: white;
}
</style>
