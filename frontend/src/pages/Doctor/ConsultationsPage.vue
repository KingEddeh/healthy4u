<template>
  <q-page padding>
    <h2 class="text-h5 q-mb-md">Consultations</h2>
    <div class="row q-col-gutter-md">
      <!-- Recent Consultations -->
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Recent Consultations</div>
          </q-card-section>
          <consultation-list
            :consultations="consultations"
            @select="selectConsultation"
            @view="viewConsultation"
          />
        </q-card>
      </div>

      <!-- Selected Consultation Details -->
      <div class="col-12 col-md-8">
        <template v-if="selectedConsultation">
          <consultation-card
            :consultation="selectedConsultation"
            @edit="startEditing"
            @print="printConsultation"
            class="q-mb-md"
          />
        </template>
        
        <template v-if="isEditing">
          <!-- Patient Record -->
          <patient-record-section
            :patient="selectedPatient"
            @search="searchPatient"
            class="q-mb-md"
          />

          <!-- Update Form -->
          <consultation-update-form
            :initial-consultation="selectedConsultation || {}"
            @update="updateConsultation"
            @attachments="handleAttachments"
            @save="saveConsultation"
            class="q-mb-md"
          />

          <!-- Treatment Notes -->
          <treatment-notes
            :initial-notes="currentNotes"
            @update="updateNotes"
            @print="printNotes"
            @save="saveNotes"
            class="q-mb-md"
          />

          <!-- Referral Section -->
          <referral-section
            v-if="selectedPatient"
            :patient-name="selectedPatient.name"
            :doctor-name="currentDoctor"
            @update="updateReferral"
            @generate-qr="generateReferralQR"
            @print="printReferral"
          />
        </template>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Consultation, PatientRecord, Referral } from '../../components/Doctor/Consultations/types';
import ConsultationList from '../../components/Doctor/Consultations/ConsultationList.vue';
import ConsultationCard from '../../components/Doctor/Consultations/ConsultationCard.vue';
import PatientRecordSection from '../../components/Doctor/Consultations/PatientRecordSection.vue';
import ConsultationUpdateForm from '../../components/Doctor/Consultations/ConsultationUpdateForm.vue';
import TreatmentNotes from '../../components/Doctor/Consultations/TreatmentNotes.vue';
import ReferralSection from '../../components/Doctor/Consultations/ReferralSection.vue';

// Mock data for MVP
const consultations = ref<Consultation[]>([
  {
    id: 1,
    patientName: 'John Doe',
    date: '2025-10-15',
    diagnosis: 'Common Cold',
    symptoms: 'Fever, runny nose',
    prescription: 'Rest and fluids'
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    date: '2025-10-15',
    diagnosis: 'Follow-up Check',
    symptoms: 'None reported',
    prescription: 'Continue current medication'
  }
]);

const selectedConsultation = ref<Consultation | null>(null);
const selectedPatient = ref<PatientRecord | null>(null);
const isEditing = ref(false);
const currentNotes = ref('');
const currentDoctor = 'Dr. Smith'; // This would come from auth/user context

// Event handlers
const selectConsultation = (consultation: Consultation) => {
  selectedConsultation.value = consultation;
  // In real app, fetch patient record here
  selectedPatient.value = {
    id: 1,
    name: consultation.patientName,
    allergies: ['Penicillin'],
    chronicDiseases: ['Hypertension'],
    medicalHistory: [
      {
        date: '2025-09-15',
        diagnosis: 'Seasonal Allergies',
        prescription: 'Antihistamines',
        doctor: 'Dr. Johnson'
      }
    ]
  };
};

const viewConsultation = (consultation: Consultation) => {
  selectedConsultation.value = consultation;
  isEditing.value = false;
};

const startEditing = () => {
  isEditing.value = true;
};

const searchPatient = (query: string) => {
  console.log('Searching for patient:', query);
  // In real app, implement patient search
};

const updateConsultation = (consultation: Partial<Consultation>) => {
  if (selectedConsultation.value) {
    selectedConsultation.value = { ...selectedConsultation.value, ...consultation };
  }
};

const handleAttachments = (files: File[]) => {
  console.log('Handling attachments:', files);
  // In real app, implement file upload
};

const saveConsultation = () => {
  console.log('Saving consultation:', selectedConsultation.value);
  // In real app, implement save to backend
};

const updateNotes = (notes: string) => {
  currentNotes.value = notes;
};

const printNotes = () => {
  console.log('Printing notes:', currentNotes.value);
  // In real app, implement print functionality
};

const saveNotes = () => {
  console.log('Saving notes:', currentNotes.value);
  // In real app, implement save to backend
};

const updateReferral = (referral: Referral) => {
  console.log('Updating referral:', referral);
  // In real app, implement referral update
};

const generateReferralQR = () => {
  console.log('Generating QR code for referral');
  // In real app, implement QR generation
};

const printReferral = () => {
  console.log('Printing referral');
  // In real app, implement print functionality
};

const printConsultation = () => {
  console.log('Printing consultation:', selectedConsultation.value);
  // In real app, implement print functionality
};
</script>