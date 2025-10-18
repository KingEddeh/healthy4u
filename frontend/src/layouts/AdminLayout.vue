<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          CuraLink Admin
        </q-toolbar-title>

        <q-btn-dropdown flat icon="notifications" label="Alerts">
          <q-list>
            <q-item v-for="alert in alerts" :key="alert.id" clickable v-close-popup>
              <q-item-section>
                <q-item-label>{{ alert.title }}</q-item-label>
                <q-item-label caption>{{ alert.message }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown flat icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleProfile">
              <q-item-section>
                <q-item-label>Profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <!-- Navigation Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="240"
      :breakpoint="400"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple to="/admin" exact>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>

          <q-expansion-item
            icon="people"
            label="Patient Management"
            default-opened
          >
            <q-list padding>
              <q-item clickable v-ripple to="/admin/patients">
                <q-item-section avatar>
                  <q-icon name="list" />
                </q-item-section>
                <q-item-section>All Patients</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/admin/patient-registration">
                <q-item-section avatar>
                  <q-icon name="person_add" />
                </q-item-section>
                <q-item-section>Register Patient</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/admin/patient-check-in">
                <q-item-section avatar>
                  <q-icon name="qr_code_scanner" />
                </q-item-section>
                <q-item-section>Patient Check-in</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item clickable v-ripple to="/admin/appointments">
            <q-item-section avatar>
              <q-icon name="event" />
            </q-item-section>
            <q-item-section>Appointments</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/admin/reports">
            <q-item-section avatar>
              <q-icon name="assessment" />
            </q-item-section>
            <q-item-section>Reports & Compliance</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/admin/reviews">
            <q-item-section avatar>
              <q-icon name="rate_review" />
            </q-item-section>
            <q-item-section>Reviews</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/admin/system">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>System Management</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Navigation drawer state
const leftDrawerOpen = ref(false)
const router = useRouter()

// Mock alerts - In production, this would come from a store
const alerts = ref([
  {
    id: 1,
    title: 'Urgent Cases',
    message: '3 new urgent triage cases',
    type: 'urgent'
  },
  {
    id: 2,
    title: 'Report Due',
    message: 'Monthly report due in 2 days',
    type: 'warning'
  }
])

// Navigation handlers
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const handleProfile = async () => {
  await router.push('/admin/profile')
}

const handleLogout = async () => {
  // TODO: Implement logout logic
  await router.push('/login')
}
</script>

<style lang="scss" scoped>
.q-drawer {
  background-color: #f5f5f5;
}

.q-item {
  border-radius: 8px;
  margin: 4px 8px;

  &.q-router-link--active {
    background-color: $primary;
    color: white;

    .q-icon {
      color: white;
    }
  }
}
</style>
