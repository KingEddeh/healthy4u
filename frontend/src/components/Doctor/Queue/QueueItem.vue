<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar>
        <span :class="['priority-badge', `priority-${patient.priority}`]"></span>
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ patient.name }}</q-item-label>
      <q-item-label caption>
        <div class="row items-center">
          <span>{{ patient.reason }}</span>
          <q-separator vertical spaced />
          <span>Wait time: {{ patient.waitTime || 'Just arrived' }}</span>
          <template v-if="patient.appointmentType">
            <q-separator vertical spaced />
            <span>{{ patient.appointmentType }}</span>
          </template>
        </div>
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="row items-center q-gutter-sm">
        <q-btn
          color="primary"
          flat
          label="Start"
          @click="$emit('start', patient.id)"
        />
        <q-btn
          flat
          round
          dense
          icon="more_vert"
        >
          <q-menu>
            <q-list>
              <q-item clickable v-close-popup @click="$emit('view-details', patient)">
                <q-item-section>View Details</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="$emit('update-priority', patient.id)">
                <q-item-section>Update Priority</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="$emit('remove', patient.id)">
                <q-item-section class="text-negative">Remove from Queue</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import type { QueuePatient } from './types';

defineProps<{
  patient: QueuePatient;
}>();

defineEmits<{
  (e: 'start', id: number): void;
  (e: 'view-details', patient: QueuePatient): void;
  (e: 'update-priority', id: number): void;
  (e: 'remove', id: number): void;
}>();
</script>

<style scoped>
.q-item {
  transition: background-color 0.3s ease;
}

.q-separator.vertical {
  height: 12px;
  margin: 0 8px;
}
</style>