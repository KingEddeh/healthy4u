<template>
  <q-dialog v-model="isVisible" persistent>
    <q-card class="login-card">
      <q-card-section>
        <div class="text-h6 text-center">
          <q-icon name="favorite_border" class="text-primary q-mr-sm" />
          Welcome Back to CuraLink
        </div>
        <div class="text-subtitle2 text-center text-grey-7">
          Please sign in to your account
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleLogin" class="q-gutter-md">
          <q-input
            filled
            type="email"
            v-model="loginData.email"
            label="Email Address *"
            :lazy-rules="!blurStatus.email"
            :rules="[
              val => !!val || 'Email is required',
              val => /^.+@.+\..+$/.test(val) || 'Please enter a valid email'
            ]"
            @blur="handleBlur('email')"
          />
          
          <q-input
            filled
            :type="showPassword ? 'text' : 'password'"
            v-model="loginData.password"
            label="Password *"
            :lazy-rules="!blurStatus.password"
            :rules="[ val => val && val.length > 0 || 'Password is required']"
            @blur="handleBlur('password')"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <div class="row justify-between items-center">
            <q-checkbox
              v-model="rememberMe"
              label="Remember me"
              color="primary"
            />
          </div>

          <div class="q-gutter-sm">
            <q-btn
              type="submit"
              color="primary"
              label="Sign In"
              class="full-width"
              :loading="isLoading"
            />
            
            <q-btn
              flat
              color="primary"
              label="Cancel"
              class="full-width"
              @click="closeDialog"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <div class="text-caption text-grey-7">
          Don't have an account? 
          <q-btn
            flat
            no-caps
            color="primary"
            label="Sign up here"
            @click="goToRegister"
            class="q-pa-none"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import type { UserPayload } from './data';

// Props and Emits
interface Props {
  modelValue: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Initialize router and Quasar
const router = useRouter();
const $q = useQuasar();

// Computed property for dialog visibility
const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Form data
const loginData = ref({
  email: '',
  password: ''
});

// UI state
const showPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);

// Track blur status for validation
const blurStatus = reactive({
  email: false,
  password: false
});

function handleBlur(field: keyof typeof blurStatus) {
  if (!blurStatus[field]) {
    blurStatus[field] = true;
  }
}

/**
 * Handles the login process
 */
const handleLogin = async () => {
  isLoading.value = true;
  
  try {
    // Get registered user from localStorage
    const registeredUserData = localStorage.getItem('registeredUser');
    
    if (!registeredUserData) {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'No registered user found. Please register first.'
      });
      return;
    }

    const registeredUser: UserPayload = JSON.parse(registeredUserData);
    
    // Check credentials
    if (registeredUser.email === loginData.value.email && 
        registeredUser.password === loginData.value.password) {
      
      // Set current user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(registeredUser));
      
      // Show success notification
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: `Welcome back, ${registeredUser.first_name}!`
      });

      // Close dialog and navigate to home
      closeDialog();
      await router.push('/home');
      
    } else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'Invalid email or password. Please try again.'
      });
    }
    
  } catch (error) {
    console.error('Login error:', error);
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: 'An error occurred during login. Please try again.'
    });
  } finally {
    isLoading.value = false;
  }
};

/**
 * Close the dialog and reset form
 */
const closeDialog = () => {
  isVisible.value = false;
  // Reset form data
  loginData.value = {
    email: '',
    password: ''
  };
  // Reset blur status
  Object.keys(blurStatus).forEach(key => {
    blurStatus[key as keyof typeof blurStatus] = false;
  });
  showPassword.value = false;
  rememberMe.value = false;
};

/**
 * Navigate to registration page
 */
const goToRegister = async () => {
  closeDialog();
  await router.push('/register');
};
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
}
</style>
