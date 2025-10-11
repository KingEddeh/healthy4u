<template>
  <q-page>
    <div class="q-pa-md">
      <q-tabs
        v-model="activeTab"
        dense
        align="left"
        class="text-primary"
        active-color="primary"
        indicator-color="primary"
      >
        <q-tab name="history" label="Medical History" icon="history" />
        <q-tab name="prescriptions" label="Prescriptions" icon="medication" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="history">
          <ConsultationHistory
            :consultations="consultations"
            @view-consultation="showConsultationDetail"
          />
        </q-tab-panel>

        <q-tab-panel name="prescriptions">
          <PrescriptionList
            :prescriptions="prescriptions"
          />
        </q-tab-panel>
      </q-tab-panels>

      <!-- Consultation Detail Dialog -->
      <q-dialog v-model="showDetail" maximized>
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Consultation Details</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <ConsultationDetail
              v-if="selectedConsultation"
              :consultation="selectedConsultation"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ConsultationHistory from '../../components/Patient/Consultation/ConsultationHistory.vue';
import ConsultationDetail from '../../components/Patient/Consultation/ConsultationDetail.vue';
import PrescriptionList from '../../components/Patient/Consultation/PrescriptionList.vue';
import type { Consultation } from '../../types/data';

interface Prescription {
  id: string;
  medication: string;
  doctorName: string;
  startDate: string;
  endDate: string;
  instructions: string;
  status: 'active' | 'completed';
  isActive: boolean;
  consultationId: string;
}

const activeTab = ref('history');
const showDetail = ref(false);
const selectedConsultation = ref<Consultation | null>(null);
const consultations = ref<Consultation[]>([]);
const prescriptions = ref<Prescription[]>([]);

const showConsultationDetail = (consultation: Consultation) => {
  selectedConsultation.value = consultation;
  showDetail.value = true;
};

// Mock data - replace with API calls
const fetchConsultations = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  consultations.value = [
    {
      id: '1',
      patientId: 'pat1',
      doctorId: 'doc1',
      doctorName: 'Dr. John Smith',
      date: '2025-10-01',
      diagnosis: 'Common Cold',
      prescription: ['Paracetamol', 'Vitamin C'],
      notes: 'Rest and hydrate well',
      followUpDate: '2025-10-15'
    },
    {
      id: '2',
      patientId: 'pat1',
      doctorId: 'doc2',
      doctorName: 'Dr. Sarah Johnson',
      date: '2025-09-15',
      diagnosis: 'Annual Checkup',
      prescription: [],
      notes: 'All vitals normal'
    }
  ];
};

const fetchPrescriptions = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  prescriptions.value = [
    {
      id: '1',
      medication: 'Paracetamol',
      doctorName: 'Dr. John Smith',
      startDate: '2025-10-01',
      endDate: '2025-10-07',
      instructions: '500mg every 6 hours as needed',
      status: 'active',
      isActive: true,
      consultationId: '1'
    },
    {
      id: '2',
      medication: 'Vitamin C',
      doctorName: 'Dr. John Smith',
      startDate: '2025-10-01',
      endDate: '2025-10-14',
      instructions: '1000mg daily',
      status: 'active',
      isActive: true,
      consultationId: '1'
    }
  ];
};

onMounted(async () => {
  await Promise.all([
    fetchConsultations(),
    fetchPrescriptions()
  ]);
});
</script>