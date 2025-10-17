<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Update Records</div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-12 col-md-6">
          <q-input
            v-model="consultation.symptoms"
            filled
            type="textarea"
            label="Symptoms"
            @update:model-value="updateConsultation"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="consultation.diagnosis"
            filled
            type="textarea"
            label="Diagnosis"
            @update:model-value="updateConsultation"
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="consultation.prescription"
            filled
            type="textarea"
            label="Prescription"
            @update:model-value="updateConsultation"
          />
        </div>
        <div class="col-12">
          <q-file
            v-model="attachments"
            filled
            multiple
            label="Upload Attachments"
            @update:model-value="$emit('attachments', attachments)"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn color="primary" label="Save" @click="$emit('save')" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Consultation } from './types';

const props = defineProps<{
  initialConsultation: Partial<Consultation>;
}>();

const emit = defineEmits<{
  (e: 'update', consultation: Partial<Consultation>): void;
  (e: 'attachments', files: File[]): void;
  (e: 'save'): void;
}>();

const consultation = ref<Partial<Consultation>>({ ...props.initialConsultation });
const attachments = ref<File[]>([]);

watch(() => props.initialConsultation, (newValue) => {
  consultation.value = { ...newValue };
}, { deep: true });

const updateConsultation = () => {
  emit('update', consultation.value);
};
</script>