<script setup lang="ts">
import { state } from '@/services/firebase';
import { onMounted, ref } from 'vue';
const dots = [
  '... ',
  ' ...',
  '. ..',
  '.. .',
];
const message = ref('Loading')
const loadingMessage = (index = 0) => {
  setTimeout(() => {
    message.value = 'Loading' + dots[index];
    loadingMessage(index >= dots.length - 1 ? 0 : ++index);
  }, 100);
}
onMounted(() => loadingMessage())
</script>

<template>
  <div id="loading-screen">
    <span class="message">{{ message }}</span>
  </div>
</template>

<style scoped lang="scss">
#loading-screen {
  display: grid;
  place-items: center;
  position: fixed;
  inset: 0;
  background: var(--n-200);
  letter-spacing: .125rem;
}
.message { width: 4.625rem; white-space: nowrap;}
</style>