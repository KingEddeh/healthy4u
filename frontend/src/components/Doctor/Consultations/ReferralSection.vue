<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Referral Management</div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-12 col-md-6">
          <q-select
            v-model="referral.specialist"
            :options="specialistOptions"
            filled
            label="Refer to Specialist"
            @update:model-value="updateReferral"
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="referral.reason"
            filled
            type="textarea"
            label="Reason for Referral"
            @update:model-value="updateReferral"
          />
        </div>
        <div class="col-12">
          <div class="row q-gutter-sm">
            <q-btn
              color="primary"
              icon="qr_code"
              label="Generate Referral QR"
              @click="$emit('generate-qr')"
              :disable="!isValid"
            />
            <q-btn
              color="secondary"
              icon="print"
              label="Print Referral"
              @click="$emit('print')"
              :disable="!isValid"
            />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Referral } from './types';
import { specialistOptions } from './types';

const props = defineProps<{
  patientName: string;
  doctorName: string;
}>();

const emit = defineEmits<{
  (e: 'update', referral: Referral): void;
  (e: 'generate-qr'): void;
  (e: 'print'): void;
}>();

const referral = ref<Referral>({
  specialist: null,
  reason: '',
  patientName: props.patientName,
  referringDoctor: props.doctorName,
  date: new Date().toISOString().split('T')[0] ?? new Date().toISOString()
});

const isValid = computed(() => {
  return referral.value.specialist && referral.value.reason.trim() !== '';
});

const updateReferral = () => {
  emit('update', referral.value);
};
</script>