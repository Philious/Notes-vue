import { InputState } from "@/types/enums";
import { InputElement, InputValidate, ValidationFunction } from "@/types/errorHandlingTypes";
import { Ref } from "vue";

export const multiValidate = (inputElements: (InputElement | null)[]) => {
  let valid = true;
  inputElements.forEach(e => {
    if (e && !e.valid()) valid = false;
  })

  return valid;
}

const isValid = (value: string | null, state: Ref<InputState>, validators: ValidationFunction[]) => {
  let message: string | null = null;
  for (let x = 0; x < validators.length; x++) {
    const m = validators[x](value, state);
    // Pass on first found error message
    if (m) {
      message = m;
      x = validators.length
    }
  }
  return message
}

export const isFilled: ValidationFunction = (value, state) => {
  const message = value ? null : 'Field is empty';
  state.value = value ? InputState.Default : InputState.Error;

  return message
}

const isEmail: ValidationFunction = (value, state) => {
  const isValid = value && /^([\w\W]+@[\w\W]+[.][\w]+)$/.test(value);
  state.value = isValid ? InputState.Default : InputState.Error;

  return isValid ? null : 'Invalid email.'
}

const isPassword: ValidationFunction = (value, state) => {
  const isValid = value && /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{5,}$|^(?=.*\d)(?=.*[^a-zA-Z\d]).{5,}$|^(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{5,}$|^(?=.*[a-zA-Z])(?=.*\d).{5,}$/.test(value)
  state.value = isValid ? InputState.Default : InputState.Error;

  return isValid ? null : 'At least 5 characters long and two types of characters (letter, numbers, special).'
}

export const emailValidation: InputValidate = {
  onAction: (valid, state) => isValid(valid, state, [isFilled, isEmail])
}

export const passwordValidation: InputValidate = {
  onAction: (valid, state) => isValid(valid, state, [isFilled, isPassword])
}