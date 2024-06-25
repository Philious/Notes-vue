<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{}>()

const count = ref(0)
</script>

<template>
  <svg
    view-box="0 0 24 24"
    class="ok icon"
    stroke-linecap="round"
  >
    <path
      d="M17.6066 8L10.5355 15.0711L7 11.5355"
    />
  </svg>
</template>

<style scoped>
  .ok {
    stroke: var(--n-500);
    stroke-width: 2px;
    fill: transparent;
    width: 1.5rem;
    height: 1.5rem;
  }
</style>