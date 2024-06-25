<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{}>()

const emit = defineEmits<{
  (e: "toggle:menu"): void;
  (e: "new:note"): void;
  (e: "toggle:search"): void;
}>()
const count = ref(0)
</script>

<template>
  <div class="menu">
    <button
      class="menu-btn"
      @click="emit('toggle:menu')"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        class="icn"
      >
        <path d="M0 2H16ZM0 8H16ZM0 14H16" />
      </svg>
    </button>
    <!--
    <button
      class="new-note-btn"
      @click="emit('new:note')"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path d="M8 2V14ZM2 8H14Z" />
      </svg>
      New
    </button>
    -->
    <button
      class="search-btn"
      @click="emit('toggle:search')"
    >
      <svg
        width="16"
        height="16"
        viewBox="-.5 -.5 15.5 15.5"
        class="icn"
      >
        <circle
          cx="6"
          cy="6"
          r="6"
        />
        <path d="M10 10, 16 16" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
  .menu {
    padding: 0 .125rem;
    display: flex;
    justify-content: space-between;
    background-color: hsl(0deg 0% 10.2%);
  }
  .search-btn,
  .menu-btn {
    height:3rem;
    width: 3rem;
    background-color: transparent;
    border: none;
  }
  .new-note-btn {
    color: black;
    display: flex;
    max-height: 2.5rem;
    align-items: center;
    gap: .5rem;
    background-color: hsl(320, 94%, 34%);
    padding: .25rem 1rem;
    border-radius: 1000px;
    stroke-width: 2;
    stroke: black;
    border: none;
    transform: translateY(-50%);
  }
  .icn {
    stroke: #FFF;
    fill: transparent;
  }
</style>
