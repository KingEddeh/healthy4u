<template>
  <q-layout view="hHh lpR fFf">

    <q-header v-if="showHeader" bordered class="custom-header-border q-pa-xs">
      <q-toolbar>
        <q-avatar class="glossy" rounded size="35px">
          <img src="../assets/logo.jpg" alt="CuraLink Logo" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold">
          CuraLink
        </q-toolbar-title>
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
        <q-item-label header class="text-primary">Navigation</q-item-label>
        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            Landing Page
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/register">
          <q-item-section avatar>
            <q-icon name="person_add" />
          </q-item-section>
          <q-item-section>
            Register
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/signin">
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            Sign In
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/appointments">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>
            Appointments
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/consultations">
          <q-item-section avatar>
            <q-icon name="medical_information" />
          </q-item-section>
          <q-item-section>
            Medical Records
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/reviews">
          <q-item-section avatar>
            <q-icon name="rate_review" />
          </q-item-section>
          <q-item-section>
            Reviews & Feedback
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/health-card">
          <q-item-section avatar>
            <q-icon name="credit_card" />
          </q-item-section>
          <q-item-section>
            Health Card
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/chatbot">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>
            Health Assistant
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/home">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            Home
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/documents">
          <q-item-section avatar>
            <q-icon name="folder" />
          </q-item-section>
          <q-item-section>
            Documents
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/qr">
          <q-item-section avatar>
            <q-icon name="qr_code_2" />
          </q-item-section>
          <q-item-section>
            QR Code
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/qr-scanner">
          <q-item-section avatar>
            <q-icon name="qr_code_scanner" />
          </q-item-section>
          <q-item-section>
            QR Scanner
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/profiles">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            Profiles
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/menu">
          <q-item-section avatar>
            <q-icon name="menu" />
          </q-item-section>
          <q-item-section>
            Menu
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="showFooter" flat class="bg-white text-primary">
      <q-toolbar class="footer-nav">
        <q-btn flat stack no-caps class="footer-btn" icon="home" label="Home" @click="() => router.push('/home')" />
        <q-btn flat stack no-caps class="footer-btn" icon="folder" label="Records" @click="() => router.push('/consultations')" />
        <q-btn flat stack no-caps class="footer-btn" icon="chat" label="Chatbot" @click="() => router.push('/chatbot')" />
        <q-btn flat stack no-caps class="footer-btn" icon="person" label="Profile" @click="() => router.push('/profiles')" />
      </q-toolbar>
    </q-footer>
    </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const drawer = ref(false);

const showHeader = computed(() => route.meta.showHeader === true);
const showFooter = computed(() => route.meta.showFooter === true);



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
