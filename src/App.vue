<script setup lang="ts">
import aDialog from '@/components/Dialog.vue';
import ContextMenu from '@/components/ContextMenu.vue';
import Loading from '@/components/Loading.vue';
import { loading } from '@/store/firebaseStore';

</script>

<template>
  <div class="main-container">
    <router-view />
  </div>
  <a-dialog />
  <ContextMenu />
  <Loading v-if="loading" />
</template>

<style scoped>
  .main-container {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: auto var(--toolbar-height);
  }
  
</style>
