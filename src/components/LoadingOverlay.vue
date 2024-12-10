<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
const dots = [
  '... ',
  ' ...',
  '. ..',
  '.. .',
];
const message = ref('Loading');
let time: ReturnType<typeof setTimeout> | null = null
const loadingMessage = (index = 0) => {
  time = setTimeout(() => {
    message.value = 'Loading' + dots[index];
    loadingMessage(index >= dots.length - 1 ? 0 : ++index);
  }, 150);
}
onMounted(() => loadingMessage())
onBeforeUnmount(() => { if (time) clearTimeout(time) })
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
  background: hsla(0, 0%, 0%, .5);
  backdrop-filter: blur(5px);
  letter-spacing: .125rem;
}
.message { 
  width: 4.625rem;
  white-space: nowrap;
}
</style>