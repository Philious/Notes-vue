<script setup lang="ts">
import IconButton from "@/components/IconButton.vue";
import { Icons, Buttons } from "@/types/enums";
import { debounce, newNote } from "@/utils/sharedUtils";
import { ref, useTemplateRef } from "vue";
import { menuService } from "@/services/contextMenuService";
import { useNoteStore } from "@/store/noteStore";

const noteStore = useNoteStore();
const active = ref(false);

const content = ref(noteStore.scratchNote?.content ?? "");
const optionsBtnRef = useTemplateRef('options-icon');
const update = (ev: Event) => {
  content.value = (ev.target as HTMLTextAreaElement).value;
};

const lazyUpdate = debounce((ev: Event) => update(ev), 500);

const toggleScratchPad = () => (active.value = !active.value);

const clearScratchPad = () => {
  content.value = "";
  menuService.close();
};

const createNote = () => {
  noteStore.createNote(newNote({ content: content.value }));
  toggleScratchPad();
  menuService.close();
};

const scratchMenu = (e: Event) => {
  e.stopPropagation();
  const el = optionsBtnRef.value?.$el ?? null;
  menuService.set([
    { label: "Make into a note", action: createNote },
    { label: "Clear scratch pad", action: clearScratchPad },
  ], el);
};
</script>

<template>
  <div :class="['scratch-pad', { active: active }]">
    <div
      class="scratch-pad-header"
      @click="toggleScratchPad"
    >
      <label class="header">Scratch pad</label>
      <div class="scratch-pad-options">
        <IconButton
          v-if="content"
          ref="options-icon"
          class="options-icon"
          :type="Buttons.Border"
          :icon="Icons.Options"
          :action="scratchMenu"
        />
        <IconButton
          class="arrow-icon"
          :type="Buttons.Border"
          :icon="Icons.Up"
          :action="() => {}"
        />
      </div>
    </div>
    <textarea
      class="scratch-pad-area"
      :value="content"
      @blur="update"
      @input="lazyUpdate"
    />
  </div>
</template>

<style scoped lang="scss">
.scratch-pad {
  background-color: #000;
  display: grid;
  grid-template-rows: var(--toolbar-height) 1fr;
  grid-area: var(--scratch-area);
  padding-bottom: 2rem;
  position: fixed;
  inset: auto calc(100vw - var(--scratch-width)) 0 0;
  transform: translateY(calc(100% - var(--toolbar-height)));
  box-shadow: 0 -0.0625rem 0 var(--n-300), 0.0625rem 0 var(--n-300);
  transition: transform 0.25s;
  box-sizing: border-box;
  &,
  .arrow-icon,
  .options-icon {
    transition: transform 0.25s;
  }
  .arrow-icon {
    transform: rotate(0);
  }
  .options-icon {
    transform: scale(0);
  }
  &.active {
    transform: translateY(0);
    .arrow-icon {
      transform: rotate(180deg);
    }
    .options-icon {
      transform: scale(1);
      transition-delay: 0.25s;
    }
  }
}
.scratch-pad-header {
  box-sizing: border-box;
  height: var(--toolbar-height);
  padding: 0 0.5rem 0 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  place-self: center start;
}
.scratch-pad-options {
  display: flex;
}
.scratch-pad-area {
  background-color: hsl(320deg 16% 13%);
  border-radius: 0.5rem;
  box-shadow: 0 0 0 1px hsl(320, 64%, 12%), 0 0 0 3px hsl(320, 64%, 6%) inset;
  border: none;
  padding: 1rem;
  font-size: 0.625rem;
  height: 25vh;
  width: 100%;
  resize: none;
  box-sizing: border-box;
}
</style>
