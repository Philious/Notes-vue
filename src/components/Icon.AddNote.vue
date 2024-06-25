<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{}>()

const count = ref(0)
</script>

<template>
  <svg
    view-box="0 0 16 16"
    class="add-note icon"
    stroke-linecap="round"
  >
    <path d="M2 8H14M8 2V14" />
  </svg>
</template>

<style scoped>
  .add-note {
    fill: transparent;
    stroke: var(--primary);
    stroke-width: 2;
    width: 1rem;
    height: 1rem;
  }
</style>