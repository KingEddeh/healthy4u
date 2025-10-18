import type { RouteRecordRaw } from 'vue-router';

const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, userType: 'admin' },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('pages/Admin/DashboardPage.vue')
      },
      {
        path: 'patients',
        name: 'admin-patients',
        component: () => import('pages/Admin/PatientManagementPage.vue')
      },
      {
        path: 'appointments',
        name: 'admin-appointments',
        component: () => import('pages/Admin/AppointmentManagementPage.vue')
      },
      {
        path: 'reports',
        name: 'admin-reports',
        component: () => import('pages/Admin/ReportsPage.vue')
      },
      {
        path: 'reviews',
        name: 'admin-reviews',
        component: () => import('pages/Admin/ReviewManagementPage.vue')
      },
      {
        path: 'system',
        name: 'admin-system',
        component: () => import('pages/Admin/SystemManagementPage.vue')
      },
      {
        path: 'profile',
        name: 'admin-profile',
        component: () => import('pages/Admin/ProfilePage.vue')
      }
    ]
  }
];

export default adminRoutes;
