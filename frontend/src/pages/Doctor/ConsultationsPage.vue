<template>
  <q-page padding>
    <h2 class="text-h5 q-mb-md">Consultations</h2>
    <div class="row q-col-gutter-md">
      <!-- Mock consultation list for MVP -->
      <div class="col-12">
        <q-list bordered separator>
          <q-item v-for="consultation in consultations" :key="consultation.id" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ consultation.patientName }}</q-item-label>
              <q-item-label caption>{{ consultation.date }} - {{ consultation.diagnosis }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat color="primary" label="View" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mock data for MVP
const consultations = ref([
  {
    id: 1,
    patientName: 'John Doe',
    date: '2025-10-15',
    diagnosis: 'Common Cold'
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    date: '2025-10-15',
    diagnosis: 'Follow-up Check'
  }
]);
</script>