<template>
  <div class="qr-container">
    <!-- QR Code Display -->
    <div class="q-mb-md">
      <img
        :src="qrCode"
        :alt="'QR Code for card ' + cardNumber"
        class="qr-code"
      />
    </div>

    <!-- Card Number -->
    <div class="text-center">
      <div class="text-caption text-grey-7">Card Number</div>
      <div class="text-subtitle1">{{ formatCardNumber(cardNumber) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cardNumber: string;
  qrCode: string;
}>();

const formatCardNumber = (number: string) => {
  // Format as xxxx-xxxx-xxxx-xxxx
  return number.replace(/(\d{4})(?=\d)/g, '$1-');
};
</script>

<style scoped>
.qr-container {
  padding: 1rem;
  border-radius: 8px;
  background: #f8f8f8;
}

.qr-code {
  width: 100%;
  max-width: 200px;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>