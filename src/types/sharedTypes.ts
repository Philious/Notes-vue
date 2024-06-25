export interface UserData {
  username: string;
  token: string;
}

type LastUpdated = { [lastupdated: string]: number }
type Created = { [created: string]: number }
type Body = { [body: string] : string };
type Title = { [title: string]: string };
type Id = { [id: string]: string };

export type Note = {
  id: string;
  title: string;
  body: string;
  lastupdated: number;
  created: number;
}

export type MenuOption = {
  label: string,
  action: () => void
}

export type DataBaseNotes = Map<string, Note>

export type Tab = {
  id: string;
  label: string;
  icon: string;
  action: () => void
}

export enum IconType {
  Default = 'default',
  Filled = 'filled',
  Border = 'border'
}

export enum Icon {
  Add = 'add',
  Cancel = 'cancel',
  Up = 'up',
  Left = 'left',
  Down = 'down',
  Right = 'right',
  List = 'list',
  Options = 'options',
  Setting = 'setting',
  OK = 'ok',
  Remove = 'remove',
  LetterSize = 'letter-size',
  LogOut = 'logout'
}