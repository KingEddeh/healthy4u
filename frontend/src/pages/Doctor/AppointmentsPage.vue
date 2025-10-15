<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!-- Filters & Search -->
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center q-gutter-sm">
              <q-input
                v-model="searchText"
                dense
                outlined
                placeholder="Search appointments..."
                class="col"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-select
                v-model="filterStatus"
                :options="statusOptions"
                dense
                outlined
                label="Status"
                class="col-2"
              />
              <q-select
                v-model="filterDate"
                :options="dateOptions"
                dense
                outlined
                label="Date"
                class="col-2"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Appointments List -->
      <div class="col-12">
        <q-card flat bordered>
          <q-table
            :rows="filteredAppointments"
            :columns="columns"
            row-key="id"
            :pagination="{ rowsPerPage: 10 }"
          >
            <!-- Status column with colored chips -->
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-chip
                  :color="getStatusColor(props.value)"
                  text-color="white"
                  size="sm"
                >
                  {{ props.value }}
                </q-chip>
              </q-td>
            </template>

            <!-- Actions column -->
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn-group flat>
                  <q-btn
                    flat
                    round
                    dense
                    color="primary"
                    icon="edit"
                    @click="openEditDialog(props.row)"
                  >
                    <q-tooltip>Edit Appointment</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    dense
                    color="positive"
                    icon="check_circle"
                    @click="updateStatus(props.row.id, 'completed')"
                    :disable="props.row.status === 'completed'"
                  >
                    <q-tooltip>Mark as Completed</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    dense
                    color="negative"
                    icon="cancel"
                    @click="updateStatus(props.row.id, 'cancelled')"
                    :disable="props.row.status === 'cancelled'"
                  >
                    <q-tooltip>Cancel Appointment</q-tooltip>
                  </q-btn>
                </q-btn-group>
              </q-td>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
}

const searchText = ref('');
const filterStatus = ref(null);
const filterDate = ref(null);

const statusOptions = [
  { label: 'All', value: null },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'No Show', value: 'no-show' }
];

const dateOptions = [
  { label: 'All', value: null },
  { label: 'Today', value: 'today' },
  { label: 'Tomorrow', value: 'tomorrow' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' }
];

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

// Mock data for MVP
const appointments = ref<Appointment[]>([
  {
    id: 1,
    patientName: 'Maria Garcia',
    date: '2025-10-16',
    time: '09:00 AM',
    type: 'Check-up',
    status: 'completed'
  },
  {
    id: 2,
    patientName: 'James Wilson',
    date: '2025-10-16',
    time: '10:30 AM',
    type: 'Follow-up',
    status: 'in-progress'
  },
  {
    id: 3,
    patientName: 'Emily Brown',
    date: '2025-10-16',
    time: '02:00 PM',
    type: 'Consultation',
    status: 'scheduled'
  },
  {
    id: 4,
    patientName: 'Robert Lee',
    date: '2025-10-17',
    time: '11:30 AM',
    type: 'Check-up',
    status: 'scheduled'
  },
  {
    id: 5,
    patientName: 'Sarah Johnson',
    date: '2025-10-17',
    time: '03:30 PM',
    type: 'Follow-up',
    status: 'scheduled'
  }
]);

const filteredAppointments = computed(() => {
  return appointments.value.filter(appointment => {
    // Apply search filter
    const searchMatch = !searchText.value || 
      appointment.patientName.toLowerCase().includes(searchText.value.toLowerCase());

    // Apply status filter
    const statusMatch = !filterStatus.value || 
      appointment.status === filterStatus.value;

    // Apply date filter (simplified for MVP)
    let dateMatch = true;
    if (filterDate.value) {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      
      switch (filterDate.value) {
        case 'today':
          dateMatch = appointment.date === today;
          break;
        case 'tomorrow':
          dateMatch = appointment.date === tomorrow;
          break;
        // Add more date filtering logic as needed
      }
    }

    return searchMatch && statusMatch && dateMatch;
  });
});

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

const updateStatus = (id: number, newStatus: string) => {
  const appointment = appointments.value.find(a => a.id === id);
  if (appointment) {
    appointment.status = newStatus as Appointment['status'];
  }
};

const openEditDialog = (appointment: Appointment) => {
  // Implement edit dialog functionality
  console.log('Edit appointment:', appointment);
};
</script>

<style scoped>
.q-chip {
  min-width: 80px;
  justify-content: center;
}

.q-table__grid-item-row {
  min-height: 64px;
}

.q-table__title {
  font-size: 1.25rem;
  font-weight: 500;
}
</style>