<script setup lang="ts">
import { Icon } from '@/types/enums';
import Add from '@/components/icons/Add.vue';
import Arrow from '@/components/icons/Arrow.vue';
import List from '@/components/icons/List.vue';
import Options from '@/components/icons/Options.vue'
import Remove from '@/components/icons/Remove.vue';
import Settings from '@/components/icons/Settings.vue';
import Check from '@/components/icons/Check.vue';
import LetterSize from '@/components/icons/LetterSize.vue';
import Logout from '@/components/icons/Logout.vue';

const props = defineProps<{
  icon: Icon;
}>()

const icons = {
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
  [Icon.Check]: Check,
  [Icon.LetterSize]: LetterSize,
  [Icon.LogOut]: Logout,
}

</script>

<template>
  <component
    :is="icons[props.icon]"
    :class="['icn', props.icon]"
  />
</template>

<style scoped lang="scss">
  .icn {
    &.up { transform: rotate(270deg); }
    &.left { transform: rotate(180deg); }
    &.donw { transform: rotate(90deg); }
  }
</style>