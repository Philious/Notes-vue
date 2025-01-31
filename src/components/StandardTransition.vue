<script setup lang="ts"></script>

<template>
  <Transition appear>
    <slot></slot>
  </Transition>
</template>

<style scoped lang="scss">
@include commonTranstition("v", 0.5s);
</style>
