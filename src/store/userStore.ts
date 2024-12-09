
import { User } from "@/types/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { api } from "@/api/api";
import { getCookie } from "@/utils/sharedUtils";

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('');
  const loading = ref(true);
  const internalUser = ref<User | null>(null);
  const user = computed(() => internalUser);

  const register = async (email: string, password: string) => {
    loading.value = true;
    const response = await api.createUser(email, password);
    loading.value = false;
    if (response) {
      internalUser.value = response;

      return response;
    }
  };

  const login = async (email: string, password: string) => {
    loading.value = true;
    const response = await api.login(email, password);
    loading.value = false;
    if (response) {
      token.value = response;
    }
  };

  const updatePassword = (email: string) => alert(`Not really sending anything to ${email}`)

  const logout = async () => {
    await api.logout(token.value);
    token.value = '';
  };

  const checkAuthentication = async () => {
    const savedToken = getCookie("note-cookie");

    if (savedToken) {
      loading.value = true;
      const isValid = await api.checkLoginStatus(savedToken);
      loading.value = false;
      if (isValid) token.value = savedToken
    }
  }
  return { user, token, loading, register, login, logout, updatePassword, checkAuthentication }
})