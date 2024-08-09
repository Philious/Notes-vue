<script setup lang="ts">
import NoteList from '@/components/NoteList.vue';
import DayInfo from '@/components/DayInfo.vue';
import ScratchPad from '@/components/ScratchPad.vue';
import Note from '@/components/Note.vue';
import { dialogService } from '@/services/dialogService';
import toast from '@/plugins/toast';
import { Tab } from '@/types/types';
import { noteHasChanged } from '@/utils/sharedUtils';
import NoteIcon from '@/assets/icons/note.24px.svg'
import ScratchIcon from '@/assets/icons/scratch.24px.svg';
import { menuService } from '@/services/contextMenuService';
import { ref } from 'vue';
import { IconEnum } from '@/types/enums';
import { setLetterSize } from '@/utils/helpers';
import { useNoteStore } from '@/store/noteStore';
import { useActiveNoteStore } from '@/store/activeNoteStore';

const activeNoteStore = useActiveNoteStore();
activeNoteStore;

const deleteNote = (id: string) => {
  dialogService.open('Delete note?', '',[
    { name: 'Yes', action: async () => {
      useNoteStore().removeNote(id);
      dialogService.close();
      activeNoteStore.clearActiveNote();
    }},
    { name: 'No', action: dialogService.close }
  ])
}

const noteMenu = (id: string) => menuService.set([
  {
    label: 'Letter size',
    icon: IconEnum.LetterSize,
    action: setLetterSize
  }, {
    label: 'Remove',
    icon: IconEnum.Remove,
    action: () => deleteNote(id)
  },
]);

</script>

<template>
  <div class="main-page-container">
    <DayInfo />
    <NoteList />
    <ScratchPad />
    
    <Note
      v-if="activeNoteStore.activeNote"
      :activeNote="activeNoteStore.activeNote"
      @close="activeNoteStore.clearActiveNote"
      @display:options="(id: string) => noteMenu(id)"
    />
  </div>
</template>

<style scoped lang="scss">
  .main-page-container {
    display: flex;
    flex-direction: column;
    @include tabletUp {
      display: grid;
      grid-template-columns: var(--main-columns);
      grid-template-rows: var(--day-area-height) calc(100vh - var(--day-area-height));
    }
    
    box-shadow: 0.0625rem 0 0 var(--n-300);
  }
</style>@/components/ScratchPad.vue