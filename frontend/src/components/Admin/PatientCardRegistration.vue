&lt;template&gt;
  &lt;div class="patient-card-registration"&gt;
    &lt;q-card class="registration-card"&gt;
      &lt;q-card-section&gt;
        &lt;div class="text-h6"&gt;Patient Card Registration&lt;/div&gt;
      &lt;/q-card-section&gt;

      &lt;q-card-section&gt;
        &lt;q-form @submit="onSubmit" class="q-gutter-md"&gt;
          &lt;div class="row q-col-gutter-md"&gt;
            &lt;div class="col-12 col-md-6"&gt;
              &lt;q-input
                v-model="patientData.firstName"
                label="First Name"
                outlined
                :rules="[val => !!val || 'First name is required']"
              /&gt;
            &lt;/div&gt;
            &lt;div class="col-12 col-md-6"&gt;
              &lt;q-input
                v-model="patientData.lastName"
                label="Last Name"
                outlined
                :rules="[val => !!val || 'Last name is required']"
              /&gt;
            &lt;/div&gt;
          &lt;/div&gt;

          &lt;div class="row q-col-gutter-md"&gt;
            &lt;div class="col-12 col-md-6"&gt;
              &lt;q-input
                v-model="patientData.dateOfBirth"
                label="Date of Birth"
                outlined
                type="date"
                :rules="[val => !!val || 'Date of birth is required']"
              /&gt;
            &lt;/div&gt;
            &lt;div class="col-12 col-md-6"&gt;
              &lt;q-input
                v-model="patientData.phone"
                label="Phone Number"
                outlined
                mask="(###) ###-####"
                :rules="[val => !!val || 'Phone number is required']"
              /&gt;
            &lt;/div&gt;
          &lt;/div&gt;

          &lt;div class="row q-col-gutter-md"&gt;
            &lt;div class="col-12"&gt;
              &lt;q-input
                v-model="patientData.address"
                label="Address"
                outlined
                type="textarea"
                :rules="[val => !!val || 'Address is required']"
              /&gt;
            &lt;/div&gt;
          &lt;/div&gt;

          &lt;div class="row q-col-gutter-md justify-end"&gt;
            &lt;div class="col-auto"&gt;
              &lt;q-btn
                label="Generate Card"
                type="submit"
                color="primary"
                :loading="loading"
              /&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/q-form&gt;
      &lt;/q-card-section&gt;

      &lt;q-dialog v-model="showQRCode"&gt;
        &lt;q-card style="min-width: 350px"&gt;
          &lt;q-card-section class="row items-center q-pb-none"&gt;
            &lt;div class="text-h6"&gt;Patient Health Card&lt;/div&gt;
            &lt;q-space /&gt;
            &lt;q-btn icon="close" flat round dense v-close-popup /&gt;
          &lt;/q-card-section&gt;

          &lt;q-card-section class="q-pt-none"&gt;
            &lt;div class="text-center"&gt;
              &lt;qrcode-vue :value="qrCodeData" :size="200" level="H" /&gt;
            &lt;/div&gt;
            &lt;div class="text-center q-mt-md"&gt;
              &lt;p&gt;{{ patientData.firstName }} {{ patientData.lastName }}&lt;/p&gt;
              &lt;p class="text-caption"&gt;Patient ID: {{ patientData.id }}&lt;/p&gt;
            &lt;/div&gt;
          &lt;/q-card-section&gt;

          &lt;q-card-actions align="right"&gt;
            &lt;q-btn flat label="Print" color="primary" @click="printQRCode" /&gt;
            &lt;q-btn flat label="Download" color="primary" @click="downloadQRCode" /&gt;
          &lt;/q-card-actions&gt;
        &lt;/q-card&gt;
      &lt;/q-dialog&gt;
    &lt;/q-card&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
import { ref } from 'vue'
import QrcodeVue from 'qrcode-vue'
import { useQuasar } from 'quasar'
import { usePatientStore } from 'stores/patient-store'

const $q = useQuasar()
const patientStore = usePatientStore()
const loading = ref(false)
const showQRCode = ref(false)

interface PatientData {
  id?: string
  firstName: string
  lastName: string
  dateOfBirth: string
  phone: string
  address: string
}

const patientData = ref&lt;PatientData&gt;({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phone: '',
  address: ''
})

const qrCodeData = ref('')

const generatePatientId = () => {
  // Generate a unique patient ID (implement your logic here)
  return 'PT' + Date.now().toString(36).toUpperCase()
}

const onSubmit = async () => {
  loading.value = true
  try {
    const newPatient = await patientStore.addPatient({
      firstName: patientData.value.firstName,
      lastName: patientData.value.lastName,
      dateOfBirth: patientData.value.dateOfBirth,
      phone: patientData.value.phone,
      address: patientData.value.address
    })

    // Create QR code data with patient ID
    qrCodeData.value = JSON.stringify({
      id: newPatient.id,
      firstName: newPatient.firstName,
      lastName: newPatient.lastName
    })

    // Show QR code dialog
    showQRCode.value = true

    $q.notify({
      type: 'positive',
      message: 'Patient registration successful'
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Failed to register patient'
    })
  } finally {
    loading.value = false
  }
}

const printQRCode = () => {
  // Implement print functionality
  window.print()
}

const downloadQRCode = () => {
  // Implement download functionality
  const link = document.createElement('a')
  // Create canvas or use existing QR code element to generate image
  // Set link href and trigger download
}
&lt;/script&gt;

&lt;style lang="scss" scoped&gt;
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
&lt;/style&gt;
