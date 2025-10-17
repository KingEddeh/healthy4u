<template>
  <q-item :class="{ 'bg-red-1': notification.isUrgent }">
    <q-item-section avatar>
      <q-avatar :color="getColor" text-color="white">
        <q-icon :name="notification.icon" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ notification.title }}</q-item-label>
      <q-item-label caption>{{ notification.message }}</q-item-label>
      <q-item-label caption>{{ notification.time }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row items-center">
        <q-btn
          v-if="notification.action"
          flat
          dense
          color="primary"
          :label="notification.action.label"
          @click="notification.action.handler"
        />
        <q-btn
          flat
          round
          icon="close"
          @click="$emit('dismiss', notification.id)"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Notification } from '../types';

const props = defineProps<{
  notification: Notification;
}>();

defineEmits<{
  (e: 'dismiss', id: number): void;
}>();

const getColor = computed(() => {
  if (props.notification.isUrgent) return 'negative';
  switch (props.notification.type) {
    case 'warning': return 'warning';
    case 'info': return 'info';
    default: return 'primary';
  }
});
</script>

<style scoped>
.q-item {
  transition: background-color 0.3s ease;
}
</style>