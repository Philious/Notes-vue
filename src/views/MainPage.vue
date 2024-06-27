<script setup lang="ts">
import NoteList from '@/components/MainPage.NoteList.vue';
import DayInfo from '@/components/MainPage.DayInfo.vue';
import ScratchPad from '@/components/MainPage.ScratchPad.vue';
import Note from '@/components/Note.vue';
import { dialogService } from '@/services/dialogService';
import toast from '@/plugins/toast';
import { Tab } from '@/types/types';
import { readOnlyDB, dbCalls } from '@/store/firebaseStore';
import { noteHasChanged } from '@/utils/storeUtils';
import NoteIcon from '@/assets/icons/note.24px.svg'
import ScratchIcon from '@/assets/icons/scratch.24px.svg';
import menuService from '@/services/contextMenuService';
import { ref } from 'vue';
import { Icon } from '@/types/enums';
import { updateActiveNote, activeNote, clearActiveNote, setActiveNote, newActiveNote } from '@/services/activeNoteService';

const props = defineProps<{
  userId?: string;
}>();

const { updateNote, setNote, removeNote } = dbCalls(props.userId);
const activeTab = ref<string>('tab-0');
const scratchNote = ref('');
const scratchPadActive = ref(false);

const tabs: Tab[] = [
  { id: 'tab-0', label: 'Notes', icon: NoteIcon, action: () => activeTab.value = 'tab-0' },
  { id: 'tab-1', label: 'Scratch Pad', icon: ScratchIcon, action: () => activeTab.value = 'tab-1' }
];

const updateTitle = (title: string) => updateActiveNote({title, lastupdated: new Date().valueOf()});

const updateContent = (body: string) => updateActiveNote({body, lastupdated: new Date().valueOf()});

const saveClose =  () => {
  toast('Save');
  if (activeNote.value) readOnlyDB.value?.has(activeNote.value.id) ? updateNote(activeNote.value) : setNote(activeNote.value); 
  clearActiveNote();
  dialogService.close();
}

const noSaveClose = () => {
  toast('Note left unchanged');
  clearActiveNote();
  dialogService.close()
}

const removeClose = () => {
  toast('Note Deleted');
  if (activeNote.value && readOnlyDB.value?.has(activeNote.value.id)) removeNote(activeNote.value.id);
  clearActiveNote();
  dialogService.close();
}

const closeNoteAsk = () => {
  if (readOnlyDB.value?.size && activeNote.value && !noteHasChanged(readOnlyDB.value, activeNote.value)) return clearActiveNote();
  dialogService.open('Save Note?', '', [
    { name: 'Yes',  action: saveClose },
    { name: 'No', action: noSaveClose },
    { name: 'Cancel', action: () => dialogService.close() }
  ]);
}
const closeNoteSave = saveClose;

const deleteNote = () => {
  dialogService.open('Delete note?', '',[
    { name: 'Yes', action: removeClose },
    { name: 'No', action: dialogService.close }
  ])
}

const setLetterSize = () => {
  menuService.set([
    { label: 'Larger', action: () => document.body.parentElement?.setAttribute('style', 'font-size: larger') },
    { label: 'Large', action: () => document.body.parentElement?.setAttribute('style', 'font-size: large') },
    { label: 'Medium', action: () => document.body.parentElement?.setAttribute('style', 'font-size: medium')},
    { label: 'Small', action: () => document.body.parentElement?.setAttribute('style', 'font-size: small') }
  ]);
}

const noteMenu = () => menuService.set([
  {
    label: 'Letter size',
    icon: Icon.LetterSize,
    action: setLetterSize
  }, {
    label: 'Remove',
    icon: Icon.Remove,
    action: deleteNote
  },
]);

const toggleScratchPad = () => scratchPadActive.value = !scratchPadActive.value;

const makeScratchNote = () => {
  newActiveNote()
  updateActiveNote({ body: scratchNote.value, title: 'Scratch note' });
  menuService.close();
  toggleScratchPad();
}

const clearScratchPad = () => {
  scratchNote.value = '';
  setTimeout(() => scratchNote.value = '', 500);
  menuService.close();
}

const scratchMenu = () => menuService.set([
  { label: 'Make into a note', action: makeScratchNote },
  { label: 'Clear scratch pad', action: clearScratchPad }
])


</script>

<template>
  <div class="main-page-container">
    <DayInfo />
    <NoteList
      :user-id="props.userId"
      :database="readOnlyDB"
      @set-letter-size="setLetterSize"
    />
    <ScratchPad
      v-model:body="scratchNote"
      v-model:active="scratchPadActive"
      @display:scratch-context-menu="scratchMenu"
      @toggle-scratch="toggleScratchPad"
    />
    <Note
      v-if="activeNote?.id"
      v-bind="activeNote"
      @update:title="updateTitle"
      @update:body="updateContent"
      @close:ask="closeNoteAsk"
      @close:save="closeNoteSave"
      @display:options="noteMenu"
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