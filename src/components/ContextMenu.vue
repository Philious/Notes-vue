<script setup lang="ts">
import { menuService } from "@/services/contextMenuService";
import { MenuOption } from "@/types/types";

const closeOnclick = (option: MenuOption) => {
  option.action();
  if (!option.stayOpen) menuService.close();
};
</script>

<template>
  <Teleport to="body">
    <Transition
      appear
      name="context-menu"
    >
      <div
        v-if="menuService.menuOptions.value.length"
        
        class="context-container"
      >
        <button
          class="mask"
          @click="menuService.close"
        />
        <div
          class="context-menu"
          :style="menuService.position.value"
        >
          <button
            v-for="option in menuService.menuOptions.value"
            :key="option.label"
            class="option"
            @click="() => closeOnclick(option)"
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
  inset: -3rem 0 0;
}
.context-container {
  z-index: 2;
}
.mask {
  background-color: hsla(0, 0%, 0%, 0.24);
  border: none;
}
.context-menu {
  position: fixed;
  max-width: min(90vw, 20rem);
  border-radius: 0.5rem;
  background-color: var(--n-200);
  margin: auto;
  @include mobile {
    inset: 0;
    top: unset !important;
    bottom: 2rem !important;
  }
}

.option {
  height: 3rem;
  border: none;
  background-color: transparent;
  font-size: 0.875rem;
  width: 100%;
  color: var(--n-700);
  &:not(:last-child) {
    border-bottom: 1px solid var(--n-300);
  }
}

.section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
}

.context-menu-enter-active,
.context-menu-leave-active {
  transition: opacity 0.25s linear;
  .context-menu {
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }
}

.context-menu-enter-from,
.context-menu-leave-to {
  opacity: 0;
  .context-menu {
    transform: translateY(3rem);
  }
}
</style>
