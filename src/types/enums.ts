export const Pages = {
  LOGIN : 'login',
  MAIN : 'main',
  NEW : 'new_user',
  FORGOT : 'forgot_password'
} as const

export const InputState = {
  Default: 'default',
  Disabled: 'disabled',
  Ok: 'ok',
  Error: 'error'
} as const
export type InputStateType = typeof InputState[keyof typeof InputState]

export const NetworkStatus = {
  IDLE : 'idle',
  LOADING : 'loading',
  SUCCSESS : 'succeeded',
  FAILED : 'failed'
} as const

export const Buttons = {
  Default : 'default',
  Filled : 'filled',
  Border : 'border',
  Text : 'text'
} as const

export type ButtonRecord = { [K in keyof typeof Buttons]: (typeof Buttons)[K] } 
export type ButtonType = ButtonRecord[keyof ButtonRecord]

export const Icons = {
  Add : 'add',
  Cancel : 'cancel',
  Up : 'up',
  Left : 'left',
  Down : 'down',
  Right : 'right',
  List : 'list',
  Options : 'options',
  Setting : 'setting',
  Check : 'check',
  Remove : 'remove',
  LetterSize : 'letter-size',
  LogOut : 'logout'
} as const

export type IconRecord = { [K in keyof typeof Icons]: (typeof Icons)[K] } 
export type IconType = IconRecord[keyof IconRecord]
