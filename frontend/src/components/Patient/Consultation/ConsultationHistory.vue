<template>
  <div class="consultation-history">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <h5 class="q-my-none text-h5">Medical History</h5>
        <p class="q-my-sm text-grey-7">View your past consultations and medical records</p>
      </div>
      <q-btn-group outline>
        <q-btn
          :color="view === 'list' ? 'primary' : 'grey'"
          icon="list"
          label="List"
          @click="view = 'list'"
        />
        <q-btn
          :color="view === 'timeline' ? 'primary' : 'grey'"
          icon="timeline"
          label="Timeline"
          @click="view = 'timeline'"
        />
      </q-btn-group>
    </div>

    <!-- List View -->
    <div v-if="view === 'list'" class="consultation-list">
      <q-list bordered separator>
        <q-item
          v-for="consultation in sortedConsultations"
          :key="consultation.id"
          clickable
          v-ripple
          @click="$emit('view-consultation', consultation)"
        >
          <q-item-section>
            <q-item-label>{{ consultation.doctorName }}</q-item-label>
            <q-item-label caption>{{ consultation.diagnosis }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label caption>
              {{ formatDate(consultation.date) }}
            </q-item-label>
            <div class="row items-center q-gutter-x-sm">
              <q-badge
                v-if="consultation.attachments?.length"
                color="primary"
                :label="consultation.attachments.length"
                class="q-px-xs"
              >
                <q-tooltip>
                  {{ consultation.attachments.length }} attachment(s)
                </q-tooltip>
              </q-badge>
              <q-badge
                v-if="consultation.followUpDate"
                color="orange"
                label="Follow-up"
              >
                <q-tooltip>
                  Follow-up on {{ formatDate(consultation.followUpDate) }}
                </q-tooltip>
              </q-badge>
            </div>
          </q-item-section>

          <q-item-section side>
            <q-btn flat round color="grey" icon="chevron_right" />
          </q-item-section>
        </q-item>
      </q-list>

      <div v-if="!consultations.length" class="text-center q-pa-xl">
        <q-icon name="medical_information" size="48px" color="grey-6" />
        <p class="text-h6 text-grey-6">No consultation history available</p>
      </div>
    </div>

    <!-- Timeline View -->
    <div v-else class="consultation-timeline q-mt-lg">
      <q-timeline color="primary">
        <q-timeline-entry
          v-for="consultation in sortedConsultations"
          :key="consultation.id"
          :title="consultation.doctorName"
          :subtitle="formatDate(consultation.date)"
          icon="local_hospital"
          :color="getTimelineColor(consultation)"
        >
          <div class="cursor-pointer" @click="$emit('view-consultation', consultation)">
            <div class="text-body1 q-mb-sm">{{ consultation.diagnosis }}</div>
            <div class="text-caption text-grey-7">
              {{ consultation.notes }}
            </div>
            
            <div v-if="consultation.prescription.length" class="q-mt-sm">
              <div class="text-caption text-weight-medium">Prescriptions:</div>
              <q-chip
                v-for="(med, index) in consultation.prescription"
                :key="index"
                size="sm"
                color="grey-3"
                text-color="grey-8"
                class="q-ma-xs"
              >
                {{ med }}
              </q-chip>
            </div>

            <div class="row items-center q-gutter-x-sm q-mt-sm">
              <q-badge
                v-if="consultation.attachments?.length"
                color="primary"
                :label="`${consultation.attachments.length} attachment(s)`"
              />
              <q-badge
                v-if="consultation.followUpDate"
                color="orange"
                :label="`Follow-up: ${formatDate(consultation.followUpDate)}`"
              />
            </div>
          </div>
        </q-timeline-entry>
      </q-timeline>

      <div v-if="!consultations.length" class="text-center q-pa-xl">
        <q-icon name="timeline" size="48px" color="grey-6" />
        <p class="text-h6 text-grey-6">No timeline entries available</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Consultation } from '../../../types/data';

const props = defineProps<{
  consultations: Consultation[];
}>();

defineEmits<{
  (e: 'view-consultation', consultation: Consultation): void;
}>();

const view = ref<'list' | 'timeline'>('list');

const sortedConsultations = computed(() => {
  return [...props.consultations].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getTimelineColor = (consultation: Consultation) => {
  if (consultation.followUpDate) {
    const followUp = new Date(consultation.followUpDate);
    const now = new Date();
    if (followUp > now) {
      return 'orange'; // Upcoming follow-up
    }
  }
  return 'primary';
};
</script>

<style scoped>
.consultation-history {
  max-width: 1200px;
  margin: 0 auto;
}

.consultation-timeline {
  max-width: 800px;
  margin: 0 auto;
}
</style>