<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-accent custom-header-border q-pa-xs">
      <q-toolbar>
        <q-avatar class="glossy" color="primary" text-color="accent" rounded size="35px">
          <q-icon name="favorite_border" size="25px" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold text-dark text-size-md">
          Healthy4U
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

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
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const showFooter = computed(() => route.path !== '/');
</script>

<style scoped>
.custom-header-border {
  border-bottom: 2px solid #f0f0f0 !important; /* Change to your desired color */
}
</style>
