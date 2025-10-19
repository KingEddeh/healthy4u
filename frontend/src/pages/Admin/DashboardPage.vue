<template>
  <q-page padding>
    <!-- Quick Stats Section -->
    <section class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stats-card">
          <q-card-section>
            <div class="text-h6">Total Patients</div>
            <div class="text-h4">{{ stats.totalPatients }}</div>
            <div class="text-caption text-grey">
              +{{ stats.newPatients }} new this week
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stats-card">
          <q-card-section>
            <div class="text-h6">Today's Appointments</div>
            <div class="text-h4">{{ stats.todayAppointments }}</div>
            <div class="text-caption text-grey">
              {{ stats.completedAppointments }} completed
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stats-card">
          <q-card-section>
            <div class="text-h6">Pending Reports</div>
            <div class="text-h4">{{ stats.pendingReports }}</div>
            <div class="text-caption text-grey">
              {{ stats.urgentReports }} urgent
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stats-card bg-warning" v-if="stats.flaggedCases > 0">
          <q-card-section>
            <div class="text-h6">Flagged Cases</div>
            <div class="text-h4">{{ stats.flaggedCases }}</div>
            <div class="text-caption">
              Requires immediate attention
            </div>
          </q-card-section>
        </q-card>
      </div>
    </section>

    <!-- Quick Actions Section -->
    <section class="q-mb-lg">
      <div class="text-h6 q-mb-md">Quick Actions</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6 col-md-3">
          <q-card clickable @click="handleNavigation('admin-patient-registration')" class="action-card">
            <q-card-section class="text-center">
              <q-icon name="person_add" size="3rem" color="primary" />
              <div class="text-h6 q-mt-sm">Register Patient</div>
              <div class="text-caption text-grey">Add new patient and generate health card</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-card clickable @click="handleNavigation('admin-patient-check-in')" class="action-card">
            <q-card-section class="text-center">
              <q-icon name="qr_code_scanner" size="3rem" color="primary" />
              <div class="text-h6 q-mt-sm">Patient Check-in</div>
              <div class="text-caption text-grey">Scan health card and check in patient</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-card clickable @click="handleNavigation('admin-appointments')" class="action-card">
            <q-card-section class="text-center">
              <q-icon name="event" size="3rem" color="primary" />
              <div class="text-h6 q-mt-sm">Appointments</div>
              <div class="text-caption text-grey">View and manage appointments</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-card clickable @click="handleNavigation('admin-reports')" class="action-card">
            <q-card-section class="text-center">
              <q-icon name="assessment" size="3rem" color="primary" />
              <div class="text-h6 q-mt-sm">Reports</div>
              <div class="text-caption text-grey">Generate and view reports</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Recent Activity & Alerts Section -->
    <div class="row q-col-gutter-md">
      <!-- Recent Activity -->
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section>
            <div class="text-h6">Recent Activity</div>
          </q-card-section>

          <q-list separator>
            <q-item v-for="activity in recentActivity" :key="activity.id">
              <q-item-section avatar>
                <q-icon :name="activity.icon" :color="activity.color" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ activity.message }}</q-item-label>
                <q-item-label caption>{{ activity.timestamp }}</q-item-label>
              </q-item-section>

              <q-item-section side v-if="activity.actionable">
                <q-btn flat round color="primary" icon="chevron_right" />
              </q-item-section>
            </q-item>
          </q-list>

          <q-card-actions align="center">
            <q-btn flat color="primary" label="View All Activity" />
          </q-card-actions>
        </q-card>
      </div>

      <!-- System Alerts -->
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">System Alerts</div>
          </q-card-section>

          <q-list separator>
            <q-item v-for="alert in systemAlerts" :key="alert.id">
              <q-item-section avatar>
                <q-icon :name="alert.icon" :color="alert.severity" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ alert.title }}</q-item-label>
                <q-item-label caption>{{ alert.message }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleNavigation = (routeName: string) => {
  void router.push({ name: routeName })
}

// Mock data - In production, this would come from API/store
const stats = ref({
  totalPatients: 1234,
  newPatients: 45,
  todayAppointments: 28,
  completedAppointments: 12,
  pendingReports: 3,
  urgentReports: 1,
  flaggedCases: 2
})

const recentActivity = ref([
  {
    id: 1,
    message: '3 new patients registered today',
    timestamp: '5 minutes ago',
    icon: 'person_add',
    color: 'primary',
    actionable: true
  },
  {
    id: 2,
    message: 'Dr. Cruz added a new prescription',
    timestamp: '15 minutes ago',
    icon: 'medical_services',
    color: 'positive',
    actionable: false
  },
  {
    id: 3,
    message: 'Monthly report submitted',
    timestamp: '1 hour ago',
    icon: 'description',
    color: 'info',
    actionable: true
  }
])

const systemAlerts = ref([
  {
    id: 1,
    title: 'Urgent Cases',
    message: '2 patients flagged as urgent',
    icon: 'warning',
    severity: 'negative'
  },
  {
    id: 2,
    title: 'System Update',
    message: 'New version available',
    icon: 'system_update',
    severity: 'info'
  }
])
</script>

<style lang="scss" scoped>
.stats-card {
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &.bg-warning {
    background-color: #fff3e0;
    color: #f57c00;
  }
}

.q-card {
  border-radius: 8px;
}

.action-card {
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  .q-icon {
    transition: transform 0.3s;
  }

  &:hover .q-icon {
    transform: scale(1.1);
  }
}
</style>
