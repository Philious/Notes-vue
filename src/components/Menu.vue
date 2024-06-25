<script setup lang="ts">
import { logout } from '@/services/firebase';



const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle:menu"): void;
}>();

const listItems = [
  { 
    name: 'Logout', action: () => {
      emit('toggle:menu');
      logout();
      
    }
  }
];
</script>

<template>
  <button
    :class="['mask', { visible }]"
    @click="emit('toggle:menu')"
  ></button>
  <ul :class="['list', { visible }]">
    <li
      v-for="item in listItems"
      :key="item.name"
      class="item"
    > 
      <button
        class="menu-item"
        @click="item.action"
      >
        {{ item.name }}
      </button>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .list {
    margin: 0;
    padding: 4rem 0;
    box-sizing: border-box;
    background-color: hsl(0, 0%, 10%);
    border-right: 1px solid hsl(0, 0%, 15%);
    height: 100vh;
    min-width: 75vw;
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(calc(-100% - 2px));
    transition: transform .3s;
    &.visible {
      transform: translateX(0);
    }
    .item {
      box-sizing: border-box;
      width: 100%;
      font-size: .825rem;
      font-weight: 500;
      height: 3rem;
      padding-left: 2.5rem;
      &:hover {
        background-color: hsl(0, 0%, 15%);
      }
      .menu-item{
        display: flex;
        align-items: center;
        border: none;
        background-color: transparent;
        color: hsl(0, 0%, 80%);
        flex: 1;
        height: 100%;
        padding-right: 1.5rem;
        border-bottom: 1px solid hsl(0, 0%, 15%);
        
      }
    }
  }
  .mask {
    position: fixed;
    inset: 0;
    padding: 0;
    transform: translateX(-100%);
    border: none;
    background-color: hsla(0, 0%, 0%, .5);
    transition: opacity .2s, transform 0s .2s;
    opacity: 0;
    &.visible {
      transition: opacity .2s, transform 0s 0s;
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>