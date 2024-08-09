import { localNoteAPI } from "@/api/localAPI";
import { noteAPI } from "@/api/noteAPI";
import { NoteProps } from "@/types/types";
import { uid } from "@/utils/sharedUtils";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const sortDB = (notes: NoteProps[]): NoteProps[] => {
  return notes.sort((a, b) => new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf());
}

export const useNoteStore = defineStore('notes', () => {
  const api = import.meta.env.VITE_DATABASE === 'server' ? noteAPI : localNoteAPI;

  const internalNotes = ref<NoteProps[]>([]);
  const notes = computed(() => internalNotes);

  const getAllNotes = async (): Promise<boolean> => {
    const fetchedBD = await api.fetchAll();

    if (fetchedBD) {
      internalNotes.value = sortDB(fetchedBD);
      return true
    } else return false;
  };

  const getNote = (id: string) => internalNotes.value.find(n => n.id === id) ?? null;

  const addNote = async (note: NoteProps): Promise<boolean> => {
    const newNote = await api.add({ ...note, id: uid() });
    if (newNote) {
      internalNotes.value.push(newNote);

      return true
    } else return false;
  };

  const updateNote = async (note: NoteProps): Promise<boolean> => {
    const status = await api.update(note);
    const prev = getNote(note.id);
    if (status === 200 && prev) {
      const index = internalNotes.value.findIndex(n => n.id === note.id);
      internalNotes.value[index] = { ...prev, ...note };

      return true;
    } else return false;

  };

  const removeNote = async (id: string): Promise<boolean> => {
    const status = await api.remove(id);
    if (status === 200) {
      const index = internalNotes.value.findIndex(n => n.id === id);
      internalNotes.value.splice(index, 1);

      return true;
    } else return false;
  };


  return { notes, getAllNotes, getNote, addNote, updateNote, removeNote }
})