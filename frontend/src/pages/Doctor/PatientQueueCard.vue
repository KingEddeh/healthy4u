<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Patient Queue</div>
      <q-list separator>
        <q-item v-for="patient in queue" :key="patient.id" :class="priorityClass(patient.priority)">
          <q-item-section avatar>
            <q-avatar>
              <q-icon :name="priorityIcon(patient.priority)" :color="priorityColor(patient.priority)" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ patient.name }}</q-item-label>
            <q-item-label caption>{{ patient.reason }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn color="primary" flat label="Start" @click="startConsultation(patient.id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Patient {
  id: number;
  name: string;
  reason: string;
  priority: 'routine' | 'urgent' | 'very-urgent' | 'emergency';
}

// Mock data for MVP
const queue = ref<Patient[]>([
  { id: 1, name: 'John Doe', reason: 'Regular check-up', priority: 'routine' },
  { id: 2, name: 'Jane Smith', reason: 'Severe headache', priority: 'urgent' },
  { id: 3, name: 'Mike Johnson', reason: 'High fever', priority: 'very-urgent' },
  { id: 4, name: 'Sarah Williams', reason: 'Follow-up', priority: 'routine' },
]);

const priorityClass = (priority: string) => {
  switch (priority) {
    case 'emergency': return 'bg-red-1';
    case 'very-urgent': return 'bg-orange-1';
    case 'urgent': return 'bg-yellow-1';
    default: return '';
  }
};

const priorityIcon = (priority: string) => {
  switch (priority) {
    case 'emergency': return 'emergency';
    case 'very-urgent': return 'warning';
    case 'urgent': return 'priority_high';
    default: return 'schedule';
  }
};

const priorityColor = (priority: string) => {
  switch (priority) {
    case 'emergency': return 'negative';
    case 'very-urgent': return 'orange';
    case 'urgent': return 'warning';
    default: return 'grey';
  }
};

const startConsultation = (patientId: number) => {
  // TODO: Implement consultation start logic
  console.log('Starting consultation for patient:', patientId);
};
</script>

<style scoped>
.q-item {
  transition: background-color 0.3s ease;
}
</style>