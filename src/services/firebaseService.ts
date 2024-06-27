import { Note } from "@/types/types";
import { getDatabase, onValue, child, push, set, remove, get, ref as firebaseRef } from "firebase/database";
import { database } from "../store/firebaseStore";

export const firebaseService = (uid: string) => {

  const getAllNotes = () => {
    const db = getDatabase();
    const userDataRef = firebaseRef(db, `users/${uid}`);
    onValue(userDataRef, (snapshot) => {

      const data = snapshot.val().notes as Record<string, Note>;
      database.value.clear();
      for (const key in data) database.value.set(key, data[key]);
    });
  }

  const getNote = (noteId: string) => {
    const dbRef = firebaseRef(getDatabase());
    get(child(dbRef, `users/${uid}${noteId}`)).then((snapshot) => snapshot.exists() ? snapshot.val() : false)
    .then(() => console.log('Data gotten successfully!'))
    .catch((error) => console.error(error));
  }

  const setNote = (note: Note): void => {
    const db = getDatabase();
    const id = push(child(firebaseRef(db), 'note')).key;
    set(firebaseRef(db, `users/${uid}/notes/${id}`), {...note, id })
    .then(() => console.log('Data saved successfully!'))
    .catch((error) => console.error(error));
  }

  const updateNote = (note: Note) => {
    const db = getDatabase();
    return set(firebaseRef(db, `users/${uid}/notes/${note.id}`), note)
    .then(() => console.log('Data updated successfully!'))
    .catch((error) => console.error(error));
  }

  const removeNote = (noteId: string) => {
    const db = getDatabase();
    return remove(firebaseRef(db, `users/${uid}/notes/${noteId}`))
    .then(() => console.log('Data removed successfully!'))
    .catch((error) => console.error(error));
  }

  return { getAllNotes, getNote, setNote, updateNote, removeNote }
}