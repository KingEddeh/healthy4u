<template>
  <div class="appointment-form">
    <q-form @submit="onSubmit">
      <div class="row q-col-gutter-md">
        <!-- Doctor Selection -->
        <div class="col-12">
          <q-select
            v-model="form.doctorId"
            :options="doctorOptions"
            label="Select Doctor *"
            emit-value
            map-options
            :rules="[val => !!val || 'Please select a doctor']"
          />
        </div>

        <!-- Date Selection -->
        <div class="col-12 col-md-6">
          <q-input
            v-model="form.date"
            type="date"
            label="Appointment Date *"
            :rules="[val => !!val || 'Please select a date']"
            :min="minDate"
          />
        </div>

        <!-- Time Selection -->
        <div class="col-12 col-md-6">
          <q-select
            v-model="form.time"
            :options="timeSlots"
            label="Preferred Time *"
            :rules="[val => !!val || 'Please select a time']"
          />
        </div>

        <!-- Consultation Type -->
        <div class="col-12">
          <q-option-group
            v-model="form.isOnline"
            :options="[
              { label: 'In-person Visit', value: false },
              { label: 'Online Consultation', value: true }
            ]"
            color="primary"
            inline
            type="radio"
          />
        </div>

        <!-- Reason for Visit -->
        <div class="col-12">
          <q-input
            v-model="form.reason"
            type="textarea"
            label="Reason for Visit *"
            :rules="[val => !!val || 'Please provide a reason']"
            rows="4"
          />
        </div>

        <!-- Additional Notes -->
        <div class="col-12">
          <q-input
            v-model="form.notes"
            type="textarea"
            label="Additional Notes"
            rows="2"
          />
        </div>

        <!-- Submit Button -->
        <div class="col-12">
          <div class="row justify-end q-gutter-sm">
            <q-btn
              flat
              color="primary"
              label="Cancel"
              @click="$emit('cancel')"
            />
            <q-btn
              type="submit"
              color="primary"
              label="Book Appointment"
              :loading="loading"
            />
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Appointment } from '../../../types/data';

defineProps<{
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit', appointment: Partial<Appointment>): void;
  (e: 'cancel'): void;
}>();

const form = ref({
  doctorId: '',
  date: '',
  time: '',
  reason: '',
  notes: '',
  isOnline: false
});

// Mock doctor options - replace with API data
interface DoctorOption {
  label: string;
  value: string;
  specialization: string;
}

const doctorOptions: DoctorOption[] = [
  {
    label: 'Dr. John Smith - General Medicine',
    value: 'doc1',
    specialization: 'General Medicine'
  },
  {
    label: 'Dr. Sarah Johnson - Pediatrics',
    value: 'doc2',
    specialization: 'Pediatrics'
  },
  {
    label: 'Dr. Michael Chen - Cardiology',
    value: 'doc3',
    specialization: 'Cardiology'
  }
];

// Generate time slots from 9 AM to 5 PM
const timeSlots = Array.from({ length: 17 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9;
  const minute = (i % 2) * 30;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

const onSubmit = () => {
  const selectedDoctor = doctorOptions.find(doc => doc.value === form.value.doctorId);
  const doctorName = selectedDoctor?.label.split(' - ')[0]?.trim() || 'Unknown Doctor';
  
  const appointment: Partial<Appointment> = {
    doctorId: form.value.doctorId,
    doctorName,
    specialization: selectedDoctor?.specialization ?? '',
    date: form.value.date,
    time: form.value.time,
    reason: form.value.reason,
    notes: form.value.notes,
    isOnline: form.value.isOnline,
    status: 'scheduled' as const
  };
  emit('submit', appointment);
};
</script>

<style scoped>
.appointment-form {
  max-width: 800px;
  margin: 0 auto;
}
</style>