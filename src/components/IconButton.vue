<script setup lang="ts">
import { Icon, IconType } from '@/types/sharedTypes';
import Add from '@/components/Icon.Add.vue';
import Arrow from '@/components/Icon.Arrow.vue';
import List from '@/components/Icon.List.vue';
import Options from '@/components/Icon.Options.vue'
import Remove from '@/components/Icon.Remove.vue';
import Settings from '@/components/Icon.Settings.vue';
import OK from '@/components/Icon.OK.vue';
import LetterSize from '@/components/Icon.LetterSize.vue';
import Logout from '@/components/Icon.Logout.vue';

const props = defineProps<{
  type: IconType;
  icon: Icon;
  action: () => void;
}>()

const i = {
  [Icon.Add]: Add,
  [Icon.Down]: Arrow,
  [Icon.Cancel]: Remove,
  [Icon.Remove]: Remove,
  [Icon.Left]: Arrow,
  [Icon.List]: List,
  [Icon.Options]: Options,
  [Icon.Right]: Arrow,
  [Icon.Setting]: Settings,
  [Icon.Up]: Arrow,
  [Icon.OK]: OK,
  [Icon.LetterSize]: LetterSize,
  [Icon.LogOut]: Logout,
}

</script>

<template>
  <button
    class="btn"
    @click="props.action"
  >
    <div :class="['bkg', props.type]">
      <component
        :is="i[props.icon]"
        :class="['icn', props.icon]"
      />
    </div>
  </button>
</template>

<style scoped lang="scss">
  .btn {
    width: 3rem;
    height: 3rem;
    display: grid;
    place-content: center;
    background-color: transparent;
    border: none;
  }
  .bkg {
    display: grid;
    place-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    &.filled {
      background-color: var(--n-500);
      svg { fill: var(--black); }
    }
    &.border {
      fill: var(--n-500);
      border: 1px solid var(--n-300);
    }
  }
  .icn {
    &.up { transform: rotate(270deg); }
    &.left { transform: rotate(180deg); }
    &.donw { transform: rotate(90deg); }
  }
</style>