import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import DetailsLivre from '../views/Total/DetailsLivre.vue';
import AboutView from '../views/Total/addLivre.vue';
import Home from '../views/Total/Home.vue';
import loginPage from '../views/Total/loginPage.vue';
import BookList from '../views/Partial/BookList.vue';


const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/DetailsLivre',
      name: 'DetailsLivre',
      component: DetailsLivre
    },
    {
      path: '/addLivre',
      name: 'addLivre',
      component: AboutView
    },
    {
      path: '/login',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/books',
      name: 'BookList',
      component: BookList
    }
  ]
});

export default router;