<script setup lang="ts">
import StandardTransition from "./StandardTransition.vue";
</script>

<template>
  <Teleport to="body">
    <StandardTransition>
      <slot />
    </StandardTransition>
  </Teleport>
</template>
