<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <!-- Header -->
        <div class="text-center">
          <q-avatar size="120px" color="primary" text-color="white">
            <q-icon name="person" size="60px" />
          </q-avatar>
          <h4 class="text-h5 q-mb-xs">
            {{ userProfile?.first_name }} {{ userProfile?.last_name }}
          </h4>
          <p class="text-grey-6">{{ userProfile?.email }}</p>
        </div>

        <!-- Personal Information Card -->
        <q-card class="q-mb-lg" flat bordered>
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="person_outline" class="q-mr-sm" />
              Personal Information
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-item-label class="text-grey-7">First Name</q-item-label>
                    <q-item-label class="text-weight-medium">{{ userProfile?.first_name || 'Not provided' }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-12 col-sm-6">
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-item-label class="text-grey-7">Last Name</q-item-label>
                    <q-item-label class="text-weight-medium">{{ userProfile?.last_name || 'Not provided' }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-12">
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-item-label class="text-grey-7">Email</q-item-label>
                    <q-item-label class="text-weight-medium">{{ userProfile?.email || 'Not provided' }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-12">
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-item-label class="text-grey-7">User Type</q-item-label>
                    <q-item-label class="text-weight-medium text-capitalize">{{ userProfile?.user_type || 'Not provided' }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Medical Information Card -->
        <q-card class="q-mb-lg" flat bordered v-if="userProfile?.medical_record">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="medical_services" class="q-mr-sm" />
              Medical Information
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-item-label class="text-grey-7">Date of Birth</q-item-label>
                    <q-item-label class="text-weight-medium">{{ formatDate(userProfile.medical_record.date_of_birth) || 'Not provided' }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-12 col-sm-6">
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-item-label class="text-grey-7">Sex</q-item-label>
                    <q-item-label class="text-weight-medium text-capitalize">{{ userProfile.medical_record.sex || 'Not provided' }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-12 col-sm-6">
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-item-label class="text-grey-7">Height</q-item-label>
                    <q-item-label class="text-weight-medium">{{ formatHeight(userProfile.medical_record.height_cm) || 'Not provided' }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-12 col-sm-6">
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-item-label class="text-grey-7">Weight</q-item-label>
                    <q-item-label class="text-weight-medium">{{ formatWeight(userProfile.medical_record.weight_kg) || 'Not provided' }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-12">
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-item-label class="text-grey-7">Blood Type</q-item-label>
                    <q-item-label class="text-weight-medium">{{ userProfile.medical_record.blood_type || 'Not provided' }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Medical History Cards -->
        <q-card class="q-mb-lg" flat bordered v-if="userProfile?.medical_record">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="history" class="q-mr-sm" />
              Medical History
            </div>
            
            <!-- Allergies -->
            <div class="q-mb-md">
              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label class="text-grey-7">Known Allergies</q-item-label>
                  <q-item-label class="text-weight-medium">
                    {{ userProfile.medical_record.allergies || 'None reported' }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>

            <!-- Current Medications -->
            <div class="q-mb-md">
              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label class="text-grey-7">Current Medications</q-item-label>
                  <q-item-label class="text-weight-medium">
                    {{ userProfile.medical_record.current_medications || 'None reported' }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>

            <!-- Past Medical History -->
            <div class="q-mb-md">
              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label class="text-grey-7">Past Medical History</q-item-label>
                  <q-item-label class="text-weight-medium">
                    {{ userProfile.medical_record.past_medical_history || 'None reported' }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>

            <!-- Family Medical History -->
            <div class="q-mb-md">
              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label class="text-grey-7">Family Medical History</q-item-label>
                  <q-item-label class="text-weight-medium">
                    {{ userProfile.medical_record.family_medical_history || 'None reported' }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>

            <!-- Immunization History -->
            <div>
              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label class="text-grey-7">Immunization History</q-item-label>
                  <q-item-label class="text-weight-medium">
                    {{ userProfile.medical_record.immunization_history || 'None reported' }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-card-section>
        </q-card>

        <!-- Action Buttons -->
        <div class="row q-gutter-sm justify-center">
          <q-btn 
            color="primary" 
            outline 
            icon="edit" 
            label="Edit Profile" 
            @click="editProfile"
          />
          <q-btn 
            color="grey-7" 
            flat 
            icon="arrow_back" 
            label="Back" 
            @click="goBack"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import type { UserPayload } from '../types/data';

const router = useRouter();
const $q = useQuasar();

const userProfile = ref<UserPayload | null>(null);

onMounted(() => {
  loadUserProfile();
});

function loadUserProfile() {
  // For now, load from currentUser in localStorage
  // In a real app, this would come from route params or API call
  const userData = localStorage.getItem('registeredUser');
  if (userData) {
    try {
      userProfile.value = JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: 'Failed to load profile data.'
      });
    }
  } else {
    $q.notify({
      color: 'warning',
      textColor: 'white',
      icon: 'warning',
      message: 'No profile data found.'
    });
  }
}

function formatDate(dateString: string) {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

function formatHeight(height: number | null) {
  if (!height) return null;
  return `${height} cm`;
}

function formatWeight(weight: number | null) {
  if (!weight) return null;
  return `${weight} kg`;
}

function editProfile() {
  $q.notify({
    color: 'info',
    textColor: 'white',
    icon: 'info',
    message: 'Edit profile feature coming soon!'
  });
}

function goBack() {
  router.go(-1);
}
</script>

<style scoped>
.q-card {
  border-radius: 12px;
}

.q-item-label {
  word-break: break-word;
}
</style>
