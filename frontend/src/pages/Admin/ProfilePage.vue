<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card class="admin-profile-card">
          <q-card-section>
            <div class="text-h6">Admin Profile</div>
          </q-card-section>

          <q-card-section>
            <q-form
              ref="formRef"
              @submit="onSubmit"
              @reset.prevent="onReset"
              class="q-gutter-md"
            >
              <!-- Basic Information -->
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model.trim="profileData.firstName"
                    label="First Name"
                    outlined
                    dense
                    :rules="[req('First name')]"
                    lazy-rules
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model.trim="profileData.lastName"
                    label="Last Name"
                    outlined
                    dense
                    :rules="[req('Last name')]"
                    lazy-rules
                  />
                </div>
              </div>

              <!-- Contact Information -->
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model.trim="profileData.email"
                    label="Email"
                    type="email"
                    outlined
                    dense
                    :rules="[req('Email'), emailRule]"
                    lazy-rules
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model.trim="profileData.phone"
                    label="Phone"
                    outlined
                    dense
                    mask="(###) ###-####"
                    :rules="[req('Phone number')]"
                    lazy-rules
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
                          :rules="[
                            v => !securityData.newPassword || !!v || 'Current password is required to change password'
                          ]"
                          lazy-rules
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
                            v => !v || v.length >= 8 || 'Password must be at least 8 characters',
                            v => !v || /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
                            v => !v || /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
                            v => !v || /[0-9]/.test(v) || 'Password must contain at least one number'
                          ]"
                          autocomplete="new-password"
                          lazy-rules
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
                            v => !securityData.newPassword || !!v || 'Please confirm your new password',
                            v => !securityData.newPassword || v === securityData.newPassword || 'Passwords do not match'
                          ]"
                          autocomplete="new-password"
                          lazy-rules
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
                  :disable="loading"
                />
                <q-btn
                  label="Save Changes"
                  type="submit"
                  color="primary"
                  :loading="loading"
                  :disable="loading"
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
import type { QForm } from 'quasar'

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
const formRef = ref<QForm | null>(null)
const loading = ref(false)

// keep immutable initial states for reliable reset
const initialProfile: ProfileData = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@curalink.health',
  phone: '',
  role: 'System Administrator',
  department: 'IT Administration'
}

const initialSecurity: SecurityData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
}

const profileData = ref<ProfileData>({ ...initialProfile })
const securityData = ref<SecurityData>({ ...initialSecurity })

// reusable rules
const req = (label: string) => (v: unknown) => (!!v || v === 0) || `${label} is required`
const emailRule = (v: string) =>
  /.+@.+\..+/.test(String(v || '')) || 'Please enter a valid email'

// --- API stubs (replace with real calls) ---
const updateProfile = async (data: ProfileData): Promise<void> => {
  // Example: await api.put('/me', data)
  console.log('Updating profile with data:', data)
  await new Promise(resolve => setTimeout(resolve, 600))
}

const updatePassword = async (data: SecurityData): Promise<void> => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    throw new Error('New passwords do not match')
  }
  if (data.newPassword) {
    // Example: await api.post('/me/change-password', { current: data.currentPassword, next: data.newPassword })
    console.log('Updating password. Current password length:', data.currentPassword.length)
    await new Promise(resolve => setTimeout(resolve, 600))
  }
}

// --- Handlers ---
const onSubmit = async (e?: Event) => {
  e?.preventDefault()
  const valid = await formRef.value?.validate()
  if (!valid) return

  loading.value = true
  try {
    await updateProfile(profileData.value)
    await updatePassword(securityData.value)

    $q.notify({ type: 'positive', message: 'Profile updated successfully' })
    // clear password fields after successful update
    securityData.value = { ...initialSecurity }
    // keep profile as-is (it’s saved state now)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update profile'
    $q.notify({ type: 'negative', message })
  } finally {
    loading.value = false
  }
}

const onReset = () => {
  // restore initial values and clear validation
  profileData.value = { ...initialProfile }
  securityData.value = { ...initialSecurity }
  formRef.value?.resetValidation()
}

// Expose the submit handler for parent access if needed
defineExpose({ onSubmit })
</script>

<style lang="scss" scoped>
.admin-profile-card {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
