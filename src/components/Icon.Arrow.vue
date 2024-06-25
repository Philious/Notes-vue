<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{}>()

const count = ref(0)
</script>

<template>
  <svg
    view-box="0 0 24 24"
    class="arrow icon"
  >
    <path d="M14 16L20 12L14 8V11H4V13H14V16Z" />
  </svg>
</template>

<style scoped>
  .arrow {
    fill: var(--n-500);
    width: 1.5rem;
    height: 1.5rem;
  }
</style>