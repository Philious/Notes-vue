<script setup lang="ts"></script>

<template>
  <div
    v-scroll="{ start: 0, current: 0, end: 0, btnWidth: 0, trackWidth: 0 , removeMouseDown: () => {}, removeMouseMove: () => {}, removeMouseUp: () => {} }"
    class="container"
  >
    <div class="content"></div>
  </div>
</template>

<style scoped lang="scss">

.container {
  display: flex;
  flex-direction: column;
  width:50vw;
  height: 50vh;
  min-height: 300px;
  background: darkolivegreen;
  overflow: auto;
  // overflow:hidden;

}
.content {
  height: 100%;
  width: 1024px;
  background: linear-gradient(
    90deg, 
    #fff 2px, 
    red 2px,
    red 25%,
    yellow, 25%,
    yellow 50%,
    green 50%,
    green 75%,
    blue 75%,
    blue calc(100% - 2px),
    #fff 2px
    );

}

</style>