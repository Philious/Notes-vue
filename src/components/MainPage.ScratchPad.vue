<script setup lang="ts">
import IconButton from '@/components/IconButton.vue';
import { Icon, IconType, MenuOption } from '@/types/sharedTypes';
import { throttle } from '@/utils/sharedUtils';
import { ref } from 'vue';

const model = defineModel<string>('body');
const active = ref(false);
const parentElement = ref<HTMLElement>();
const menuOptions: MenuOption[] = [{
  label: 'Make to note',
  action: () => emit('action:make-note') 
}];

const update = (bodyValue: Event) => {
  const el = (bodyValue.target as HTMLTextAreaElement);
  model.value = el.innerHTML;
}
const lazyUpdate = throttle((bodyValue: Event) => update(bodyValue), 500)

const emit = defineEmits<{(e:'display:contextmenu', menu: MenuOption[], parentElement: DOMRect): void, (e: 'action:make-note'): void}>();

const viewOptions = () => { emit('display:contextmenu', menuOptions, parentElement.value!.getBoundingClientRect()) }

const toggle = () => active.value = !active.value
</script>

<template>
  <div :class="['scratch-pad', { 'active': active }]">
    <div
      class="scratch-pad-header"
      @click="toggle"
    >
      <label class="header">Scratch pad</label>
      <div class="scratch-pad-options">
        <IconButton
          class="arrow-icon"
          :type="IconType.Border"
          :icon="Icon.Up"
          :action="() => {}"
        />
      </div>
    </div>
    <textarea
      class="scratch-pad-area"
      :value="model"
      @blur="update"
      @input="lazyUpdate"
    ></textarea>
  </div>
</template>

<style scoped lang="scss">
  .scratch-pad {
    background-color: #000;
    display: grid;
    grid-template-rows: 48px 1fr;
    grid-area: var(--scratch-area);
    padding: 0 1rem 2rem;
    position: fixed;
    inset: auto calc(100vw - var(--scratch-width)) 0 0;
    transform: translateY(calc(100% - var(--toolbar-height)));
    box-shadow: 0 -0.0625rem 0 var(--n-300), 0.0625rem 0 var(--n-300);
    transition: transform .25s;
    box-sizing: border-box;
    .arrow-icon {
      transform: rotate(0);
      transition: transform .25s;
    }
    &.active {
      transform: translateY(0);
      .arrow-icon {
        transform: rotate(180deg);
      }
    }
  }
  .scratch-pad-header {
    height: 3rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
    font-size: .75rem;
    font-weight: 700;
    place-self: center start;
    
  }
  .scratch-pad-area {
    background-color: hsl(320deg 16% 13%); 
    border-radius: .5rem;
    box-shadow: 0 0 0 1px hsl(320, 64%, 12%), 0 0 0 3px hsl(320, 64%, 6%) inset;
    border: none;
    padding: 1rem;
    font-size: .625rem;
    height: 25vh;
    width: 100%;
    resize: none;
    box-sizing: border-box;
  }

</style>