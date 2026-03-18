<script setup lang="ts">
import { Note } from "@/types/types";
import { IconEnum, ButtonEnum } from "@/types/enums";
import { computed, ref, watch } from "vue";
import IconButton from "./IconButton.vue";
import { dateFormat } from "@/utils/sharedUtils";
import { useNoteStore } from "@/store/noteStore";
import { dialogService } from "@/services/dialogService";
import TeleportTransition from "./TeleportTransition.vue";

const props = defineProps<{
  activeNote: Note | null;
}>();

const { updateNote, createNote } = useNoteStore();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "display:options", id: string): void;
}>();

watch(
  () => props.activeNote,
  (c) => {
    title.value = c?.title ?? "";
    content.value = c?.content ?? "";
  },
);

const title = ref("");
const content = ref("");
const createdDate = computed(() =>
  props.activeNote ? dateFormat(props.activeNote.createdAt) : "",
);
const updatedDate = computed(() =>
  props.activeNote ? dateFormat(props.activeNote.updatedAt) : "",
);

const titleUpdate = (event: Event) =>
  (title.value = (event.target as HTMLInputElement).value);
const contentUpdate = (event: Event) =>
  (content.value = (event.target as HTMLTextAreaElement).value);

const close = () => {
  dialogService.close();
  emit("close");
};

const closeAndAsk = () => {
  const hasChanged =
    props.activeNote?.title !== title.value ||
    props.activeNote?.content !== content.value;

  if (!hasChanged) {
    close();
    return;
  }

  dialogService.open("Save Note?", "", [
    { name: "Yes", action: closeAndSave },
    { name: "No", action: close },
    { name: "Cancel", action: () => dialogService.close() },
  ]);
};

const closeAndSave = async () => {
  if (!props.activeNote) return;
  const note: Note = {
    ...props.activeNote,
    title: title.value ?? "",
    content: content.value ?? "",
  };

  if (note.id) {
    await updateNote({ ...note, id: note.id });
  } else {
    await createNote(note);
  }
  close();
};

const options = () => emit("display:options", props.activeNote?.id ?? "");
</script>

<template>
  <TeleportTransition>
    <div v-if="props.activeNote" id="note" class="note">
      <div class="title-area">
        <input
          ref="titleRef"
          v-model="title"
          class="title"
          autofocus
          @input="titleUpdate"
        />
      </div>
      <div class="date">
        <span>Created: {{ createdDate }}</span>
        <span>Updated: {{ updatedDate }}</span>
      </div>
      <div class="text-area-container">
        <textarea
          ref="contentRef"
          v-model="content"
          class="text-area"
          @input="contentUpdate"
        ></textarea>
      </div>
      <div class="toolbar">
        <div class="toolbar-left-section">
          <IconButton
            :type="ButtonEnum.Border"
            :icon="IconEnum.Left"
            :action="closeAndAsk"
          />
          <IconButton
            :type="ButtonEnum.Border"
            :icon="IconEnum.Check"
            :action="closeAndSave"
          />
        </div>
        <div class="toolbar-right-section">
          <IconButton
            :type="ButtonEnum.Border"
            :icon="IconEnum.Options"
            :action="options"
          />
        </div>
      </div>
    </div>
  </TeleportTransition>
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
  height: 3rem;
  align-items: center;
  padding: 0 0.5rem;
  justify-content: space-between;
  box-shadow: 0 -0.0625rem 0 var(--n-300);
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
  fill: transparent;
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
  font-weight: 600;
  text-transform: uppercase;
  color: var(--n-500);
  padding: 0 1rem;
  justify-content: space-between;
  display: flex;
  margin: auto 0;
}
.text-area-container {
  margin: 0 0.25rem;
}
.text-area {
  box-sizing: border-box;
  border: none;
  background: none;
  line-height: 1.5;
  font-size: 0.875rem;
  width: 100%;
  height: 100%;
  padding: 1rem 0.75rem;
  white-space-collapse: break-spaces;
  overflow-y: auto;
  resize: none;
}
</style>
