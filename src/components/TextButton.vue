<script setup lang="ts">
import { ButtonEnum } from '@/types/enums';
import * as uuid from 'uuid';


const props = withDefaults(defineProps<{
  label: string;
  onClick: (ev: MouseEvent) => void;
  theme?: ButtonEnum;
  type?: 'button' | 'submit' | 'reset';
  name?: string;
}>(), {
  style: ButtonEnum.Filled,
  type: 'button',
  name: uuid.v4()
})
</script>

<template>
  <button :class="['btn', theme]" :type="props.type" :name="props.name" @click="props.onClick">{{ props.label }}</button>
</template>

<style scoped  lang="scss">
  
  .btn {
    position: relative;
    min-height: 2.5rem;
    padding: 0 0.75rem;
    text-align: inherit;
    cursor: pointer;
    &:before {
      content: "";
      display: block;
      inset: 0 -.25rem;
      position: absolute;
    }
  }

  .text {
    background-color: transparent;
    border: none;
    color: var(--n-500);
    transition: filter .25s;
    @include tabletUp() {
      &:hover {
        filter: brightness(1.5);
      }
    }
  }
</style>