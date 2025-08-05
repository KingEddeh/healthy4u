import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Navigation guard to protect routes that require authentication
  Router.beforeEach((to, from, next) => {
    // Routes that require authentication
    const protectedRoutes = ['home', 'documents', 'qr', 'profiles', 'menu'];
    
    // Check if the route requires authentication
    if (protectedRoutes.includes(to.name as string)) {
      // Check if user is logged in
      const currentUser = localStorage.getItem('currentUser');
      
      if (!currentUser) {
        // User is not logged in, redirect to landing page
        next('/');
        return;
      }
    }
    
    // Allow navigation
    next();
  });

  return Router;
});
