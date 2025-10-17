<template>
  <q-card flat bordered>
    <q-table
      :rows="appointments"
      :columns="columns"
      row-key="id"
      :pagination="{ rowsPerPage: 10 }"
    >
      <!-- Status column with colored chips -->
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <AppointmentStatusChip :status="props.value" />
        </q-td>
      </template>

      <!-- Actions column -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <AppointmentActions
            :status="props.row.status"
            @edit="$emit('edit', props.row)"
            @complete="$emit('update-status', props.row.id, 'completed')"
            @cancel="$emit('update-status', props.row.id, 'cancelled')"
          />
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import type { Appointment, AppointmentStatus } from './types';
import AppointmentStatusChip from './AppointmentStatusChip.vue';
import AppointmentActions from './AppointmentActions.vue';

defineProps<{
  appointments: Appointment[];
}>();

defineEmits<{
  (e: 'edit', appointment: Appointment): void;
  (e: 'update-status', id: number, status: AppointmentStatus): void;
}>();

const columns = [
  {
    name: 'patientName',
    required: true,
    label: 'Patient Name',
    align: 'left' as const,
    field: 'patientName',
    sortable: true
  },
  {
    name: 'date',
    required: true,
    label: 'Date',
    align: 'left' as const,
    field: 'date',
    sortable: true
  },
  {
    name: 'time',
    required: true,
    label: 'Time',
    align: 'left' as const,
    field: 'time',
    sortable: true
  },
  {
    name: 'type',
    required: true,
    label: 'Type',
    align: 'left' as const,
    field: 'type',
    sortable: true
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left' as const,
    field: 'status',
    sortable: true
  },
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'center' as const,
    field: 'actions'
  }
];
</script>