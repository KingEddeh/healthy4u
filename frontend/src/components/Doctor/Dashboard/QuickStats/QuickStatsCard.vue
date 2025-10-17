<template>
  <q-card class="stats-card">
    <q-card-section>
      <div class="row items-center justify-between">
        <div class="text-h6">Today's Overview</div>
        <q-btn flat round icon="refresh" @click="refreshStats" />
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-12 col-sm-6">
          <stat-item
            label="Patients Seen"
            :value="stats.patientsSeen"
            color="primary"
            icon="person"
            :trend="{ value: 5, direction: 'up' }"
          />
        </div>
        <div class="col-12 col-sm-6">
          <stat-item
            label="Pending Referrals"
            :value="stats.pendingReferrals"
            color="warning"
            icon="sync"
            :trend="{ value: 2, direction: 'down' }"
          />
        </div>
        <div v-if="stats.totalAppointments !== undefined" class="col-12 col-sm-6">
          <stat-item
            label="Total Appointments"
            :value="stats.totalAppointments"
            color="info"
            icon="event"
          />
        </div>
        <div v-if="stats.averageWaitTime" class="col-12 col-sm-6">
          <stat-item
            label="Average Wait Time"
            :value="stats.averageWaitTime"
            color="negative"
            icon="timer"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DailyStats } from '../types';
import StatItem from './StatItem.vue';

// Mock data for MVP
const stats = ref<DailyStats>({
  patientsSeen: 12,
  pendingReferrals: 3,
  totalAppointments: 25,
  averageWaitTime: '15 min'
});

const refreshStats = () => {
  // In real app, fetch fresh stats from backend
  console.log('Refreshing stats...');
};
</script>

<style scoped>
.stats-card {
  height: 100%;
}
</style>