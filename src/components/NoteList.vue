<script setup lang="ts">
import IconButton from '@/components/IconButton.vue';
import NoteListItem from '@/components/NoteListItem.vue';
import { Icons, Buttons } from '@/types/enums';
import { useNoteStore } from '@/store/noteStore';
import { newNote } from '@/utils/sharedUtils';
import {  ref, useTemplateRef } from 'vue';
import { MenuOption } from '@/types/types';
import { menuService } from '@/services/contextMenuService';

const noteStore = useNoteStore();
const { notes, getNote } = noteStore;


const letterSizeRef = useTemplateRef('letterSize')
const lettersizeMenu = ref<MenuOption[] | null>(null);

const setActive = (id: string) => {
  noteStore.activeNote = getNote(id);
}

const newActiveNote = () => {
  noteStore.activeNote = newNote();
}

const updateAppFontSize = (size: number) => {
  document.documentElement.style.setProperty("--app-font-size", `${size}px`);
  lettersizeMenu.value = null;
}

const changeLetterSize = (el: HTMLElement) => {
  menuService.set(
    [
    { label: 'Large',  action: () => updateAppFontSize(22) },
    { label: 'Normal', action: () => updateAppFontSize(16) },
    { label: 'Small', action: () => updateAppFontSize(12) }
  ], 
  el
)
}

</script>

<template>
  <div class="note-list-container">
    <div class="list-header">
      <label class="header">Notes</label>
      <div class="list-options">
        <IconButton
          ref="letterSize"
          :type="Buttons.Border"
          :icon="Icons.LetterSize"
          :action="() => changeLetterSize(letterSizeRef?.$el)"
        />
        <IconButton
          :type="Buttons.Border"
          :icon="Icons.Add"
          :action="newActiveNote"
        />
      </div>
    </div>
    <template v-if="notes">
      <ul class="list">
        <NoteListItem
          v-for="n in notes"
          v-bind="n"
          :key="n.id"
          @set-active-note="setActive"
        />
      </ul>
    </template>
  </div>
</template>

<style scoped lang="scss">

  .note-list-container {
    grid-area: var(--list-area);
    max-width: var(--note-list-width);
    max-height: 100%;
    overflow-y: auto;
    padding-bottom: 3rem;
    box-shadow: 1px 0 0 var(--n-300);
    flex: 1;
    display: contents;
    @include desktop {
      display: grid;
      grid-template-rows: var(--toolbar-height) 1fr;
    }
  }
  .list-header {
    background-color: var(--black);
    position: sticky;
    top: var(--list-header-top);
    align-items: center;
    display: flex;
    place-self: center start;
    gap: .5rem;
    padding: 0 .5rem 0 1rem;
    justify-content: space-between;
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    border-bottom: 1px solid var(--n-400);
    z-index: 1;
  }
  .header {
    text-transform: uppercase;
    font-size: .75rem;
    font-weight: 700;
  }
  .list-options {
    display: flex;
  }

  .to-notes-btn {
    gap: .125rem;
  }
  .list {
    background-color: var(--black);
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-x: hidden;
    overflow-y:auto;
    list-style: none;
    padding: 0 0 3rem 0;
    margin: 0;
    scroll-snap-type: y mandatory;
  }
</style>
