<template>
  <q-chip
    :color="getStatusColor(status)"
    text-color="white"
    size="sm"
    class="status-chip"
  >
    {{ status }}
  </q-chip>
</template>

<script setup lang="ts">
import type { AppointmentStatus } from './types';
import { getStatusColor } from './types';

defineProps<{
  status: AppointmentStatus;
}>();
</script>

<style scoped>
.status-chip {
  min-width: 80px;
  justify-content: center;
}
</style>