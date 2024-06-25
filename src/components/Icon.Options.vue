<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{}>()

</script>

<template>
  <svg
    view-box="0 0 16 16"
    class="options icon"
  >
    <circle
      class="circle"
      cx="8"
      cy="3"
      r="1.75"
    />
    <circle
      class="circle"
      cx="8"
      cy="8"
      r="1.75"
    />
    <circle
      class="circle"
      cx="8"
      cy="13"
      r="1.75"
    />
  </svg>
</template>

<style scoped>
  .options {
    fill: var(--primary);
    stroke: none;
    width: 1rem;
    height: 1rem;
  }
</style>