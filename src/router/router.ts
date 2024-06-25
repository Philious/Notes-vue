import { createMemoryHistory, createRouter } from 'vue-router'

import MainView from '@/views/MainPage.vue'
import Login from '@/views/Login.vue'
import LoginRedirect from '@/views/LoginRedirect.vue';
import { getAuthorization } from '@/services/firebase';

const user = getAuthorization();

enum Page {
  LOGIN = 'login',
  REDIRECT = 'login-redirect',
  MAIN = 'main'
}

const routes = [
  {
    path: '/login',
    name: Page.LOGIN,
    component: Login
  },
  { 
    path: '/:userId',
    name: Page.MAIN,
    component: MainView,
    props: true
  },

  {
    path: '/redirect',
    name: Page.REDIRECT,
    component: LoginRedirect
  }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});


router.beforeEach((to, from) => {
  if(to.fullPath === '/') router.push({ name: 'login' });
})