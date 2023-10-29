import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue';
import EjemploUno from '../views/EjemploUno.vue';
import EjemploDos from '../views/EjemploDos.vue';

const routes = [
  {
    path: '/',
    redirect: '/tabs/uno',
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: 'uno',
        component: EjemploUno,
      },
      {
        path: 'dos',
        component: EjemploDos,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
