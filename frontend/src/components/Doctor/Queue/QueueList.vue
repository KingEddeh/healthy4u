<template>
  <q-card class="q-pa-sm">
    <q-card-section>
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6">Patient Queue</div>
        <div class="row q-gutter-sm">
          <q-btn flat round dense icon="sort">
            <q-menu>
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>Sort by Priority</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Sort by Wait Time</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Sort by Name</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn flat round dense icon="refresh" />
        </div>
      </div>

      <q-list separator>
        <queue-item
          v-for="patient in mockPatients"
          :key="patient.id"
          :patient="patient"
        />
      </q-list>
    </q-card-section>

    <q-card-actions align="center" v-if="mockPatients.length > 5">
      <q-btn flat label="Show More" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { QueuePatient } from './types'
import QueueItem from './QueueItem.vue'

const mockPatients = ref<QueuePatient[]>([
  {
    id: 1,
    name: 'John Doe',
    reason: 'Regular Checkup',
    priority: 'routine',
    waitTime: '15 mins',
    registeredTime: '2024-02-14T10:00:00',
    appointmentType: 'Consultation',
    insuranceVerified: true
  },
  {
    id: 2,
    name: 'Jane Smith',
    reason: 'High Fever',
    priority: 'urgent',
    waitTime: '5 mins',
    registeredTime: '2024-02-14T10:15:00',
    appointmentType: 'Emergency',
    insuranceVerified: true
  },
  {
    id: 3,
    name: 'Robert Johnson',
    reason: 'Chest Pain',
    priority: 'emergency',
    waitTime: '2 mins',
    registeredTime: '2024-02-14T10:20:00',
    appointmentType: 'Emergency',
    insuranceVerified: false
  },
  {
    id: 4,
    name: 'Mary Wilson',
    reason: 'Follow-up',
    priority: 'routine',
    waitTime: '25 mins',
    registeredTime: '2024-02-14T09:50:00',
    appointmentType: 'Follow-up',
    insuranceVerified: true
  },
  {
    id: 5,
    name: 'David Brown',
    reason: 'Skin Rash',
    priority: 'urgent',
    waitTime: '10 mins',
    registeredTime: '2024-02-14T10:10:00',
    appointmentType: 'Walk-in',
    insuranceVerified: true
  }
])
</script>