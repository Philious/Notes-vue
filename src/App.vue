<script setup lang="ts">
import Toolbar from '@/components/Toolbar.vue';
import Menu from '@/components/Menu.vue';
import Dialog from '@/components/Dialog.vue';
import toast from '@/plugins/toast';
import { ref } from 'vue';
import ContextMenu from '@/components/ContextMenu.vue';
import Loading from '@/components/Loading.vue';
import { state } from '@/services/firebase';

const toggleMenu = ref(false);

</script>

<template>
  <div
    class="main-container"
  >
    <RouterView />
  </div>
  <Menu
    :visible="toggleMenu"
    @toggle:menu="() => toggleMenu = !toggleMenu"
  />
  <Dialog />
  <ContextMenu />
  <Loading v-if="state.loading" />
</template>

<style scoped>
  .main-container {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: auto var(--toolbar-height);
  }
  .main-tabs {
    background-color: var(--n-100);
    box-shadow: 0 -1px 0 var(--n-300);
  }
</style>
