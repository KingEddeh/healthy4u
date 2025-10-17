<template>
  <q-card>
    <q-card-section>
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6">Notifications</div>
        <div class="row q-gutter-sm">
          <q-btn
            flat
            round
            icon="refresh"
            @click="refreshNotifications"
          />
          <q-btn
            v-if="hasUnread"
            flat
            round
            icon="mark_email_read"
            @click="markAllAsRead"
          />
        </div>
      </div>
      <q-list separator>
        <notification-item
          v-for="notification in sortedNotifications"
          :key="notification.id"
          :notification="notification"
          @dismiss="dismissNotification"
        />
        <q-item v-if="!notifications.length">
          <q-item-section class="text-center text-grey">
            No notifications
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions v-if="notifications.length > maxVisible" align="center">
      <q-btn
        flat
        :label="showAll ? 'Show Less' : 'Show More'"
        @click="showAll = !showAll"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Notification } from '../types';
import NotificationItem from './NotificationItem.vue';

const maxVisible = 5;
const showAll = ref(false);

// Mock data for MVP
const notifications = ref<Notification[]>([
  {
    id: 1,
    title: 'Emergency Case',
    message: 'New emergency patient arriving in 5 minutes',
    time: '2 mins ago',
    isUrgent: true,
    icon: 'emergency',
    type: 'emergency',
    action: {
      label: 'View',
      handler: () => console.log('View emergency case')
    }
  },
  {
    id: 2,
    title: 'Lab Results',
    message: 'Lab results ready for Patient #1234',
    time: '10 mins ago',
    isUrgent: false,
    icon: 'science',
    type: 'info'
  },
  {
    id: 3,
    title: 'Medication Review',
    message: 'TB Patient medication review due today',
    time: '1 hour ago',
    isUrgent: false,
    icon: 'medication',
    type: 'warning'
  }
]);

const sortedNotifications = computed(() => {
  const sorted = [...notifications.value].sort((a, b) => {
    // Sort by urgency first
    if (a.isUrgent !== b.isUrgent) {
      return a.isUrgent ? -1 : 1;
    }
    // Then by ID (assuming higher ID means more recent)
    return b.id - a.id;
  });
  return showAll.value ? sorted : sorted.slice(0, maxVisible);
});

const hasUnread = computed(() => {
  return notifications.value.some(n => n.isUrgent);
});

const dismissNotification = (id: number) => {
  notifications.value = notifications.value.filter(n => n.id !== id);
};

const refreshNotifications = () => {
  // In real app, fetch fresh notifications from backend
  console.log('Refreshing notifications...');
};

const markAllAsRead = () => {
  notifications.value = notifications.value.map(n => ({
    ...n,
    isUrgent: false
  }));
};
</script>