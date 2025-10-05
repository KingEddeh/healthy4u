<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <div class="text-center q-mb-md">
        <q-avatar size="80px" color="primary" text-color="white">
          <q-icon name="menu" size="40px" />
        </q-avatar>
      </div>
      
      <div class="text-center">
        <h4 class="text-h4 q-mt-md q-mb-sm">Menu</h4>
        <p class="text-grey-6 q-mb-lg">
          Access all SiguraDok features and settings from here.
        </p>
        
        <!-- Main Menu Items -->
        <div class="q-gutter-sm q-mb-lg">
          <q-card class="menu-item" v-for="item in menuItems" :key="item.id" clickable @click="item.action">
            <q-card-section class="row items-center">
              <q-avatar size="40px" :color="item.color" text-color="white">
                <q-icon :name="item.icon" />
              </q-avatar>
              <div class="col q-ml-md text-left">
                <div class="text-h6">{{ item.title }}</div>
                <div class="text-caption text-grey-6">{{ item.description }}</div>
              </div>
              <q-icon name="chevron_right" color="grey-5" />
            </q-card-section>
          </q-card>
        </div>

        <!-- Settings Section -->
        <div class="text-left q-mb-md">
          <div class="text-h6 text-grey-7 q-mb-sm">Settings</div>
          <q-card class="menu-item" v-for="setting in settingsItems" :key="setting.id" clickable @click="setting.action">
            <q-card-section class="row items-center">
              <q-icon :name="setting.icon" :color="setting.color" size="24px" />
              <div class="col q-ml-md text-left">
                <div class="text-subtitle1" :class="setting.textColor">{{ setting.title }}</div>
              </div>
              <q-icon name="chevron_right" color="grey-5" />
            </q-card-section>
          </q-card>
        </div>
        
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

interface MenuItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  textColor?: string;
  action: () => void | Promise<void>;
}

const router = useRouter();
const $q = useQuasar();

const menuItems = ref<MenuItem[]>([
  {
    id: 1,
    title: 'Appointments',
    description: 'Schedule and manage appointments',
    icon: 'event',
    color: 'primary',
    action: () => navigateToFeature('Appointments')
  },
  {
    id: 2,
    title: 'Medications',
    description: 'Track your medications and reminders',
    icon: 'medication',
    color: 'positive',
    action: () => navigateToFeature('Medications')
  },
  {
    id: 3,
    title: 'Health Records',
    description: 'View your complete health history',
    icon: 'health_and_safety',
    color: 'info',
    action: () => navigateToFeature('Health Records')
  },
  {
    id: 4,
    title: 'Emergency Contacts',
    description: 'Manage emergency contact information',
    icon: 'emergency',
    color: 'negative',
    action: () => navigateToFeature('Emergency Contacts')
  }
]);

const settingsItems = ref<MenuItem[]>([
  {
    id: 1,
    title: 'Account Settings',
    description: '',
    icon: 'account_circle',
    color: 'grey-7',
    action: () => navigateToFeature('Account Settings')
  },
  {
    id: 2,
    title: 'Privacy & Security',
    description: '',
    icon: 'security',
    color: 'grey-7',
    action: () => navigateToFeature('Privacy & Security')
  },
  {
    id: 3,
    title: 'Notifications',
    description: '',
    icon: 'notifications',
    color: 'grey-7',
    action: () => navigateToFeature('Notifications')
  },
  {
    id: 4,
    title: 'Help & Support',
    description: '',
    icon: 'help',
    color: 'grey-7',
    action: () => navigateToFeature('Help & Support')
  },
  {
    id: 5,
    title: 'Sign Out',
    description: '',
    icon: 'logout',
    color: 'red',
    textColor: 'text-red',
    action: () => handleLogout()
  }
]);


/**
 * Handle user logout
 */
const handleLogout = async () => {
  try {
    // Clear user data from localStorage
    localStorage.removeItem('currentUser');

    // Redirect to landing page
    await router.push('/signin');
    
    // Show logout notification
    $q.notify({
      color: 'info',
      textColor: 'white',
      icon: 'info',
      message: 'You have been signed out successfully.'
    });

  } catch (error) {
    console.error('Logout error:', error);
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: 'An error occurred during logout.'
    });
  }
};

function navigateToFeature(featureName: string) {
  $q.notify({
    type: 'info',
    message: `${featureName} feature coming soon!`,
    position: 'top'
  });
}
</script>

<style lang="scss" scoped>
.menu-item {
  border-left: 3px solid transparent;
  transition: border-color 0.2s ease-in-out;
  
  &:hover {
    border-left-color: #00b0b0;
  }
}
</style>
