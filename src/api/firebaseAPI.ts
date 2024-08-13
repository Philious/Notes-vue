import { getDatabase, onValue, child, push, set, remove as removeFromFirebase, get, ref as firebaseRef } from "firebase/database";
import { FirebaseError, initializeApp } from "firebase/app";
import { Auth, createUserWithEmailAndPassword, getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { NoteAPI, NoteProps, ScratchAPI, ScratchpadProps, UserAPI, UserProps } from '@/types/types';
import { Ref, ref } from 'vue';
import { uid } from '@/utils/sharedUtils';

type FirebaseArguments = {
  auth: Auth;
  authStateChange: () => void;
  onLoggedIn: (user: User) => void;
  onLoggedOut: () => void;
}

export const firebase = async () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_APIKEY,
    authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
    databaseURL: import.meta.env.VITE_APP_DATABASEURL,
    projectId: import.meta.env.VITE_APP_PROJECTID,
    storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APP_APPID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENTID
  };

  const configEntires = Object.entries(firebaseConfig).reduce((p, c) => p += c[1] ? '' : `${c[0]}, `, '');
  if (configEntires.length) {
    console.error(`${configEntires} are missing.`)
    return
  }

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const userRef = ref<User | null>(null);

  userRef.value = await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      return result.user;

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      return null;
    });

  const RedirectResults = async () => {
    try {
      const userCredentials = await getRedirectResult(auth)
      const authCredentials = userCredentials ? GoogleAuthProvider.credentialFromResult(userCredentials) : null;
      const token = authCredentials?.accessToken;

      const user = userCredentials?.user;
    } catch (err) {
      const error = err as FirebaseError
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error?.customData?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }

  const firebaseStateChange = (...{ auth, authStateChange, onLoggedIn, onLoggedOut }: FirebaseArguments) => {
    onAuthStateChanged(auth, (user) => {
      authStateChange()
      if (user) {
        const uid = user.uid;
        userRef.value = user;
        onLoggedIn(user);
      } else {
        onLoggedOut();
      }
    });
  }


  return { RedirectResults, user: userRef as Ref<User>, auth, userAPI, noteAPI, scratchAPI }
}
type LoginData = { email: string, password: string }

const userAPI = (auth: Auth, user: Ref<User>): UserAPI => {
  const register = async ({ email, password }: LoginData): Promise<UserProps | null> => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

      return {
        id: userCredentials.user.uid,
        username: null,
        email: userCredentials.user.email ?? userCredentials.user.uid,
        createdAt: userCredentials.user.metadata.creationTime ?? new Date().toJSON(),
      }
    } catch (err) {
      const error = err as FirebaseError;
      const errorCode = error.code;
      const errorMessage = error.message;

      return null;
    }
  }
  const login = async ({ email, password }: LoginData) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

      return {
        id: userCredentials.user.uid,
        username: null,
        email: userCredentials.user.email ?? userCredentials.user.uid,
        createdAt: userCredentials.user.metadata.creationTime ?? new Date().toJSON(),
      }
    } catch (err) {
      const error = err as FirebaseError;
      const errorCode = error.code;
      const errorMessage = error.message;

      return null;
    }
  };
  const getUser = async () => {
    return user.value.uid ? {
      id: user.value.uid,
      username: null,
      email: user.value.email ?? user.value.uid,
      createdAt: user.value.metadata.creationTime ?? new Date().toJSON(),
    } : null;
  };
  const logout = () => signOut(auth).then(() => 200).catch(() => null);

  const checkAuthentication = async () => !!user.value?.uid;

  return { register, login, getUser, logout, checkAuthentication }
}

const noteAPI = (user: Ref<User>): NoteAPI => {
  const fetchAll = async () => {
    const db = getDatabase();
    const userDataRef = firebaseRef(db, `users/${user.value.uid}`);
    const snap = ref<NoteProps[] | null>(null);
    onValue(userDataRef, (snapshot) => {
      const data = snapshot.val().notes as Record<string, NoteProps>;
      snap.value = Object.values(data) as NoteProps[];
    });
    return snap.value;
  };
  const add = async (note: NoteProps) => {
    const db = getDatabase();
    const id = push(child(firebaseRef(db), 'note')).key ?? uid();
    const newNote = { ...note, id };

    try {
      await set(firebaseRef(db, `users/${user.value.uid}/notes/${id}`), newNote)
    } catch (error) { console.error(error) }

    return newNote;
  };
  const update = async (note: Partial<NoteProps> & { id: string; }) => {
    const db = getDatabase();
    const dbRef = firebaseRef(db);
    const prev = await get(child(dbRef, `users/${user.value.uid}${note.id}`)).then((snapshot) => snapshot.exists() ? snapshot.val() : null) as Promise<NoteProps | null>;
    if (!prev) return null;
    const updatedNote = { ...prev, ...note };

    try {
      await set(firebaseRef(db, `users/${user.value.uid}/notes/${note.id}`), { ...prev, ...note })
      return 200
    } catch (error) {
      console.error(error)
      return null;
    }
  };
  const remove = async (id: string) => {
    const db = getDatabase();
    try {
      await removeFromFirebase(firebaseRef(db, `users/${user.value.uid}/notes/${id}`));
      return 200;
    } catch (error) {
      console.error(error)
      return null;
    }
  };

  return { fetchAll, add, update, remove }
}

const scratchAPI = (user: Ref<User>): ScratchAPI => {
  const fetch = async () => {
    const db = getDatabase();
    const userDataRef = firebaseRef(db, `users/${user.value.uid}`);
    const snap = ref<ScratchpadProps>();

    onValue(userDataRef, (snapshot) => {
      snap.value = snapshot.val().scratch as ScratchpadProps;
    });

    return snap.value ?? null;
  };

  const update = async (content: string) => {
    const db = getDatabase();

    try {
      await set(firebaseRef(db, `users/${user.value.uid}/scratch`), { content, updatedAt: new Date().toJSON() })
      return 200
    } catch (error) {
      console.error(error)
      return null;
    }
  };

  return { fetch, update }
}