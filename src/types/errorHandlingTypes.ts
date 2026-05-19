import { Ref } from "vue";
import { InputStateType } from "./enums";
import TextField from "@/components/TextField.vue";

export type InputElement = InstanceType<typeof TextField> & ExposedInputValidation;

export type ValidationFunction = (value: string | null, state: Ref<InputStateType>) => string | null;

export type InputValidate = {
  onAction?: ValidationFunction;
  onFocus?: ValidationFunction;
  onUpdate?: ValidationFunction;
  onEnterKey?: ValidationFunction;
  onAbortKey?: ValidationFunction;
  onBlur?: ValidationFunction;
}

export type ExposedValidationFunction = () => boolean;

export type ExposedInputValidation = { valid: ExposedValidationFunction };