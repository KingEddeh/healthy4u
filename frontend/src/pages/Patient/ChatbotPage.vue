<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Chat Interface Column -->
      <div class="col-12 col-md-8">
        <q-card class="chat-card">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Health Assistant</div>
            <q-space />
            <q-btn
              flat
              round
              dense
              icon="refresh"
              @click="handleResetChat"
            />
          </q-card-section>

          <q-card-section>
            <div class="chat-container">
              <ChatInterface
                :loading="chatStore.loading"
                @message-sent="handleMessageSent"
                @triage-result="handleTriageResult"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Info Column -->
      <div class="col-12 col-md-4">
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Quick Tips</div>
            <q-list dense>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="check" color="positive" />
                </q-item-section>
                <q-item-section>
                  Describe your symptoms clearly
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="check" color="positive" />
                </q-item-section>
                <q-item-section>
                  Mention when symptoms started
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="check" color="positive" />
                </q-item-section>
                <q-item-section>
                  Include any relevant medical history
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <q-card>
          <q-card-section>
            <div class="text-h6">Common Symptoms</div>
            <div class="row q-gutter-sm q-mt-sm">
              <q-chip
                v-for="symptom in commonSymptoms"
                :key="symptom"
                clickable
                @click="handleSymptomClick(symptom)"
              >
                {{ symptom }}
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Emergency Dialog -->
    <q-dialog v-model="showEmergencyDialog">
      <q-card style="min-width: 350px">
        <q-card-section class="bg-negative text-white">
          <div class="text-h6">Emergency Services</div>
        </q-card-section>

        <q-card-section class="q-pt-md">
          <p>This appears to be an emergency situation. Would you like to:</p>
          <div class="row q-gutter-md">
            <q-btn
              color="negative"
              icon="phone"
              label="Call Emergency (911)"
              @click="handleEmergencyCall"
            />
            <q-btn
              outline
              color="primary"
              icon="local_hospital"
              label="Find Nearest Hospital"
              @click="handleFindHospital"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useChatStore } from '../../stores/chat-store';
import type { ChatMessage } from '../../types/data';
import ChatInterface from '../../components/Patient/Chatbot/ChatInterface.vue';

const $q = useQuasar();
const chatStore = useChatStore();

const showEmergencyDialog = ref(false);

const commonSymptoms = [
  'Headache',
  'Fever',
  'Cough',
  'Sore throat',
  'Fatigue',
  'Nausea',
  'Back pain'
];

const handleMessageSent = async (message: ChatMessage) => {
  try {
    await chatStore.sendMessage(message.content);
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Failed to process your message. Please try again.'
    });
  }
};

const handleTriageResult = (result: { level: string; message: string }) => {
  if (result.level === 'emergency') {
    showEmergencyDialog.value = true;
  }
};

const handleResetChat = () => {
  $q.dialog({
    title: 'Reset Chat',
    message: 'Are you sure you want to reset the chat?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    chatStore.clearChat();
  });
};

const handleEmergencyCall = () => {
  window.location.href = 'tel:911';
};

const handleFindHospital = () => {
  // Implement hospital finder functionality
  // For now, just show a notification
  $q.notify({
    type: 'info',
    message: 'Searching for nearby hospitals...'
  });
};

const handleSymptomClick = async (symptom: string) => {
  await chatStore.sendMessage(`I'm experiencing ${symptom.toLowerCase()}`);
};
</script>

<style scoped>
.chat-card {
  height: calc(100vh - 150px);
  max-height: 800px;
}

.chat-container {
  height: calc(100% - 50px);
}

@media (max-width: 1023px) {
  .chat-card {
    height: calc(100vh - 250px);
  }
}
</style>