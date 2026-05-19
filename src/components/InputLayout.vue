<script setup lang="ts">
import { InputState } from '@/types/enums';


const props = defineProps<{
  inputState: InputState,
  label?: string;
  helpText?: string;
}>();

</script>

<template>
  <div :class="['container', props.inputState]">
    <span class="label">
      {{ props.label }}
    </span>
    <div class="input-wrapper">
      <slot name="input" />
    </div>
    <Transition name="help">
      <div
        v-if="props.helpText"
        class="help-text"
      >
        {{ props.helpText }}
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.container {
  &:not(.disabled) .input-wrapper:hover {
    border-color: var(--n-500);
  }
  &.error {
    .help-text { color: var(--error); }
    .input-wrapper {
      border-color: var(--error);
    }
  }
}
.input-wrapper {
  background-color: var(--n-100);
  border: 0.0625rem solid var(--n-300);
  color: var(--n-500);
  border-radius: 0.125rem;
  height: 2.25rem;
  width: 100%;
  box-sizing: border-box;
  width: 100%; 
  transition: border-color .15s;
}

.label,
.help-text {
  &:empty { display: none; }
  color: var(--n-500);
  font-size: $txtSmall;
}

.help-enter-active,
.help-enter-active {}

.help-enter-from,
.help-leave-to {

}

</style>