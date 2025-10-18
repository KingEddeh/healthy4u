<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!-- Patient Management Tools -->
      <div class="col-12 q-mb-md">
        <div class="row q-col-gutter-sm justify-between items-center">
          <div class="col-12 col-md-4">
            <q-input
              v-model="searchQuery"
              outlined
              dense
              placeholder="Search patients..."
              @update:model-value="handleSearch"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-auto">
            <q-btn
              color="primary"
              icon="person_add"
              label="Register New Patient"
              @click="showRegisterDialog = true"
            />
          </div>
        </div>
      </div>

      <!-- Patient List -->
      <div class="col-12">
        <q-card>
          <q-table
            :rows="patients"
            :columns="columns"
            row-key="id"
            :loading="loading"
            :filter="searchQuery"
            :pagination="pagination"
            @update:pagination="updatePagination"
          >
            <!-- Status Column -->
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-chip
                  :color="getStatusColor(props.row.status)"
                  text-color="white"
                  dense
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
                  @click="handleEdit(props.row)"
                >
                  <q-tooltip>Edit Patient</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  color="secondary"
                  icon="credit_card"
                  size="sm"
                  @click="handleCard(props.row)"
                >
                  <q-tooltip>Manage Card</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  color="negative"
                  icon="delete"
                  size="sm"
                  @click="handleDelete(props.row)"
                >
                  <q-tooltip>Delete Patient</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>

    <!-- Register Patient Dialog -->
    <q-dialog v-model="showRegisterDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Register New Patient</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="handleRegisterSubmit" class="q-gutter-md">
            <q-input
              v-model="newPatient.firstName"
              label="First Name"
              :rules="[val => !!val || 'First name is required']"
            />
            <q-input
              v-model="newPatient.lastName"
              label="Last Name"
              :rules="[val => !!val || 'Last name is required']"
            />
            <q-input
              v-model="newPatient.email"
              label="Email"
              type="email"
              :rules="[
                val => !!val || 'Email is required',
                val => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'Invalid email'
              ]"
            />
            <q-input
              v-model="newPatient.phone"
              label="Phone"
              :rules="[val => !!val || 'Phone is required']"
            />
            <q-input
              v-model="newPatient.address"
              label="Address"
              type="textarea"
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="negative" flat v-close-popup />
              <q-btn label="Register" type="submit" color="primary" class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Confirm Delete Dialog -->
    <q-dialog v-model="showDeleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this patient?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="confirmDelete" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import type { QTableProps } from 'quasar'
import type { Patient, TableColumn } from '../../types/admin'

type TablePagination = NonNullable<QTableProps['pagination']>

const $q = useQuasar()

// Table configuration
const columns = ref<TableColumn<Patient>[]>([
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left' as const,
    field: 'id',
    sortable: true
  },
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
    name: 'phone',
    label: 'Phone',
    align: 'left' as const,
    field: 'phone',
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
    field: (row: Patient) => row.id // Use id for action column reference
  }
])

// State
const loading = ref(false)
const searchQuery = ref('')
const showRegisterDialog = ref(false)
const showDeleteDialog = ref(false)
const selectedPatient = ref<Patient | null>(null)
const pagination = ref<TablePagination>({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10
})

// Mock data - In production, this would come from API
const patients = ref([
  {
    id: 'P001',
    name: 'Juan Dela Cruz',
    email: 'juan@example.com',
    phone: '+63 912 345 6789',
    status: 'active'
  },
  {
    id: 'P002',
    name: 'Maria Santos',
    email: 'maria@example.com',
    phone: '+63 923 456 7890',
    status: 'inactive'
  }
])

const newPatient = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''
})

// Handlers
const handleSearch = (val: string | number | null) => {
  // Implement search logic
  console.log('Searching for:', val)
}

const handleEdit = (patient: Patient) => {
  // Implement edit logic
  console.log('Editing patient:', patient)
}

const handleCard = (patient: Patient) => {
  // Implement card management logic
  console.log('Managing card for patient:', patient)
}

const handleDelete = (patient: Patient) => {
  selectedPatient.value = patient
  showDeleteDialog.value = true
}

const confirmDelete = () => {
  // Implement delete logic
  console.log('Deleting patient:', selectedPatient.value)
  $q.notify({
    color: 'positive',
    message: 'Patient deleted successfully',
    icon: 'delete'
  })
}

const handleRegisterSubmit = () => {
  // Implement registration logic
  console.log('Registering new patient:', newPatient.value)
  showRegisterDialog.value = false
  $q.notify({
    color: 'positive',
    message: 'Patient registered successfully',
    icon: 'person_add'
  })
}

const updatePagination = (val: TablePagination) => {
  pagination.value = val
}

const getStatusColor = (status: string): string => {
  const colors = {
    active: 'positive',
    inactive: 'grey',
    pending: 'warning'
  }
  return colors[status as keyof typeof colors] || 'grey'
}
</script>

<style lang="scss" scoped>
.q-table {
  background-color: white;
  border-radius: 8px;
}
</style>
