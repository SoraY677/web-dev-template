<template>
  <div class="reset">
    <main>
      <slot name="main"></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.reset {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
}

main {
  flex-basis: auto;
  width: 100%;
}
</style>
