<script setup lang="ts">
import IconButton from '@/components/IconButton.vue';
import { Icon, ButtonType } from '@/types/enums';
import { debounce } from '@/utils/sharedUtils';

const emit = defineEmits<{
  (e:'display:scratch-context-menu'): void,
  (e: 'toggleScratch'): void
}>();

const modelBody = defineModel<string>('body');
const modelActive = defineModel<boolean>('active');

const update = (bodyValue: Event) => modelBody.value = (bodyValue.target as HTMLTextAreaElement).value;
const lazyUpdate = debounce((bodyValue: Event) => update(bodyValue), 500)

const openContextMenu = (e: Event) => { e.stopPropagation(); emit('display:scratch-context-menu') }

const toggle = () => emit('toggleScratch');

</script>

<template>
  <div :class="['scratch-pad', { 'active': modelActive }]">
    <div
      class="scratch-pad-header"
      @click="toggle"
    >
      <label class="header">Scratch pad</label>
      <div class="scratch-pad-options">
        <IconButton
          class="options-icon"
          :type="ButtonType.Border"
          :icon="Icon.Options"
          :action="openContextMenu"
        />
        <IconButton
          class="arrow-icon"
          :type="ButtonType.Border"
          :icon="Icon.Up"
          :action="() => {}"
        />
      </div>
    </div>
    <textarea
      class="scratch-pad-area"
      :value="modelBody"
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
    padding-bottom: 2rem;
    position: fixed;
    inset: auto calc(100vw - var(--scratch-width)) 0 0;
    transform: translateY(calc(100% - var(--toolbar-height)));
    box-shadow: 0 -0.0625rem 0 var(--n-300), 0.0625rem 0 var(--n-300);
    transition: transform .25s;
    box-sizing: border-box;
    &,
    .arrow-icon,
    .options-icon { transition: transform .25s; }
    .arrow-icon { transform: rotate(0); }
    .options-icon { transform: scale(0); }
    &.active {
      transform: translateY(0);
      .arrow-icon {
        transform: rotate(180deg);
      }
      .options-icon { 
        transform: scale(1);
        transition-delay: .25s;
      }
    }
  }
  .scratch-pad-header {
    box-sizing: border-box;
    height: 3rem;
    padding: 0 .5rem 0 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
    font-size: .75rem;
    font-weight: 700;
    place-self: center start;
    
  }
  .scratch-pad-options {
    display: flex;
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