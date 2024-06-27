import { Icon } from "@/types/enums";

export type UserData = {
  username: string;
  token: string;
}

export type Note = {
  id: string;
  title: string;
  body: string;
  lastupdated: number;
  created: number;
}

export type MenuOption = {
  label: string,
  icon?: Icon,
  action: () => void
}

export type DataBaseNotes = Map<string, Note>

export type Tab = {
  id: string;
  label: string;
  icon: string;
  action: () => void
}

export type ToastOptions = {
  id?: string;
  duration?: number;
  transitionDuration?: number;
  align?: 'left' | 'center' | 'right';
}

export type ActiveNoteFunctions = {
  getActiveNote: () => Note | undefined;
  setActiveNote: (note: Note) => void;
  updateActiveNote: (note: Partial<Note>) => void;
  clearActiveNote: () => void;
  newActiveNote: (note?: Partial<Note>) => void;
}

export type AlterLoginStateCalls = {
  redirectSignIn: () => void;
  passwordSignIn: (name: string, password: string) => void;
  logout: () => void;
  forgotPassword: () => void;
  newUser: () => void;
}

export type DatabaseCalls = {
  getAllNotes: () => void;
  setNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  removeNote: (noteId: string) => void;
}