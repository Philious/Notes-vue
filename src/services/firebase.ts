import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, User, signOut, signInWithRedirect, getRedirectResult, signInWithCredential, signInWithPopup } from "firebase/auth";
import { getDatabase, set, ref as fbRef, child, onValue, get, push, remove } from "firebase/database";
import { computed, reactive, Ref, ref } from "vue";
import { DataBaseNotes, Note } from "@/types/sharedTypes";
import { router } from "@/router/router";
import toast from "@/plugins/toast";
import { firebaseConfig } from "@/firebaseConfig";

export const state = reactive({
  loading: false,
  errorMessage: '',
});

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const token = ref<string>();
const user = ref<User>();
const provider = new GoogleAuthProvider();

const database = ref<DataBaseNotes>(new Map());
const activeNote = ref<Note>();
const loggingOut = ref(false);

export const redirect = async () => {
  state.loading = true;

  signInWithRedirect(auth, provider); 
  //const credential = GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
  //const result = await signInWithCredential(auth, credential);

  getRedirectResult(auth).then((result) => {

    if (result) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      token.value = credential?.accessToken;

      user.value = result.user;
      state.loading = false;
    } else throw Error
    
  }).catch((error) => {
    state.loading = false;
    const errorCode = error.code;
    const errorMessage = error.message;
    state.errorMessage = errorCode ? `Last known error\nError code: ${errorCode}\nError: ${errorMessage}` : state.errorMessage

    if (state.errorMessage) toast(state.errorMessage, { duration: 5000, align: 'left'});

  });

}

export const logout = () => {
  loggingOut.value = true;
  signOut(auth).then(() => {
    localStorage.setItem('firebase', '');
    user.value = undefined;
    database.value.clear();
    activeNote.value = undefined;
    router.push({ name: 'login' })
  }).catch((error) => {
    console.error('Error logging out')
  });
}

export const isLocal = () => location.hostname === 'localhost';

onAuthStateChanged(auth, (authUser) => {

  if (isLocal()) {
    console.log('LOCAL');
    state.loading = false;
    testCalls().getAllNotes();
    router.push({ name: 'main', params: { userId: 'test' } })
    return;
  }

  state.loading = true;
  if (authUser) {
    user.value = authUser;
    const uid = authUser.uid;
    router.push({ name: 'main', params: { userId: uid } })
    firebaseCalls(uid).getAllNotes();
    state.loading = false;
  } else {
    console.log('no AuthUser')
    router.push({ name: 'login' })
    loggingOut.value = false;
    state.loading = false;
  }
});

export const firebaseCalls = (uid: string) => {
  const getAllNotes = () => {
    const db = getDatabase();
    const userDataRef = fbRef(db, `users/${uid}`);
    onValue(userDataRef, (snapshot) => {

      const data = snapshot.val().notes as Record<string, Note>;
      database.value.clear();
      for (const key in data) database.value.set(key, data[key]);
    });
  }

  const getNote = (noteId: string) => {
    const dbRef = fbRef(getDatabase());
    get(child(dbRef, `users/${uid}${noteId}`)).then((snapshot) => snapshot.exists() ? snapshot.val() : false)
    .then(() => console.log('Data gotten successfully!'))
    .catch((error) => console.error(error));
  }

  const setNote = (note: Note): void => {
    const db = getDatabase();
    const id = push(child(fbRef(db), 'note')).key;
    set(fbRef(db, `users/${uid}/notes/${id}`), {...note, id })
    .then(() => console.log('Data saved successfully!'))
    .catch((error) => console.error(error));
  }

  const updateNote = (note: Note) => {
    const db = getDatabase();
    return set(fbRef(db, `users/${uid}/notes/${note.id}`), note)
    .then(() => console.log('Data updated successfully!'))
    .catch((error) => console.error(error));
  }

  const removeNote = (noteId: string) => {
    const db = getDatabase();
    return remove(fbRef(db, `users/${uid}/notes/${noteId}`))
    .then(() => console.log('Data removed successfully!'))
    .catch((error) => console.error(error));
  }

  return { getAllNotes, getNote, setNote, updateNote, removeNote }
}

export const testCalls = () => {

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

export const getAuthorization =  () => computed(() => user.value);
export const getDataBase = () => computed(() => database.value);
export const getActiveNote = () => computed(() => activeNote.value);
export const setActiveNote = (note: Note) => activeNote.value = note;
export const clearActiveNote = () => activeNote.value = undefined;
export const newActiveNote = () => {
  const date = new Date().valueOf();
  activeNote.value = { id: 'new',
  title: '',
  body: '',
  lastupdated: date,
  created: date
  }
};
export const updateActiveNote = (note: Partial<Note>) => { if (activeNote.value) activeNote.value = { ...activeNote.value, ...note }};
