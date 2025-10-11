<template>
  <div class="appointment-calendar">
    <q-calendar-month
      v-model="selectedDate"
      animated
      bordered
      class="calendar-wrapper"
    >
      <template #day="{ scope: { timestamp: { date } } }">
        <template v-if="hasAppointment(date)">
          <q-badge
            color="primary"
            floating
            transparent
            class="appointment-indicator"
          >
            {{ getAppointmentCount(date) }}
          </q-badge>
        </template>
      </template>
    </q-calendar-month>

    <!-- Appointments List for Selected Date -->
    <div v-if="selectedDateAppointments.length > 0" class="q-mt-md">
      <div class="text-subtitle1 q-mb-sm">
        Appointments for {{ formatDate(selectedDate) }}
      </div>
      <q-list bordered separator>
        <q-item
          v-for="appointment in selectedDateAppointments"
          :key="appointment.id"
          clickable
          v-ripple
          @click="$emit('view-appointment', appointment)"
        >
          <q-item-section>
            <q-item-label>{{ appointment.doctorName }}</q-item-label>
            <q-item-label caption>
              {{ appointment.time }} - {{ appointment.isOnline ? 'Online' : 'In-person' }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-chip
              :color="getStatusColor(appointment.status)"
              text-color="white"
              size="sm"
              :label="appointment.status"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Appointment } from '../../../types/data';

const props = defineProps<{
  appointments: Appointment[];
}>();

const selectedDate = ref(new Date().toISOString().split('T')[0] as string);

const selectedDateAppointments = computed(() => {
  return props.appointments.filter(apt => apt.date === selectedDate.value);
});

const hasAppointment = (date: string) => {
  return props.appointments.some(apt => apt.date === date);
};

const getAppointmentCount = (date: string) => {
  return props.appointments.filter(apt => apt.date === date).length;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'primary';
    case 'completed':
      return 'positive';
    case 'cancelled':
      return 'negative';
    default:
      return 'grey';
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style scoped>
.appointment-calendar {
  max-width: 800px;
  margin: 0 auto;
}

.calendar-wrapper {
  height: 400px;
}

.appointment-indicator {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>