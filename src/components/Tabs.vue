<script setup lang="ts">
import { Tab } from '@/types/types';
import { computed, ref } from 'vue';

const props = defineProps<{
  tabs: Tab[];
  activeTab: string;
}>();

const items = ref();
const activeLine = computed(() => {
  let xPosition = '0px';
  items.value.forEach((el: HTMLElement) => {
    if(el.classList.contains(props.activeTab)) xPosition = el.getBoundingClientRect().left + 'px';
  });
  return xPosition;
});

</script>

<template>
  <ul class="tab-list">
    <li
      v-for="tab in props.tabs"
      ref="items"
      :key="tab.label"
      :class="['tab-container', { 'active': props.activeTab === tab.id }, tab.id]"
      @click="tab.action"
    >
      <div class="tab">
        <img
          class="icon"
          :src="tab.icon"
        />
        <div class="label">
          {{ tab.label }}
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .tab-list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0;
    margin: 0;
    list-style-type: none;
    gap: 1.5rem;
    height: var(--main-tab-bar-height);
    position: relative;
    &:before {
      content: "";
      background-color: #fff;
      height: 0.125rem;
      width: var(--main-tab-bar-height);
      position: absolute;
      border-radius: 0 0 1rem 1rem;
      top: 0;
      left: 0;
      transition: transform .25s $easeOutQuint;
      transform: translateX(v-bind(activeLine));
    }
  }
  .tab-container {
    height: var(--main-tab-bar-height);
    width: var(--main-tab-bar-height);
    display: grid;
    place-content: center;
    padding-top: 2px;
  }
  .tab {
    display: grid;
    width: 3rem;
    height: 3rem;
    place-items: center;
    gap: .25rem;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .label {
    text-align: center;
    font-size: .625rem;
    font-weight: 500;
    line-height: 1;
    height: 1.25rem;
    //white-space: nowrap;
  }
</style>