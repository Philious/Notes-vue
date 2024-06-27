import { DataBaseNotes, Note } from "@/types/types";
import { FirebaseOptions } from "firebase/app";

export const noteHasChanged = (database: DataBaseNotes, activeNote: Note): boolean => {
  const note =  database.get(activeNote.id);
  return !note || note.title !== activeNote.title || note.body !== activeNote.body
} 

export const collectFirebaseConfig = () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_APIKEY,
    authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
    databaseURL: import.meta.env.VITE_APP_DATABASEURL,
    projectId: import.meta.env.VITE_APP_PROJECTID,
    storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APP_APPID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENTID
  } as FirebaseOptions;

  const allThere = !Object.values(firebaseConfig).find((v) => v === undefined);

  if (allThere) return firebaseConfig;

  console.error(`No firebaseConfig object\nsetup a firebase realtime database https://console.firebase.google.com\nor switch to local storage by adding VITE_APP_USE_LOCALHOST: true to .env or .env.local`);
}