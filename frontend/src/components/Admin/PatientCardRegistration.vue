<template>
  <div class="patient-card-registration">
    <q-card class="registration-card">
      <q-card-section>
        <div class="text-h6">Patient Card Registration</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="patientData.firstName"
                label="First Name"
                outlined
                :rules="[val => !!val || 'First name is required']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="patientData.lastName"
                label="Last Name"
                outlined
                :rules="[val => !!val || 'Last name is required']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="patientData.dateOfBirth"
                label="Date of Birth"
                outlined
                type="date"
                :rules="[val => !!val || 'Date of birth is required']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="patientData.phone"
                label="Phone Number"
                outlined
                mask="(###) ###-####"
                :rules="[val => !!val || 'Phone number is required']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                v-model="patientData.address"
                label="Address"
                outlined
                type="textarea"
                :rules="[val => !!val || 'Address is required']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md justify-end">
            <div class="col-auto">
              <q-btn
                label="Generate Card"
                type="submit"
                color="primary"
                :loading="loading"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-dialog v-model="showQRCode">
        <q-card style="min-width: 350px">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Patient Health Card</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-center">
              <qrcode-vue :value="qrCodeData" :size="200" level="H" />
            </div>
            <div class="text-center q-mt-md">
              <p>{{ patientData.firstName }} {{ patientData.lastName }}</p>
              <p class="text-caption">Patient ID: {{ patientData.id }}</p>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Print" color="primary" @click="printQRCode" />
            <q-btn flat label="Download" color="primary" @click="downloadQRCode" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import QrcodeVue from 'qrcode.vue';
import { useQuasar } from 'quasar';
import { usePatientStore } from 'src/stores/patient-store';

// Import NFC plugin (Capacitor)
import { Nfc } from '@trentrand/capacitor-nfc';

const $q = useQuasar();
const patientStore = usePatientStore();
const loading = ref(false);
const showQRCode = ref(false);
const nfcWriteStatus = ref('');

interface PatientData {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  address: string;
}

const patientData = ref<PatientData>({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phone: '',
  address: ''
});

const qrCodeData = ref('');

const writeToNFC = async (patient: PatientData) => {
  try {
    nfcWriteStatus.value = 'Waiting for NFC tag...';
    // Prepare data to write
    const payload = JSON.stringify({
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: patient.dateOfBirth,
      phone: patient.phone,
      address: patient.address
    });

    // Convert payload to ArrayBuffer and DataView
    const encoder = new TextEncoder();
    const buffer = encoder.encode(payload).buffer;
    const dataView = new DataView(buffer);

    // Write to NFC tag using correct API
    await Nfc.write({
      records: [{
        recordType: 'text',
        mediaType: 'text/plain',
        data: dataView
      }]
    });

    nfcWriteStatus.value = 'NFC card written successfully!';
    $q.notify({ type: 'positive', message: 'NFC card written successfully!' });
  } catch {
    nfcWriteStatus.value = 'Failed to write NFC card.';
    $q.notify({ type: 'negative', message: 'Failed to write NFC card.' });
  }
};

const onSubmit = async () => {
  loading.value = true;
  try {
    // Create a new patient object
    const newPatient = {
      id: crypto.randomUUID(),
      firstName: patientData.value.firstName,
      lastName: patientData.value.lastName,
      dateOfBirth: patientData.value.dateOfBirth,
      phone: patientData.value.phone,
      address: patientData.value.address,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add the patient to the store
    patientStore.addPatient(newPatient);

    // Write patient data to NFC card
    await writeToNFC(newPatient);

    // Create QR code data with patient ID
    qrCodeData.value = JSON.stringify({
      id: newPatient.id,
      firstName: newPatient.firstName,
      lastName: newPatient.lastName
    });

    // Show QR code dialog
    showQRCode.value = true;

    $q.notify({
      type: 'positive',
      message: 'Patient registration successful'
    });
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Failed to register patient'
    });
  } finally {
    loading.value = false;
  }
};

const printQRCode = () => {
  window.print();
};

const downloadQRCode = () => {
  // Find the QR code canvas element
  const canvas = document.querySelector('canvas');
  if (!canvas) {
    $q.notify({
      type: 'negative',
      message: 'Could not find QR code to download'
    });
    return;
  }

  // Create download link
  const link = document.createElement('a');
  link.download = `patient-card-${patientData.value.firstName}-${patientData.value.lastName}.png`;
  link.href = canvas.toDataURL('image/png');

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style lang="scss" scoped>
.patient-card-registration {
  max-width: 800px;
  margin: 0 auto;
}

.registration-card {
  margin: 20px;
}

@media print {
  .q-dialog {
    position: static !important;
  }
}
</style>
