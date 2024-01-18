import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import FirstPage from '../components/FirstPage.vue'
import SecondPage from '../components/SecondPage.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: FirstPage },
  { path: '/secondPage', component: SecondPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;