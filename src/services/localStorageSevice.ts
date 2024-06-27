import { database } from "@/store/firebaseStore";
import { Note } from "@/types/types";

export const localStorageService = () => {
  
  const getAllNotes = () => {
    const localData = localStorage.getItem('notesTestData');
    const data = (localData ? JSON.parse(localData) : []) as Note[];
    database.value.clear();
    for (const key in data) database.value.set(data[key].id, data[key]);
  }

  const setNote = (note: Note): void => {
    const id = 'id-' + new Date().valueOf();
    database.value.set(id, { ...note, id: id });
    localStorage.setItem('notesTestData', JSON.stringify([...database.value.values()]))
  }

  const updateNote = (note: Note) => {
    database.value.set(note.id, note);
    localStorage.setItem('notesTestData', JSON.stringify([...database.value.values()]))
  }

  const removeNote = (noteId: string) => {
    database.value.delete(noteId);
    localStorage.setItem('notesTestData', JSON.stringify([...database.value.values()]))
  }

  return { getAllNotes, setNote, updateNote, removeNote }
}