import { Note } from "@/types/types";
import { computed, ref } from "vue";

export const activeNoteService = () => {
  const serviceNote = ref<Note>();
  const activeNote = computed(() => serviceNote.value)
  const setActiveNote = (note: Note) => serviceNote.value = note;
  const clearActiveNote = () => serviceNote.value = undefined;
  const updateActiveNote = (note: Partial<Note>) => { 
    if (serviceNote.value) {
      serviceNote.value = { ...serviceNote.value, ...note }
    } else console.error('Nothing to update');
  };
  const newActiveNote = () => {
    (document.activeElement as HTMLElement)?.blur();

    const date = new Date().valueOf();
    serviceNote.value = { id: 'new',
    title: '',
    body: '',
    lastupdated: date,
    created: date
    }
  };

  return { setActiveNote, clearActiveNote, updateActiveNote, newActiveNote, activeNote }
}

export const { setActiveNote, clearActiveNote, updateActiveNote, newActiveNote, activeNote } = activeNoteService();