<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h4 class="q-mt-none q-mb-sm">Appointments</h4>
        <p class="text-grey-7 q-ma-none">Manage your medical appointments</p>
      </div>
      <div class="row q-gutter-sm">
        <q-btn
          outline
          color="primary"
          icon="event"
          label="Calendar View"
          :class="{ 'bg-primary text-white': view === 'calendar' }"
          @click="view = 'calendar'"
        />
        <q-btn
          outline
          color="primary"
          icon="list"
          label="List View"
          :class="{ 'bg-primary text-white': view === 'list' }"
          @click="view = 'list'"
        />
        <q-btn
          color="primary"
          icon="add"
          label="New Appointment"
          @click="showAppointmentForm = true"
        />
      </div>
    </div>

    <!-- Views -->
    <div v-if="view === 'list'">
      <AppointmentList
        :appointments="appointments"
        @new-appointment="showAppointmentForm = true"
        @view-appointment="handleViewAppointment"
        @cancel-appointment="handleCancelAppointment"
      />
    </div>
    <div v-else>
      <AppointmentCalendar
        :appointments="appointments"
        @view-appointment="handleViewAppointment"
      />
    </div>

    <!-- New Appointment Dialog -->
    <q-dialog v-model="showAppointmentForm" persistent>
      <q-card style="min-width: 350px; width: 100%; max-width: 800px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Book New Appointment</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <AppointmentForm
            :loading="loading"
            @submit="handleCreateAppointment"
            @cancel="showAppointmentForm = false"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- View Appointment Dialog -->
    <q-dialog v-model="showAppointmentDetails" persistent>
      <q-card style="min-width: 350px; width: 100%; max-width: 600px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Appointment Details</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div v-if="selectedAppointment">
            <div class="row q-mb-md">
              <div class="col-12 col-sm-6">
                <div class="text-caption text-grey-7">Doctor</div>
                <div class="text-body1">{{ selectedAppointment.doctorName }}</div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="text-caption text-grey-7">Specialization</div>
                <div class="text-body1">{{ selectedAppointment.specialization }}</div>
              </div>
            </div>

            <div class="row q-mb-md">
              <div class="col-12 col-sm-6">
                <div class="text-caption text-grey-7">Date</div>
                <div class="text-body1">{{ formatDate(selectedAppointment.date) }}</div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="text-caption text-grey-7">Time</div>
                <div class="text-body1">{{ selectedAppointment.time }}</div>
              </div>
            </div>

            <div class="row q-mb-md">
              <div class="col-12">
                <div class="text-caption text-grey-7">Type</div>
                <div class="text-body1">
                  {{ selectedAppointment.isOnline ? 'Online Consultation' : 'In-person Visit' }}
                </div>
              </div>
            </div>

            <div class="row q-mb-md">
              <div class="col-12">
                <div class="text-caption text-grey-7">Reason</div>
                <div class="text-body1">{{ selectedAppointment.reason }}</div>
              </div>
            </div>

            <div v-if="selectedAppointment.notes" class="row q-mb-md">
              <div class="col-12">
                <div class="text-caption text-grey-7">Additional Notes</div>
                <div class="text-body1">{{ selectedAppointment.notes }}</div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-if="selectedAppointment?.status === 'scheduled'"
            flat
            color="negative"
            label="Cancel Appointment"
            @click="handleCancelAppointment(selectedAppointment)"
          />
          <q-btn
            v-if="selectedAppointment?.status === 'scheduled' && selectedAppointment?.isOnline"
            color="primary"
            label="Join Consultation"
            icon="video_call"
            @click="handleJoinConsultation"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import type { Appointment } from '../../types/data';
import { useAppointmentsStore } from '../../stores/appointments-store';
import AppointmentList from '../../components/Patient/Appointments/AppointmentList.vue';
import AppointmentCalendar from '../../components/Patient/Appointments/AppointmentCalendar.vue';
import AppointmentForm from '../../components/Patient/Appointments/AppointmentForm.vue';

const $q = useQuasar();
const view = ref<'list' | 'calendar'>('list');
const appointmentsStore = useAppointmentsStore();

const loading = computed(() => appointmentsStore.loading);
const showAppointmentForm = ref(false);
const showAppointmentDetails = ref(false);
const selectedAppointment = ref<Appointment | null>(null);
const appointments = computed(() => appointmentsStore.appointments);

const handleCreateAppointment = async (appointment: Partial<Appointment>) => {
  try {
    await appointmentsStore.createAppointment(appointment);
    showAppointmentForm.value = false;
    $q.notify({
      type: 'positive',
      message: 'Appointment booked successfully'
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Failed to book appointment'
    });
  }
};

const handleViewAppointment = (appointment: Appointment) => {
  selectedAppointment.value = appointment;
  showAppointmentDetails.value = true;
};

const handleCancelAppointment = async (appointment: Appointment) => {
  try {
    await appointmentsStore.cancelAppointment(appointment.id);
    showAppointmentDetails.value = false;
    $q.notify({
      type: 'positive',
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Failed to cancel appointment'
    });
  }
};

const handleJoinConsultation = () => {
  // Implement video consultation logic
  $q.notify({
    type: 'info',
    message: 'Joining video consultation...'
  });
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(async () => {
  await appointmentsStore.fetchAppointments();
});
</script>