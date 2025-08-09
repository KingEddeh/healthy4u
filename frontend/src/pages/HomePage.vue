<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- Header Section -->
    <header class="row items-center justify-between q-mb-md">
      <div>
        <p class="q-ma-none text-grey-9 text-body1">Hello,</p>
        <p class="q-ma-none text-h5 text-bold text-black">{{ currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : 'Juan Dela Cruz' }}</p>
      </div>
      <q-avatar size="52px" color="primary" text-color="white">
        <q-icon name="person" size="30px" />
      </q-avatar>
    </header>

    <!-- Search Section -->
    <q-input
      outlined
      rounded
      v-model="searchQuery"
      :placeholder="searchPlaceholder"
      class="q-mb-lg"
      bg-color="white"
    >
      <template v-slot:prepend>
        <q-icon name="search" class="q-ml-sm" />
      </template>
    </q-input>

    <!-- Updates & Reminders Carousel -->
    <section class="q-mb-lg">
      <h2 class="text-h6 text-bold text-black q-mb-sm">Updates & Reminders</h2>
      <q-carousel
        v-model="carouselSlide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        autoplay
        :autoplay-delay="5000"
        control-color="primary"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        arrows
        height="100px"
        class="info-carousel bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide
          v-for="item in notifications"
          :key="item.name"
          :name="item.name"
          class="column no-wrap flex-center cursor-pointer"
          @click="handleItemClick(item)"
        >
          <div class="row items-center no-wrap full-width">
            <q-icon :name="item.icon" size="44px" class="q-mr-md col-auto" />
            <div class="col text-left">
              <div class="text-weight-bold">{{ item.title }}</div>
              <div class="text-caption">{{ item.message }}</div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </section>

    <!-- Upcoming Appointment Section -->
    <section class="q-mb-lg">
      <h2 class="text-h6 text-bold text-black q-mb-sm">Upcoming Appointment</h2>
      <q-card class="appointment-card-v2" flat>
        <q-card-section class="q-pa-none">
          <div class="bg-primary row items-center justify-center text-white q-pa-sm">
            <div class="text-weight-bold q-mr-xs">{{ upcomingAppointment.day }}</div>
            <div class="text-uppercase">{{ upcomingAppointment.month }}</div>
          </div>

          <div class="q-pa-md">
            <div class="text-h6 text-weight-bold">{{ upcomingAppointment.title }}</div>
            <div class="text-grey-7 q-mb-md">with {{ upcomingAppointment.doctor.name }}</div>

            <div class="column q-gutter-y-sm">
              <div class="row items-center">
                <span class="text-caption text-primary text-weight-medium q-mr-sm">TIME:</span>
                <span class="text-body2 text-grey-8">{{ upcomingAppointment.time }}</span>
              </div>
              <div class="row items-center">
                <span class="text-caption text-primary text-weight-medium q-mr-sm">LOCATION:</span>
                <span class="text-body2 text-grey-8">{{ upcomingAppointment.location }}</span>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-grey-1 q-pa-sm">
          <q-btn flat color="negative" label="Cancel" size="sm" />
          <q-btn flat color="primary" label="Reschedule" size="sm" />
        </q-card-actions>
      </q-card>
    </section>

    <!-- Recent Visits Section -->
    <section>
      <header class="row items-center justify-between q-mb-sm">
        <h2 class="text-h6 text-bold text-black">My Recent Visit</h2>
        <q-btn flat dense no-caps label="See All" color="primary" />
      </header>
      <q-scroll-area horizontal style="height: 225px;">
        <div class="row no-wrap q-gutter-md">
          <q-card v-for="visit in recentVisits" :key="visit.doctor.name" class="recent-doctor-card" flat bordered>
            <div class="q-pa-sm">
              <q-img :src="visit.doctor.avatar" style="height: 100px; border-radius: 8px;" />
            </div>
            <q-card-section class="q-pa-sm q-pt-none text-center">
              <div class="text-bold text-black text-body2">{{ visit.doctor.name }}</div>
              <div class="text-caption text-grey-7">{{ visit.specialty }}</div>
              <div class="text-caption text-grey-7">{{ visit.experience }}</div>
            </q-card-section>
            <q-card-actions align="around" class="q-px-sm q-pb-sm no-wrap">
              <q-btn rounded unelevated color="blue-grey-1" text-color="primary" no-caps label="Book Now" class="full-width q-mr-xs" style="font-size: 11px;"/>
              <q-btn round unelevated color="blue-grey-1" icon="o_call" text-color="primary" size="xs" />
            </q-card-actions>
          </q-card>
        </div>
      </q-scroll-area>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { UserPayload, MedicalRecordData } from '../types/data';

// Current user data
const currentUser = ref<UserPayload | null>(null);
const searchQuery = ref('');
const searchPlaceholder = 'Search Doctor';

// Carousel data
const carouselSlide = ref('healthDataReminder'); // Set to first notification name

// Notifications data for Updates & Reminders carousel
const notifications = ref([
  {
    name: 'healthDataReminder',
    title: 'Update Your Health Data',
    message: 'It\'s time to log your latest blood pressure readings.',
    icon: 'monitor_heart',
    type: 'reminder',
    cta: {
      route: '/health-tracking/blood-pressure'
    }
  },
  {
    name: 'newFeature',
    title: 'New Feature: Meal Planner',
    message: 'Check out our new tool to plan healthy meals.',
    icon: 'restaurant_menu',
    type: 'announcement',
    cta: {
      route: '/meal-planner'
    }
  },
  {
    name: 'generalAnnouncement',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Sunday at 2 AM.',
    icon: 'settings',
    type: 'announcement',
    cta: null
  }
]);

// Upcoming appointment data
const upcomingAppointment = ref({
  doctor: {
    name: 'Dr. Evelyn Reed',
    avatar: 'https://placehold.co/150x150/D6E4FF/333333?text=ER'
  },
  title: 'Cardiology Check-up',
  specialty: 'Cardiology',
  day: '12',
  month: 'AUG',
  date: 'Wed, 12 Aug 2024',
  time: '10:30 AM',
  location: 'St. Luke\'s Medical Center'
});

// Recent visits data
const recentVisits = ref([
  {
    doctor: {
      name: 'Dr. Warner',
      avatar: 'https://placehold.co/150x150/D6E4FF/333333?text=DW'
    },
    specialty: 'Neurology',
    experience: '5 years experience'
  },
  {
    doctor: {
      name: 'Dr. Steave',
      avatar: 'https://placehold.co/150x150/333333/E6F2FF?text=DS'
    },
    specialty: 'Cardiology',
    experience: '7 years experience'
  },
  {
    doctor: {
      name: 'Dr. Riya',
      avatar: 'https://placehold.co/150x150/D6E4FF/333333?text=DR'
    },
    specialty: 'Orthopedics',
    experience: '3 years experience'
  }
]);

// Methods
const handleItemClick = (item: { name: string; title: string; message: string; icon: string; type: string; cta: { route: string } | null }): void => {
  if (item.cta && item.cta.route) {
    console.log(`Navigating to: ${item.cta.route}`);
    // Add navigation logic here when routes are implemented
    // router.push(item.cta.route);
  } else {
    console.log(`Clicked on item with no action: ${item.title}`);
  }
};

// Helper function to create empty medical record
const createEmptyMedicalRecord = (): MedicalRecordData => ({
  date_of_birth: '',
  sex: '',
  allergies: '',
  current_medications: '',
  past_medical_history: '',
  family_medical_history: '',
  immunization_history: '',
  blood_type: '',
  height_cm: null,
  weight_kg: null
});

// Load current user from localStorage on component mount
onMounted(() => {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    try {
      const parsedUser = JSON.parse(userData);
      currentUser.value = {
        ...parsedUser,
      };
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('currentUser');
      // Set default user data
      currentUser.value = {
        id: 'default',
        first_name: 'Juan',
        last_name: 'Dela Cruz',
        email: 'default@example.com',
        password: '',
        user_type: 'patient',
        medical_record: createEmptyMedicalRecord(),
      } as UserPayload;
    }
  } else {
    // Set default user data if no user in localStorage
    currentUser.value = {
      id: 'default',
      first_name: 'Juan',
      last_name: 'Dela Cruz',
      email: 'default@example.com',
      password: '',
      user_type: 'patient',
      medical_record: createEmptyMedicalRecord(),
    } as UserPayload;
  }
});
</script>

<style lang="scss" scoped>
// General Page Styling
.q-page {
  color: #252B5C; // Default dark text color
}

// Updates & Reminders Carousel Styling
.info-carousel {
  border-radius: 12px;

  .q-carousel__slide {
    padding: 12px 20px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  .q-carousel__navigation {
    .q-btn {
      background-color: rgba(255, 255, 255, 0.3);
      color: white;
      margin: 0 4px;
    }
    
    .q-btn--active {
      background-color: white;
      color: #00b0b0;
    }
  }

  .q-carousel__arrow {
    .q-btn {
      background-color: rgba(255, 255, 255, 0.9);
      color: #00b0b0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
}

// Appointment Card Styling
.appointment-card-v2 {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

// Recent Doctor Card Styling
.recent-doctor-card {
  width: 160px;
  border-radius: 12px;
  border-color: #F0F0F0;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
}

// Remove default outline on focus for better visual consistency
.q-field--outlined.q-field--rounded .q-field__control {
  border-radius: 28px;
}

// Mobile-First Design
.q-page {
  padding: 16px !important;
}

.recent-doctor-card {
  width: 140px;
}

// Mobile appointment card adjustments
.appointment-card-v2 {
  .q-card__actions {
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;
    
    .q-btn {
      flex: 1;
    }
  }
}

// Ensure mobile text is readable
.text-h6 {
  font-size: 1.1rem !important;
}

// Quasar Component Overrides
.q-btn--flat:before {
  background: transparent;
}

.q-card {
  background-color: #FFFFFF;
}

.q-input {
  font-family: 'Roboto', sans-serif;
}
</style>
