<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="signin-card">
      <!-- Header -->
      <q-card-section>
        <div class="text-h5 text-weight-bold text-dark q-mb-xs">Sign in to your account</div>
        <div class="text-body1 text-grey-7 q-mb-lg">Welcome back! Please sign in to continue</div>
      </q-card-section>

      <!-- Social Auth Buttons -->
      <q-card-section class="q-pa-none q-mb-lg">
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-6">
            <q-btn outline class="full-width q-py-md" color="grey-8" @click="handleSocial('google')">
              <div class="row items-center justify-center q-gutter-x-sm">
                <q-icon name="img:src/assets/google-icon-logo-svgrepo-com.svg" size="20px" />
                <span>Google</span>
              </div>
            </q-btn>
          </div>
          <div class="col-6">
            <q-btn outline class="full-width q-py-md" color="grey-8" @click="handleSocial('github')">
              <div class="row items-center justify-center q-gutter-x-sm">
                <q-icon name="img:src/assets/github-mark.svg" size="20px" />
                <span>GitHub</span>
              </div>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <!-- Divider -->
      <q-card-section class="q-pa-none q-mb-lg">
        <div class="row items-center q-mb-lg">
          <div class="col">
            <q-separator />
          </div>
          <div class="col-auto q-px-md">
            <span class="text-grey-6">or</span>
          </div>
          <div class="col">
            <q-separator />
          </div>
        </div>
      </q-card-section>

      <!-- Email Login Form -->
      <q-card-section>
        <q-form @submit.prevent="handleEmailLogin">
          <div class="text-left text-grey-8 text-weight-medium" style="font-size:14px;">Email address</div>
          <q-input
            filled
            type="email"
            v-model="email"
            id="email-input"
            :rules="[val => !!val || 'Email is required', val => /^.+@.+\..+$/.test(val) || 'Please enter a valid email']"
            style="width:100%;"
            class="q-mb-sm"
          />
          <div class="text-left text-grey-8 text-weight-medium" style="font-size:14px;">Password</div>
           <q-input
            filled
            type="password"
            v-model="password"
            id="password-input"
            :rules="[val => !!val || 'Password is required']"
            style="width:100%;"
            class="q-mb-lg"
          />
          <q-btn
            type="submit"
            color="dark"
            label="Continue"
            icon="arrow_forward"
            class="full-width"
            style="font-weight:bold; border-radius:8px;"
          />
        </q-form>
      </q-card-section>

      <!-- Footer -->
      <q-card-section class="q-pt-lg q-mt-lg" style="border-top:1px solid #E5E7EB;">
        <div class="text-center">
          <span class="text-grey-7" style="font-size:14px;">Don't have an account? </span>
          <q-btn flat no-caps color="primary" class="q-pa-none text-decoration-underline" @click="goToRegister">Sign up</q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();

const email = ref('');
const password = ref('');

function handleSocial(provider: 'google' | 'github') {
  $q.notify({
    color: 'info',
    textColor: 'white',
    icon: 'info',
    message: `Social login with ${provider} is not implemented in prototype.`
  });
}

 async function handleEmailLogin() {
  if (!email.value || !password.value) return;
  // Prototype: just notify and close
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'check_circle',
    message: `Signed in as ${email.value}`,
    position: 'top-right',
  });
  await router.push('/home');
}

async function goToRegister() {
  await router.push('/register');
}
</script>

<style scoped>
.signin-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  text-align: center;
}
</style>
