<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!-- Notifications List -->
      <div class="col-12 col-lg-8">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Notifications</div>
            <q-space />
            <div class="row q-gutter-sm">
              <q-select
                v-model="filter"
                :options="filterOptions"
                label="Filter"
                outlined
                dense
                style="width: 150px"
              />
              <q-btn-group outline>
                <q-btn
                  :color="view === 'all' ? 'primary' : 'grey'"
                  label="All"
                  @click="view = 'all'"
                />
                <q-btn
                  :color="view === 'unread' ? 'primary' : 'grey'"
                  label="Unread"
                  @click="view = 'unread'"
                />
              </q-btn-group>
            </div>
          </q-card-section>

          <q-list separator>
            <q-item
              v-for="notification in filteredNotifications"
              :key="notification.id"
              :class="{ 'bg-grey-1': !notification.read }"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar :color="getTypeColor(notification.type)" text-color="white">
                  <q-icon :name="getTypeIcon(notification.type)" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ notification.title }}</q-item-label>
                <q-item-label caption>{{ notification.message }}</q-item-label>
                <q-item-label caption>{{ notification.timestamp }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="column items-center q-gutter-y-xs">
                  <q-btn
                    flat
                    round
                    :color="notification.read ? 'grey' : 'primary'"
                    :icon="notification.read ? 'drafts' : 'mail'"
                    size="sm"
                    @click.stop="toggleRead(notification)"
                  >
                    <q-tooltip>
                      {{ notification.read ? 'Mark as unread' : 'Mark as read' }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    color="negative"
                    icon="delete"
                    size="sm"
                    @click.stop="deleteNotification(notification)"
                  >
                    <q-tooltip>Delete</q-tooltip>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- Notification Settings -->
      <div class="col-12 col-lg-4">
        <!-- Quick Stats -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Notification Overview</div>
            <div class="row q-col-gutter-sm q-mt-md">
              <div class="col-6">
                <div class="text-center">
                  <div class="text-h4">{{ stats.unread }}</div>
                  <div class="text-caption">Unread</div>
                </div>
              </div>
              <div class="col-6">
                <div class="text-center">
                  <div class="text-h4">{{ stats.total }}</div>
                  <div class="text-caption">Total</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Notification Settings -->
        <q-card>
          <q-card-section>
            <div class="text-h6">Notification Settings</div>
          </q-card-section>

          <q-list>
            <q-item-label header>Email Notifications</q-item-label>

            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>System Alerts</q-item-label>
                <q-item-label caption>Important system updates and alerts</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="settings.systemAlerts" color="primary" />
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>Patient Updates</q-item-label>
                <q-item-label caption>New registrations and profile updates</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="settings.patientUpdates" color="primary" />
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>Report Notifications</q-item-label>
                <q-item-label caption>Daily and weekly report summaries</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="settings.reportNotifications" color="primary" />
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item-label header>Push Notifications</q-item-label>

            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>Urgent Alerts</q-item-label>
                <q-item-label caption>High priority notifications</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="settings.urgentAlerts" color="primary" />
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>Activity Summary</q-item-label>
                <q-item-label caption>Daily activity digest</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="settings.activitySummary" color="primary" />
              </q-item-section>
            </q-item>
          </q-list>

          <q-card-actions align="right" class="q-pa-md">
            <q-btn color="primary" label="Save Settings" @click="saveSettings" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import type { Notification } from '../../types/admin'

const $q = useQuasar()

// State
const view = ref('all')
const filter = ref('all')

// Options
const filterOptions = [
  { label: 'All Types', value: 'all' },
  { label: 'System', value: 'system' },
  { label: 'Patient', value: 'patient' },
  { label: 'Report', value: 'report' },
  { label: 'Alert', value: 'alert' }
]

// Mock data
const notifications = ref<Notification[]>([
  {
    id: 1,
    type: 'alert',
    title: 'Urgent: System Maintenance',
    message: 'System maintenance scheduled for tonight at 11 PM.',
    timestamp: '5 minutes ago',
    read: false
  },
  {
    id: 2,
    type: 'patient',
    title: 'New Patient Registration',
    message: 'Juan Dela Cruz has registered as a new patient.',
    timestamp: '1 hour ago',
    read: true
  },
  {
    id: 3,
    type: 'report',
    title: 'Monthly Report Available',
    message: 'September 2025 activity report is ready for review.',
    timestamp: '2 hours ago',
    read: false
  }
])

const stats = ref({
  unread: 2,
  total: 3
})

const settings = ref({
  systemAlerts: true,
  patientUpdates: true,
  reportNotifications: true,
  urgentAlerts: true,
  activitySummary: false
})

// Computed
const filteredNotifications = computed(() => {
  let filtered = notifications.value

  if (view.value === 'unread') {
    filtered = filtered.filter(n => !n.read)
  }

  if (filter.value !== 'all') {
    filtered = filtered.filter(n => n.type === filter.value)
  }

  return filtered
})

// Handlers
const toggleRead = (notification: Notification) => {
  notification.read = !notification.read
  stats.value.unread = notifications.value.filter(n => !n.read).length
}

const deleteNotification = (notification: Notification) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete this notification?',
    ok: {
      color: 'negative',
      label: 'Delete'
    },
    cancel: true
  }).onOk(() => {
    const index = notifications.value.indexOf(notification)
    if (index > -1) {
      notifications.value.splice(index, 1)
      if (!notification.read) {
        stats.value.unread--
      }
      stats.value.total--
    }
    $q.notify({
      color: 'positive',
      message: 'Notification deleted',
      icon: 'delete'
    })
  })
}

const saveSettings = () => {
  $q.notify({
    color: 'positive',
    message: 'Notification settings saved successfully',
    icon: 'save'
  })
}

// Utility functions
const getTypeColor = (type: string): string => {
  const colors = {
    system: 'primary',
    patient: 'positive',
    report: 'warning',
    alert: 'negative'
  }
  return colors[type as keyof typeof colors] || 'grey'
}

const getTypeIcon = (type: string): string => {
  const icons = {
    system: 'computer',
    patient: 'person',
    report: 'description',
    alert: 'warning'
  }
  return icons[type as keyof typeof icons] || 'notifications'
}
</script>

<style lang="scss" scoped>
.text-h4 {
  font-size: 2rem;
  font-weight: 500;
}

.q-card {
  border-radius: 8px;
}

.notification-unread {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
