import { LoginProps, NoteProps, ScratchpadProps, UserProps } from "@/types/types";
import { ReturnType } from '@/api/userAPI';
import { uid } from "@/utils/sharedUtils";
import { ref } from "vue";

// User
type LocalUserProps = UserProps & { password: string }
const newUser = (email: string, password: string): LocalUserProps => ({
  id: uid(),
  username: null,
  email,
  password,
  createdAt: new Date().toJSON(),
});

const useLocalUserAPI = () => {
  const register = async (payload: LoginProps): Promise<UserProps | null> => {
    const localData = localStorage.getItem('LocalUsers');

    if (localData) {
      const data = JSON.parse(localData) as UserProps[];
      const existingUser = data.find(u => u.email === payload.email)
      if (existingUser) {
        console.error('user already excists');

        return null;
      } else {
        const user = newUser(payload.email, payload.password);
        data.push(user);
        localStorage.setItem('LocalUsers', JSON.stringify(data));
        delete (user as UserProps & { password?: string }).password;

        return user
      }
    } else {
      const user = newUser(payload.email, payload.password);
      localStorage.setItem('LocalUsers', JSON.stringify([user]));

      return user;
    }
  };
  const login = async (payload: LoginProps): Promise<UserProps | null> => {
    const localData = localStorage.getItem('LocalUsers');

    if (localData) {
      const data = JSON.parse(localData) as LocalUserProps[];
      const existingUser = data.find(u => u.email === payload.email)
      if (existingUser && existingUser.password === payload.password) {
        delete (existingUser as UserProps & { password?: string }).password;
        localStorage.setItem('LocalActiveUsers', JSON.stringify(existingUser));

        return existingUser;
      }
    }
    console.error('No user by with that email or password')
    return null;
  };
  const logout = async (): Promise<number | null> => {
    localStorage.setItem('LocalActiveUsers', JSON.stringify(false));

    return 200;
  };

  const checkAuthentication = async (): Promise<boolean> => {
    const isActive = localStorage.getItem('LocalActiveUsers');

    return isActive ? JSON.parse(isActive) : false;
  }

  return { register, login, logout, checkAuthentication }
}

// Notes
const useLocalNotesAPI = () => {
  const fetchAll = async (): Promise<NoteProps[] | null> => {
    const localData = localStorage.getItem('LocalNotesData');
    const data = (localData ? JSON.parse(localData) : []) as NoteProps[];
    localStorage.setItem('LocalNotesData', JSON.stringify(data));

    return data;
  };
  const add = async (note: NoteProps): Promise<NoteProps | null> => {
    const db = await fetchAll() as NoteProps[];
    db?.push(note);
    localStorage.setItem('LocalNotesData', JSON.stringify(db))
    return note;
  };
  const update = async (note: Partial<NoteProps> & { id: string }): Promise<number | null> => {
    const db = await fetchAll() as NoteProps[];
    const index = db.findIndex(n => n.id === note.id);
    if (index !== 0 && !index) return null;
    db[index] = { ...db[index], ...note };
    localStorage.setItem('LocalNotesData', JSON.stringify(db));

    return 200;
  };
  const remove = async (id: string): Promise<number | null> => {
    const db = await fetchAll() as NoteProps[];
    const index = db.findIndex(n => n.id === id);
    if (index !== 0 && !index) return null;
    db.splice(index, 1);

    return 200
  };
  return { fetchAll, add, update, remove }
}

// Scratchpad
const useLocalScratchAPI = () => {
  const fetch = async (): Promise<ScratchpadProps | null> => {
    const localData = await localStorage.getItem('LocalScratchpad');
    const data = (localData ? JSON.parse(localData) : { content: '', updatedAt: new Date().toJSON() }) as ScratchpadProps;
    localStorage.setItem('LocalScratchpad', JSON.stringify(data));

    return data;
  };
  const update = async (content: string): Promise<number | null> => {
    const scratchpad = { content, updatedAt: new Date().toJSON() };
    localStorage.setItem('LocalScratchpad', JSON.stringify(scratchpad))
    return 200;
  }

  return { fetch, update }
}

export const localUserAPI = useLocalUserAPI();
export const localNoteAPI = useLocalNotesAPI();
export const localScratchAPI = useLocalScratchAPI();