<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Today's Appointments</div>
      <q-list separator>
        <q-item v-for="appointment in todayAppointments" :key="appointment.id">
          <q-item-section>
            <q-item-label>{{ appointment.patientName }}</q-item-label>
            <q-item-label caption>{{ appointment.time }}</q-item-label>
            <q-item-label caption>{{ appointment.type }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-chip
              :color="getStatusColor(appointment.status)"
              text-color="white"
              size="sm"
            >
              {{ appointment.status }}
            </q-chip>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Appointment {
  id: number;
  patientName: string;
  time: string;
  type: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
}

// Mock data for MVP
const todayAppointments = ref<Appointment[]>([
  {
    id: 1,
    patientName: 'Maria Garcia',
    time: '09:00 AM',
    type: 'Check-up',
    status: 'completed'
  },
  {
    id: 2,
    patientName: 'James Wilson',
    time: '10:30 AM',
    type: 'Follow-up',
    status: 'in-progress'
  },
  {
    id: 3,
    patientName: 'Emily Brown',
    time: '02:00 PM',
    type: 'Consultation',
    status: 'scheduled'
  },
  {
    id: 4,
    patientName: 'Robert Lee',
    time: '11:30 AM',
    type: 'Check-up',
    status: 'no-show'
  }
]);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled': return 'primary';
    case 'in-progress': return 'orange';
    case 'completed': return 'positive';
    case 'cancelled': return 'negative';
    case 'no-show': return 'grey';
    default: return 'grey';
  }
};
</script>

<style scoped>
.q-chip {
  min-width: 80px;
  justify-content: center;
}
</style>