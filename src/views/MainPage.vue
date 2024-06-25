<script setup lang="ts">
import NoteList from '@/components/MainPage.NoteList.vue';
import DayInfo from '@/components/MainPage.DayInfo.vue';
import ScratchPad from '@/components/MainPage.ScratchPad.vue';
import Note from '@/components/Note.vue';
import { dialogService } from '@/services/dialogService';
import toast from '@/plugins/toast';
import { MenuOption, Tab } from '@/types/sharedTypes';
import { clearActiveNote, firebaseCalls, getActiveNote, getDataBase, isLocal, testCalls, updateActiveNote,  } from '@/services/firebase';
import { noteHasChanged } from '@/utils/storeUtils';
import NoteIcon from '@/assets/icons/note.24px.svg'
import ScratchIcon from '@/assets/icons/scratch.24px.svg';
import { menuService } from '@/services/menuService';
import { ref } from 'vue';


const props = defineProps<{
  userId: string;
}>();

const database = getDataBase();

const { setNote, updateNote, removeNote } = isLocal() ? testCalls() : firebaseCalls(props.userId);
const activeNote = getActiveNote();
const activeTab = ref<string>('tab-0');

const updateTitle = (title: string) => updateActiveNote({title, lastupdated: new Date().valueOf()});
const updateContent = (body: string) => updateActiveNote({body, lastupdated: new Date().valueOf()});
const save =  () => {
  toast('Save');
  if (activeNote.value) database.value?.has(activeNote.value.id) ? updateNote(activeNote.value) : setNote(activeNote.value); 
  clearActiveNote();
  dialogService.close();
}

const noSave = () => {
  toast('Note left unchanged');
  clearActiveNote();
  dialogService.close()
}

const closeNoteAsk = () => {
  if (database.value?.size && activeNote.value && !noteHasChanged(database.value, activeNote.value)) return clearActiveNote();
  dialogService.open('Save Note?', 'Or what?', [
    { 
      name: 'Yes', 
      action: () => {
        save();
      }
    },
    { 
      name: 'No', action: () => {
        toast('Note left unchanged');
        clearActiveNote();
        dialogService.close()
      }
    },
    { 
      name: 'Cancel',
      action: () =>  { dialogService.close() } 
    }
  ]);
}
const closeNoteSave = () => save();
const deleteNote = (id: string) => {
  dialogService.open('Delete note?', '',[
    { 
      name: 'Yes', 
      action: () => {
        toast('Note Deleted');
        if (activeNote.value && database.value?.has(id)) removeNote(id);
        clearActiveNote();
        dialogService.close();
      }
    },
    {
      name: 'No',
      action: dialogService.close,
    }
  ])
}

const scratch = ref<string>('scratch');
const tabs: Tab[] = [
  { id: 'tab-0', label: 'Notes', icon: NoteIcon, action: () => activeTab.value = 'tab-0' },
  { id: 'tab-1', label: 'Scratch Pad', icon: ScratchIcon, action: () => activeTab.value = 'tab-1' }
];

const scratchMenu = (menu: MenuOption[], rect: DOMRect) => {
  menuService.set(menu, rect);
}
const makeScratchNote = () => {}
</script>

<template>
  <div class="main-page-container">
    <DayInfo />
    <NoteList
      :user-id="props.userId"
      :database="database"
    />
   
    <ScratchPad
      v-model:body="scratch"
      @display:contextmenu="scratchMenu"
      @action:make-note="makeScratchNote"
    />
    <Note
      v-if="activeNote?.id"
      v-bind="activeNote"
      @update:title="updateTitle"
      @update:body="updateContent"
      @noteOptions="deleteNote"
      @close:ask="closeNoteAsk"
      @close:save="closeNoteSave"
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
</style>