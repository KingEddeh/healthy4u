<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="registration-card" flat>
      <q-card-section>
        <div class="text-h5 text-center">Create Your Account</div>
        <div class="text-subtitle2 text-center">A 2-step registration process</div>
      </q-card-section>

      <q-card-section>
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          animated
          flat
        >
          <q-step
            :name="1"
            title="Account Details"
            icon="person_add"
            :done="step > 1"
          >
            <p class="text-caption">Please provide your personal and login information.</p>
            <q-form @submit.prevent="goToNextStep" class="q-gutter-md">
              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-input
                    filled
                    v-model="formData.firstName"
                    label="First Name *"
                    :lazy-rules="!blurStatus.firstName"
                    :rules="[ val => val && val.length > 0 || 'Please type your first name']"
                    @blur="handleBlur('firstName')"
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input
                    filled
                    v-model="formData.lastName"
                    label="Last Name *"
                    :lazy-rules="!blurStatus.lastName"
                    :rules="[ val => val && val.length > 0 || 'Please type your last name']"
                    @blur="handleBlur('lastName')"
                  />
                </div>
              </div>
              <q-input
                filled
                type="email"
                v-model="formData.email"
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
                type="password"
                v-model="formData.password"
                label="Password *"
                :lazy-rules="!blurStatus.password"
                :rules="[ val => val && val.length >= 8 || 'Password must be at least 8 characters long']"
                @blur="handleBlur('password')"
              />
              <q-input
                filled
                type="password"
                v-model="formData.passwordConfirm"
                label="Confirm Password *"
                :lazy-rules="!blurStatus.passwordConfirm"
                :rules="[
                  val => !!val || 'Please confirm your password',
                  val => val === formData.password || 'Passwords do not match'
                ]"
                @blur="handleBlur('passwordConfirm')"
              />
              <q-stepper-navigation>
                <q-btn type="submit" color="primary" label="Continue" />
              </q-stepper-navigation>
            </q-form>
          </q-step>

          <q-step
            :name="2"
            title="Medical Profile"
            icon="medical_services"
            :done="step > 2"
          >
            <p class="text-caption">This information will help us serve you better. All fields are optional.</p>
            <q-form @submit.prevent="handleRegistration" class="q-gutter-md">
              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-input
                    filled
                    v-model="formData.medicalRecord.date_of_birth"
                    label="Date of Birth"
                    mask="date"
                    :rules="[val => !val || /^\d{4}[-/]\d{2}[-/]\d{2}$/.test(val) || 'Invalid date']"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="formData.medicalRecord.date_of_birth">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-sm-6">
                  <q-select
                    filled
                    v-model="formData.medicalRecord.sex"
                    :options="['male', 'female']"
                    label="Sex"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-input
                    filled
                    type="number"
                    v-model.number="formData.medicalRecord.height_cm"
                    label="Height (cm)"
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input
                    filled
                    type="number"
                    v-model.number="formData.medicalRecord.weight_kg"
                    label="Weight (kg)"
                  />
                </div>
              </div>

              <q-select
                filled
                v-model="formData.medicalRecord.blood_type"
                :options="['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']"
                label="Blood Type"
              />

              <q-input
                filled
                type="textarea"
                v-model="formData.medicalRecord.allergies"
                label="Known Allergies"
              />

              <q-input
                filled
                type="textarea"
                v-model="formData.medicalRecord.current_medications"
                label="Current Medications"
              />
              <q-input
                filled
                type="textarea"
                v-model="formData.medicalRecord.past_medical_history"
                label="Past Medical History"
              />

              <q-stepper-navigation>
                <q-btn type="submit" color="primary" label="Register" />
                <q-btn flat @click="goToPreviousStep" color="primary" label="Back" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-form>

          </q-step>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useQuasar, QStepper } from 'quasar';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router';
import type { RegistrationFormData, UserPayload } from '../types/data';

// Initialize the router instance
const router = useRouter();

// Initialize Quasar's notification plugin
const $q = useQuasar();

// The current step of the stepper. Typed as a number.
const step = ref<number>(1);

// A typed ref for the QStepper component itself for programmatic control
const stepper = ref<QStepper | null>(null);

// A reactive object to hold all form data, typed with our interface
const formData = ref<RegistrationFormData>({
  // From CustomUser model
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  user_type: 'patient',

  // From PatientMedicalRecord model, nested for clarity
  medicalRecord: {
    date_of_birth: '',
    sex: '',
    allergies: '',
    current_medications: '',
    past_medical_history: '',
    family_medical_history: '',
    immunization_history: '',
    blood_type: '',
    height_cm: null,
    weight_kg: null,
  }
});

// Track blur status for each required input field
const blurStatus = reactive({
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  passwordConfirm: false
});

function handleBlur(field: keyof typeof blurStatus) {
  if (!blurStatus[field]) {
    blurStatus[field] = true;
  }
}

/**
 * Handles the final submission of the form.
 * It structures the data and saves it to localStorage.
 */
const handleRegistration = async () => {
  // 1. Structure the final data object based on the UserPayload interface
  const userToSave: UserPayload = {
    id: uuidv4(), // Generate a unique ID for the user
    first_name: formData.value.firstName,
    last_name: formData.value.lastName,
    email: formData.value.email,
    user_type: formData.value.user_type,
    password: formData.value.password, // Save the password for prototype purposes
    // IMPORTANT: In a real app, the password is never saved or returned.
    medical_record: {
      ...formData.value.medicalRecord,
      // Ensure numeric fields are numbers or null
      height_cm: formData.value.medicalRecord.height_cm ? parseFloat(String(formData.value.medicalRecord.height_cm)) : null,
      weight_kg: formData.value.medicalRecord.weight_kg ? parseFloat(String(formData.value.medicalRecord.weight_kg)) : null,
    }
  };

  try {
    // 2. Save the structured data to localStorage
    localStorage.setItem('registeredUser', JSON.stringify(userToSave));
    // Also set as current user (auto-login after registration)
    localStorage.setItem('currentUser', JSON.stringify(userToSave));

    // 3. Show a success notification
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Registration Successful! You are now signed in.'
    });

    // Await the navigation to the home page
    await router.push('/home');
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    // 4. Show an error notification if saving fails
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Could not save registration data. Please try again.'
    });
  }
};

/**
 * Programmatically advances the stepper to the next step.
 * This is a cleaner approach for <script setup>.
 */
const goToNextStep = () => {
  stepper.value?.next();
};

/**
 * Programmatically goes to the previous stepper step.
 */
const goToPreviousStep = () => {
  stepper.value?.previous();
};
</script>

<style scoped>
.registration-card {
  width: 100%;
  max-width: 700px;
}
</style>