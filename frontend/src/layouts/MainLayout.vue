<template>
  <q-layout view="hHh lpR fFf">
    <q-header v-if="showHeader" bordered class="custom-header-border q-pa-xs">
      <q-toolbar>
        <q-avatar class="glossy" rounded size="35px">
          <img src="../assets/logo.jpg" alt="CuraLink Logo" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold">CuraLink</q-toolbar-title>
        <div class="row q-gutter-sm">
          <q-btn flat round dense color="white" icon="notifications">
            <q-badge color="red" floating rounded>2</q-badge>
          </q-btn>
          <q-btn flat round dense color="white" icon="menu" @click="drawer = !drawer" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above>
      <p class="text-weight-bold q-ma-md">For Prototype purposes only</p>
      <q-list class="text-grey-8">
        <!-- Auth Pages -->
        <q-item-label header class="text-primary">Authentication</q-item-label>
        <q-item clickable v-ripple :to="{ path: '/' }" exact>
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>Landing Page</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/register' }">
          <q-item-section avatar>
            <q-icon name="person_add" />
          </q-item-section>
          <q-item-section>Register</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/signin' }">
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>Sign In</q-item-section>
        </q-item>

        <!-- Admin Section -->
        <q-separator />
        <q-item-label header class="text-primary">Admin Portal</q-item-label>
        <q-item clickable v-ripple :to="{ path: '/admin' }">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/admin/system' }">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>System Management</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/admin/patients' }">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Patient Management</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/admin/appointments' }">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>Appointment Management</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/admin/reports' }">
          <q-item-section avatar>
            <q-icon name="analytics" />
          </q-item-section>
          <q-item-section>Reports</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/admin/reviews' }">
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>
          <q-item-section>Reviews</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/admin/profile' }">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>Profile</q-item-section>
        </q-item>

        <!-- Doctor Section -->
        <q-separator />
        <q-item-label header class="text-primary">Doctor Portal</q-item-label>
        <q-item clickable v-ripple :to="{ path: '/doctor/dashboard' }">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/doctor/queue' }">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Patient Queue</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/doctor/consultation-tools' }">
          <q-item-section avatar>
            <q-icon name="medical_services" />
          </q-item-section>
          <q-item-section>Consultation Tools</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/doctor/schedule' }">
          <q-item-section avatar>
            <q-icon name="schedule" />
          </q-item-section>
          <q-item-section>Schedule</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/doctor/appointments' }">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>Appointments</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/doctor/reviews' }">
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>
          <q-item-section>Reviews</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/doctor/profile' }">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>Profile</q-item-section>
        </q-item>

        <!-- Patient Section -->
        <q-separator />
        <q-item-label header class="text-primary">Patient Portal</q-item-label>
        <q-item clickable v-ripple :to="{ path: '/home' }">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Patient Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/appointments' }">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>Appointments</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/consultations' }">
          <q-item-section avatar>
            <q-icon name="medical_information" />
          </q-item-section>
          <q-item-section>Medical Records</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/chatbot' }">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>Health Assistant</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/documents' }">
          <q-item-section avatar>
            <q-icon name="folder" />
          </q-item-section>
          <q-item-section>Documents</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ path: '/profiles' }">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>Profile</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="showFooter" class="bg-white text-primary">
      <div class="footer-nav">
        <!-- Admin Navigation -->
        <template v-if="isAdminRoute">
          <q-btn flat stack no-caps class="footer-btn" icon="settings" label="System" :to="{ path: '/admin/system' }" />
          <q-btn flat stack no-caps class="footer-btn" icon="people" label="Patients" :to="{ path: '/admin/patients' }" />
          <q-btn flat stack no-caps class="footer-btn" icon="event" label="Appointments" :to="{ path: '/admin/appointments' }" />
          <q-btn flat stack no-caps class="footer-btn" icon="person" label="Profile" :to="{ path: '/admin/profile' }" />
        </template>

        <!-- Patient Navigation -->
        <template v-else-if="!isDoctorRoute">
          <q-btn flat stack no-caps class="footer-btn" icon="home" label="Home" :to="{ path: '/home' }" />
          <q-btn flat stack no-caps class="footer-btn" icon="folder" label="Records" :to="{ path: '/consultations' }" />
          <q-btn flat stack no-caps class="footer-btn" icon="chat" label="Chatbot" :to="{ path: '/chatbot' }" />
          <q-btn flat stack no-caps class="footer-btn" icon="person" label="Profile" :to="{ path: '/profiles' }" />
        </template>

        <!-- Doctor Navigation -->
        <template v-else>
          <q-btn flat stack no-caps class="footer-btn" icon="dashboard" label="Dashboard" :to="{ path: '/doctor/dashboard' }" />
          <q-btn flat stack no-caps class="footer-btn" icon="people" label="Queue" :to="{ path: '/doctor/queue' }" />
          <q-btn flat stack no-caps class="footer-btn" icon="medical_services" label="Tools" :to="{ path: '/doctor/consultation-tools' }" />
          <q-btn flat stack no-caps class="footer-btn" icon="person" label="Profile" :to="{ path: '/doctor/profile' }" />
        </template>
      </div>
    </q-footer>
  </q-layout>
</template>






<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const drawer = ref(false)

const showHeader = computed(() => route.meta?.showHeader === true)
const showFooter = computed(() => route.meta?.showFooter === true)
const isDoctorRoute = computed(() => route.meta?.userType === 'doctor')
const isAdminRoute = computed(() => route.meta?.userType === 'admin')



</script>

<style lang="scss" scoped>

.custom-header-border {
  border-bottom: 2px solid #f0f0f0 !important;
}

.q-footer { overflow: visible !important; }

.footer-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 4px;
  min-width: 320px;
  padding: 0 4px;
  border-top: 1px solid #f0f0f0;
}

.footer-btn {
  color: var(--q-primary);
  font-size: 0.75rem;
  justify-self: center;
  min-width: 0;
  padding: 8px 4px;

  &.q-btn--active {
    color: var(--q-primary);
    font-weight: 500;
  }
}

</style>
