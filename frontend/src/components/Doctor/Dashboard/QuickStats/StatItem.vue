<template>
  <q-card :class="['stat-item', `bg-${color || 'primary'}`]" class="text-white">
    <q-card-section>
      <div class="row items-center justify-between">
        <div class="column">
          <div class="text-subtitle2">{{ label }}</div>
          <div class="text-h4">{{ value }}</div>
          <div v-if="trend" class="trend q-mt-sm">
            <q-icon
              :name="getTrendIcon"
              :class="getTrendColor"
            />
            <span class="q-ml-xs">{{ trend.value }}%</span>
          </div>
        </div>
        <q-icon
          v-if="icon"
          :name="icon"
          size="3rem"
          class="q-pr-sm opacity-70"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  label: string;
  value: number | string;
  color?: string;
  icon?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'stable';
  };
}>(), {
  color: 'primary'
});

const getTrendIcon = computed(() => {
  if (!props.trend) return '';
  switch (props.trend.direction) {
    case 'up': return 'trending_up';
    case 'down': return 'trending_down';
    default: return 'trending_flat';
  }
});

const getTrendColor = computed(() => {
  if (!props.trend) return '';
  switch (props.trend.direction) {
    case 'up': return 'text-positive';
    case 'down': return 'text-negative';
    default: return 'text-grey-4';
  }
});
</script>

<style scoped>
.stat-item {
  border-radius: 12px;
  transition: transform 0.2s;
}

.stat-item:hover {
  transform: translateY(-2px);
}

.trend {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
}
</style>