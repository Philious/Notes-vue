<script setup lang="ts">
import IconButton from '@/components/IconButton.vue';
import { goto } from '@/router/router';
import { useUserStore } from '@/store/userStore';
import { IconEnum, ButtonEnum, PageEnum } from '@/types/enums';
import { ref } from 'vue';

const email = ref<string>('test@test.test');
const password = ref<string>('test1234');
const registerUser = async (email: string, password: string) => {
  const user = await useUserStore().register(email, password);
  if (user) useUserStore().login(email, password);
}
</script>

<template>
  <div class="login-view">
    <h1 class="title">
      Register
    </h1>
    <input
      class="input-field name"
      value="test@test.test"
      placeholder="user name"
      @input="(ev: Event) => email = (ev.target as HTMLInputElement).value"
    />
    <input
      class="input-field password"
      placeholder="password"
      value="test1234"
      @input="(ev: Event) => { password = (ev.target as HTMLInputElement).value }"
    />
    <IconButton
      class="login-btn"
      :type="ButtonEnum.Filled"
      :icon="IconEnum.Right"
      :action="() => registerUser(email, password)"
    />
    <button
      class="vertical txt-btn new"
      @click="() => goto(PageEnum.LOGIN)"
    >
      Back
    </button>
  </div>
</template>

<style scoped lang="scss">
  .login-view {
    box-sizing: border-box;
    display: grid;
    gap: 1rem 0;
    place-content: center;
    width: 100vw;
    height: 100vh;
    padding: 2rem;
    max-width: 20rem;
    margin: auto;
    grid-template-rows: 1fr auto auto auto 1fr min-content;
    grid-template-columns: 3rem 1fr 3.5rem;
    place-items: center start;
    
    .title { grid-area: 2 / 1 / 3 / 2 }
    .name { grid-area: 3 / 1 / 4 / 3; }
    .password { grid-area: 4 / 1 / 5 / 3; }
    .login-btn { grid-area: 4 / 3 / 5 / 4; }
    .new { grid-area: 6 / 1 / 7 / 2; }
    .forgot { grid-area: 6 / 2 / 7 / 3; }
    .google-login { grid-area: 6 / 3 / 7 / 4; }
  }
  .title {
    font-size: 0.875rem;
    font-weight: 400;
  }
  .input-field {
    background-color: var(--n-100);
    border: 0.0625rem solid var(--n-300);
    color: var(--n-500);
    border-radius: 0.125rem;
    padding: 0 1rem;
    height: 2.25rem;
    width: 100%;
    box-sizing: border-box;
  }
  .login-btn { justify-self: end; }
  .txt-btn {
    background-color: transparent;
    border: none;
    color: var(--n-500);
    text-align: left;
    height: 3rem;
    &.new { white-space: nowrap; }
  }
  .vertical {
    transform: rotate(270deg) translateY(100%);
    transform-origin: left bottom;
    align-self: end;
  }
  .google-login {
    height: 3rem;
    width: 3rem;
    object-fit: cover;
    border: none;
    background-color: transparent;
    display: grid;
    place-content: center;
    margin: 2rem auto 0;
    .google-icon {
      height: 3rem;
      width: 3rem;
    }
  }
</style>