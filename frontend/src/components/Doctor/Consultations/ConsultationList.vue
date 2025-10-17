<template>
  <q-list bordered separator>
    <q-item
      v-for="consultation in consultations"
      :key="consultation.id"
      clickable
      v-ripple
      @click="$emit('select', consultation)"
    >
      <q-item-section>
        <q-item-label>{{ consultation.patientName }}</q-item-label>
        <q-item-label caption>{{ consultation.date }} - {{ consultation.diagnosis }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn flat color="primary" label="View" @click.stop="$emit('view', consultation)" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import type { Consultation } from './types';

defineProps<{
  consultations: Consultation[];
}>();

defineEmits<{
  (e: 'select', consultation: Consultation): void;
  (e: 'view', consultation: Consultation): void;
}>();
</script>