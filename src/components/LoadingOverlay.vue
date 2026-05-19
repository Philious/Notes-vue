<script setup lang="ts">
defineProps<{
  loading: boolean;
}>();

const message = "Loading";
</script>

<template>
  <Transition name="fade">
    <div
      v-if="loading"
      id="loading-screen"
    >
      <span class="message">{{ message }}</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
#loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background: hsla(0, 0%, 0%, 0.5);
  backdrop-filter: blur(5px);
  letter-spacing: 0.125rem;
  z-index: 2;
  span {
    @for $i from 2 through 4 {
      &:nth-child(#{$i}) {
        animation: dots#{$i} 1.5s $easeOutQuint forwards infinite;
        @keyframes dots#{$i} {
          0%,
          100%,
          #{(100 - ($i * 25)) + "%"} {
            transform: translateX(0);
          }
          80%,
          #{(125 - ($i * 25)) + "%"} {
            transform: translateX(0.75rem);
          }
        }
      }
    }
  }
}

.message {
  width: 4.625rem;
  white-space: nowrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
