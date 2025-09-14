<template>
  <q-layout view="hHh lpR fFf">

    <q-header v-if="showHeader" bordered class="custom-header-border q-pa-xs" style="background-color: #E1DBCA;">
      <q-toolbar>
        <q-avatar class="glossy" rounded size="35px">
          <img src="../assets/logo.jpg" alt="SiguraDok Logo" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold text-dark" style="font-size: xx-large;">
          <span style="font-family: 'Zain', sans-serif; font-weight: 900; color: black;">Cura</span><span class="text-primary " style="font-family: 'Zain', sans-serif; font-weight: 900;">Link</span>
        </q-toolbar-title>
        <q-btn flat dense round color="black" icon="menu" class="q-ml-auto" @click="drawer = !drawer" />
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

    <q-footer v-if="showFooter" flat class="bg-secondary text-white">
      <q-toolbar class="footer-nav">
        <q-btn round size="lg" color="primary" icon="qr_code_2" class="qr-btn" @click="navigate('qr')" />
        <q-btn flat stack no-caps class="footer-btn" icon="home" :label="$q.screen.width > 350 ? 'Home' : ''" @click="navigate('home')" />
        <q-btn flat stack no-caps class="footer-btn" icon="folder" :label="$q.screen.width > 350 ? 'Documents' : ''" @click="navigate('documents')" />
        <q-btn flat stack no-caps class="footer-btn" icon="people" :label="$q.screen.width > 350 ? 'Profiles' : ''" @click="navigate('profiles')" />
        <q-btn flat stack no-caps class="footer-btn" icon="rate_review" :label="$q.screen.width > 350 ? 'Reviews' : ''" @click="navigateToHospitalReviews" />
        <q-btn flat stack no-caps class="footer-btn" icon="menu" :label="$q.screen.width > 350 ? 'Menu' : ''" @click="navigate('menu')" />
      </q-toolbar>
    </q-footer>
    </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const drawer = ref(false);

const showHeader = computed(() => route.meta.showHeader === true);
const showFooter = computed(() => route.meta.showFooter === true);

/**
 * Navigates to a specific route.
 * @param routeName The name of the route to navigate to.
 */
async function navigate(routeName: string) {
  try {
    await router.push({ name: routeName });
  } catch (error) {
    console.error('Navigation failed:', error);
  }
}

/**
 * Navigates to the hospital reviews page.
 */
function navigateToHospitalReviews() {
  try {
    // For now, show a notification as the feature is coming soon
    $q.notify({
      type: 'info',
      message: 'Hospital Reviews feature coming soon!',
      position: 'top',
      timeout: 2000
    });
    // When the page is ready, use this instead:
    // await router.push('/hospital-reviews');
  } catch (error) {
    console.error('Navigation to hospital reviews failed:', error);
  }
}
</script>

<style lang="scss" scoped>

.custom-header-border {
  border-bottom: 2px solid #f0f0f0 !important;
}

.q-footer { overflow: visible !important; }

.footer-nav {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  gap: 4px;
  min-width: 320px;
  padding: 0 4px;
}

.footer-btn { 
  color: white; 
  font-size: 0.7rem; 
  justify-self: center;
  min-width: 0;
  padding: 8px 4px;
}

.qr-btn {
  transform: translateY(-40%);
  transition: transform 0.2s ease-in-out;
  justify-self: center;
  
  @media (hover: hover) {
    &:hover { transform: translateY(-40%) scale(1.05); }
  }
}

</style>