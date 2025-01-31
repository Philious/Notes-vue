<script setup lang="ts">
import NoteList from "@/components/NoteList.vue";
import DayInfo from "@/components/DayInfo.vue";
import ScratchPad from "@/components/ScratchPad.vue";
import Note from "@/components/ActiveNote.vue";
import { dialogService } from "@/services/dialogService";
import { menuService } from "@/services/contextMenuService";
import { IconEnum } from "@/types/enums";
import { setLetterSize } from "@/utils/helpers";
import { useNoteStore } from "@/store/noteStore";

const noteStore = useNoteStore();

const deleteNote = (id: string) => {
  dialogService.open("Delete note?", "", [
    {
      name: "Yes",
      action: () => {
        noteStore.removeNote(id);
        dialogService.close();
        noteStore.activeNote = null;
      },
    },
    { name: "No", action: dialogService.close },
  ]);
};

const noteMenu = (id: string) =>
  menuService.set([
    {
      label: "Letter size",
      icon: IconEnum.LetterSize,
      action: setLetterSize,
    },
    {
      label: "Remove",
      icon: IconEnum.Remove,
      action: () => deleteNote(id),
    },
  ]);

console.log(noteStore.activeNote);
</script>

<template>
  <div class="main-page-container">
    <DayInfo />
    <NoteList />
    <ScratchPad />
    <Note
      :activeNote="noteStore.activeNote"
      @close="() => (noteStore.activeNote = null)"
      @display:options="(id: string) => noteMenu(id)"
    />
  </div>
</template>

<style scoped lang="scss">
.main-page-container {
  display: flex;
  flex-direction: column;
  box-shadow: 0.0625rem 0 0 var(--n-300);
  @include tabletUp {
    display: grid;
    grid-template-columns: var(--main-columns);
    grid-template-rows: var(--day-area-height) calc(
        100vh - var(--day-area-height)
      );
  }
}
</style>
