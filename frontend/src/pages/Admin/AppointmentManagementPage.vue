<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!-- Calendar and Appointments Section -->
      <div class="col-12 col-lg-8">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Appointment Calendar</div>
            <q-space />
            <q-btn-group flat>
              <q-btn
                :color="view === 'month' ? 'primary' : 'grey'"
                label="Month"
                @click="view = 'month'"
              />
              <q-btn
                :color="view === 'week' ? 'primary' : 'grey'"
                label="Week"
                @click="view = 'week'"
              />
              <q-btn
                :color="view === 'day' ? 'primary' : 'grey'"
                label="Day"
                @click="view = 'day'"
              />
            </q-btn-group>
          </q-card-section>

          <q-card-section>
            <q-date
              v-model="selectedDate"
              :events="eventDates"
              :event-color="getEventColor"
              class="full-width"
              @update:model-value="handleDateSelect"
            />
          </q-card-section>
        </q-card>

        <!-- Today's Schedule -->
        <q-card class="q-mt-md">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Today's Schedule</div>
            <q-space />
            <q-btn flat color="primary" label="View All" />
          </q-card-section>

          <q-list separator>
            <q-item v-for="appointment in todayAppointments" :key="appointment.id">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ appointment.time.slice(0, 2) }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ appointment.patientName }}</q-item-label>
                <q-item-label caption>
                  {{ appointment.doctorName }} - {{ appointment.service }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-chip
                  :color="getStatusColor(appointment.status)"
                  text-color="white"
                  size="sm"
                >
                  {{ appointment.status }}
                </q-chip>
              </q-item-section>

              <q-item-section side>
                <q-btn-dropdown flat dense>
                  <q-list>
                    <q-item clickable v-close-popup @click="handleEdit(appointment)">
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="handleCancel(appointment)">
                      <q-item-section>Cancel</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- Appointment Details and Actions -->
      <div class="col-12 col-lg-4">
        <!-- Quick Actions -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6 q-mb-md">Quick Actions</div>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-btn
                  class="full-width"
                  color="primary"
                  icon="add"
                  label="New Appointment"
                  @click="showNewAppointmentDialog = true"
                />
              </div>
              <div class="col-6">
                <q-btn
                  class="full-width"
                  color="secondary"
                  icon="schedule"
                  label="Manage Slots"
                  @click="showManageSlotsDialog = true"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Upcoming Appointments -->
        <q-card>
          <q-card-section>
            <div class="text-h6">Upcoming Appointments</div>
          </q-card-section>

          <q-list separator>
            <q-item v-for="appointment in upcomingAppointments" :key="appointment.id">
              <q-item-section>
                <q-item-label>{{ appointment.patientName }}</q-item-label>
                <q-item-label caption>
                  {{ formatDate(appointment.date) }} - {{ appointment.time }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-chip
                  :color="getStatusColor(appointment.status)"
                  text-color="white"
                  size="sm"
                >
                  {{ appointment.status }}
                </q-chip>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- New Appointment Dialog -->
    <q-dialog v-model="showNewAppointmentDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Schedule New Appointment</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="handleNewAppointment" class="q-gutter-md">
            <q-input
              v-model="newAppointment.patientName"
              label="Patient Name"
              :rules="[val => !!val || 'Patient name is required']"
            />

            <q-select
              v-model="newAppointment.doctorName"
              :options="doctors"
              label="Doctor"
              :rules="[val => !!val || 'Doctor is required']"
            />

            <q-select
              v-model="newAppointment.service"
              :options="services"
              label="Service"
              :rules="[val => !!val || 'Service is required']"
            />

            <q-input
              v-model="newAppointment.date"
              label="Date"
              type="date"
              :rules="[val => !!val || 'Date is required']"
            />

            <q-input
              v-model="newAppointment.time"
              label="Time"
              type="time"
              :rules="[val => !!val || 'Time is required']"
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="negative" flat v-close-popup />
              <q-btn label="Schedule" type="submit" color="primary" class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { date } from 'quasar'
import type { Appointment } from '../../types/admin'

const $q = useQuasar()

// State
const view = ref('month')
const selectedDate = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'))
const showNewAppointmentDialog = ref(false)
const showManageSlotsDialog = ref(false)

// Mock data
const eventDates = ['2025/10/18', '2025/10/20', '2025/10/25']
const doctors = ['Dr. Santos', 'Dr. Cruz', 'Dr. Garcia']
const services = ['General Checkup', 'Vaccination', 'Consultation', 'Laboratory']

const todayAppointments = ref<Appointment[]>([
  {
    id: 1,
    patientName: 'Juan Dela Cruz',
    doctorName: 'Dr. Santos',
    service: 'General Checkup',
    date: '2025-10-18',
    time: '09:00',
    status: 'confirmed'
  },
  {
    id: 2,
    patientName: 'Maria Santos',
    doctorName: 'Dr. Cruz',
    service: 'Vaccination',
    date: '2025-10-18',
    time: '10:30',
    status: 'completed'
  }
])

const upcomingAppointments = ref([
  {
    id: 3,
    patientName: 'Pedro Garcia',
    date: '2025/10/20',
    time: '14:00',
    status: 'confirmed'
  },
  {
    id: 4,
    patientName: 'Ana Reyes',
    date: '2025/10/25',
    time: '11:30',
    status: 'pending'
  }
])

const newAppointment = ref({
  patientName: '',
  doctorName: '',
  service: '',
  date: '',
  time: ''
})

// Event handlers
const handleDateSelect = (value: string) => {
  console.log('Selected date:', value)
  // Implement date selection logic
}

const handleEdit = (appointment: Appointment) => {
  console.log('Edit appointment:', appointment)
  // Implement edit logic
}

const handleCancel = (appointment: Appointment) => {
  console.log('Cancel appointment:', appointment)
  // Implement cancellation logic
}

const handleNewAppointment = () => {
  console.log('New appointment:', newAppointment.value)
  showNewAppointmentDialog.value = false
  $q.notify({
    color: 'positive',
    message: 'Appointment scheduled successfully',
    icon: 'event'
  })
}

// Utility functions
const getEventColor = (eventDate: string) => {
  // Get appointments for the given date
  const appointmentsForDate = upcomingAppointments.value.filter(apt => apt.date === eventDate)
  // Return different color based on appointment status or presence
  return appointmentsForDate.length ? 'primary' : 'grey'
}

const getStatusColor = (status: string): string => {
  const colors = {
    confirmed: 'primary',
    completed: 'positive',
    pending: 'warning',
    cancelled: 'negative'
  }
  return colors[status as keyof typeof colors] || 'grey'
}

const formatDate = (dateStr: string): string => {
  return date.formatDate(dateStr, 'MMM D, YYYY')
}
</script>

<style lang="scss" scoped>
.q-date {
  box-shadow: none;
}
</style>
