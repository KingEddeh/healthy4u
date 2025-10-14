<template>
  <q-page>
    <div class="q-pa-md">
      <div class="text-h5 q-mb-lg">My Health Card</div>

      <template v-if="loading">
        <div class="row justify-center q-pa-lg">
          <q-spinner
            color="primary"
            size="3em"
          />
        </div>
      </template>

      <template v-else-if="!healthCard">
        <!-- No Card View -->
        <div class="text-center q-pa-xl">
          <q-icon name="credit_card" size="48px" color="grey-6" />
          <p class="text-h6 text-grey-6">No Health Card Found</p>
          <p class="text-grey-6">Visit your nearest RHU to get your health card</p>
          <q-btn
            color="primary"
            label="Find Nearest RHU"
            icon="location_on"
            @click="findNearestRHU"
          />
        </div>
      </template>

      <template v-else>
        <!-- Health Card Display -->
        <HealthCardDisplay
          :health-card="healthCard"
          :user-info="userInfo"
          @renew="handleRenew"
          @sync="handleSync"
        />

        <!-- Instructions -->
        <q-card class="q-mt-md">
          <q-card-section>
            <div class="text-subtitle1">Using Your Health Card</div>
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="qr_code_scanner" color="primary" />
                </q-item-section>
                <q-item-section>
                  Present the QR code at any CuraLink-enabled facility
                </q-item-section>
              </q-item>
              <q-item v-if="healthCard.nfcId">
                <q-item-section avatar>
                  <q-icon name="nfc" color="primary" />
                </q-item-section>
                <q-item-section>
                  Or tap your card on NFC-enabled devices
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="sync" color="primary" />
                </q-item-section>
                <q-item-section>
                  Keep your card synced for up-to-date information
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HealthCard } from '../../types/data';
import HealthCardDisplay from '../../components/Patient/HealthCard/HealthCardDisplay.vue';

const loading = ref(true);
const healthCard = ref<HealthCard | null>(null);
const userInfo = ref({
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  bloodType: 'O+'
});

// Mock data - replace with API calls
const fetchHealthCard = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  healthCard.value = {
    id: 'card1',
    patientId: 'pat1',
    cardNumber: '1234567890123456',
    issueDate: '2025-01-01',
    expiryDate: '2027-01-01',
    status: 'active',
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
    nfcId: 'nfc123'
  };
  loading.value = false;
};

const handleRenew = () => {
  // Implement renewal logic
  console.log('Renewing card...');
};

const handleSync = () => {
  // Implement sync logic
  console.log('Syncing card...');
};

const findNearestRHU = () => {
  // Implement RHU finder
  console.log('Finding nearest RHU...');
};

onMounted(async () => {
  await fetchHealthCard();
});
</script>