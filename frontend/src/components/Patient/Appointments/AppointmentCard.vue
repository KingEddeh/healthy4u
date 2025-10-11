<template>
  <q-card class="appointment-card cursor-pointer" @click="$emit('click')">
    <q-card-section>
      <div class="row items-center justify-between">
        <div class="text-subtitle1 text-weight-medium">
          Dr. {{ appointment.doctorName }}
        </div>
        <q-chip
          :color="statusColor"
          :label="appointment.status"
          text-color="white"
          size="sm"
        />
      </div>
      <div class="text-caption text-grey-7">{{ appointment.specialization }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="row items-center q-gutter-x-md">
        <div class="col">
          <div class="row items-center">
            <q-icon name="event" size="20px" color="primary" class="q-mr-sm" />
            <span>{{ formattedDate }}</span>
          </div>
        </div>
        <div class="col">
          <div class="row items-center">
            <q-icon name="schedule" size="20px" color="primary" class="q-mr-sm" />
            <span>{{ formattedTime }}</span>
          </div>
        </div>
      </div>
      <div class="row items-center q-mt-sm">
        <q-icon
          :name="appointment.isOnline ? 'video_call' : 'local_hospital'"
          size="20px"
          color="primary"
          class="q-mr-sm"
        />
        <span>{{ appointment.isOnline ? 'Online Consultation' : 'In-person Visit' }}</span>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        v-if="appointment.status === 'scheduled'"
        flat
        color="negative"
        label="Cancel"
        @click.stop="$emit('cancel')"
      />
      <q-btn
        v-if="appointment.status === 'scheduled' && appointment.isOnline"
        flat
        color="primary"
        label="Join"
        icon="video_call"
        @click.stop="$emit('join')"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Appointment } from '../../../types/data';

const props = defineProps<{
  appointment: Appointment;
}>();

defineEmits<{
  (e: 'click'): void;
  (e: 'cancel'): void;
  (e: 'join'): void;
}>();

const statusColor = computed(() => {
  switch (props.appointment.status) {
    case 'scheduled':
      return 'primary';
    case 'completed':
      return 'positive';
    case 'cancelled':
      return 'negative';
    default:
      return 'grey';
  }
});

const formattedDate = computed(() => {
  return new Date(props.appointment.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const formattedTime = computed(() => {
  return props.appointment.time;
});
</script>

<style scoped>
.appointment-card {
  transition: transform 0.2s;
}

.appointment-card:hover {
  transform: translateY(-2px);
}
</style>