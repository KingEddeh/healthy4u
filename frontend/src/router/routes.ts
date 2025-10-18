import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Admin Routes
      {
        path: 'admin',
        name: 'admin-dashboard',
        meta: { showHeader: true, showFooter: true, userType: 'admin' },
        component: () => import('pages/Admin/DashboardPage.vue')
      },
      {
        path: 'admin/system',
        name: 'admin-system',
        meta: { showHeader: true, showFooter: true, userType: 'admin' },
        component: () => import('pages/Admin/SystemManagementPage.vue')
      },
      {
        path: 'admin/patients',
        name: 'admin-patients',
        meta: { showHeader: true, showFooter: true, userType: 'admin' },
        component: () => import('pages/Admin/PatientManagementPage.vue')
      },
      {
        path: 'admin/appointments',
        name: 'admin-appointments',
        meta: { showHeader: true, showFooter: true, userType: 'admin' },
        component: () => import('pages/Admin/AppointmentManagementPage.vue')
      },
      {
        path: 'admin/reports',
        name: 'admin-reports',
        meta: { showHeader: true, showFooter: true, userType: 'admin' },
        component: () => import('pages/Admin/ReportsPage.vue')
      },
      {
        path: 'admin/reviews',
        name: 'admin-reviews',
        meta: { showHeader: true, showFooter: true, userType: 'admin' },
        component: () => import('pages/Admin/ReviewManagementPage.vue')
      },
      {
        path: 'admin/profile',
        name: 'admin-profile',
        meta: { showHeader: true, showFooter: true, userType: 'admin' },
        component: () => import('pages/Admin/ProfilePage.vue')
      },

      // Doctor Routes
      {
        path: 'doctor/dashboard',
        name: 'doctor-dashboard',
        meta: { showHeader: true, showFooter: true, userType: 'doctor' },
        component: () => import('pages/Doctor/DashboardPage.vue')
      },
      {
        path: 'doctor/queue',
        name: 'doctor-queue',
        meta: { showHeader: true, showFooter: true, userType: 'doctor' },
        component: () => import('pages/Doctor/QueuePage.vue')
      },
      {
        path: 'doctor/consultations',
        name: 'doctor-consultations',
        meta: { showHeader: true, showFooter: true, userType: 'doctor' },
        component: () => import('pages/Doctor/ConsultationsPage.vue')
      },
      {
        path: 'doctor/schedule',
        name: 'doctor-schedule',
        meta: { showHeader: true, showFooter: true, userType: 'doctor' },
        component: () => import('pages/Doctor/SchedulePage.vue')
      },
      {
        path: 'doctor/consultation-tools',
        name: 'doctor-consultation-tools',
        meta: { showHeader: true, showFooter: true, userType: 'doctor' },
        component: () => import('pages/Doctor/ConsultationToolsPage.vue')
      },
      {
        path: 'doctor/reviews',
        name: 'doctor-reviews',
        meta: { showHeader: true, showFooter: true, userType: 'doctor' },
        component: () => import('pages/Doctor/ReviewsPage.vue')
      },
      {
        path: 'doctor/appointments',
        name: 'doctor-appointments',
        meta: { showHeader: true, showFooter: true, userType: 'doctor' },
        component: () => import('pages/Doctor/AppointmentsPage.vue')
      },
      {
        path: 'doctor/profile',
        name: 'doctor-profile',
        meta: { showHeader: true, showFooter: true, userType: 'doctor' },
        component: () => import('pages/Doctor/ProfilePage.vue')
      },
      {
        path: '',
        meta: { showHeader: true, showFooter: false },
          component: () => import('pages/Patient/IndexPage.vue')
      },
      {
        path: 'register',
        meta: { showHeader: true, showFooter: false },
        component: () => import('pages/Patient/RegisterPage.vue')
      },
      {
        path: 'signin',
        meta: { showHeader: true, showFooter: false },
        component: () => import('pages/Patient/SignInPage.vue')
      },
      {
        path: 'profile-detail',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/Patient/ProfileDetailPage.vue')
      },
      {
        path: 'home',
        name: 'home',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/Patient/HomePage.vue')
      },
      {
        path: 'documents',
        name: 'documents',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/Patient/DocumentsPage.vue')
      },
      {
        path: 'qr',
        name: 'qr',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/Patient/QRPage.vue')
      },
      {
        path: 'qr-scanner',
        name: 'qr-scanner',
        meta: { showHeader: false, showFooter: false },
        component: () => import('pages/Patient/QRScannerPage.vue')
      },
      {
        path: 'appointments',
        name: 'appointments',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/Patient/AppointmentsPage.vue')
      },
      {
        path: 'chatbot',
        name: 'chatbot',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/Patient/ChatbotPage.vue')
      },
      {
        path: 'profiles',
        name: 'profiles',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/Patient/ProfilesPage.vue')
      },
      {
        path: 'menu',
        name: 'menu',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/Patient/MenuPage.vue')
      },
      {
        path: 'consultations',
        name: 'consultations',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/Patient/ConsultationPage.vue')
      },
      {
        path: 'reviews',
        name: 'reviews',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/Patient/ReviewsPage.vue')
      },
      {
        path: 'health-card',
        name: 'health-card',
        meta: { showHeader: true, showFooter: true },
        component: () => import('pages/Patient/HealthCardPage.vue')
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Patient/ErrorNotFound.vue'),
  },
];

export default routes;
