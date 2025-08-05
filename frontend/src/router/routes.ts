import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        meta: { showHeader: true, showFooter: false }, 
        component: () => import('pages/IndexPage.vue') 
      },
      { 
        path: 'register', 
        meta: { showHeader: true, showFooter: false }, 
        component: () => import('pages/RegisterPage.vue') 
      },
      { 
        path: 'home', 
        name: 'home',
        meta: { showHeader: true, showFooter: true }, 
        component: () => import('pages/HomePage.vue') 
      },
      {
        path: 'documents',
        name: 'documents',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/DocumentsPage.vue')
      },
      {
        path: 'qr',
        name: 'qr',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/QRPage.vue')
      },
      {
        path: 'profiles',
        name: 'profiles',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/ProfilesPage.vue')
      },
      {
        path: 'menu',
        name: 'menu',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/MenuPage.vue')
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
