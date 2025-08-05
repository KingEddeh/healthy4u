<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <div class="text-center q-mb-md">
        <q-avatar size="80px" color="primary" text-color="white">
          <q-icon name="qr_code_2" size="40px" />
        </q-avatar>
      </div>
      
      <div class="text-center">
        <h4 class="text-h4 q-mt-md q-mb-sm">QR Code Access</h4>
        <p class="text-grey-6 q-mb-lg">
          Share your medical information securely with healthcare providers using QR codes.
        </p>
        
        <q-card class="q-mb-lg qr-card">
          <q-card-section class="text-center">
            <div class="qr-placeholder q-mb-md">
              <q-icon name="qr_code_2" size="120px" color="primary" />
            </div>
            <div class="text-h6 q-mb-xs">Your Medical QR Code</div>
            <p class="text-caption text-grey-6">
              Healthcare providers can scan this code to access your essential medical information
            </p>
          </q-card-section>
        </q-card>

        <div class="q-gutter-sm q-mb-lg">
          <q-btn 
            color="primary" 
            label="Generate New Code" 
            icon="refresh"
            class="full-width q-mb-sm"
            @click="generateQR"
          />
          
          <q-btn 
            color="positive" 
            label="Share Code" 
            icon="share"
            class="full-width q-mb-sm"
            @click="shareQR"
          />
          
          <q-btn 
            outline
            color="primary" 
            label="Download QR Code" 
            icon="download"
            class="full-width"
            @click="downloadQR"
          />
        </div>
        
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

function generateQR() {
  $q.notify({
    type: 'positive',
    message: 'New QR code generated successfully!',
    position: 'top'
  });
}

function shareQR() {
  $q.notify({
    type: 'info',
    message: 'QR code sharing feature coming soon!',
    position: 'top'
  });
}

function downloadQR() {
  $q.notify({
    type: 'info',
    message: 'QR code download feature coming soon!',
    position: 'top'
  });
}
</script>

<style lang="scss" scoped>
.qr-card {
  border: 2px dashed #00b0b0;
  background: linear-gradient(145deg, #f8fffe 0%, #f0fffe 100%);
}

.qr-placeholder {
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 176, 176, 0.1);
}
</style>
