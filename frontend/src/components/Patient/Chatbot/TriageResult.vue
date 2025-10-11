<template>
  <q-banner
    rounded
    dense
    :class="{
      'bg-red-1 text-red': level === 'emergency',
      'bg-orange-1 text-orange': level === 'very-urgent',
      'bg-amber-1 text-amber-9': level === 'urgent',
      'bg-green-1 text-green': level === 'routine'
    }"
  >
    <template v-slot:avatar>
      <q-icon
        :name="icon"
        :color="iconColor"
      />
    </template>
    <div class="text-weight-medium">{{ title }}</div>
    <div class="text-caption">{{ message }}</div>

    <template v-slot:action>
      <div class="row q-gutter-sm">
        <q-btn
          v-if="showEmergencyButton"
          flat
          color="red"
          label="Call Emergency"
          @click="handleEmergencyCall"
        />
        <q-btn
          v-if="showBookingButton"
          flat
          :color="actionButtonColor"
          label="Book Appointment"
          @click="$emit('book-appointment')"
        />
      </div>
    </template>
  </q-banner>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  level: 'routine' | 'urgent' | 'very-urgent' | 'emergency';
  message: string;
}>();

const emit = defineEmits<{
  (e: 'book-appointment'): void;
  (e: 'emergency-call'): void;
}>();

const title = computed(() => {
  switch (props.level) {
    case 'emergency':
      return 'Emergency - Seek Immediate Care';
    case 'very-urgent':
      return 'Very Urgent - See Doctor ASAP';
    case 'urgent':
      return 'Urgent - See Doctor Soon';
    case 'routine':
      return 'Routine Care Recommended';
    default:
      return '';
  }
});

const icon = computed(() => {
  switch (props.level) {
    case 'emergency':
      return 'emergency';
    case 'very-urgent':
      return 'warning';
    case 'urgent':
      return 'priority_high';
    case 'routine':
      return 'check_circle';
    default:
      return 'info';
  }
});

const iconColor = computed(() => {
  switch (props.level) {
    case 'emergency':
      return 'red';
    case 'very-urgent':
      return 'orange';
    case 'urgent':
      return 'amber-9';
    case 'routine':
      return 'green';
    default:
      return 'grey';
  }
});

const actionButtonColor = computed(() => {
  switch (props.level) {
    case 'emergency':
      return 'red';
    case 'very-urgent':
      return 'orange';
    case 'urgent':
      return 'amber-9';
    case 'routine':
      return 'green';
    default:
      return 'primary';
  }
});

const showEmergencyButton = computed(() => {
  return props.level === 'emergency';
});

const showBookingButton = computed(() => {
  return props.level !== 'emergency';
});

const handleEmergencyCall = () => {
  emit('emergency-call');
  // In a real application, this could trigger an emergency service call
  window.location.href = 'tel:911';
};
</script>

<style scoped>
.q-banner {
  transition: all 0.3s ease;
}
</style>