<template>
  <div class="patient-check-in">
    <q-card class="check-in-card">
      <q-card-section>
        <div class="text-h6">Patient Check-In</div>
      </q-card-section>

      <q-card-section>
        <div v-if="!showScanner" class="text-center">
          <q-btn
            color="primary"
            icon="qr_code_scanner"
            label="Scan Patient QR Card"
            @click="startScanning"
          />
          <q-btn
            color="secondary"
            icon="nfc"
            label="Scan NFC Card"
            class="q-ml-md"
            @click="scanNfcCard"
          />
          <div v-if="nfcReadStatus" class="q-mt-md text-secondary">{{ nfcReadStatus }}</div>
        </div>

        <q-dialog v-model="showScanner" persistent>
          <q-card style="min-width: 350px">
            <q-card-section class="row items-center">
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup @click="stopScanning" />
            </q-card-section>

            <q-card-section class="q-pt-none">
              <qr-scanner @decoded="onQRDecoded" @error="onQRError" />
            </q-card-section>
          </q-card>
        </q-dialog>

        <div v-if="patientInfo" class="patient-info q-mt-md">
          <q-card-section>
            <div class="text-h6">Patient Information</div>
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-12 col-md-6">
                <p><strong>Name:</strong> {{ patientInfo.firstName }} {{ patientInfo.lastName }}</p>
                <p><strong>ID:</strong> {{ patientInfo.id }}</p>
                <p><strong>Date of Birth:</strong> {{ patientInfo.dateOfBirth }}</p>
              </div>
              <div class="col-12 col-md-6">
                <p><strong>Phone:</strong> {{ patientInfo.phone }}</p>
                <p><strong>Address:</strong> {{ patientInfo.address }}</p>
              </div>
            </div>

            <patient-e-m-r
              v-if="patientInfo.id"
              :patient-id="patientInfo.id"
              class="q-mt-md q-mb-md"
            />

            <div class="row justify-end">
              <q-btn
                color="primary"
                label="Check In Patient"
                @click="checkInPatient"
                :loading="loading"
              />
            </div>
          </q-card-section>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import QrScanner from 'components/QRScanner.vue';
import PatientEMR from './PatientEMR.vue';
import { usePatientStore } from 'stores/patient-store';

// Import NFC plugin (Capacitor)
// @ts-expect-error: Capacitor NFC plugin lacks TypeScript definitions
import { NFC } from '@capawesome/capacitor-nfc';

const $q = useQuasar();
const patientStore = usePatientStore();
patientStore.initializeStore();

// Define the PatientInfo interface
interface PatientInfo {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
  emr?: {
    allergies?: string[];
    currentMedications?: string[];
    pastMedicalHistory?: string[];
    familyMedicalHistory?: string[];
    immunizationHistory?: string[];
    lastUpdated?: string;
  };
}

const showScanner = ref(false);
const loading = ref(false);
const patientInfo = ref<PatientInfo | null>(null); // Allow null values
const nfcReadStatus = ref('');

const startScanning = () => {
  showScanner.value = true;
};

const stopScanning = () => {
  showScanner.value = false;
};

const onQRDecoded = async (decodedString: string) => {
  try {
    const data = JSON.parse(decodedString);
    const patient = patientStore.getPatientById(data.id);

    if (patient) {
      // Ensure patient data matches the PatientInfo interface
      patientInfo.value = {
        ...patient,
        emr: {
          allergies: patient.emr?.allergies || [],
          currentMedications: patient.emr?.currentMedications || [],
          pastMedicalHistory: Array.isArray(patient.emr?.pastMedicalHistory)
            ? patient.emr.pastMedicalHistory
            : [],
          familyMedicalHistory: Array.isArray(patient.emr?.familyMedicalHistory)
            ? patient.emr.familyMedicalHistory
            : [],
          immunizationHistory: patient.emr?.immunizationHistory || [],
          lastUpdated: patient.emr?.lastUpdated || '',
        },
      };
      showScanner.value = false;
    } else {
      throw new Error('Patient not found in offline storage');
    }
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Invalid QR code or patient not found',
    });
  }
};

const onQRError = () => {
  $q.notify({
    type: 'negative',
    message: 'Failed to scan QR code',
  });
};

/**
 * Read patient data from NFC card
 */
const scanNfcCard = async () => {
  nfcReadStatus.value = 'Waiting for NFC tag...';
  try {
    // Read from NFC tag
    const result = await NFC.read();
    if (result && result.messages && result.messages.length > 0) {
      const textMsg = result.messages.find((msg: { type: string; data: string }) => msg.type === 'text');
      if (textMsg && textMsg.data) {
        const data = JSON.parse(textMsg.data);
        const patient = patientStore.getPatientById(data.id);
        if (patient) {
          // Ensure patient data matches the PatientInfo interface
          patientInfo.value = {
            ...patient,
            emr: {
              allergies: patient.emr?.allergies || [],
              currentMedications: patient.emr?.currentMedications || [],
              pastMedicalHistory: Array.isArray(patient.emr?.pastMedicalHistory)
                ? patient.emr.pastMedicalHistory
                : [],
              familyMedicalHistory: Array.isArray(patient.emr?.familyMedicalHistory)
                ? patient.emr.familyMedicalHistory
                : [],
              immunizationHistory: patient.emr?.immunizationHistory || [],
              lastUpdated: patient.emr?.lastUpdated || '',
            },
          };
          nfcReadStatus.value = 'NFC card read successfully!';
          $q.notify({ type: 'positive', message: 'NFC card read successfully!' });
        } else {
          nfcReadStatus.value = 'Patient not found in local storage.';
          $q.notify({ type: 'negative', message: 'Patient not found in local storage.' });
        }
      } else {
        nfcReadStatus.value = 'No valid patient data found on NFC card.';
        $q.notify({ type: 'negative', message: 'No valid patient data found on NFC card.' });
      }
    } else {
      nfcReadStatus.value = 'No NFC messages found.';
      $q.notify({ type: 'negative', message: 'No NFC messages found.' });
    }
  } catch {
    nfcReadStatus.value = 'Failed to read NFC card.';
    $q.notify({ type: 'negative', message: 'Failed to read NFC card.' });
  }
};

const checkInPatient = async () => {
  if (!patientInfo.value) {
    $q.notify({ type: 'negative', message: 'No patient selected for check-in.' });
    return;
  }

  loading.value = true;
  try {
    await patientStore.addCheckIn(patientInfo.value.id);

    $q.notify({
      type: 'positive',
      message: 'Patient checked in successfully',
    });

    // Reset form
    patientInfo.value = null;
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Failed to check in patient',
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.patient-check-in {
  max-width: 800px;
  margin: 0 auto;
}

.check-in-card {
  margin: 20px;
}

.patient-info {
  border-top: 1px solid #ddd;
  margin-top: 20px;
  padding-top: 20px;
}
</style>
