<script setup lang="ts">
import { Icon, IconType, Note } from '@/types/sharedTypes';
import { ref } from 'vue';
import IconButton from './IconButton.vue';
import { dateFormat } from '@/utils/sharedUtils';

const props = defineProps<Note>();

const emit = defineEmits<{
  (e: 'update:title', value: string): void;
  (e: 'update:body', value: string): void;
  (e: 'noteOptions', value: string): void;
  (e: 'close:ask'): void;
  (e: 'close:save'): void;
}>();

const title = ref<HTMLElement | undefined>();
const titleValue = ref(props.title);
const bodyValue = ref(props.body);

const titleUpdate = (event: Event) => {
  emit('update:title', (event.target as HTMLInputElement).value)
};

const contentUpdate = (event: Event) => {
  emit('update:body', (event.target as HTMLElement).innerText)
};

const noteOptions = (id: string) => {
  emit('noteOptions', id)
}

const setLetterSize = () => {}
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
    <div
      ref="content"
      class="write-area"
      contenteditable
      @input="contentUpdate"
    >
      {{ bodyValue }}
    </div>
    <div class="toolbar">
      <IconButton
        :type="IconType.Border"
        :icon="Icon.Left"
        :action="() => emit('close:ask')"
      />
      <div class="toolbar-right-section">
        <IconButton
          :type="IconType.Border"
          :icon="Icon.Remove"
          :action="() => noteOptions(props.id)"
        />
        <IconButton
          :type="IconType.Border"
          :icon="Icon.LetterSize"
          :action="() => setLetterSize"
        />
        <IconButton
          :type="IconType.Border"
          :icon="Icon.OK"
          :action="() => emit('close:save')"
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
    box-shadow: -1px 0 0 var(--n-300);
    z-index: 1;
  }
  .toolbar {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
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
  .toolbar-right-section {
    display: flex;
  }
  .title-area {
    box-sizing: border-box;
    padding: 0.5rem 0;
    margin: 0 1rem;
    border-bottom: 1px solid var(--n-300);
    text-transform: capitalize;
  }
  .title {
    font-size: 1rem;
    height: 3rem;
    background-color: transparent;
    border: none;
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
  .write-area {
    box-sizing: border-box;
    font-size: 0.875rem;
    width: 100%;
    height: 100%;
    padding: 1rem;
    white-space-collapse: break-spaces;
    overflow-y: auto;
  }
  [contenteditable]:focus-visible { outline-color: var(--primary); }
</style>