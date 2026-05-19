<script setup lang="ts">
import { IconType, ButtonType } from '@/types/enums';
import Icon from '@/components/icons/IconComponent.vue';

const props = defineProps<{
  type: ButtonType;
  icon: IconType;
  action: (e: Event) => void;
}>();

</script>

<template>
  <button
    class="btn"
    @click="action"
  >
    <div :class="['bkg', props.type]">
      <Icon :icon="props.icon" />
    </div>
  </button>
</template>

<style scoped lang="scss">
  .btn {
    width: 2.5rem;
    height: 2.5rem;
    position: relative;
    display: grid;
    place-content: center;
    background-color: transparent;
    border: none;
    transition: filter .25s;
    cursor: pointer;
    &:before {
      content: "";
      width: 3rem;
      height: 3rem;
      position: absolute;
      inset: -.25rem;
      cursor: pointer;
    }
    @include desktop() {
      &:hover {
        filter: brightness(1.5);
      }
    }
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