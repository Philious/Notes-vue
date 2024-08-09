<script setup lang="ts">

</script>

<template>
  <Teleport to="body">
    <Transition
      name="common"
      appear
    >
      <span class="content">
        <slot />
      </span>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
  .common-enter-active,
  .common-leave-active {
    transition: opacity .25s linear;
    .content { transition: transform .5s cubic-bezier(0.22, 1, 0.36, 1); }
  }

  .common-enter-from,
  .common-leave-to {
    opacity: 0;
    .content { transform: translateY(100%); }
  }
</style>