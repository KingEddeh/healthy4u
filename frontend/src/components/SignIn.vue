<template>
  <q-dialog v-model="isVisible" persistent>
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
            <q-btn outline class="full-width social-btn" color="grey-8" @click="handleSocial('google')">
              <q-icon name="img:src/assets/google_logo.svg" size="20px" class="q-mr-sm" />
              Google
            </q-btn>
          </div>
          <div class="col-6">
            <q-btn outline class="full-width social-btn" color="grey-8" @click="handleSocial('github')">
              <q-icon name="img:src/assets/github_logo.svg" size="20px" class="q-mr-sm" />
              GitHub
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <!-- Divider -->
      <q-card-section class="q-pa-none q-mb-lg">
        <div class="divider-row">
          <div class="divider-line"></div>
          <span class="divider-text">or</span>
          <div class="divider-line"></div>
        </div>
      </q-card-section>

      <!-- Email Login Form -->
      <q-card-section>
        <q-form @submit.prevent="handleEmailLogin" class="q-gutter-md">
          <div class="text-left text-grey-8 text-weight-medium q-mb-xs" style="font-size:14px;">Email address</div>
          <q-input
            filled
            type="email"
            v-model="email"
            id="email-input"
            :rules="[val => !!val || 'Email is required', val => /^.+@.+\..+$/.test(val) || 'Please enter a valid email']"
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
        <div class="row justify-center items-center q-mt-md" style="font-size:12px; color:#9CA3AF;">
          <span>Secured by</span>
          <q-icon name="img:src/assets/clerk_logo.svg" size="16px" class="q-mx-xs" />
          <a href="https://clerk.com" target="_blank" style="color:#9CA3AF; text-decoration:none;">Clerk</a>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

// Props and Emits
interface Props {
  modelValue: boolean;
}
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const router = useRouter();
const $q = useQuasar();

const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const email = ref('');

function handleSocial(provider: 'google' | 'github') {
  $q.notify({
    color: 'info',
    textColor: 'white',
    icon: provider === 'google' ? 'img:src/assets/google_logo.svg' : 'img:src/assets/github_logo.svg',
    message: `Social login with ${provider} is not implemented in prototype.`
  });
}

function handleEmailLogin() {
  if (!email.value) return;
  // Prototype: just notify and close
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'check_circle',
    message: `Signed in as ${email.value}`
  });
  isVisible.value = false;
}

async function goToRegister() {
  isVisible.value = false;
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
  font-family: 'Roboto', sans-serif;
  text-align: center;
}
.social-btn {
  border-radius: 8px;
  padding: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.divider-row {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  margin-bottom: 24px;
}
.divider-line {
  flex: 1;
  height: 1px;
  background: #E5E7EB;
}
.divider-text {
  margin: 0 12px;
  font-size: 14px;
}
</style>
