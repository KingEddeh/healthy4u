<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <quick-stats-card />
      </div>
      <div class="col-12 col-md-6">
        <notifications-card />
      </div>
      <div class="col-12 col-md-8">
        <patient-queue-card />
      </div>
      <div class="col-12 col-md-4">
        <appointments-card />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import QuickStatsCard from './QuickStatsCard.vue';
import NotificationsCard from './NotificationsCard.vue';
import PatientQueueCard from './PatientQueueCard.vue';
import AppointmentsCard from './AppointmentsCard.vue';
</script>

<style scoped>
.q-page {
  background-color: #f5f5f5;
}
</style>