import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router'

import MainView from '@/views/MainPage.vue'
import Login from '@/views/Login.vue'
import { Page } from '@/types/enums';


const routes: Array<RouteRecordRaw> = [
  {
    path: Page.REDIRECT,
    redirect: Page.LOGIN,
  }, {
    path: '/login',
    name: Page.LOGIN,
    component: Login
  }, { 
    path: '/main/:userId?',
    name: Page.MAIN,
    component: MainView,
    props: true
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;

export const goto = (name: Page, params?: Record<string, string>) => {
  router.push({ name, params })
}