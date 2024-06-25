<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{}>()

const count = ref(0)
</script>

<template>
  <svg
    view-box="0 0 16 16"
    class="list icon"
  >
    <circle
      class="circle"
      cx="2"
      cy="3"
      r="1.5"
    />
    <circle
      class="circle"
      cx="2"
      cy="8"
      r="1.5"
    />
    <circle
      class="circle"
      cx="2"
      cy="13"
      r="1.5"
    />
    <path
      class="path"
      d="M6 3H16M6 8H16M6 13H16"
    />
  </svg>
</template>

<style scoped>
  .add-note {
    width: 1rem;
    height: 1rem;
  }
  .path {
    fill: transparent;
    stroke: var(--primary);
    stroke-width: 1.5;
  }
  .circle  {
    fill: var(--primary);
  }
</style>