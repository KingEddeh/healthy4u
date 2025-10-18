<![CDATA[<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card class="admin-profile-card">
          <q-card-section>
            <div class="text-h6">Admin Profile</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <!-- Basic Information -->
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="profileData.firstName"
                    label="First Name"
                    outlined
                    dense
                    :rules="[val => !!val || 'First name is required']"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="profileData.lastName"
                    label="Last Name"
                    outlined
                    dense
                    :rules="[val => !!val || 'Last name is required']"
                  />
                </div>
              </div>

              <!-- Contact Information -->
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="profileData.email"
                    label="Email"
                    type="email"
                    outlined
                    dense
                    :rules="[
                      val => !!val || 'Email is required',
                      val => val.includes('@') || 'Please enter a valid email'
                    ]"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="profileData.phone"
                    label="Phone"
                    outlined
                    dense
                    mask="(###) ###-####"
                    :rules="[val => !!val || 'Phone number is required']"
                  />
                </div>
              </div>

              <!-- Admin Role Information -->
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="profileData.role"
                    label="Role"
                    outlined
                    dense
                    readonly
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="profileData.department"
                    label="Department"
                    outlined
                    dense
                    readonly
                  />
                </div>
              </div>

              <!-- Security Settings -->
              <q-expansion-item
                label="Security Settings"
                icon="security"
                header-class="text-primary"
              >
                <q-card>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12">
                        <q-input
                          v-model="securityData.currentPassword"
                          label="Current Password"
                          type="password"
                          outlined
                          dense
                          :rules="[val => !securityData.newPassword || !!val || 'Current password is required to change password']"
                        />
                      </div>
                      <div class="col-12">
                        <q-input
                          v-model="securityData.newPassword"
                          label="New Password"
                          type="password"
                          outlined
                          dense
                          :rules="[
                            val => !val || val.length >= 8 || 'Password must be at least 8 characters',
                            val => !val || /[A-Z]/.test(val) || 'Password must contain at least one uppercase letter',
                            val => !val || /[a-z]/.test(val) || 'Password must contain at least one lowercase letter',
                            val => !val || /[0-9]/.test(val) || 'Password must contain at least one number'
                          ]"
                        />
                      </div>
                      <div class="col-12">
                        <q-input
                          v-model="securityData.confirmPassword"
                          label="Confirm New Password"
                          type="password"
                          outlined
                          dense
                          :rules="[
                            val => !securityData.newPassword || !!val || 'Please confirm your new password',
                            val => !securityData.newPassword || val === securityData.newPassword || 'Passwords do not match'
                          ]"
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <!-- Action Buttons -->
              <div class="row q-gutter-sm justify-end">
                <q-btn
                  label="Reset"
                  type="reset"
                  color="warning"
                  flat
                  class="q-ml-sm"
                />
                <q-btn
                  label="Save Changes"
                  type="submit"
                  color="primary"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  department: string
}

interface SecurityData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const $q = useQuasar()

const profileData = ref<ProfileData>({
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@curalink.health',
  phone: '',
  role: 'System Administrator',
  department: 'IT Administration'
})

const securityData = ref<SecurityData>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const updateProfile = async (data: ProfileData): Promise<void> => {
  // TODO: Implement API call to update profile
  console.log('Updating profile with data:', data)
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
}

const updatePassword = async (data: SecurityData): Promise<void> => {
  if (data.newPassword !== data.confirmPassword) {
    throw new Error('New passwords do not match')
  }
  // TODO: Implement API call to update password
  console.log('Updating password. Current password length:', data.currentPassword.length)
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
}

const onSubmit = async (e?: Event) => {
  if (e) {
    e.preventDefault()
  }
  try {
    await updateProfile(profileData.value)
    if (securityData.value.newPassword) {
      await updatePassword(securityData.value)
    }
    $q.notify({
      type: 'positive',
      message: 'Profile updated successfully'
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update profile'
    $q.notify({
      type: 'negative',
      message
    })
  }
}

// Expose the submit handler for use in the template
defineExpose({
  onSubmit
})
</script>

<style lang="scss" scoped>
.admin-profile-card {
  max-width: 1200px;
  margin: 0 auto;
}
</style>]]>
