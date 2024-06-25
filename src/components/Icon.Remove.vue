<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{}>()

const count = ref(0)
</script>

<template>
  <svg
    view-box="0 0 16 16"
    class="remove icon"
    stroke-linecap="round"
  >
    <path
      d="M13 7H11V11L7 11V13H11V17H13V13H17V11L13 11V7Z"
    />
  </svg>
</template>

<style scoped>
  .remove {
    transform: rotate(45deg);
    fill: var(--n-500);
    width: 1.5rem;
    height: 1.5rem;
  }
</style>