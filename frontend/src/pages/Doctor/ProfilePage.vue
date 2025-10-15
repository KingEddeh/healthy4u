<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!-- Profile Header -->
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center q-gutter-md">
              <q-avatar size="100px">
                <img src="https://cdn.quasar.dev/img/avatar.png" alt="Doctor's profile picture">
              </q-avatar>
              <div class="column">
                <div class="text-h5">Dr. {{ doctorProfile.name }}</div>
                <div class="text-subtitle1">{{ doctorProfile.specialization }}</div>
                <div class="text-caption">License No: {{ doctorProfile.licenseNumber }}</div>
              </div>
              <q-space />
              <q-btn color="primary" icon="edit" label="Edit Profile" @click="editMode = true" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Profile Details -->
      <div class="col-12 col-md-8">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">Profile Information</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <template v-if="!editMode">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <div class="text-subtitle2">Contact Information</div>
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Email</q-item-label>
                        <q-item-label>{{ doctorProfile.email }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Phone</q-item-label>
                        <q-item-label>{{ doctorProfile.phone }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Office Location</q-item-label>
                        <q-item-label>{{ doctorProfile.officeLocation }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12 col-sm-6">
                  <div class="text-subtitle2">Professional Details</div>
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Years of Experience</q-item-label>
                        <q-item-label>{{ doctorProfile.yearsOfExperience }} years</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Languages</q-item-label>
                        <q-item-label>{{ doctorProfile.languages.join(', ') }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Consultation Fee</q-item-label>
                        <q-item-label>${{ doctorProfile.consultationFee }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </template>

            <!-- Edit Form -->
            <template v-else>
              <q-form @submit="saveProfile" class="q-gutter-md">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <q-input
                      v-model="editedProfile.name"
                      label="Full Name"
                      outlined
                      dense
                      :rules="[val => !!val || 'Name is required']"
                    />
                    <q-input
                      v-model="editedProfile.email"
                      label="Email"
                      type="email"
                      outlined
                      dense
                      :rules="[
                        val => !!val || 'Email is required',
                        val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || 'Invalid email'
                      ]"
                    />
                    <q-input
                      v-model="editedProfile.phone"
                      label="Phone"
                      outlined
                      dense
                      :rules="[val => !!val || 'Phone is required']"
                    />
                  </div>
                  <div class="col-12 col-sm-6">
                    <q-input
                      v-model="editedProfile.specialization"
                      label="Specialization"
                      outlined
                      dense
                      :rules="[val => !!val || 'Specialization is required']"
                    />
                    <q-input
                      v-model="editedProfile.licenseNumber"
                      label="License Number"
                      outlined
                      dense
                      :rules="[val => !!val || 'License number is required']"
                    />
                    <q-input
                      v-model.number="editedProfile.consultationFee"
                      label="Consultation Fee"
                      type="number"
                      outlined
                      dense
                      prefix="$"
                      :rules="[val => val > 0 || 'Fee must be greater than 0']"
                    />
                  </div>
                </div>

                <div class="row q-gutter-sm justify-end">
                  <q-btn label="Cancel" color="grey" flat @click="cancelEdit" />
                  <q-btn label="Save Changes" type="submit" color="primary" />
                </div>
              </q-form>
            </template>
          </q-card-section>
        </q-card>
      </div>

      <!-- Schedule & Stats -->
      <div class="col-12 col-md-4">
        <div class="row q-col-gutter-md">
          <!-- Schedule Summary -->
          <div class="col-12">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle1">Today's Schedule</div>
                <div class="text-h5 q-mt-sm">{{ todayStats.appointmentsCount }} Appointments</div>
                <q-linear-progress
                  :value="todayStats.progress"
                  color="primary"
                  class="q-mt-sm"
                />
                <div class="text-caption q-mt-xs">
                  {{ todayStats.completed }} completed of {{ todayStats.appointmentsCount }}
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Quick Stats -->
          <div class="col-12">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle1">Statistics</div>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Total Patients</q-item-label>
                      <q-item-label class="text-h6">{{ stats.totalPatients }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Average Rating</q-item-label>
                      <q-item-label class="text-h6">
                        {{ stats.averageRating }}
                        <q-icon name="star" color="amber" size="sm" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Consultations This Month</q-item-label>
                      <q-item-label class="text-h6">{{ stats.consultationsThisMonth }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const editMode = ref(false);

interface DoctorProfile {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  officeLocation: string;
  yearsOfExperience: number;
  languages: string[];
  consultationFee: number;
}

// Mock data for MVP
const doctorProfile = reactive<DoctorProfile>({
  name: 'John Smith',
  email: 'dr.smith@curalink.com',
  phone: '+1 (555) 123-4567',
  specialization: 'General Practitioner',
  licenseNumber: 'MD123456',
  officeLocation: 'Medical Center, Floor 3, Room 302',
  yearsOfExperience: 12,
  languages: ['English', 'Spanish'],
  consultationFee: 150
});

const editedProfile = reactive({ ...doctorProfile });

const todayStats = reactive({
  appointmentsCount: 8,
  completed: 5,
  progress: 5/8
});

const stats = reactive({
  totalPatients: 1247,
  averageRating: 4.8,
  consultationsThisMonth: 87
});

const saveProfile = () => {
  // In a real application, this would make an API call
  Object.assign(doctorProfile, editedProfile);
  editMode.value = false;
  $q.notify({
    type: 'positive',
    message: 'Profile updated successfully'
  });
};

const cancelEdit = () => {
  Object.assign(editedProfile, doctorProfile);
  editMode.value = false;
};
</script>

<style scoped>
.profile-section {
  margin-bottom: 2rem;
}

.q-card {
  transition: all 0.3s ease;
}

.text-h5 {
  font-weight: 500;
}

.text-subtitle1 {
  color: #666;
}
</style>