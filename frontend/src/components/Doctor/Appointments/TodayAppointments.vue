<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Today's Appointments</div>
      <q-list separator>
        <q-item v-for="appointment in appointments" :key="appointment.id">
          <q-item-section>
            <q-item-label>{{ appointment.patientName }}</q-item-label>
            <q-item-label caption>{{ appointment.time }}</q-item-label>
            <q-item-label caption>{{ appointment.type }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <AppointmentStatusChip :status="appointment.status" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { Appointment } from './types';
import AppointmentStatusChip from './AppointmentStatusChip.vue';

defineProps<{
  appointments: Appointment[];
}>();
</script>