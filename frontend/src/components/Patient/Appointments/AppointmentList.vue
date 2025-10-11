<template>
  <div class="appointment-list q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <h5 class="q-mt-none q-mb-sm text-h5">My Appointments</h5>
      <q-btn
        color="primary"
        icon="add"
        label="Book Appointment"
        @click="$emit('new-appointment')"
      />
    </div>

    <div class="row q-col-gutter-md">
      <template v-if="appointments.length > 0">
        <div
          v-for="appointment in sortedAppointments"
          :key="appointment.id"
          class="col-12 col-md-6"
        >
          <AppointmentCard
            :appointment="appointment"
            @click="$emit('view-appointment', appointment)"
            @cancel="$emit('cancel-appointment', appointment)"
          />
        </div>
      </template>
      <div v-else class="col-12 text-center q-pa-xl">
        <q-icon name="event_busy" size="48px" color="grey-6" />
        <p class="text-h6 text-grey-6">No appointments scheduled</p>
        <q-btn
          color="primary"
          label="Book your first appointment"
          @click="$emit('new-appointment')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Appointment } from '../../../types/data';
import AppointmentCard from './AppointmentCard.vue';

const props = defineProps<{
  appointments: Appointment[];
}>();

defineEmits<{
  (e: 'new-appointment'): void;
  (e: 'view-appointment', appointment: Appointment): void;
  (e: 'cancel-appointment', appointment: Appointment): void;
}>();

const sortedAppointments = computed(() => {
  return [...props.appointments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
});
</script>

<style scoped>
.appointment-list {
  max-width: 1200px;
  margin: 0 auto;
}
</style>