<script setup lang="ts">
import { Note } from '@/types/types';
import { Icon, ButtonType } from '@/types/enums';
import { ref } from 'vue';
import IconButton from './IconButton.vue';
import { dateFormat } from '@/utils/sharedUtils';

const props = defineProps<Note>();

const emit = defineEmits<{
  (e: 'update:title', value: string): void;
  (e: 'update:body', value: string): void;
  (e: 'close:ask'): void;
  (e: 'close:save'): void;
  (e: 'display:options'): void;
}>();

const title = ref<HTMLElement | undefined>();
const titleValue = ref(props.title);
const bodyValue = ref(props.body);

const titleUpdate = (event: Event) => emit('update:title', (event.target as HTMLInputElement).value);

const contentUpdate = (event: Event) => emit('update:body', (event.target as HTMLTextAreaElement).value);

const closeAndAsk = () => emit('close:ask');

const closeAndSave = () => emit('close:save');

const options = () => emit('display:options');

</script>

<template>
  <div
    id="note"
    class="note"
  >
    <div class="title-area">
      <input
        ref="title"
        v-model="titleValue"
        class="title"
        autofocus
        @input="titleUpdate"
      />
    </div>
    <div class="date">
      <span>Created: {{ dateFormat(props.created) }}</span>
      <span>Updated: {{ dateFormat(props.lastupdated) }}</span>
    </div>
    <div class="text-area-container">
      <textarea
        ref="content"
        v-model="bodyValue"
        class="text-area"
        @input="contentUpdate"
      ></textarea>
    </div>
    <div class="toolbar">
      <div class="toolbar-left-section">
        <IconButton
          :type="ButtonType.Border"
          :icon="Icon.Left"
          :action="closeAndAsk"
        />
        <IconButton
          :type="ButtonType.Border"
          :icon="Icon.Check"
          :action="closeAndSave"
        />
      </div>
      <div class="toolbar-right-section">
        <IconButton
          :type="ButtonType.Border"
          :icon="Icon.Options"
          :action="options"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .note {
    grid-area: var(--note-area);
    background-color: var(--black);
    position: fixed;
    inset: 0 0 0 var(--note-width);
    display: grid;
    grid-template-rows: auto 1.5rem 1fr;
    
    z-index: 1;
  }
  .toolbar {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 -1px 0 var(--n-300);
  }
  .icon-btn {
    @include base-btn;
    width: 3rem;
    height: 3rem;
    display: grid;
    place-content: center;
  }
  .back {
    overflow: visible;
    fill:transparent;
    width: 1rem;
    height: 1rem;
    stroke: var(--primary);
    stroke-width: 2;
  }
  .toolbar-left-section,
  .toolbar-right-section {
    display: flex;
  }
  .title-area {
    box-sizing: border-box;
    padding: 0.5rem 0;
    box-shadow: 0 1.0625rem 0 -1rem var(--n-300);
    text-transform: capitalize;
    margin: 0.25rem;
  }
  .title {
    box-sizing: border-box;
    font-size: 1rem;
    height: 3rem;
    padding: 0 0.75rem;
    background-color: transparent;
    border: none;
    width: 100%;
  }
  .date {
    font-size: 0.625rem;
    text-transform: uppercase;
    color: var(--n-500);
    padding: 0 1rem;
    justify-content: space-between;
    display: flex;
    margin: auto 0; 
  }
  .text-area-container {
    margin: 0 .25rem;
  }
  .text-area {
    box-sizing: border-box;
    border: none;
    background: none;
    line-height: 1.5;
    font-size: 0.875rem;
    width: 100%;
    height: 100%;
    padding: 1rem .75rem;
    white-space-collapse: break-spaces;
    overflow-y: auto;
    resize: none;
  }
</style>