<template>
  <div class="queue-stats">
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-sm-6">
            <div class="text-grey">Total Patients</div>
            <div class="text-h5">{{ stats.totalPatients }}</div>
          </div>
          <div class="col-12 col-sm-6">
            <div class="text-grey">Average Wait Time</div>
            <div class="text-h5">{{ stats.averageWaitTime }}</div>
          </div>
        </div>

        <q-separator class="q-my-md" />

        <div class="text-grey q-mb-sm">By Priority</div>
        <div class="row q-col-gutter-sm">
          <template v-for="(count, priority) in stats.byPriority" :key="priority">
            <div class="col-6 col-sm-3">
              <q-card 
                flat
                :class="[
                  'text-white',
                  'priority-stat',
                  `bg-${priorityConfig[priority as keyof typeof priorityConfig].color}`
                ]"
              >
                <q-card-section class="text-center">
                  <div class="text-h6">{{ count }}</div>
                  <div class="text-caption">
                    {{ priorityConfig[priority as keyof typeof priorityConfig].label }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import type { QueueStats } from './types';
import { priorityConfig } from './types';

defineProps<{
  stats: QueueStats;
}>();

defineEmits<{
  (e: 'refresh'): void;
}>();
</script>

<style lang="scss" scoped>
.priority-stat {
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}
</style>