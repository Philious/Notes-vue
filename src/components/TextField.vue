<script setup lang="ts">
import { InputState } from '@/types/enums';
import InputLayout from './InputLayout.vue';
import { ref } from 'vue';
import { InputValidate } from '@/types/errorHandlingTypes';

const model = defineModel<string>({ required: true });
const props = defineProps<{
  label?: string;
  helpText?: string;
  placeholder?: string;
  validate?: InputValidate
}>();

const state = ref(InputState.Default);
const helpText = ref(props.helpText);
 
const valid = (): boolean => {
  helpText.value = props.validate?.onAction?.(model.value, state) ?? '';
  return !helpText.value
}

const updateState = (update: InputState) => { state.value = update }

const onSpecialKeyboardEvent = (e: KeyboardEvent) => {
  if(e.key === 'Enter') props.validate?.onEnterKey?.(model.value, state);
  else if (e.key === 'Escape') props.validate?.onAbortKey?.(model.value, state);
}

defineExpose<{
  valid: () => boolean;
  updateState: (update: InputState) => void; 
}>({valid, updateState});

</script>
<template>
  <InputLayout :input-state="state" :label="props.label" :help-text="helpText">
    <template v-slot:input>
      <input
        class="input"
        v-model="model"
        :placeholder="props.placeholder"
        :onfocus="validate?.onFocus"
        :onblur="validate?.onBlur"
        :onkeydown="onSpecialKeyboardEvent"
        :oninput="validate?.onUpdate"
      />
    </template>
  </InputLayout>
</template>

<style scoped lang="scss">
  .input {
    background-color: transparent;
    color: var(--n-500);
    height: 100%;
    padding: 0 .75rem;
    width: 100%;
    box-sizing: border-box;
    border: none;
    box-shadow: none;
  }
</style>