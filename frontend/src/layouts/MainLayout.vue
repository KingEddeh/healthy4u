<template>
  <q-layout view="hHh lpR fFf">

    <q-header v-if="showHeader" bordered class="bg-accent custom-header-border q-pa-xs">
      <q-toolbar>
        <q-avatar class="glossy" color="primary" text-color="accent" rounded size="35px">
          <q-icon name="favorite_border" size="25px" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold text-dark text-size-md">
          Cura<span class="text-primary">Link</span> <span class="text-grey-3">PROTOTYPE V1.0</span>
        </q-toolbar-title>
        <q-btn flat dense round color="black" icon="menu" class="q-ml-auto" @click="drawer = !drawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above>
      <p class="text-weight-bold q-ma-md">For Prototype purposes only</p>
      <q-list class="text-grey-8">
        <q-item clickable v-ripple to="/" exact>
          <q-item-section>
            Landing Page
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/register">
          <q-item-section>
            Register
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/home">
          <q-item-section>
            Home
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="showFooter" reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const drawer = ref(false);

  // This computed property will be `true` only if the route's meta field is set to true
  const showHeader = computed(() => route.meta.showHeader === true);
  const showFooter = computed(() => route.meta.showFooter === true);
</script>

<style scoped>
.custom-header-border {
  border-bottom: 2px solid #f0f0f0 !important; /* Change to your desired color */
}
</style>
