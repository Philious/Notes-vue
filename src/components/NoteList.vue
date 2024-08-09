<script setup lang="ts">
import IconButton from '@/components/IconButton.vue';
import NoteListItem from '@/components/NoteListItem.vue';
import { IconEnum, ButtonEnum } from '@/types/enums';

import { useNoteStore } from '@/store/noteStore';
import { useActiveNoteStore } from '@/store/activeNoteStore';

const noteStore = useNoteStore();
const activeNoteStore = useActiveNoteStore();

const { notes, getNote } = noteStore;
const { setActiveNote, newActiveNote } = activeNoteStore;

const setActive = (id: string) => {
  const note = getNote(id)!;
  setActiveNote(note);
}

</script>

<template>
  <div class="note-list-container">
    <div class="list-header">
      <label class="header">Notes</label>
      <div class="list-options">
        <IconButton
          :type="ButtonEnum.Border"
          :icon="IconEnum.LetterSize"
          :action="newActiveNote"
        />
        <IconButton
          :type="ButtonEnum.Border"
          :icon="IconEnum.Add"
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
          @setActiveNote="setActive"
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
    @include tabletUp {
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
