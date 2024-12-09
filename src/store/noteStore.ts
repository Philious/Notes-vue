import { api } from "@/api/api";
import { NoteProps, Note } from "@/types/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { newNote, uid } from "@/utils/sharedUtils";

const sortDB = (notes: Note[]): Note[] => {
  return notes.sort((a, b) => {
    const date = new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
    if (date !== 0) return date;
    return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1
  });
}

export const useNoteStore = defineStore('notes', () => {
  const userStore = useUserStore();
  const internalNotes = ref<Note[]>([]);
  const scratchNote = ref<Note>(newNote());
  const activeNote = ref<Note | null>(null);

  const notes = computed(() => internalNotes);

  const getAllNotes = async (token: string): Promise<boolean> => {
    if (!token) return false;

    userStore.loading = true;
    const response = (await api.getAllNotes(token));
    userStore.loading = false;
    const fetchedNotes = response.body;

    if (fetchedNotes) {
      const scratchIndex = fetchedNotes.findIndex(n => n.id === 'scratch');
      if (scratchIndex) {
        scratchNote.value = fetchedNotes[scratchIndex];
        fetchedNotes.splice(scratchIndex, 1);
      }
      internalNotes.value = sortDB(fetchedNotes);
      return true
    } else return false;
  };

  const getNote = (id: string) => internalNotes.value.find(n => n.id === id) ?? null;

  const createNote = async (note: NoteProps): Promise<boolean> => {
    userStore.loading = true;
    const response = await api.addNote(userStore.token, { ...note, id: uid() });
    userStore.loading = false;
    if (response.body) internalNotes.value = response.body;

    return response.ok;
  };

  const updateNote = async (note: NoteProps & { id: string }): Promise<boolean> => {
    userStore.loading = true;
    const response = await api.updateNote(userStore.token, note);
    userStore.loading = false;
    const prev = getNote(note.id);
    if (response.statusCode === 200 && prev) {
      const index = internalNotes.value.findIndex(n => n.id === note.id);
      internalNotes.value[index] = { ...prev, ...note };

      return true;
    } else return false;

  };

  const removeNote = async (id: string): Promise<boolean> => {
    userStore.loading = true;
    const response = await api.deleteNote(userStore.token, id);
    userStore.loading = false;
    if (response.ok) {
      const index = internalNotes.value.findIndex(n => n.id === id);
      internalNotes.value.splice(index, 1);

      return true;
    } else return false;
  };

  return { notes, activeNote, scratchNote, getAllNotes, getNote, createNote, updateNote, removeNote }
})