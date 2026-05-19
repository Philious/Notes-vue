<script setup lang="ts">
import { IconType, Icons } from '@/types/enums';
import Add from '@/components/icons/AddIcon.vue';
import Arrow from '@/components/icons/ArrowIcon.vue';
import List from '@/components/icons/ListIcon.vue';
import Options from '@/components/icons/OptionsIcon.vue'
import Remove from '@/components/icons/RemoveIcon.vue';
import Settings from '@/components/icons/SettingsIcon.vue';
import Check from '@/components/icons/CheckIcon.vue';
import LetterSize from '@/components/icons/LetterSizeIcon.vue';
import Logout from '@/components/icons/LogoutIcon.vue';

const props = defineProps<{
  icon: IconType;
}>()

const icons: Record<IconType, typeof Add> = {
  [Icons.Add]: Add,
  [Icons.Down]: Arrow,
  [Icons.Cancel]: Remove,
  [Icons.Remove]: Remove,
  [Icons.Left]: Arrow,
  [Icons.List]: List,
  [Icons.Options]: Options,
  [Icons.Right]: Arrow,
  [Icons.Setting]: Settings,
  [Icons.Up]: Arrow,
  [Icons.Check]: Check,
  [Icons.LetterSize]: LetterSize,
  [Icons.LogOut]: Logout,
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
  &.up {
    transform: rotate(270deg);
  }

  &.left {
    transform: rotate(180deg);
  }

  &.donw {
    transform: rotate(90deg);
  }
}
</style>