<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <div class="text-center q-mb-md">
        <q-avatar size="80px" color="primary" text-color="white">
          <q-icon name="folder" size="40px" />
        </q-avatar>
      </div>
      
      <div class="text-center">
        <h4 class="text-h4 q-mt-md q-mb-sm">My Documents</h4>
        <p class="text-grey-6 q-mb-lg">
          Access and manage your medical documents, test results, and health records.
        </p>
        
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6 q-mb-sm">
              <q-icon name="description" class="q-mr-sm" />
              Document Library
            </div>
            <p class="text-caption text-grey-6">
              Upload, view, and organize your medical documents securely.
            </p>
          </q-card-section>
        </q-card>

        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6 q-mb-sm">
              <q-icon name="lab_profile" class="q-mr-sm" />
              Test Results
            </div>
            <p class="text-caption text-grey-6">
              View your latest lab results and medical test reports.
            </p>
          </q-card-section>
        </q-card>

        <q-card class="q-mb-lg">
          <q-card-section>
            <div class="text-h6 q-mb-sm">
              <q-icon name="receipt_long" class="q-mr-sm" />
              Prescriptions
            </div>
            <p class="text-caption text-grey-6">
              Access your prescription history and current medications.
            </p>
          </q-card-section>
        </q-card>

        <q-btn 
          color="primary" 
          label="Upload Document" 
          icon="cloud_upload"
          class="q-mb-sm full-width"
          @click="uploadDocument"
        />
        
        <q-btn 
          flat 
          color="primary" 
          label="Back to Home" 
          @click="goHome"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();

async function goHome() {
  await router.push({ name: 'home' });
}

function uploadDocument() {
  $q.notify({
    type: 'info',
    message: 'Document upload feature coming soon!',
    position: 'top'
  });
}
</script>
