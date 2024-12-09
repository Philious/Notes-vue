<script setup lang="ts">

import IconButton from '@/components/IconButton.vue';
import Button from '@/components/TextButton.vue'
import TextField from '@/components/TextField.vue';
import { useUserStore } from '@/store/userStore';
import { IconEnum, ButtonEnum } from '@/types/enums';
import { InputElement } from '@/types/errorHandlingTypes';
import { multiValidate, emailValidation, passwordValidation } from '@/utils/errorHandling';
import { ref } from 'vue';

enum State {
  Login,
  NewUser,
  Forgot
}

const { login, register, updatePassword} = useUserStore();

const emailRef = ref<InputElement | null>(null);
const passRef = ref<InputElement | null>(null);
const pageState = ref<State>(State.Login);
const email = ref<string>('conny@carneval.com');
const password = ref<string>('1234†');

const action = () => {
  
  const isValid = multiValidate([emailRef.value, passRef.value])
  
  if (!isValid) return;
  if (pageState.value === State.Login) login(email.value, password.value)
  else if (pageState.value === State.NewUser) register(email.value, password.value)
  else if (pageState.value === State.Forgot) updatePassword(email.value)
}
</script>

<template>
  <div class="login-view">
    <TransitionGroup name="title" tag="h1" class="title">
      <span v-if="pageState === State.Login">Login to Notes</span>
      <span v-if="pageState === State.NewUser">Register</span>
      <span v-if="pageState === State.Forgot">Forgot password</span>
    </TransitionGroup>
    <TextField ref="emailRef" class="name" v-model="email" placeholder="user name" :validate="emailValidation"/>
    <Transition name="input">
      <TextField ref="passRef" v-if="pageState !== State.Forgot" class="password" v-model="password" placeholder="password" :validate="passwordValidation"/>
    </Transition>
    <IconButton
      :class="['action-btn', pageState === State.Forgot ? 'update-email-btn' : '']"
      :type="ButtonEnum.Filled"
      :icon="IconEnum.Right"
      :action="action"
    />
    <TransitionGroup name="btn" tag="div" class="buttons">
      <Button v-if="pageState !== State.Login" class="vertical back" :label="'Back'" :onClick="() => pageState = State.Login" :theme="ButtonEnum.Text" />
      <Button  v-if="pageState === State.Login" class="vertical new" :label="'New user'" :onClick="() => pageState = State.NewUser" :theme="ButtonEnum.Text" />
      <Button v-if="pageState === State.Login" class="vertical forgot" :label="`Forgot\npassword`" :onClick="() => pageState = State.Forgot" :theme="ButtonEnum.Text" />
    </TransitionGroup>
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
    grid-template-rows: 1fr repeat(3, min-content) 1fr min-content;
    grid-template-columns: 1fr 3.5rem;
    place-items: center start;
    
    .title { grid-area: 2 / 1 / 3 / 2 }
    .name { grid-area: 3 / 1 / 4 / 2; }
    .password { grid-area: 4 / 1 / 5 / 2; }
    .action-btn { grid-area: 4 / 3 / 5 / 2; }
    .buttons { grid-area: 6 / 1 / 7 / 3; }
    .update-email-btn { transform: translateY(calc(-100% - .75rem)) }
  }
  .title {
    font-size: 0.875rem;
    font-weight: 400;
    white-space: nowrap;
    height: 1.3125rem;
    transform-style: preserve-3d;
    perspective: 40rem;
    span {
      position: absolute;
      transform-origin: 0 .75rem;
    }
  }
  .password,
  .name {
    width: 100%;
  }
  .action-btn { justify-self: end; }
  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 3rem);
    position: relative;
    height: 6rem;
    width: 6rem;
    justify-content: flex-start;
    transform: scale(-1);
    overflow: hidden;
    transform-style: preserve-3d;
    perspective: 40rem;
  }
  .vertical {
    position: absolute;
    writing-mode: vertical-rl;
    transform-origin: top;
    text-align: left;
    height: 6rem;
    top: 0;
    &.back,
    &.new {
      right: -.75rem;
    }
    &.forgot { right: 2.25rem;}
  }

  .action-btn,
  .title-enter-active,
  .title-leave-active,
  .input-enter-active,
  .btn-enter-active,
  .input-leave-active,
  .btn-move,
  .btn-leave-active {
    transition: 1s cubic-bezier(0.22, 1, 0.36, 1);
    transition-property: transform, opacity;
  }

  .title-leave-to,
  .input-enter-from,
  .input-leave-to {
    opacity: 0;
    transform: translateY(50%);
  }

  .title-enter-from,
  .btn-enter-from,
  .btn-leave-to {
    opacity: 0;
    transform: translateY(-50%);
  }
</style>