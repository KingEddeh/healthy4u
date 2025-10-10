<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- Header Section -->
    <header class="row items-center justify-between q-mb-md">
      <div>
        <p class="q-ma-none text-grey-9 text-body1">Hello,</p>
        <p class="q-ma-none text-h5 text-bold text-black">{{ currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : 'Mark Santos' }}</p>
      </div>
      <q-avatar size="52px" color="primary" text-color="white">
        <q-icon name="person" size="30px" />
      </q-avatar>
    </header>

    <!-- Search Section -->
    <q-input
      outlined
      rounded
      v-model="searchQuery"
      :placeholder="searchPlaceholder"
      class="q-mb-lg"
      bg-color="white"
    >
      <template v-slot:prepend>
        <q-icon name="smart_toy" class="q-ml-sm" />
      </template>
    </q-input>

    <!-- Simulate Card Tap Button -->
    <div class="q-mb-lg flex flex-center">
      <q-btn color="primary" label="Simulate card tap" @click="showSimModal = true" />
    </div>

    <!-- Simulate Card Tap Modal -->
    <q-dialog v-model="showSimModal">
      <q-card style="min-width: 340px; max-width: 95vw;">
        <q-card-section class="row items-center q-pb-none">
          <q-avatar icon="account_circle" color="primary" text-color="white" size="48px" class="q-mr-md" />
          <div>
            <div class="text-h6 text-bold">Account Details</div>
            <div class="text-caption text-grey-7">Simulated card tap</div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-mb-sm"><span class="text-bold">Name:</span> John Doe</div>
          <div class="q-mb-sm"><span class="text-bold">Account #:</span> 1234567890</div>
          <div class="q-mb-sm"><span class="text-bold">Type:</span> Patient</div>
          <div class="q-mb-sm"><span class="text-bold">Email:</span> johndoe@email.com</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Okay" color="primary" v-close-popup />
          <q-btn flat label="Add to records" color="positive" @click="addToRecords" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Main Navigation Grid -->
    <div class="main-nav-grid q-mt-md">
      <q-btn class="grid-btn" color="primary" to="/qr">
        <q-icon name="qr_code" size="24px" />
        <div class="q-mt-sm">My QR/Health Card</div>
      </q-btn>
      
      <q-btn class="grid-btn" color="secondary" to="/appointments/book">
        <q-icon name="event" size="24px" />
        <div class="q-mt-sm">Book Appointment</div>
      </q-btn>

      <q-btn class="grid-btn" color="accent" to="/appointments">
        <q-icon name="calendar_today" size="24px" />
        <div class="q-mt-sm">My Appointments</div>
      </q-btn>

      <q-btn class="grid-btn" color="info" @click="searchQuery = ''">
        <q-icon name="chat" size="24px" />
        <div class="q-mt-sm">Chatbot Assistant</div>
      </q-btn>

      <q-btn class="grid-btn" color="positive" to="/records">
        <q-icon name="folder" size="24px" />
        <div class="q-mt-sm">Medical Records</div>
      </q-btn>

      <q-btn class="grid-btn" color="warning" to="/feedback">
        <q-icon name="star" size="24px" />
        <div class="q-mt-sm">Reviews & Feedback</div>
      </q-btn>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import type { UserPayload, MedicalRecordData } from '../../types/data';

// Current user data
const currentUser = ref<UserPayload | null>(null);
const searchQuery = ref('');
const searchPlaceholder = 'Ask SiguraDoc AI: Describe your symptoms or health questions…';

// Simulate Card Tap Modal
const showSimModal = ref(false);
const $q = useQuasar();

// Add to records handler
const addToRecords = () => {
  $q.notify({
    type: 'positive',
    message: 'Account added to records! (Simulated)',
    timeout: 2000
  });
  showSimModal.value = false;
};

// Helper function to create empty medical record
const createEmptyMedicalRecord = (): MedicalRecordData => ({
  date_of_birth: '',
  sex: '',
  allergies: '',
  current_medications: '',
  past_medical_history: '',
  family_medical_history: '',
  immunization_history: '',
  blood_type: '',
  height_cm: null,
  weight_kg: null
});

// Load current user from localStorage on component mount
onMounted(() => {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    try {
      const parsedUser = JSON.parse(userData);
      currentUser.value = {
        ...parsedUser,
      };
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('currentUser');
      // Set default user data
      currentUser.value = {
        id: 'default',
        first_name: 'Mark',
        last_name: 'Santos',
        email: 'default@example.com',
        password: '',
        user_type: 'patient',
        medical_record: createEmptyMedicalRecord(),
      } as UserPayload;
    }
  } else {
    // Set default user data if no user in localStorage
    currentUser.value = {
      id: 'default',
      first_name: 'Juan',
      last_name: 'Dela Cruz',
      email: 'default@example.com',
      password: '',
      user_type: 'patient',
      medical_record: createEmptyMedicalRecord(),
    } as UserPayload;
  }
});
</script>

<style lang="scss" scoped>
// General Page Styling
.q-page {
  color: #252B5C; // Default dark text color
}

// Main Navigation Grid Styling
.main-nav-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 8px;
}

.grid-btn {
  height: 120px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .q-icon {
    margin-bottom: 8px;
  }

  div {
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.2;
  }
}

// Remove default outline on focus for better visual consistency
.q-field--outlined.q-field--rounded .q-field__control {
  border-radius: 28px;
}

// Mobile-First Design
.q-page {
  padding: 16px !important;
}

.recent-doctor-card {
  width: 140px;
}

// Ensure mobile text is readable
.text-h6 {
  font-size: 1.1rem !important;
}

// Quasar Component Overrides
.q-btn--flat:before {
  background: transparent;
}

.q-card {
  background-color: #FFFFFF;
}

.q-input {
  font-family: 'Roboto', sans-serif;
}
</style>
