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
          WAG NIYO SABIHIN NA DI GUMANA PLS HUHUHUH GINAGAWA KO PA KAGABI PA AYAW PARIN AAAAAA.
        </p>
        
        <q-card class="q-mb-lg qr-card">
          <q-card-section class="text-center">
            <div class="qr-placeholder q-mb-md">
              <img 
                v-if="qrCodeDataURL" 
                :src="qrCodeDataURL" 
                alt="Medical QR Code"
                class="qr-image"
              />
              <q-icon 
                v-else 
                name="qr_code_2" 
                size="120px" 
                color="primary" 
              />
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
            color="secondary" 
            label="Scan QR Code" 
            icon="qr_code_scanner"
            class="full-width q-mb-sm"
            @click="goToScanner"
          />
          
          <q-btn 
            color="positive" 
            label="Share Code" 
            icon="share"
            class="full-width q-mb-sm"
            @click="shareQR"
            :disable="!qrCodeDataURL"
          />
          
          <q-btn 
            outline
            color="primary" 
            label="Download QR Code" 
            icon="download"
            class="full-width"
            @click="downloadQR"
            :disable="!qrCodeDataURL"
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useQRStore } from '../stores/qr-store';
import type { UserPayload } from '../types/data';

const router = useRouter();
const $q = useQuasar();
const qrStore = useQRStore();

const qrCodeDataURL = ref<string>('');
const userData = ref<UserPayload | null>(null);

async function goHome() {
  await router.push({ name: 'home' });
}

async function generateQR() {
  try {
    if (!userData.value) {
      $q.notify({
        type: 'negative',
        message: 'No user data found. Please complete your profile first.',
        position: 'top'
      });
      return;
    }

    // Use the QR store to generate QR code
    const dataURL = await qrStore.generateQRFromUser(userData.value);
    qrCodeDataURL.value = dataURL;
    
    $q.notify({
      type: 'positive',
      message: 'New QR code generated successfully!',
      position: 'top'
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to generate QR code',
      position: 'top'
    });
  }
}

async function shareQR() {
  if (!qrCodeDataURL.value) {
    $q.notify({
      type: 'warning',
      message: 'Please generate a QR code first',
      position: 'top'
    });
    return;
  }

  try {
    if (navigator.share && userData.value) {
      // Use the store method to generate blob
      const blob = await qrStore.generateQRBlob(userData.value);
      const file = new File([blob], 'medical-qr-code.png', { type: 'image/png' });
      
      await navigator.share({
        title: 'CuraLink Medical QR Code',
        text: 'My medical information QR code',
        files: [file]
      });
    } else {
      $q.notify({
        type: 'info',
        message: 'Sharing not supported on this device',
        position: 'top'
      });
    }
  } catch (error) {
    console.error('Error sharing QR code:', error);
    $q.notify({
      type: 'info',
      message: 'Sharing cancelled or not supported',
      position: 'top'
    });
  }
}

function downloadQR() {
  if (!qrCodeDataURL.value) {
    $q.notify({
      type: 'warning',
      message: 'Please generate a QR code first',
      position: 'top'
    });
    return;
  }

  try {
    const link = document.createElement('a');
    link.download = `curalink-medical-qr-${new Date().getTime()}.png`;
    link.href = qrCodeDataURL.value;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    $q.notify({
      type: 'positive',
      message: 'QR code downloaded successfully!',
      position: 'top'
    });
  } catch (error) {
    console.error('Error downloading QR code:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to download QR code',
      position: 'top'
    });
  }
}

async function goToScanner() {
  await router.push({ name: 'qr-scanner' });
}

onMounted(async () => {
  // Load user data from localStorage
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    userData.value = JSON.parse(storedUser);
    // Auto-generate QR code on mount
    await generateQR();
  } else {
    $q.notify({
      type: 'warning',
      message: 'No user data found. Please register first.',
      position: 'top'
    });
  }
});
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.qr-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
}
</style>
