<script setup lang="ts">
import aDialog from '@/components/DialogWrapper.vue';
import ContextMenu from '@/components/ContextMenu.vue';
import Loading from '@/components/Loading.vue';
import { useUserStore } from './store/userStore';
import { watch } from 'vue';
import { goto, router } from './router/router';
import { PageEnum } from './types/enums';
import { useNoteStore } from './store/noteStore';

const userStore = useUserStore();
const noteStore = useNoteStore();
userStore.checkAuthentication();

watch(() => userStore.token, (current) => {
    if (current) {
      userStore.loading = true;
      goto(PageEnum.MAIN);
      noteStore.getAllNotes(current);
      userStore.loading = false;
    } else {
      if (router.currentRoute.value.name !== PageEnum.LOGIN) goto(PageEnum.LOGIN);
      userStore.loading = false;
    };
  }, { immediate: true })

</script>

<template>
  <div class="main-container">
    <router-view />
  </div>
  <a-dialog />
  <ContextMenu />
  <Loading v-if="userStore.loading" />
</template>

<style scoped>
  .main-container {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: auto var(--toolbar-height);
  }
  
</style>
