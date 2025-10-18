&lt;template&gt;
  &lt;div class="patient-check-in"&gt;
    &lt;q-card class="check-in-card"&gt;
      &lt;q-card-section&gt;
        &lt;div class="text-h6"&gt;Patient Check-In&lt;/div&gt;
      &lt;/q-card-section&gt;

      &lt;q-card-section&gt;
        &lt;div v-if="!showScanner" class="text-center"&gt;
          &lt;q-btn
            color="primary"
            icon="qr_code_scanner"
            label="Scan Patient Card"
            @click="startScanning"
          /&gt;
        &lt;/div&gt;

        &lt;q-dialog v-model="showScanner" persistent&gt;
          &lt;q-card style="min-width: 350px"&gt;
            &lt;q-card-section class="row items-center"&gt;
              &lt;q-space /&gt;
              &lt;q-btn icon="close" flat round dense v-close-popup @click="stopScanning" /&gt;
            &lt;/q-card-section&gt;

            &lt;q-card-section class="q-pt-none"&gt;
              &lt;qr-scanner @decoded="onQRDecoded" @error="onQRError" /&gt;
            &lt;/q-card-section&gt;
          &lt;/q-card&gt;
        &lt;/q-dialog&gt;

        &lt;div v-if="patientInfo" class="patient-info q-mt-md"&gt;
          &lt;q-card-section&gt;
            &lt;div class="text-h6"&gt;Patient Information&lt;/div&gt;
            &lt;div class="row q-col-gutter-md q-mt-md"&gt;
              &lt;div class="col-12 col-md-6"&gt;
                &lt;p&gt;&lt;strong&gt;Name:&lt;/strong&gt; {{ patientInfo.firstName }} {{ patientInfo.lastName }}&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;ID:&lt;/strong&gt; {{ patientInfo.id }}&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Date of Birth:&lt;/strong&gt; {{ patientInfo.dateOfBirth }}&lt;/p&gt;
              &lt;/div&gt;
              &lt;div class="col-12 col-md-6"&gt;
                &lt;p&gt;&lt;strong&gt;Phone:&lt;/strong&gt; {{ patientInfo.phone }}&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Address:&lt;/strong&gt; {{ patientInfo.address }}&lt;/p&gt;
              &lt;/div&gt;
            &lt;/div&gt;

            &lt;patient-e-m-r
              v-if="patientInfo.id"
              :patient-id="patientInfo.id"
              class="q-mt-md q-mb-md"
            /&gt;

            &lt;div class="row justify-end"&gt;
              &lt;q-btn
                color="primary"
                label="Check In Patient"
                @click="checkInPatient"
                :loading="loading"
              /&gt;
            &lt;/div&gt;
          &lt;/q-card-section&gt;
        &lt;/div&gt;
      &lt;/q-card-section&gt;
    &lt;/q-card&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import QrScanner from 'components/QRScanner.vue'
import PatientEMR from './PatientEMR.vue'
import { usePatientStore } from 'stores/patient-store'

const $q = useQuasar()
const patientStore = usePatientStore()
patientStore.initializeStore()

const showScanner = ref(false)
const loading = ref(false)
const patientInfo = ref(null)

const startScanning = () => {
  showScanner.value = true
}

const stopScanning = () => {
  showScanner.value = false
}

const onQRDecoded = async (decodedString: string) => {
  try {
    const data = JSON.parse(decodedString)
    const patient = patientStore.getPatientById(data.id)

    if (patient) {
      patientInfo.value = patient
      showScanner.value = false
    } else {
      throw new Error('Patient not found in offline storage')
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Invalid QR code or patient not found'
    })
  }
}

const onQRError = (error: Error) => {
  $q.notify({
    type: 'negative',
    message: 'Failed to scan QR code: ' + error.message
  })
}

const checkInPatient = async () => {
  loading.value = true
  try {
    await patientStore.addCheckIn(patientInfo.value.id)

    $q.notify({
      type: 'positive',
      message: 'Patient checked in successfully'
    })

    // Reset form
    patientInfo.value = null
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Failed to check in patient'
    })
  } finally {
    loading.value = false
  }
}
&lt;/script&gt;

&lt;style lang="scss" scoped&gt;
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
&lt;/style&gt;
