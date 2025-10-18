&lt;template&gt;
  &lt;div class="patient-emr"&gt;
    &lt;q-card class="emr-card"&gt;
      &lt;q-card-section&gt;
        &lt;div class="text-h6"&gt;Patient EMR&lt;/div&gt;
      &lt;/q-card-section&gt;

      &lt;q-card-section&gt;
        &lt;div v-if="emr"&gt;
          &lt;div class="row q-col-gutter-md"&gt;
            &lt;div class="col-12 col-md-6"&gt;
              &lt;div class="text-subtitle2"&gt;Basic Information&lt;/div&gt;
              &lt;q-list&gt;
                &lt;q-item&gt;
                  &lt;q-item-section&gt;
                    &lt;q-item-label&gt;Blood Type&lt;/q-item-label&gt;
                    &lt;q-item-label caption&gt;{{ emr.bloodType }}&lt;/q-item-label&gt;
                  &lt;/q-item-section&gt;
                &lt;/q-item&gt;
                &lt;q-item&gt;
                  &lt;q-item-section&gt;
                    &lt;q-item-label&gt;Height&lt;/q-item-label&gt;
                    &lt;q-item-label caption&gt;{{ emr.height }} cm&lt;/q-item-label&gt;
                  &lt;/q-item-section&gt;
                &lt;/q-item&gt;
                &lt;q-item&gt;
                  &lt;q-item-section&gt;
                    &lt;q-item-label&gt;Weight&lt;/q-item-label&gt;
                    &lt;q-item-label caption&gt;{{ emr.weight }} kg&lt;/q-item-label&gt;
                  &lt;/q-item-section&gt;
                &lt;/q-item&gt;
              &lt;/q-list&gt;
            &lt;/div&gt;

            &lt;div class="col-12 col-md-6"&gt;
              &lt;div class="text-subtitle2"&gt;Allergies&lt;/div&gt;
              &lt;q-list&gt;
                &lt;q-item v-for="allergy in emr.allergies" :key="allergy"&gt;
                  &lt;q-item-section&gt;
                    &lt;q-item-label&gt;{{ allergy }}&lt;/q-item-label&gt;
                  &lt;/q-item-section&gt;
                &lt;/q-item&gt;
              &lt;/q-list&gt;
            &lt;/div&gt;

            &lt;div class="col-12"&gt;
              &lt;div class="text-subtitle2"&gt;Current Medications&lt;/div&gt;
              &lt;q-list&gt;
                &lt;q-item v-for="medication in emr.currentMedications" :key="medication"&gt;
                  &lt;q-item-section&gt;
                    &lt;q-item-label&gt;{{ medication }}&lt;/q-item-label&gt;
                  &lt;/q-item-section&gt;
                &lt;/q-item&gt;
              &lt;/q-list&gt;
            &lt;/div&gt;

            &lt;div class="col-12"&gt;
              &lt;q-expansion-item
                label="Past Medical History"
                header-class="text-subtitle2"
              &gt;
                &lt;q-card&gt;
                  &lt;q-card-section&gt;
                    {{ emr.pastMedicalHistory }}
                  &lt;/q-card-section&gt;
                &lt;/q-card&gt;
              &lt;/q-expansion-item&gt;
            &lt;/div&gt;

            &lt;div class="col-12"&gt;
              &lt;q-expansion-item
                label="Family Medical History"
                header-class="text-subtitle2"
              &gt;
                &lt;q-card&gt;
                  &lt;q-card-section&gt;
                    {{ emr.familyMedicalHistory }}
                  &lt;/q-card-section&gt;
                &lt;/q-card&gt;
              &lt;/q-expansion-item&gt;
            &lt;/div&gt;

            &lt;div class="col-12"&gt;
              &lt;div class="text-subtitle2"&gt;Immunization History&lt;/div&gt;
              &lt;q-list&gt;
                &lt;q-item v-for="immunization in emr.immunizationHistory" :key="immunization"&gt;
                  &lt;q-item-section&gt;
                    &lt;q-item-label&gt;{{ immunization }}&lt;/q-item-label&gt;
                  &lt;/q-item-section&gt;
                &lt;/q-item&gt;
              &lt;/q-list&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;div v-else class="text-center"&gt;
          &lt;p&gt;No EMR data available for this patient.&lt;/p&gt;
        &lt;/div&gt;
      &lt;/q-card-section&gt;
    &lt;/q-card&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
import { computed } from 'vue'
import { usePatientStore } from 'stores/patient-store'

const props = defineProps&lt;{
  patientId: string
}&gt;()

const patientStore = usePatientStore()
const emr = computed(() => {
  try {
    return patientStore.getPatientEMR(props.patientId)
  } catch {
    return null
  }
})
&lt;/script&gt;

&lt;style lang="scss" scoped&gt;
.emr-card {
  max-width: 1200px;
  margin: 0 auto;
}
&lt;/style&gt;
