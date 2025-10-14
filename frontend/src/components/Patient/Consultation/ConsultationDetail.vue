<template>
  <div class="consultation-detail">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h5 class="q-my-none text-h5">Consultation Details</h5>
        <p class="q-my-sm text-grey-7">{{ formatDate(consultation.date) }}</p>
      </div>
      <div class="row q-gutter-sm">
        <q-btn
          outline
          color="primary"
          icon="print"
          label="Print"
          @click="handlePrint"
        />
        <q-btn
          v-if="consultation.followUpDate"
          color="orange"
          icon="event"
          :label="'Follow-up: ' + formatDate(consultation.followUpDate)"
        />
      </div>
    </div>

    <!-- Content -->
    <div class="row q-col-gutter-md">
      <!-- Main Info -->
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <!-- Doctor Info -->
              <div class="col-12 col-md-6">
                <div class="text-subtitle2 text-grey-8">Doctor</div>
                <div class="text-h6">{{ consultation.doctorName }}</div>
              </div>

              <!-- Diagnosis -->
              <div class="col-12">
                <div class="text-subtitle2 text-grey-8">Diagnosis</div>
                <div class="text-body1">{{ consultation.diagnosis }}</div>
              </div>

              <!-- Notes -->
              <div class="col-12">
                <div class="text-subtitle2 text-grey-8">Clinical Notes</div>
                <div class="text-body1">{{ consultation.notes }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Sidebar -->
      <div class="col-12 col-md-4">
        <!-- Prescriptions -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-subtitle2 text-grey-8">Prescriptions</div>
            <q-list dense>
              <q-item
                v-for="(med, index) in consultation.prescription"
                :key="index"
              >
                <q-item-section avatar>
                  <q-icon name="medication" color="primary" />
                </q-item-section>
                <q-item-section>{{ med }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <!-- Attachments -->
        <q-card v-if="consultation.attachments?.length">
          <q-card-section>
            <div class="text-subtitle2 text-grey-8">Attachments</div>
            <q-list dense>
              <q-item
                v-for="(attachment, index) in consultation.attachments"
                :key="index"
                clickable
                @click="handleAttachmentClick(attachment)"
              >
                <q-item-section avatar>
                  <q-icon name="attach_file" color="primary" />
                </q-item-section>
                <q-item-section>
                  {{ getAttachmentName(attachment) }}
                </q-item-section>
                <q-item-section side>
                  <q-btn flat round dense icon="download" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { Consultation } from '../../../types/data';

const $q = useQuasar();

defineProps<{
  consultation: Consultation;
}>();

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getAttachmentName = (path: string) => {
  return path.split('/').pop() || path;
};

const handlePrint = () => {
  window.print();
};

const handleAttachmentClick = (attachment: string) => {
  // In a real app, this would download or view the attachment
  $q.notify({
    type: 'info',
    message: `Downloading ${getAttachmentName(attachment)}...`
  });
};
</script>

<style scoped>
.consultation-detail {
  max-width: 1200px;
  margin: 0 auto;
}

@media print {
  .q-btn {
    display: none;
  }
}
</style>