import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router'

import MainView from '@/pages/MainPage.vue'
import { PageEnum } from '@/types/enums';
import NewUserPage from '@/pages/NewUserPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import ForgotPage from '@/pages/ForgotPage.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  }, {
    path: '/login',
    name: PageEnum.LOGIN,
    component: LoginPage
  }, {
    path: '/new',
    name: PageEnum.NEW,
    component: NewUserPage
  }, {
    path: '/forgot',
    name: PageEnum.FORGOT,
    component: ForgotPage
  }, {
    path: '/main/:userId?',
    name: PageEnum.MAIN,
    component: MainView,
    props: true
  }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export const goto = (name: PageEnum, params?: Record<string, string>) => {
  router.push({ name, params })
}