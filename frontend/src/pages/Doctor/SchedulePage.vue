<template>
  <q-page padding>
    <h2 class="text-h5 q-mb-md">My Schedule</h2>
    <div class="row q-col-gutter-md">
      <!-- Mock schedule for MVP -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Today's Schedule</div>
            <q-timeline color="primary">
              <q-timeline-entry
                v-for="appointment in appointments"
                :key="appointment.id"
                :title="appointment.patientName"
                :subtitle="appointment.type"
                :color="getAppointmentColor(appointment.status)"
              >
                <div>{{ appointment.time }}</div>
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Appointment {
  id: number;
  patientName: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

// Mock data for MVP
const appointments = ref<Appointment[]>([
  {
    id: 1,
    patientName: 'Maria Santos',
    time: '09:00 AM',
    type: 'Check-up',
    status: 'completed'
  },
  {
    id: 2,
    patientName: 'Pedro Garcia',
    time: '10:30 AM',
    type: 'Consultation',
    status: 'scheduled'
  },
  {
    id: 3,
    patientName: 'Juan Cruz',
    time: '02:00 PM',
    type: 'Follow-up',
    status: 'scheduled'
  }
]);

const getAppointmentColor = (status: string) => {
  switch (status) {
    case 'completed': return 'positive';
    case 'cancelled': return 'negative';
    default: return 'primary';
  }
};
</script>