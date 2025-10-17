<template>
  <q-card class="patient-record">
    <q-card-section>
      <div class="text-h6">Patient Record Access</div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-12 col-md-6">
          <q-input
            v-model="search"
            filled
            label="Search Patient"
            dense
            @update:model-value="$emit('search', search)"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
      
      <div v-if="patient" class="q-mt-md">
        <q-list bordered separator>
          <q-item>
            <q-item-section>
              <q-item-label>Allergies</q-item-label>
              <q-item-label caption>{{ patient.allergies.join(', ') || 'None' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Chronic Conditions</q-item-label>
              <q-item-label caption>{{ patient.chronicDiseases.join(', ') || 'None' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="patient.medicalHistory?.length">
            <q-item-section>
              <q-item-label>Recent Medical History</q-item-label>
              <q-item-label caption v-for="history in patient.medicalHistory" :key="history.date">
                {{ history.date }} - {{ history.diagnosis }} (Dr. {{ history.doctor }})
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PatientRecord } from './types';

defineProps<{
  patient: PatientRecord | null;
}>();

defineEmits<{
  (e: 'search', query: string): void;
}>();

const search = ref('');
</script>