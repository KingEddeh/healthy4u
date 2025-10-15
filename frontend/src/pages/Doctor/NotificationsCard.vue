<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Notifications</div>
      <q-list separator>
        <q-item v-for="notification in notifications" :key="notification.id" :class="{ 'bg-red-1': notification.isUrgent }">
          <q-item-section avatar>
            <q-avatar :color="notification.isUrgent ? 'negative' : 'primary'" text-color="white">
              <q-icon :name="notification.icon" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ notification.title }}</q-item-label>
            <q-item-label caption>{{ notification.message }}</q-item-label>
            <q-item-label caption>{{ notification.time }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat round icon="close" @click="dismissNotification(notification.id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isUrgent: boolean;
  icon: string;
}

// Mock data for MVP
const notifications = ref<Notification[]>([
  {
    id: 1,
    title: 'Emergency Case',
    message: 'New emergency patient arriving in 5 minutes',
    time: '2 mins ago',
    isUrgent: true,
    icon: 'emergency'
  },
  {
    id: 2,
    title: 'Lab Results',
    message: 'Lab results ready for Patient #1234',
    time: '10 mins ago',
    isUrgent: false,
    icon: 'science'
  },
  {
    id: 3,
    title: 'Medication Review',
    message: 'TB Patient medication review due today',
    time: '1 hour ago',
    isUrgent: false,
    icon: 'medication'
  }
]);

const dismissNotification = (id: number) => {
  notifications.value = notifications.value.filter(n => n.id !== id);
};
</script>

<style scoped>
.q-item {
  transition: background-color 0.3s ease;
}
</style>