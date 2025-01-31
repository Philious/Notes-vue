<script setup lang="ts">
import { dialogService } from "@/services/dialogService";
</script>

<template>
  <div v-if="dialogService.active.value" class="dialog-container">
    <div class="dialog">
      <div v-if="dialogService.dialog.title" class="dialog-title">
        {{ dialogService.dialog.title }}
      </div>
      <div v-if="dialogService.dialog.content" class="dialog-content">
        {{ dialogService.dialog.content }}
        {{ dialogService.active.value }}
      </div>
      <div class="dialog-footer">
        <button
          v-for="action in dialogService.dialog.actions"
          :key="action.name"
          class="dialog-button"
          @click="action.action"
        >
          {{ action.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog-container {
  position: fixed;
  max-width: 100vw;
  max-height: 100vh;
  inset: 0;
  display: grid;
  place-content: center;
  z-index: 1;
}
.dialog {
  display: grid;
  max-height: 90vw;
  grid-template-rows: repeat(3, auto);
  background-color: hsl(0, 0%, 10%);
  border-radius: 0.5rem;
  box-shadow:
    0 0 2px hsla(0, 0%, 0%, 0.48),
    0 2px 6px hsla(0, 0%, 0%, 0.24),
    0 6px 18px hsla(0, 0%, 0%, 0.12),
    0 18px 54px hsla(0, 0%, 0%, 0.06);
}
.dialog-title {
  font-size: 1rem;
  line-height: 1;
  padding: 1.5rem 1.5rem 0.5rem;
}
.dialog-content {
  font-size: 0.825rem;
  font-weight: 400;
  padding: 1.5rem;
}
.dialog-footer {
  display: flex;
  padding: 0.5rem 1.5rem 1.5rem;
  gap: 0.5rem;
  justify-content: flex-end;
}
.dialog-button {
  height: 44px;
  border-radius: 0.25rem;
  min-width: 88px;
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: hsl(0, 0%, 15%);
  border: none;
}
</style>
