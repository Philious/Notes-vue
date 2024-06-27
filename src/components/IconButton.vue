<script setup lang="ts">
import { Icon as IconType, ButtonType } from '@/types/enums';
import Icon from '@/components/icons/Icon.vue';

const props = defineProps<{
  type: ButtonType;
  icon: IconType;
  action: (e: Event) => void;
}>();

</script>

<template>
  <button
    class="btn"
    @click="props.action"
  >
    <div :class="['bkg', props.type]">
      <Icon :icon="props.icon" />
    </div>
  </button>
</template>

<style scoped lang="scss">
  .btn {
    width: 3rem;
    height: 3rem;
    display: grid;
    place-content: center;
    background-color: transparent;
    border: none;
  }
  .bkg {
    display: grid;
    place-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    &.filled {
      background-color: var(--n-500);
      svg { fill: var(--black); }
    }
    &.border {
      fill: var(--n-500);
      border: 1px solid var(--n-300);
    }
  }
</style>