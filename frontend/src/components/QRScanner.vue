<template>
  <div class="qr-scanner-container">
    <div class="scanner-header q-pa-md text-center">
      <q-icon name="qr_code_scanner" size="40px" color="primary" />
      <h5 class="q-mt-sm q-mb-none">Scan Medical QR Code</h5>
      <p class="text-grey-6 q-mb-none">
        Point your camera at a CuraLink medical QR code
      </p>
    </div>

    <div class="scanner-viewport">
      <video 
        ref="videoElement" 
        class="scanner-video"
        :class="{ 'scanner-active': isScanning }"
        playsinline
      ></video>
      
      <div class="scanner-overlay">
        <div class="scanner-frame"></div>
      </div>

      <div v-if="!isScanning" class="scanner-placeholder">
        <q-icon name="qr_code_scanner" size="80px" color="grey-5" />
        <p class="text-grey-6 q-mt-md">Camera not active</p>
      </div>
    </div>

    <div class="scanner-controls q-pa-md">
      <div class="q-gutter-sm">
        <q-btn 
          v-if="!isScanning"
          color="primary" 
          label="Start Scanning" 
          icon="play_arrow"
          class="full-width"
          @click="startScanning"
        />
        
        <q-btn 
          v-else
          color="negative" 
          label="Stop Scanning" 
          icon="stop"
          class="full-width"
          @click="stopScanning"
        />
        
        <q-btn 
          outline
          color="primary" 
          label="Back" 
          icon="arrow_back"
          class="full-width"
          @click="emit('close')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';
import QrScanner from 'qr-scanner';
import { useQRStore, type MedicalQRData } from '../stores/qr-store';

// Props and Emits
const emit = defineEmits<{
  close: [];
  scanned: [data: MedicalQRData];
}>();

// Reactive refs
const videoElement = ref<HTMLVideoElement>();
const isScanning = ref(false);
const qrScanner = ref<QrScanner | null>(null);

const $q = useQuasar();
const qrStore = useQRStore();

async function startScanning() {
  try {
    if (!videoElement.value) {
      throw new Error('Video element not found');
    }

    // Check if camera is supported
    const hasCamera = await QrScanner.hasCamera();
    if (!hasCamera) {
      $q.notify({
        type: 'negative',
        message: 'No camera found on this device',
        position: 'top'
      });
      return;
    }

    // Create QR scanner instance
    qrScanner.value = new QrScanner(
      videoElement.value,
      (result) => {
        handleScanResult(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        preferredCamera: 'environment' // Use back camera on mobile
      }
    );

    await qrScanner.value.start();
    isScanning.value = true;

    $q.notify({
      type: 'positive',
      message: 'Scanner started. Point your camera at a QR code.',
      position: 'top'
    });

  } catch (error) {
    console.error('Error starting scanner:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to start camera. Please check permissions.',
      position: 'top'
    });
  }
}

function stopScanning() {
  if (qrScanner.value) {
    qrScanner.value.stop();
    qrScanner.value.destroy();
    qrScanner.value = null;
  }
  isScanning.value = false;

  $q.notify({
    type: 'info',
    message: 'Scanner stopped',
    position: 'top'
  });
}

function handleScanResult(data: string) {
  try {
    // Stop scanning first
    stopScanning();

    // Try to parse the QR code data using the store validation
    const validatedData = qrStore.validateMedicalQRData(data);
    
    if (validatedData) {
      $q.notify({
        type: 'positive',
        message: 'Medical QR code scanned successfully!',
        position: 'top'
      });
      
      // Emit the validated data to parent component
      emit('scanned', validatedData);
    } else {
      $q.notify({
        type: 'warning',
        message: 'This QR code does not contain valid CuraLink medical data',
        position: 'top'
      });
    }
  } catch (error) {
    console.error('Error parsing QR code:', error);
    $q.notify({
      type: 'negative',
      message: 'Invalid QR code format',
      position: 'top'
    });
  }
}

// Cleanup on unmount
onUnmounted(() => {
  stopScanning();
});

// Auto-start scanning on mount (optional)
onMounted(() => {
  // Uncomment the next line if you want to auto-start scanning
  // startScanning();
});
</script>

<style lang="scss" scoped>
.qr-scanner-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.scanner-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.scanner-viewport {
  flex: 1;
  position: relative;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scanner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &.scanner-active {
    opacity: 1;
  }
}

.scanner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.scanner-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  border: 3px solid #00b0b0;
  border-radius: 12px;
  background: transparent;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border: 4px solid #00b0b0;
  }
  
  &::before {
    top: -4px;
    left: -4px;
    border-bottom: none;
    border-right: none;
  }
  
  &::after {
    bottom: -4px;
    right: -4px;
    border-top: none;
    border-left: none;
  }
}

.scanner-placeholder {
  text-align: center;
  color: #666;
}

.scanner-controls {
  background: white;
  border-top: 1px solid #e0e0e0;
}

@media (max-width: 480px) {
  .scanner-frame {
    width: 200px;
    height: 200px;
  }
}
</style>
