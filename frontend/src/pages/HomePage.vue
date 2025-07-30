<template>
  <q-page class="q-pa-md">
    <!-- Row 1: Greeting -->
    <div class="row justify-center q-mb-lg">
      <div class="col-12 col-md-8 text-center">
        <h4 class="q-mt-sm q-mb-none text-weight-bold">Good Morning, User!</h4>
        <p class="text-grey-7">Here's your dashboard for today.</p>
      </div>
    </div>

    <!-- Row 2: Buttons Grid -->
    <!-- This grid stacks buttons vertically on extra-small screens -->
    <div class="row justify-center q-gutter-y-md q-gutter-sm-md">
      <!-- Records Overview Button -->
      <q-btn
        unelevated
        class="col-11 col-sm-5 col-md-2 dashboard-button"
        to="/records"
      >
        <div class="button-content-wrapper items-center no-wrap">
          <q-avatar size="60px" font-size="30px" color="primary" text-color="white" icon="fas fa-chart-line" />
          <div class="text-container text-weight-medium">Records Overview</div>
        </div>
      </q-btn>

      <!-- QR Code Button -->
      <q-btn
        unelevated
        class="col-11 col-sm-5 col-md-2 dashboard-button"
        to="/qr-code"
      >
        <div class="button-content-wrapper items-center no-wrap">
          <q-avatar size="60px" font-size="30px" color="secondary" text-color="white" icon="fas fa-qrcode" />
          <div class="text-container text-weight-medium">QR Code</div>
        </div>
      </q-btn>

      <!-- Profiles Button -->
      <q-btn
        unelevated
        class="col-11 col-sm-5 col-md-2 dashboard-button"
        to="/profiles"
      >
        <div class="button-content-wrapper items-center no-wrap">
          <q-avatar size="60px" font-size="30px" color="accent" text-color="white" icon="fas fa-users" />
          <div class="text-container text-weight-medium">Profiles</div>
        </div>
      </q-btn>

      <!-- Menu Button -->
      <q-btn
        unelevated
        class="col-11 col-sm-5 col-md-2 dashboard-button"
        to="/menu"
      >
        <div class="button-content-wrapper items-center no-wrap">
          <q-avatar size="60px" font-size="30px" color="info" text-color="white" icon="fas fa-bars" />
          <div class="text-container text-weight-medium">Menu</div>
        </div>
      </q-btn>
    </div>

  </q-page>
</template>

<script setup lang="ts">

</script>

<style scoped>
.dashboard-button {
  height: 180px;
  max-width: 180px;
  border-radius: 20px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  padding: 16px;
}

.dashboard-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
}

.button-content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.text-container {
  margin-top: 1rem;
  text-align: center;
  color: #343a40;
  font-size: 1rem;
}

/* Mobile-first adjustments for screens smaller than 600px */
@media (max-width: 599.98px) {
  .dashboard-button {
    height: 100px; /* Adjust height for horizontal layout */
    max-width: 100%; /* Allow buttons to take full width */
    padding: 0 16px; /* Adjust padding */
  }

  .button-content-wrapper {
    flex-direction: row; /* Change to horizontal layout */
    justify-content: flex-start; /* Align items to the start */
  }

  .text-container {
    margin-top: 0;
    margin-left: 16px; /* Add space between avatar and text */
    text-align: left;
  }

  h4 {
    font-size: 1.75rem; /* Make heading smaller on mobile */
  }
}

/* Tablet view adjustments (sm breakpoint in Quasar) */
@media (min-width: 600px) and (max-width: 1023.98px) {
    .dashboard-button {
        height: 160px;
    }
}
</style>
