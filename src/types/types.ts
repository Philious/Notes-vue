import { IconEnum, ButtonEnum } from "./enums";

export type NoteProps = {
  id: string;
  title: string;
  content: string;
  catalog: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type LoginProps = {
  email: string;
  password: string;
  username?: string;
}

export type UserProps = {
  id: string,
  username: string | null,
  email: string,
  createdAt: string
}

export type ScratchpadProps = {
  content: string;
  updatedAt: string;
}

export type DBResponse<T> = {
  data: T,
  status: number
}

export type ContextMenuItemProps = {
  label: string,
  icon?: IconEnum;
  keepOpen?: boolean;
  action: () => void
}

export type DataBaseNotes = Record<string, NoteProps>

export type ToastOptions = {
  id?: string,
  duration?: number;
  transitionDuration?: number;
  align?: 'left' | 'center' | 'right';
}

export type Tab = {
  id: string;
  label: string;
  icon?: IconEnum;
  action: () => void;
}

export type MenuOption = {
  label: string,
  action: () => void;
  icon?: IconEnum;
}

export type DialogActionProps = {
  name: string;
  action: () => void;
  closeOnAction?: boolean;
}

export type DialogProps = {
  title: string,
  content: string,
  actions: DialogActionProps[]
}

export type IconButtonProps = {
  type: ButtonEnum;
  icon: IconEnum;
  action: () => void;
}
