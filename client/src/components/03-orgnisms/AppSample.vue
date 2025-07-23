<template>
  <div class="sample-main">
    <AppIcon/>
    <p>RAXSY APPS</p>
    <v-btn class="text-black" :onclick="counterState.increment">
      <v-icon icon="mdi-thumb-up" />
      count: {{ counterState.count }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/composables/state/CounterState';
import AppIcon from '../02-molecules/AppIcon.vue';

const counterState = useCounterStore()

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
