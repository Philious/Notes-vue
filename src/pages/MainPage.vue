<script setup lang="ts">
import NoteList from "@/components/NoteList.vue";
import DayInfo from "@/components/DayInfo.vue";
import Note from "@/components/ActiveNote.vue";
import { dialogService } from "@/services/dialogService";
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

</script>

<template>
  <div class="main-page-container">
    <DayInfo />
    <NoteList />
    <!--<ScratchPad />-->
    <Note
      :active-note="noteStore.activeNote"
      @close="() => (noteStore.activeNote = null)"
      @delete="(id: string) => deleteNote(id)"
    />
  </div>
</template>

<style scoped lang="scss">
.main-page-container {
  display: flex;
  flex-direction: column;
  box-shadow: 0.0625rem 0 0 var(--n-300);
  @include desktop {
    display: grid;
    grid-template-columns: var(--main-columns);
    grid-template-rows: var(--day-area-height) calc(
        100vh - var(--day-area-height)
      );
  }
}
</style>
