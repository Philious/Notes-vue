import { initializeApp } from "firebase/app";
import { onAuthStateChanged, GoogleAuthProvider, User, signOut, signInWithRedirect, getRedirectResult, Auth, getAuth } from "firebase/auth";
import { computed,  ref } from "vue";
import { AlterLoginStateCalls, DataBaseNotes, Note } from "@/types/types";
import toast from "@/plugins/toast";
import { activeNoteService } from "@/services/activeNoteService";
import { firebaseConfig } from "@/firebaseConfig";
import { localStorageService } from "@/services/localStorageSevice";
import { firebaseService } from "@/services/firebaseService";
import { Page } from "@/types/enums";
import { goto }from "@/router/router";

export const loading = ref(true);
export const database = ref<DataBaseNotes>(new Map());
export const user = ref<User>();
export const readOnlyDB = computed(() => database.value )
const { clearActiveNote } = activeNoteService();

const useFirebase = () => import.meta.env.VITE_DATABASE === 'firebase'


let allThere = !Object.values(firebaseConfig).find((v) => v === undefined) && useFirebase();

export const dbCalls = (uid?: string) => {
  if (!useFirebase() || !uid) {
    console.log(!useFirebase() ? 'USING LOCALSTORAGE' : 'No unique id for firebase. Switching to local storage.');
    loading.value = false;

    return localStorageService();
  } else {
    return firebaseService(uid);
  }
}

const initLoginStateFunctions = (): AlterLoginStateCalls => {
  if (allThere) {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const token = ref<string>();
    const provider = new GoogleAuthProvider();

    

    const redirectSignIn = () => {
      loading.value = true;

      if (auth) {
        signInWithRedirect(auth, provider); 
        getRedirectResult(auth).then((result) => {

          if (result) {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            token.value = credential?.accessToken;

            user.value = result.user;
            loading.value = false;
          } else throw Error
          
        }).catch((error) => {
          const errorCode: string | undefined = error.code;
          const message : string | undefined = error.message;
          const errorMessage = errorCode ? `Last known error\nError code: ${errorCode}\nError: ${message}` : `Error: ${message}`;
          loading.value = false;
        
          if (message) toast(errorMessage, { duration: 5000, align: 'left'});
        });
      }
    }

  const passwordSignIn = (name: string, password: string) => {
    console.log('Might show up later');
  }

  const logout = () => {
    if (auth)
    signOut(auth).then(() => {
      user.value = undefined;
      database.value.clear();
      clearActiveNote();
      goto(Page.LOGIN);
    }).catch((error) => {
      console.error('Error logging out')
    });
  }

  const newUser = () => toast('Not at this time')

  const forgotPassword = () => toast('Good')

  onAuthStateChanged(auth as Auth, (authUser) => {
    loading.value = true;
    if (authUser) {
      user.value = authUser;
      const uid = authUser.uid;
      console.log(goto, uid)
      goto(Page.MAIN, { userId: uid });
      dbCalls(uid).getAllNotes();
      loading.value = false;
    } else {
      goto(Page.LOGIN);
      loading.value = false;
    }
  });

    return { redirectSignIn, passwordSignIn, logout, newUser, forgotPassword }
  } else {
    dbCalls().getAllNotes();
    
    const logout = () => {
      database.value.clear();
      clearActiveNote()
      goto(Page.LOGIN);
    }
    
    const passwordSignIn = () => {
      goto(Page.MAIN);
      dbCalls().getAllNotes();
    }

    const newUser = () => toast('Not at this time')

    const forgotPassword = () => toast('Good')
    
    const redirectSignIn = () => {
      console.log('No Google login in localStorage mode');
      toast('No Google login in localStorage mode')
    }
    
    return { logout, passwordSignIn, redirectSignIn, newUser, forgotPassword }
  }
}

export const { logout, passwordSignIn, redirectSignIn, newUser, forgotPassword } = initLoginStateFunctions();


