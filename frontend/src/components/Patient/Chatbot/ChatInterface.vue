<template>
  <div class="chat-interface">
    <!-- Chat Messages -->
    <div class="chat-messages" ref="messagesContainer">
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>

    <!-- Triage Result -->
    <TriageResult
      v-if="triageResult"
      :level="triageResult.level"
      :message="triageResult.message"
      class="q-mb-md"
    />

    <!-- Input Area -->
    <ChatInput
      v-model="newMessage"
      :disabled="!!loading"
      @send="handleSendMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import type { ChatMessage as ChatMessageType } from '../../../types/data';
import ChatMessage from './ChatMessage.vue';
import ChatInput from './ChatInput.vue';
import TriageResult from './TriageResult.vue';

interface TriageResult {
  level: 'routine' | 'urgent' | 'very-urgent' | 'emergency';
  message: string;
}

defineProps<{
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'message-sent', message: ChatMessageType): void;
  (e: 'triage-result', result: TriageResult): void;
}>();

const messages = ref<ChatMessageType[]>([
  {
    id: '1',
    senderId: 'system',
    content: 'Hello! I\'m your virtual health assistant. How can I help you today?',
    timestamp: new Date().toISOString(),
    type: 'system'
  }
]);

const newMessage = ref('');
const triageResult = ref<TriageResult | null>(null);
const messagesContainer = ref<HTMLElement | null>(null);

// Mock triage analysis
const analyzeSymptomsAndTriage = async (text: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock analysis based on keywords
  const symptoms = text.toLowerCase();
  if (symptoms.includes('chest pain') || symptoms.includes('difficulty breathing')) {
    return {
      level: 'emergency',
      message: 'This appears to be an emergency situation. Please seek immediate medical attention or call emergency services.'
    } as const;
  } else if (symptoms.includes('fever') || symptoms.includes('severe')) {
    return {
      level: 'urgent',
      message: 'These symptoms require prompt medical attention. Please visit the nearest RHU within 24 hours.'
    } as const;
  } else if (symptoms.includes('headache') || symptoms.includes('cough')) {
    return {
      level: 'routine',
      message: 'Your symptoms suggest a routine condition. Would you like to schedule a check-up?'
    } as const;
  }
  return null;
};

const handleSendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const userMessage: ChatMessageType = {
    id: Math.random().toString(36).substr(2, 9),
    senderId: 'user',
    content: newMessage.value,
    timestamp: new Date().toISOString(),
    type: 'user'
  };

  messages.value.push(userMessage);
  emit('message-sent', userMessage);
  newMessage.value = '';

  // Analyze symptoms
  const result = await analyzeSymptomsAndTriage(userMessage.content);
  if (result) {
    triageResult.value = result;
    emit('triage-result', result);

    const botMessage: ChatMessageType = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: 'bot',
      content: result.message,
      timestamp: new Date().toISOString(),
      type: 'bot',
      triageLevel: result.level
    };
    messages.value.push(botMessage);
  }
};

// Auto-scroll to bottom when new messages are added
watch(() => messages.value.length, async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
});

onMounted(() => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
});
</script>

<style scoped>
.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 600px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>