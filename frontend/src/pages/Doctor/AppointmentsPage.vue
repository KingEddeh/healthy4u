<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!-- Filters & Search -->
      <div class="col-12">
        <appointment-filters
          @filter="handleFilterChange"
        />
      </div>

      <!-- Appointments List -->
      <div class="col-12">
        <appointment-table
          :appointments="filteredAppointments"
          @edit="openEditDialog"
          @update-status="updateStatus"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Appointment, FilterOptions, AppointmentStatus } from '../../components/Doctor/Appointments/types';
import AppointmentFilters from '../../components/Doctor/Appointments/AppointmentFilters.vue';
import AppointmentTable from '../../components/Doctor/Appointments/AppointmentTable.vue';

const filters = ref<FilterOptions>({
  searchText: '',
  status: null,
  date: null
});

// Mock data for MVP
const appointments = ref<Appointment[]>([
  {
    id: 1,
    patientName: 'Maria Garcia',
    date: '2025-10-16',
    time: '09:00 AM',
    type: 'Check-up',
    status: 'completed' as AppointmentStatus,
  },
  {
    id: 2,
    patientName: 'James Wilson',
    date: '2025-10-16',
    time: '10:30 AM',
    type: 'Follow-up',
    status: 'in-progress' as AppointmentStatus,
  },
  {
    id: 3,
    patientName: 'Emily Brown',
    date: '2025-10-16',
    time: '02:00 PM',
    type: 'Consultation',
    status: 'scheduled' as AppointmentStatus,
  }
]);

// Filter appointments based on search and filter criteria
const filteredAppointments = computed(() => {
  return appointments.value.filter((appointment: Appointment) => {
    // Search text filter
    const searchMatch = !filters.value.searchText ||
      appointment.patientName.toLowerCase().includes(filters.value.searchText.toLowerCase());

    // Status filter
    const statusMatch = !filters.value.status ||
      appointment.status === filters.value.status;

    // Date filter
    let dateMatch = true;
    const appointmentDate = new Date(appointment.date);

    if (filters.value.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const weekEnd = new Date(today);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const monthEnd = new Date(today);
      monthEnd.setMonth(monthEnd.getMonth() + 1);

      switch (filters.value.date) {
        case 'today':
          dateMatch = appointmentDate.toDateString() === today.toDateString();
          break;
        case 'tomorrow':
          dateMatch = appointmentDate.toDateString() === tomorrow.toDateString();
          break;
        case 'week':
          dateMatch = appointmentDate >= today && appointmentDate <= weekEnd;
          break;
        case 'month':
          dateMatch = appointmentDate >= today && appointmentDate <= monthEnd;
          break;
      }
    }

    return searchMatch && statusMatch && dateMatch;
  });
});

// Handler for filter changes
const handleFilterChange = (newFilters: FilterOptions) => {
  filters.value = newFilters;
};

// Handler for status updates
const updateStatus = (id: number, newStatus: AppointmentStatus) => {
  const appointment = appointments.value.find((a: Appointment) => a.id === id);
  if (appointment) {
    appointment.status = newStatus;
  }
};

// Handler for edit dialog
const openEditDialog = (appointment: Appointment) => {
  // TODO: Implement edit dialog
  console.log('Edit appointment:', appointment);
};
</script>