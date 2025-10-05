<template>
  <q-page class="qr-scanner-page">
    <!-- QR Scanner Component -->
    <QRScanner
      v-if="!scannedData"
      @close="goBack"
      @scanned="handleScannedData"
    />

    <!-- Medical Data Display -->
    <div v-else class="medical-data-display">
      <div class="q-pa-md">
        <!-- Header -->
        <div class="text-center q-mb-lg">
          <q-avatar size="60px" color="positive" text-color="white" class="q-mb-md">
            <q-icon name="medical_information" size="30px" />
          </q-avatar>
          <h4 class="text-h4 q-mt-none q-mb-sm">Medical Information</h4>
          <p class="text-grey-6">
            Scanned from QR Code - {{ formatDateTime(scannedData.timestamp) }}
          </p>
        </div>

        <!-- Patient Information Card -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6 q-mb-md">
              <q-icon name="person" class="q-mr-sm" />
              Patient Information
            </div>

            <div class="row q-gutter-md">
              <div class="col-12 col-sm-6">
                <q-item dense>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">Full Name</q-item-label>
                    <q-item-label>{{ scannedData.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="col-12 col-sm-6">
                <q-item dense>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">Email</q-item-label>
                    <q-item-label>{{ scannedData.email }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Medical Records Card -->
        <q-card class="q-mb-md" v-if="scannedData.emergency_contact">
          <q-card-section>
            <div class="text-h6 q-mb-md">
              <q-icon name="local_hospital" class="q-mr-sm" />
              Medical Records
            </div>

            <div class="medical-info-grid">
              <div class="medical-info-item" v-if="scannedData.emergency_contact.date_of_birth">
                <q-item dense>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">Date of Birth</q-item-label>
                    <q-item-label>{{ formatDate(scannedData.emergency_contact.date_of_birth) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="medical-info-item" v-if="scannedData.emergency_contact.sex">
                <q-item dense>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">Sex</q-item-label>
                    <q-item-label class="text-capitalize">{{ scannedData.emergency_contact.sex }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="medical-info-item" v-if="scannedData.emergency_contact.blood_type">
                <q-item dense>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">Blood Type</q-item-label>
                    <q-item-label>{{ scannedData.emergency_contact.blood_type }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="medical-info-item" v-if="scannedData.emergency_contact.height_cm">
                <q-item dense>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">Height</q-item-label>
                    <q-item-label>{{ scannedData.emergency_contact.height_cm }} cm</q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="medical-info-item" v-if="scannedData.emergency_contact.weight_kg">
                <q-item dense>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">Weight</q-item-label>
                    <q-item-label>{{ scannedData.emergency_contact.weight_kg }} kg</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>

            <!-- Medical History Sections -->
            <div v-if="scannedData.emergency_contact.allergies" class="q-mt-md">
              <q-expansion-item icon="warning" label="Allergies" class="medical-expansion">
                <q-card class="bg-red-1">
                  <q-card-section>
                    <p class="q-mb-none">{{ scannedData.emergency_contact.allergies }}</p>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>

            <div v-if="scannedData.emergency_contact.current_medications" class="q-mt-md">
              <q-expansion-item icon="medication" label="Current Medications" class="medical-expansion">
                <q-card class="bg-blue-1">
                  <q-card-section>
                    <p class="q-mb-none">{{ scannedData.emergency_contact.current_medications }}</p>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>

            <div v-if="scannedData.emergency_contact.past_medical_history" class="q-mt-md">
              <q-expansion-item icon="history" label="Past Medical History" class="medical-expansion">
                <q-card class="bg-grey-2">
                  <q-card-section>
                    <p class="q-mb-none">{{ scannedData.emergency_contact.past_medical_history }}</p>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>

            <div v-if="scannedData.emergency_contact.family_medical_history" class="q-mt-md">
              <q-expansion-item icon="family_restroom" label="Family Medical History" class="medical-expansion">
                <q-card class="bg-purple-1">
                  <q-card-section>
                    <p class="q-mb-none">{{ scannedData.emergency_contact.family_medical_history }}</p>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>

            <div v-if="scannedData.emergency_contact.immunization_history" class="q-mt-md">
              <q-expansion-item icon="vaccines" label="Immunization History" class="medical-expansion">
                <q-card class="bg-green-1">
                  <q-card-section>
                    <p class="q-mb-none">{{ scannedData.emergency_contact.immunization_history }}</p>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>
          </q-card-section>
        </q-card>

        <!-- Action Buttons -->
        <div class="q-gutter-sm">
          <q-btn
            color="primary"
            label="Scan Another QR Code"
            icon="qr_code_scanner"
            class="full-width q-mb-sm"
            @click="resetScanner"
          />

          <q-btn
            outline
            color="primary"
            label="Back to Home"
            icon="home"
            class="full-width"
            @click="goHome"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import QRScanner from 'components/QRScanner.vue';
import { useQRStore, type MedicalQRData } from '../../stores/qr-store';

const router = useRouter();
const $q = useQuasar();
const qrStore = useQRStore();

const scannedData = ref<MedicalQRData | null>(null);

function handleScannedData(data: MedicalQRData) {
  // Validate the data using the store
  const validatedData = qrStore.validateMedicalQRData(JSON.stringify(data));

  if (validatedData) {
    scannedData.value = validatedData;

    $q.notify({
      type: 'positive',
      message: `Medical data loaded for ${validatedData.name}`,
      position: 'top'
    });
  } else {
    $q.notify({
      type: 'negative',
      message: 'Invalid SiguraDok medical QR code',
      position: 'top'
    });
  }
}

function resetScanner() {
  scannedData.value = null;
}

async function goBack() {
  await router.push({ name: 'qr' });
}

async function goHome() {
  await router.push({ name: 'home' });
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

function formatDateTime(dateTimeString: string): string {
  try {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateTimeString;
  }
}
</script>

<style lang="scss" scoped>
.qr-scanner-page {
  min-height: 100vh;
}

.medical-data-display {
  max-width: 800px;
  margin: 0 auto;
}

.medical-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.medical-info-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 8px;
}

.medical-expansion {
  border-radius: 8px;
  overflow: hidden;

  :deep(.q-expansion-item__toggle-icon) {
    color: #00b0b0;
  }

  :deep(.q-expansion-item__container) {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }
}

@media (max-width: 600px) {
  .medical-info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
