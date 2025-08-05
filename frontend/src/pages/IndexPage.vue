<template>
  <q-page class="row items-start justify-center q-px-lg q-pt-xl">
    <div class="col">
      <h2 class="text-h3 text-weight-bold">
        Your Health, <span class="text-primary">Simplified.</span>
      </h2>
      <h6 class="text-h6 text-grey-8 text-weight-regular">
        Manage your medical records, find healthcare providers, and take control of your health journey with our comprehensive platform.
      </h6>

      <!-- New User Section -->
      <div>
        <div class="row q-gutter-md items-start q-mb-lg">
          <q-btn outline class="col" color="primary" label="Learn More" to="/about" />
          <q-btn class="col" color="primary" label="Get Started" to="/register" />
        </div>
      </div>
      
      <!-- Existing User Section -->
      <div class="text-center">
        <q-btn
          flat
          no-caps
          color="primary"
          @click="showLoginDialog = true"
          class="q-pa-none text-decoration-underline"
          style="font-size: 1rem; text-align: center;"
        >
          <span class="text-caption text-grey-7">
            Already have an account? <span style="text-decoration:underline;">Sign in</span>
          </span>
        </q-btn>
      </div>

    </div>

    <!-- Login Dialog -->
    <SignIn v-model="showLoginDialog" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SignIn from '../components/SignIn.vue';

// Dialog state
const showLoginDialog = ref(false);
</script>
