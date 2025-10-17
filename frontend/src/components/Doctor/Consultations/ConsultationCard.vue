<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ consultation.patientName }}</div>
      <div class="text-subtitle2">{{ consultation.date }}</div>
    </q-card-section>

    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <div class="text-weight-medium">Diagnosis</div>
          <div>{{ consultation.diagnosis }}</div>
        </div>

        <template v-if="consultation.symptoms">
          <div class="col-12">
            <div class="text-weight-medium">Symptoms</div>
            <div>{{ consultation.symptoms }}</div>
          </div>
        </template>

        <template v-if="consultation.prescription">
          <div class="col-12">
            <div class="text-weight-medium">Prescription</div>
            <div>{{ consultation.prescription }}</div>
          </div>
        </template>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Edit" @click="$emit('edit')" />
      <q-btn flat color="primary" label="Print" @click="$emit('print')" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import type { Consultation } from './types';

defineProps<{
  consultation: Consultation;
}>();

defineEmits<{
  (e: 'edit'): void;
  (e: 'print'): void;
}>();
</script>