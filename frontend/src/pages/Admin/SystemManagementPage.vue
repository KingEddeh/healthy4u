<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!-- User Role Management -->
      <div class="col-12 col-lg-8">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">User Management</div>
            <q-space />
            <q-btn color="primary" icon="person_add" label="Add User" @click="showAddUserDialog = true" />
          </q-card-section>

          <q-card-section>
            <q-table
              :rows="users"
              :columns="columns"
              row-key="id"
              :filter="filter"
              :pagination="pagination"
              @update:pagination="updatePagination"
            >
              <!-- Search -->
              <template v-slot:top-right>
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search users..."
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>

              <!-- Role Column -->
              <template v-slot:body-cell-role="props">
                <q-td :props="props">
                  <q-chip
                    :color="getRoleColor(props.row.role)"
                    text-color="white"
                    size="sm"
                  >
                    {{ props.row.role }}
                  </q-chip>
                </q-td>
              </template>

              <!-- Status Column -->
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-chip
                    :color="getStatusColor(props.row.status)"
                    text-color="white"
                    size="sm"
                  >
                    {{ props.row.status }}
                  </q-chip>
                </q-td>
              </template>

              <!-- Actions Column -->
              <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="q-gutter-sm">
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="edit"
                    size="sm"
                    @click="handleEditUser(props.row)"
                  >
                    <q-tooltip>Edit User</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    :color="props.row.status === 'active' ? 'negative' : 'positive'"
                    :icon="props.row.status === 'active' ? 'block' : 'check_circle'"
                    size="sm"
                    @click="toggleUserStatus(props.row)"
                  >
                    <q-tooltip>
                      {{ props.row.status === 'active' ? 'Deactivate' : 'Activate' }} User
                    </q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

      <!-- System Settings & Logs -->
      <div class="col-12 col-lg-4">
        <!-- Quick Stats -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">System Overview</div>
            <div class="row q-col-gutter-sm q-mt-md">
              <div class="col-6">
                <div class="text-center">
                  <div class="text-h4">{{ stats.totalUsers }}</div>
                  <div class="text-caption">Total Users</div>
                </div>
              </div>
              <div class="col-6">
                <div class="text-center">
                  <div class="text-h4">{{ stats.activeUsers }}</div>
                  <div class="text-caption">Active Users</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- System Settings -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">System Settings</div>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>Enable Two-Factor Auth</q-item-label>
                  <q-item-label caption>Require 2FA for all admin users</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle v-model="settings.twoFactorAuth" color="primary" />
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Auto-Lock Timeout</q-item-label>
                  <q-item-label caption>Minutes until automatic logout</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-select
                    v-model="settings.autoLockTimeout"
                    :options="timeoutOptions"
                    dense
                    options-dense
                    style="width: 100px"
                  />
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>System Notifications</q-item-label>
                  <q-item-label caption>Enable email notifications</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle v-model="settings.notifications" color="primary" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <!-- Recent Activity Logs -->
        <q-card>
          <q-card-section>
            <div class="text-h6">Recent Activity Logs</div>
          </q-card-section>

          <q-list separator>
            <q-item v-for="log in activityLogs" :key="log.id">
              <q-item-section>
                <q-item-label>{{ log.action }}</q-item-label>
                <q-item-label caption>
                  {{ log.user }} - {{ log.timestamp }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon
                  :name="getLogIcon(log.type)"
                  :color="getLogColor(log.type)"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <q-card-actions align="center">
            <q-btn flat color="primary" label="View All Logs" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Add/Edit User Dialog -->
    <q-dialog v-model="showAddUserDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ editingUser ? 'Edit User' : 'Add New User' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="handleUserSubmit" class="q-gutter-md">
            <q-input
              v-model="userForm.name"
              label="Full Name"
              :rules="[val => !!val || 'Name is required']"
            />

            <q-input
              v-model="userForm.email"
              label="Email"
              type="email"
              :rules="[
                val => !!val || 'Email is required',
                val => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'Invalid email'
              ]"
            />

            <q-select
              v-model="userForm.role"
              :options="roleOptions"
              label="Role"
              :rules="[val => !!val || 'Role is required']"
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="negative" flat v-close-popup />
              <q-btn
                :label="editingUser ? 'Update' : 'Add'"
                type="submit"
                color="primary"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import type { User, TableColumn } from '../../types/admin'

const $q = useQuasar()

// State
const filter = ref('')
const showAddUserDialog = ref(false)
const editingUser = ref<User | null>(null)

// Table configuration
const columns: TableColumn<User>[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left' as const,
    field: 'name',
    sortable: true
  },
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left' as const,
    field: 'email',
    sortable: true
  },
  {
    name: 'role',
    label: 'Role',
    align: 'left' as const,
    field: 'role',
    sortable: true
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left' as const,
    field: 'status',
    sortable: true
  },
  {
    name: 'actions',
    label: 'Actions',
    align: 'center' as const,
    field: (row: User) => row.id // Use id for action column reference
  }
]

const pagination = ref<TablePagination>({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

// Options
const roleOptions = ['Admin', 'Doctor', 'Nurse', 'Clerk']
const timeoutOptions = [5, 10, 15, 30, 60]

// Mock data
const users = ref<User[]>([
  {
    id: 1,
    name: 'Juan Dela Cruz',
    email: 'juan@example.com',
    role: 'Admin',
    status: 'active'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@example.com',
    role: 'Doctor',
    status: 'active'
  }
])

const stats = ref({
  totalUsers: 45,
  activeUsers: 38
})

const settings = ref({
  twoFactorAuth: true,
  autoLockTimeout: 15,
  notifications: true
})

const activityLogs = ref([
  {
    id: 1,
    action: 'User login',
    user: 'Juan Dela Cruz',
    timestamp: '5 minutes ago',
    type: 'auth'
  },
  {
    id: 2,
    action: 'System settings updated',
    user: 'System Admin',
    timestamp: '1 hour ago',
    type: 'settings'
  }
])

interface UserFormData {
  name: string;
  email: string;
  role: string;
}

type TablePagination = {
  sortBy: string | null;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber?: number;
}

const userForm = ref<UserFormData>({
  name: '',
  email: '',
  role: ''
})

// Handlers
const handleEditUser = (user: User) => {
  editingUser.value = user
  userForm.value = { ...user }
  showAddUserDialog.value = true
}

const toggleUserStatus = (user: User) => {
  user.status = user.status === 'active' ? 'inactive' : 'active'
  $q.notify({
    color: user.status === 'active' ? 'positive' : 'negative',
    message: `User ${user.status === 'active' ? 'activated' : 'deactivated'}`,
    icon: user.status === 'active' ? 'check_circle' : 'block'
  })
}

const handleUserSubmit = () => {
  console.log('Submitting user:', userForm.value)
  showAddUserDialog.value = false
  $q.notify({
    color: 'positive',
    message: `User ${editingUser.value ? 'updated' : 'added'} successfully`,
    icon: 'person'
  })
  editingUser.value = null
}

const updatePagination = (val: TablePagination) => {
  pagination.value = val
}

// Utility functions
const getRoleColor = (role: string): string => {
  const colors = {
    Admin: 'primary',
    Doctor: 'positive',
    Nurse: 'warning',
    Clerk: 'info'
  }
  return colors[role as keyof typeof colors] || 'grey'
}

const getStatusColor = (status: string): string => {
  const colors = {
    active: 'positive',
    inactive: 'negative'
  }
  return colors[status as keyof typeof colors] || 'grey'
}

const getLogIcon = (type: string): string => {
  const icons = {
    auth: 'login',
    settings: 'settings',
    system: 'computer',
    user: 'person'
  }
  return icons[type as keyof typeof icons] || 'info'
}

const getLogColor = (type: string): string => {
  const colors = {
    auth: 'primary',
    settings: 'warning',
    system: 'info',
    user: 'positive'
  }
  return colors[type as keyof typeof colors] || 'grey'
}
</script>

<style lang="scss" scoped>
.text-h4 {
  font-size: 2rem;
  font-weight: 500;
}

.q-table {
  background-color: white;
  border-radius: 8px;
}
</style>
