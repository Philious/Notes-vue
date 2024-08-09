<script setup lang="ts">
import aDialog from '@/components/Dialog.vue';
import ContextMenu from '@/components/ContextMenu.vue';
import Loading from '@/components/Loading.vue';
import {ref, watchEffect} from 'vue';
import { PageEnum } from '@/types/enums';
import { goto } from '@/router/router';
import { useNoteStore } from '@/store/noteStore';
import { useUserStore } from './store/userStore';

const isLoading = ref(true);
watchEffect(async () => {
  const response = await useUserStore().checkAuthentication();
  if (response) {
    useNoteStore().getAllNotes();
    goto(PageEnum.MAIN);
    isLoading.value = false;
  } else {
    goto(PageEnum.LOGIN);
    isLoading.value = false;
  }
});

</script>

<template>
  <div class="main-container">
    <router-view />
  </div>
  <a-dialog />
  <ContextMenu />
  <Loading v-if="isLoading" />
</template>

<style scoped>
  .main-container {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: auto var(--toolbar-height);
  }
  
</style>
