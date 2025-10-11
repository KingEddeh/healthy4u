<template>
  <div class="health-card-details">
    <!-- Patient Info -->
    <div class="row q-col-gutter-md">
      <!-- Personal Info -->
      <div class="col-12">
        <div class="text-h6">{{ userInfo.firstName }} {{ userInfo.lastName }}</div>
        <div class="text-subtitle2 text-grey-7">
          Born: {{ formatDate(userInfo.dateOfBirth) }}
        </div>
      </div>

      <!-- Card Info -->
      <div class="col-12 col-sm-6">
        <div class="detail-group">
          <div class="text-caption text-grey-7">Blood Type</div>
          <div class="text-subtitle1">{{ userInfo.bloodType }}</div>
        </div>
      </div>

      <div class="col-12 col-sm-6">
        <div class="detail-group">
          <div class="text-caption text-grey-7">Status</div>
          <div>
            <q-badge
              :color="getStatusColor(healthCard.status)"
              :label="formatStatus(healthCard.status)"
            />
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6">
        <div class="detail-group">
          <div class="text-caption text-grey-7">Issue Date</div>
          <div class="text-subtitle1">{{ formatDate(healthCard.issueDate) }}</div>
        </div>
      </div>

      <div class="col-12 col-sm-6">
        <div class="detail-group">
          <div class="text-caption text-grey-7">Expiry Date</div>
          <div class="text-subtitle1">{{ formatDate(healthCard.expiryDate) }}</div>
        </div>
      </div>

      <!-- NFC Info -->
      <div v-if="healthCard.nfcId" class="col-12">
        <q-banner class="bg-blue-1">
          <template v-slot:avatar>
            <q-icon name="nfc" color="primary" />
          </template>
          <div class="text-subtitle2">NFC-enabled Card</div>
          <div class="text-caption text-grey-7">
            You can also tap your card on compatible devices
          </div>
        </q-banner>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HealthCard } from '../../../types/data';

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatStatus = (status: HealthCard['status']) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const getStatusColor = (status: HealthCard['status']) => {
  const colors = {
    active: 'positive',
    inactive: 'warning',
    expired: 'negative'
  };
  return colors[status];
};
</script>

<style scoped>
.health-card-details {
  padding: 1rem;
}

.detail-group {
  margin-bottom: 1rem;
}

@media (max-width: 600px) {
  .detail-group {
    margin-bottom: 0.5rem;
  }
}
</style>