<template>
  <q-page padding>
    <h2 class="text-h5 q-mb-md">Consultation Tools</h2>
    
    <!-- Patient Record Access -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Patient Record Access</div>
        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-12 col-md-6">
            <q-input filled v-model="searchPatient" label="Search Patient" dense>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
        
        <div v-if="selectedPatient" class="q-mt-md">
          <q-list bordered separator>
            <q-item>
              <q-item-section>
                <q-item-label>Allergies</q-item-label>
                <q-item-label caption>{{ selectedPatient.allergies.join(', ') }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Chronic Conditions</q-item-label>
                <q-item-label caption>{{ selectedPatient.chronicDiseases.join(', ') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>

    <!-- Update Records -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Update Records</div>
        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-12 col-md-6">
            <q-input
              v-model="consultation.symptoms"
              filled
              type="textarea"
              label="Symptoms"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="consultation.diagnosis"
              filled
              type="textarea"
              label="Diagnosis"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="consultation.prescription"
              filled
              type="textarea"
              label="Prescription"
            />
          </div>
          <div class="col-12">
            <q-file
              v-model="attachments"
              filled
              multiple
              label="Upload Attachments"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Treatment Notes -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Treatment Notes</div>
        <q-btn color="primary" class="q-mt-sm" icon="print" label="Generate & Print" />
      </q-card-section>
    </q-card>

    <!-- Referral Management -->
    <q-card>
      <q-card-section>
        <div class="text-h6">Referral Management</div>
        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-12 col-md-6">
            <q-select
              v-model="referral.specialist"
              :options="specialistOptions"
              filled
              label="Refer to Specialist"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="referral.reason"
              filled
              type="textarea"
              label="Reason for Referral"
            />
          </div>
          <div class="col-12">
            <q-btn color="primary" icon="qr_code" label="Generate Referral QR" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchPatient = ref('');
const attachments = ref(null);

// Mock patient data for MVP
const selectedPatient = ref({
  name: 'John Doe',
  allergies: ['Penicillin', 'Peanuts'],
  chronicDiseases: ['Hypertension']
});

const consultation = ref({
  symptoms: '',
  diagnosis: '',
  prescription: ''
});

const referral = ref({
  specialist: null,
  reason: ''
});

const specialistOptions = [
  'Cardiologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedic',
  'Dermatologist'
];
</script>