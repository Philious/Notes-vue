<script setup lang="ts">
import { IconEnum } from '@/types/enums';
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
  icon: IconEnum;
}>()

const icons: Record<IconEnum, typeof Add> = {
  [IconEnum.Add]: Add,
  [IconEnum.Down]: Arrow,
  [IconEnum.Cancel]: Remove,
  [IconEnum.Remove]: Remove,
  [IconEnum.Left]: Arrow,
  [IconEnum.List]: List,
  [IconEnum.Options]: Options,
  [IconEnum.Right]: Arrow,
  [IconEnum.Setting]: Settings,
  [IconEnum.Up]: Arrow,
  [IconEnum.Check]: Check,
  [IconEnum.LetterSize]: LetterSize,
  [IconEnum.LogOut]: Logout,
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