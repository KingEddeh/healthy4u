<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <div class="text-center q-mb-md">
        <q-avatar size="80px" color="primary" text-color="white">
          <q-icon name="people" size="40px" />
        </q-avatar>
      </div>
      
      <div class="text-center">
        <h4 class="text-h4 q-mt-md q-mb-sm">Health Profiles</h4>
        <p class="text-grey-6 q-mb-lg">
          Manage multiple health profiles for family members and dependents.
        </p>
        
        <!-- Current User Profile -->
        <q-card class="q-mb-md profile-card-primary" clickable @click="viewProfileDetail">
          <q-card-section>
            <div class="row items-center">
              <q-avatar size="50px" color="primary" text-color="white">
                <q-icon name="person" />
              </q-avatar>
              <div class="col q-ml-md text-left">
                <div class="text-h6">Your Profile</div>
                <div class="text-caption text-grey-6">Primary Account</div>
              </div>
              <q-btn flat round icon="chevron_right" color="primary" />
            </div>
          </q-card-section>
        </q-card>

        <!-- Family Profiles -->
        <q-card class="q-mb-md" v-for="profile in familyProfiles" :key="profile.id">
          <q-card-section>
            <div class="row items-center">
              <q-avatar size="50px" color="grey-5" text-color="white">
                <q-icon :name="profile.icon" />
              </q-avatar>
              <div class="col q-ml-md text-left">
                <div class="text-h6">{{ profile.name }}</div>
                <div class="text-caption text-grey-6">{{ profile.relationship }}</div>
              </div>
              <q-btn flat round icon="more_vert" color="grey-6" @click="profileMenu(profile)" />
            </div>
          </q-card-section>
        </q-card>

        <!-- Add New Profile -->
        <q-card class="q-mb-lg add-profile-card">
          <q-card-section>
            <q-btn
              flat
              class="full-width"
              color="primary"
              icon="add"
              label="Add Family Member"
              @click="addProfile"
            />
          </q-card-section>
        </q-card>
        
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

interface FamilyProfile {
  id: number;
  name: string;
  relationship: string;
  icon: string;
}

const router = useRouter();
const $q = useQuasar();

const familyProfiles = ref<FamilyProfile[]>([
  { id: 1, name: 'Emma Johnson', relationship: 'Spouse', icon: 'person' },
  { id: 2, name: 'Alex Johnson', relationship: 'Child', icon: 'child_care' },
]);

async function goHome() {
  await router.push({ name: 'home' });
}

async function viewProfileDetail() {
  await router.push('/profile-detail');
}

function editProfile(profileType: string) {
  $q.notify({
    type: 'info',
    message: `Edit ${profileType} profile feature coming soon!`,
    position: 'top'
  });
}

function profileMenu(profile: FamilyProfile) {
  $q.notify({
    type: 'info',
    message: `Profile options for ${profile.name} coming soon!`,
    position: 'top'
  });
}

function addProfile() {
  $q.notify({
    type: 'info',
    message: 'Add family member feature coming soon!',
    position: 'top'
  });
}
</script>

<style lang="scss" scoped>
.profile-card-primary {
  border-left: 4px solid #00b0b0;
  background: linear-gradient(145deg, #f8fffe 0%, #f0fffe 100%);
}

.add-profile-card {
  border: 2px dashed #00b0b0;
  background: transparent;
}
</style>
