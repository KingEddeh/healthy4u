<template>
  <q-page padding>
    <h2 class="text-h5 q-mb-md">Patient Queue</h2>
    <patient-queue-card class="full-width" />
  </q-page>
</template>

<script setup lang="ts">
import PatientQueueCard from './PatientQueueCard.vue';
</script>