<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import night from '@/assets/images/night.png';
import morning from '@/assets/images/morning.png';
import midday from '@/assets/images/midday.png';
import afternoon from '@/assets/images/afternoon.png';
import evening from '@/assets/images/evening.png';
import IconButton from './IconButton.vue';
import { IconEnum, ButtonEnum, PageEnum } from '@/types/enums';
import { userAPI } from '@/api/userAPI';
import { useUserStore } from '@/store/userStore';

const timeOfDay = ref<{ greeting: string, img: any }>({greeting: '', img: ''});
const img = ref('');
const date = ref();
let timeout: NodeJS.Timeout;

const getState = () => {
  date.value = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ;
  const d = new Date().getHours(); 

  timeOfDay.value =  d < 5
    ? { greeting: 'Sleep', img: night }
    : d < 9
    ? { greeting: 'Good Morning', img: morning }
    : d < 12
    ? { greeting: 'Good Day', img: midday }
    : d < 17
    ? { greeting: 'Good Afternoon', img: afternoon }
    : d < 23
    ? { greeting: 'Good Evening', img: evening }
    : { greeting: 'Good Night', img: night };

  img.value = `url(${timeOfDay.value.img})`;
}

const setState = (t: number): NodeJS.Timeout => {
  const timeout = setTimeout(() => getState(), t);
  return timeout;
}

onMounted(() => {
  getState();
  timeout = setState(1000 * 60 * 60)
});

onUnmounted(() => clearTimeout(timeout));

</script>

<template>
  <div class="day">
    <img
      class="img"
      :src="timeOfDay.img"
      alt=""
    />
    <div class="text">
      {{ timeOfDay.greeting }}
    </div>
    <div class="text date">
      {{ date }}
    </div>
    <IconButton
      class="logout"
      :type="ButtonEnum.Default"
      :icon="IconEnum.LogOut"
      :action="() => useUserStore().logout()"
    />
  </div>
</template>

<style scoped lang="scss">
  .day {
    --shadow: drop-shadow(0 0 1px hsla(0, 0%, 0%, .75)) drop-shadow(0 1px 2px hsla(0, 0%, 0%, .5));
    box-sizing: border-box;
    grid-area: var(--day-area);
    height: var(--day-area-height);
    display: grid;
    padding: .5rem 1rem;
    place-content: end start;
    place-items: center start;
    background-image: linear-gradient(180deg,hsla(0, 0%, 0%, 0) 75%, hsl(0, 0%, 0%)), v-bind(img);
    background-size: cover;
    box-shadow: 0 6px 4px -4px #000, 0 12px 8px -8px #000, 0 18px 12px -12px #000, 1px 0 0 var(--n-300);
    color: #fff;
    position: sticky;
    inset: 0 0 auto 0;
    gap: .5rem;
    line-height: 1;
    z-index: 1;
    .img {
      position: absolute;
      inset: 0;
      width: 0%;
      height: 0%;
      mix-blend-mode: hard-light;
      object-fit: cover;
    }
    .text {
      position: relative;
      font-weight: 600;
      font-size: 1rem;
      filter: var(--shadow);
    }
    .date {
      text-transform: uppercase;
      font-weight: 700;
      font-size: .625rem;
    }
    .logout {
      position: absolute;
      top: .5rem;
      right: .5rem;
    }
  }
</style>