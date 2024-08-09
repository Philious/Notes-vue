<script setup lang="ts">
import { IconEnum } from '@/types/enums';
import Add from '@/components/icons/Add.vue';
import Arrow from '@/components/icons/Arrow.vue';
import List from '@/components/icons/List.vue';
import Options from '@/components/icons/Options.vue'
import Remove from '@/components/icons/Remove.vue';
import Settings from '@/components/icons/Settings.vue';
import Check from '@/components/icons/Check.vue';
import LetterSize from '@/components/icons/LetterSize.vue';
import Logout from '@/components/icons/Logout.vue';
import { DefineComponent } from 'vue';

const props = defineProps<{
  icon: IconEnum;
}>()

const icons: Record<IconEnum, DefineComponent<{}, {}, any>> = {
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