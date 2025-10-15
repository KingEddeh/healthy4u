<template>
  <q-card class="stats-card">
    <q-card-section>
      <div class="text-h6">Today's Overview</div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-6">
          <q-card class="stat-item bg-primary text-white">
            <q-card-section>
              <div class="text-subtitle2">Patients Seen</div>
              <div class="text-h4">{{ stats.patientsSeen }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6">
          <q-card class="stat-item bg-warning text-white">
            <q-card-section>
              <div class="text-subtitle2">Pending Referrals</div>
              <div class="text-h4">{{ stats.pendingReferrals }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mock data for MVP
const stats = ref({
  patientsSeen: 12,
  pendingReferrals: 3
});
</script>

<style scoped>
.stats-card {
  height: 100%;
}

.stat-item {
  border-radius: 12px;
}
</style>