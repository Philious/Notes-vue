<script setup lang="ts">
import { NoteProps } from '@/types/types';
import { dateFormat } from '@/utils/sharedUtils';

const props = defineProps<NoteProps>();
const emits = defineEmits<{ (e:'setActiveNote', id: string): void }>();

</script>

<template>
  <li class="list-item-container">
    <button
      class="list-item"
      @click="() => emits('setActiveNote', props.id)"
    >
      <div class="list-item-header">
        {{ props.title }}
      </div>
      <div class="list-item-content">
        {{ props.content }}
      </div>
      <div class="list-item-date">
        Updated: {{ dateFormat(props.updatedAt) }}
      </div>
    </button>
  </li>
</template>

<style scoped lang="scss">
.list-item-container {
    scroll-snap-align: start;
    &:not(:last-child) {
      box-shadow: 0 1px 0 var(--n-300);
    }
    &:active {
      &,
      .list-item-content:after {
        background-color: var(--n-100);
      }
    }
  }
  .list-item {
    background-color: transparent;
    border: none;
    display: grid;
    gap: .325rem;
    line-height: 1.375;
    padding: 1rem;
    place-content: start start;
    text-align: left;
    width: 100%;
    height: min-content;
    position: relative;
  }
  .list-item-header {
    font-size: var(--list-item-font-size);
    font-weight: 700;
  }
  .list-item-content {
    color: hsl(0, 0%, 64%);
    font-size: var(--list-item-font-size);
    line-height: var(--list-item-line-height);
    max-height: calc(var(--list-item-line-height) * 4);
    overflow: hidden;
    white-space-collapse: break-spaces;
    position: relative;
    &:after {
      content: "...";
      display: block;
      letter-spacing: .125rem;
      position: absolute;
      padding-left: .5rem;
      height: var(--list-item-line-height);
      width: 100%;
      background: #000;
      top: calc(var(--list-item-line-height) * 3);
      right: 0;
    }
  }
  .list-item-date {
    margin-top: .5rem;
    font-size: .625rem;
    color: var(--n-400);
  }
</style>