<template>
  <q-btn-group flat>
    <q-btn
      flat
      round
      dense
      color="primary"
      icon="edit"
      @click="$emit('edit')"
    >
      <q-tooltip>Edit Appointment</q-tooltip>
    </q-btn>
    <q-btn
      flat
      round
      dense
      color="positive"
      icon="check_circle"
      @click="$emit('complete')"
      :disable="status === 'completed'"
    >
      <q-tooltip>Mark as Completed</q-tooltip>
    </q-btn>
    <q-btn
      flat
      round
      dense
      color="negative"
      icon="cancel"
      @click="$emit('cancel')"
      :disable="status === 'cancelled'"
    >
      <q-tooltip>Cancel Appointment</q-tooltip>
    </q-btn>
  </q-btn-group>
</template>

<script setup lang="ts">
import type { AppointmentStatus } from './types';

defineProps<{
  status: AppointmentStatus;
}>();

defineEmits<{
  (e: 'edit'): void;
  (e: 'complete'): void;
  (e: 'cancel'): void;
}>();
</script>