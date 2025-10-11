<template>
  <div class="prescription-list">
    <!-- Active Prescriptions -->
    <div class="q-mb-lg">
      <div class="text-h6">Active Prescriptions</div>
      <div class="row q-col-gutter-md">
        <div
          v-for="prescription in activePrescriptions"
          :key="prescription.id"
          class="col-12 col-md-6"
        >
          <q-card>
            <q-card-section>
              <div class="row items-center justify-between q-mb-sm">
                <div class="text-subtitle1 text-weight-medium">
                  {{ prescription.medication }}
                </div>
                <q-badge
                  color="positive"
                  class="text-caption"
                >
                  Active
                </q-badge>
              </div>
              <div class="text-caption text-grey-7">
                Prescribed by {{ prescription.doctorName }}
              </div>
              <div class="text-caption text-grey-7">
                {{ prescription.instructions }}
              </div>
              <div class="text-caption text-primary q-mt-sm">
                {{ getDaysRemaining(prescription.endDate) }} days remaining
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                flat
                color="primary"
                icon="alarm"
                label="Set Reminder"
                @click="handleSetReminder(prescription)"
              />
              <q-btn
                flat
                color="primary"
                icon="refresh"
                label="Refill"
                @click="handleRefill(prescription)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Past Prescriptions -->
    <div>
      <div class="text-h6">Past Prescriptions</div>
      <q-table
        :rows="pastPrescriptions"
        :columns="columns as any"
        row-key="id"
        flat
        bordered
        :pagination="{ rowsPerPage: 5 }"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge color="grey" text-color="white">
              Completed
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="history"
            >
              <q-tooltip>View History</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="refresh"
              @click="handleRefill(props.row)"
            >
              <q-tooltip>Request Refill</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { format, differenceInDays } from 'date-fns';

const $q = useQuasar();

interface Prescription {
  id: string;
  medication: string;
  doctorName: string;
  startDate: string;
  endDate: string;
  instructions: string;
  isActive: boolean;
  consultationId: string;
}

const props = defineProps<{
  prescriptions: Prescription[];
}>();

const columns = [
  {
    name: 'medication',
    required: true,
    label: 'Medication',
    align: 'left',
    field: (row: Prescription) => row.medication,
    sortable: true
  },
  {
    name: 'doctorName',
    required: true,
    label: 'Doctor',
    align: 'left',
    field: 'doctorName',
    sortable: true
  },
  {
    name: 'startDate',
    required: true,
    label: 'Start Date',
    align: 'left',
    field: 'startDate',
    format: (val: string) => formatDate(val),
    sortable: true
  },
  {
    name: 'endDate',
    required: true,
    label: 'End Date',
    align: 'left',
    field: 'endDate',
    format: (val: string) => formatDate(val),
    sortable: true
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'center',
    field: 'isActive'
  },
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'center'
  }
];

const activePrescriptions = computed(() => {
  return props.prescriptions.filter(p => p.isActive);
});

const pastPrescriptions = computed(() => {
  return props.prescriptions.filter(p => !p.isActive);
});

const formatDate = (date: string) => {
  return format(new Date(date), 'MMM d, yyyy');
};

const getDaysRemaining = (endDate: string) => {
  const days = differenceInDays(new Date(endDate), new Date());
  return days > 0 ? days : 0;
};

const handleSetReminder = (prescription: Prescription) => {
  $q.dialog({
    title: 'Set Medication Reminder',
    message: `Set a reminder for ${prescription.medication}?`,
    ok: {
      label: 'Set Reminder',
      color: 'primary'
    },
    cancel: true
  }).onOk(() => {
    $q.notify({
      type: 'positive',
      message: 'Reminder set successfully'
    });
  });
};

const handleRefill = (prescription: Prescription) => {
  $q.dialog({
    title: 'Request Refill',
    message: `Request a refill for ${prescription.medication}?`,
    ok: {
      label: 'Request Refill',
      color: 'primary'
    },
    cancel: true
  }).onOk(() => {
    $q.notify({
      type: 'positive',
      message: 'Refill request sent successfully'
    });
  });
};
</script>

<style scoped>
.prescription-list {
  max-width: 1200px;
  margin: 0 auto;
}
</style>