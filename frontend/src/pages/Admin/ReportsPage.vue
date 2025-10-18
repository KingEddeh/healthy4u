<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!-- Report Generation Section -->
      <div class="col-12 col-lg-8">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Generate Report</div>
            <q-space />
            <q-btn color="primary" icon="add" label="New Report" @click="showNewReportDialog = true" />
          </q-card-section>

          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-select
                  v-model="reportType"
                  :options="reportTypes"
                  label="Report Type"
                  outlined
                  dense
                />
              </div>

              <div class="col-12 col-md-4">
                <q-input
                  v-model="dateRange.from"
                  type="date"
                  label="From Date"
                  outlined
                  dense
                />
              </div>

              <div class="col-12 col-md-4">
                <q-input
                  v-model="dateRange.to"
                  type="date"
                  label="To Date"
                  outlined
                  dense
                />
              </div>
            </div>

            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-12">
                <q-option-group
                  v-model="exportFormat"
                  :options="exportFormats"
                  color="primary"
                  inline
                />
              </div>
            </div>

            <div class="row justify-end q-mt-md">
              <q-btn color="primary" label="Generate Report" @click="handleGenerateReport" />
            </div>
          </q-card-section>
        </q-card>

        <!-- Report History -->
        <q-card class="q-mt-md">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Report History</div>
            <q-space />
            <q-input
              v-model="search"
              dense
              outlined
              placeholder="Search reports..."
              class="q-mr-md"
              style="width: 200px"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-card-section>

          <q-table
            :rows="reports"
            :columns="columns"
            row-key="id"
            :filter="search"
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
                  icon="download"
                  size="sm"
                  @click="handleDownload(props.row)"
                >
                  <q-tooltip>Download Report</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  color="secondary"
                  icon="share"
                  size="sm"
                  @click="handleShare(props.row)"
                >
                  <q-tooltip>Share Report</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  color="negative"
                  icon="delete"
                  size="sm"
                  @click="handleDelete(props.row)"
                >
                  <q-tooltip>Delete Report</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card>
      </div>

      <!-- Compliance Dashboard -->
      <div class="col-12 col-lg-4">
        <!-- Report Status -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Report Status</div>
            <div class="row q-col-gutter-sm q-mt-md">
              <div class="col-6">
                <div class="text-center">
                  <div class="text-h4 text-positive">{{ stats.completed }}</div>
                  <div class="text-caption">Completed</div>
                </div>
              </div>
              <div class="col-6">
                <div class="text-center">
                  <div class="text-h4 text-warning">{{ stats.pending }}</div>
                  <div class="text-caption">Pending</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Upcoming Reports -->
        <q-card>
          <q-card-section>
            <div class="text-h6">Upcoming Reports</div>
          </q-card-section>

          <q-list separator>
            <q-item v-for="report in upcomingReports" :key="report.id">
              <q-item-section>
                <q-item-label>{{ report.title }}</q-item-label>
                <q-item-label caption>Due: {{ report.dueDate }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="event"
                  size="sm"
                  @click="() => console.log('Schedule upcoming report:', report)"
                >
                  <q-tooltip>Schedule</q-tooltip>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- New Report Dialog -->
    <q-dialog v-model="showNewReportDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Create New Report</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="handleNewReport" class="q-gutter-md">
            <q-input
              v-model="newReport.title"
              label="Report Title"
              :rules="[val => !!val || 'Title is required']"
            />

            <q-select
              v-model="newReport.type"
              :options="reportTypes"
              label="Report Type"
              :rules="[val => !!val || 'Type is required']"
            />

            <q-input
              v-model="newReport.description"
              label="Description"
              type="textarea"
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="negative" flat v-close-popup />
              <q-btn label="Create" type="submit" color="primary" class="q-ml-sm" />
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
import type { Report, TableColumn } from '../../types/admin'

const $q = useQuasar()

// State
const search = ref('')
const showNewReportDialog = ref(false)
const reportType = ref(null)
const exportFormat = ref('pdf')
const dateRange = ref({
  from: '',
  to: ''
})

// Options
const reportTypes = [
  'Monthly Summary',
  'Quarterly Report',
  'Patient Statistics',
  'Compliance Report',
  'Audit Report'
]

const exportFormats = [
  {
    label: 'PDF',
    value: 'pdf'
  },
  {
    label: 'Excel',
    value: 'excel'
  },
  {
    label: 'CSV',
    value: 'csv'
  }
]

// Table configuration
const columns: TableColumn<Report>[] = [
  {
    name: 'title',
    required: true,
    label: 'Report Title',
    align: 'left',
    field: 'title',
    sortable: true
  },
  {
    name: 'type',
    required: true,
    label: 'Type',
    align: 'left',
    field: 'type',
    sortable: true
  },
  {
    name: 'date',
    label: 'Generated',
    align: 'left',
    field: 'date',
    sortable: true
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: 'status',
    sortable: true
  },
  {
    name: 'actions',
    label: 'Actions',
    align: 'center',
    field: (row: Report) => row.id // Use id for action column reference
  }
]

// Mock data
const reports = ref<Report[]>([
  {
    id: 1,
    title: 'September Monthly Report',
    type: 'Monthly Summary',
    date: '2025-10-01',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Q3 Compliance Report',
    type: 'Quarterly Report',
    date: '2025-10-15',
    status: 'pending'
  }
])

const stats = ref({
  completed: 24,
  pending: 3
})

interface UpcomingReport {
  id: number;
  title: string;
  dueDate: string;
}

const upcomingReports = ref<UpcomingReport[]>([
  {
    id: 1,
    title: 'October Monthly Report',
    dueDate: 'Nov 5, 2025'
  },
  {
    id: 2,
    title: 'Q4 Patient Statistics',
    dueDate: 'Dec 31, 2025'
  }
])

const pagination = ref<TablePagination>({
  sortBy: 'date',
  descending: true,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

const newReport = ref({
  title: '',
  type: '',
  description: ''
})

// Handlers
const handleGenerateReport = () => {
  console.log('Generating report:', {
    type: reportType.value,
    dateRange: dateRange.value,
    format: exportFormat.value
  })
  $q.notify({
    color: 'positive',
    message: 'Report generated successfully',
    icon: 'description'
  })
}

const handleNewReport = () => {
  console.log('Creating new report:', newReport.value)
  showNewReportDialog.value = false
  $q.notify({
    color: 'positive',
    message: 'Report created successfully',
    icon: 'add'
  })
}

const handleDownload = (report: Report) => {
  console.log('Downloading report:', report)
  // Implement download logic
}

const handleShare = (report: Report) => {
  console.log('Sharing report:', report)
  // Implement share logic
}

const handleDelete = (report: Report) => {
  console.log('Deleting report:', report)
  // Implement delete logic
}


interface TablePagination {
  sortBy: string | null;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber?: number;
}

const updatePagination = (val: TablePagination) => {
  pagination.value = val
}

// Utility functions
const getStatusColor = (status: string): string => {
  const colors = {
    completed: 'positive',
    pending: 'warning',
    error: 'negative'
  }
  return colors[status as keyof typeof colors] || 'grey'
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
