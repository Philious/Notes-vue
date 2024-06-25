<script setup lang="ts">
import { menuSetup } from '@/services/menuService';

</script>

<template>
  {{ menuSetup.menuOptions }}
  <Teleport to="body">
    <Transition
      name="context-menu"
      appear
      tag="div"
      class="context-menu"
    >
      <div
        v-if="menuSetup.menuOptions?.length"
        class="context-container"
      >
        <button
          class="mask"
          @click="menuSetup.close"
        />
        <div class="context-menu">
          <button
            v-for="option in menuSetup.menuOptions"
            :key="option.label"
            class="option"
            @click="option.action"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
  .mask {
    position: fixed;
    inset: 0;
  }

  .mask {
    border: none;
    padding: 0;
    opacity: 0;
  }

  .context-menu {
    position: fixed;
    inset: 0;
    top: unset;
    border-radius: 1rem 1rem 0 0;
    background-color: var(n-300);
  }

  .option {
    height: 2.5rem;
    border: none;
    background-color: transparent;
    width: 100%;
    color: var(n-700);
  }

  .section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
  }

  .context-menu-enter-active,
  .context-menu-leave-active {
    transition: transform .5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .context-menu-enter-from,
  .context-menu-leave-to {
    transform: translateY(100%);
  }

  .context-menu-container-enter-active,
  .context-menu-container-leave-active {
    transition:
      opacity .15s linear,
  }

  .context-menu-container-enter-from,
  .context-menu-container-leave-to {
    opacity: 0;
  }
</style>