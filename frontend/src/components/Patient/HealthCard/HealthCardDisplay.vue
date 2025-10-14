<template>
  <q-card class="health-card">
    <q-card-section class="bg-primary text-white">
      <div class="row items-center justify-between">
        <div class="text-h6">CuraLink Health Card</div>
        <q-avatar class="bg-white" size="40px">
          <img src="../../../assets/logo.jpg" alt="CuraLink Logo" />
        </q-avatar>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row q-col-gutter-md">
        <!-- QR Code -->
        <div class="col-12 col-md-4">
          <HealthCardQR
            :card-number="healthCard.cardNumber"
            :qr-code="healthCard.qrCode"
          />
        </div>

        <!-- Card Details -->
        <div class="col-12 col-md-8">
          <HealthCardDetails
            :health-card="healthCard"
            :user-info="userInfo"
          />
        </div>
      </div>
    </q-card-section>

    <!-- Action Buttons -->
    <q-card-actions align="right">
      <q-btn
        v-if="healthCard.status === 'expired'"
        color="negative"
        label="Renew Card"
        @click="$emit('renew')"
      />
      <q-btn
        color="primary"
        icon="refresh"
        label="Sync Card"
        :loading="syncing"
        @click="handleSync"
      />
      <q-btn
        color="primary"
        icon="download"
        label="Download"
        @click="handleDownload"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HealthCard } from '../../../types/data';
import HealthCardQR from './HealthCardQR.vue';
import HealthCardDetails from './HealthCardDetails.vue';

interface UserInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  bloodType: string;
}

defineProps<{
  healthCard: HealthCard;
  userInfo: UserInfo;
}>();

const emit = defineEmits<{
  (e: 'renew'): void;
  (e: 'sync'): void;
}>();

const syncing = ref(false);

const handleSync = async () => {
  syncing.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    emit('sync');
  } finally {
    syncing.value = false;
  }
};

const handleDownload = () => {
  // Implement PDF download functionality
  console.log('Downloading health card...');
};
</script>

<style scoped>
.health-card {
  max-width: 800px;
  margin: 0 auto;
  transition: transform 0.2s;
}

@media (max-width: 600px) {
  .health-card {
    margin: 1rem;
  }
}
</style>