import { localUserAPI } from "@/api/localAPI";
import { userAPI } from "@/api/userAPI";
import { UserProps } from "@/types/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useNoteStore } from "./noteStore";
import { goto } from "@/router/router";
import { PageEnum } from "@/types/enums";

export const useUserStore = defineStore('user', () => {
  const api = import.meta.env.VITE_DATABASE === 'server' ? userAPI : localUserAPI;
  const internalUser = ref<UserProps>();
  const user = computed(() => internalUser);

  const register = async (email: string, password: string) => {
    const response = await api.register({ email, password });
    if (response) {
      internalUser.value = response;
      return response;
    }
  };
  const login = async (email: string, password: string) => {
    const response = await api.login({ email, password });
    if (response) {
      useNoteStore().getAllNotes();
      goto(PageEnum.MAIN);
    }
  };
  const logout = async () => {
    const response = await api.logout();
    if (response !== 200) {
      console.error('Failed to logout')
    }
    goto(PageEnum.LOGIN);
  };
  const checkAuthentication = api.checkAuthentication
  return { user, register, login, logout, checkAuthentication }
})