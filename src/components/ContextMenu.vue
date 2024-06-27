<script setup lang="ts">
import menuService from '@/services/contextMenuService';

</script>

<template>
  <Teleport to="body">
    <Transition
      name="context-menu"
      appear
    >
      <div
        v-if="menuService.menuOptions?.length"
        class="context-container"
      >
        <button
          class="mask"
          @click="menuService.close"
        ></button>
        <div class="context-menu">
          <button
            v-for="option in menuService.menuOptions"
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
  
  .context-container,
  .mask {
    position: fixed;
    inset: 0;
  }
  .context-container { z-index: 1; }
  .mask {
    background-color: hsla(0, 0%, 0% , 0.24);
    border:none;
  }
  .context-menu {
    position: fixed;
    inset: 0;
    top: unset;
    bottom: 2rem;
    max-width: min(90vw, 20rem);
    border-radius: .5rem;
    background-color: var(--n-200);
    margin: auto;
  }

  .option {
    height: 3rem;
    border: none;
    background-color: transparent;
    font-size: 0.875rem;
    width: 100%;
    color: var(--n-700);
    &:not(:last-child) { border-bottom: 1px solid var(--n-300); }
  }

  .section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
  }

  .context-menu-enter-active,
  .context-menu-leave-active {
    transition: opacity .25s linear;
    .context-menu { transition: transform .5s cubic-bezier(0.22, 1, 0.36, 1); }
  }

  .context-menu-enter-from,
  .context-menu-leave-to {
    opacity: 0;
    .context-menu { transform: translateY(100%); }
  }
</style>