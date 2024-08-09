import { NoteProps } from "@/types/types";
import { newNote } from "@/utils/sharedUtils";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

export const useActiveNoteStore = defineStore('active note', () => {
  const internalActiveNote = ref<NoteProps | null>();
  const activeNote = internalActiveNote;

  const setActiveNote = (note: NoteProps) => internalActiveNote.value = note;

  const clearActiveNote = () => internalActiveNote.value = null;

  const updateActiveNote = (note: Partial<NoteProps>) => {
    if (internalActiveNote.value) {
      const value = internalActiveNote.value;
      internalActiveNote.value = { ...internalActiveNote.value, ...note }
    } else console.error('Nothing to update');
  };

  const newActiveNote = () => {
    (document.activeElement as HTMLElement)?.blur();
    internalActiveNote.value = newNote();
  };

  return { activeNote, setActiveNote, clearActiveNote, updateActiveNote, newActiveNote }
});