<template>
  <div
    class="chat-message q-mb-md"
    :class="{
      'chat-message--user': message.type === 'user',
      'chat-message--bot': message.type === 'bot',
      'chat-message--system': message.type === 'system'
    }"
  >
    <div class="chat-message__avatar">
      <q-avatar :color="avatarColor" text-color="white">
        <q-icon :name="avatarIcon" />
      </q-avatar>
    </div>
    <div class="chat-message__content">
      <div class="chat-message__bubble">
        <div class="chat-message__text">{{ message.content }}</div>
      </div>
      <div class="chat-message__time text-caption text-grey-7">
        {{ formatTime(message.timestamp) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ChatMessage } from '../../../types/data';

const props = defineProps<{
  message: ChatMessage;
}>();

const avatarColor = computed(() => {
  switch (props.message.type) {
    case 'user':
      return 'primary';
    case 'bot':
      return 'secondary';
    case 'system':
      return 'grey-7';
    default:
      return 'grey';
  }
});

const avatarIcon = computed(() => {
  switch (props.message.type) {
    case 'user':
      return 'person';
    case 'bot':
      return 'smart_toy';
    case 'system':
      return 'info';
    default:
      return 'chat';
  }
});

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};
</script>

<style scoped>
.chat-message {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.chat-message--user {
  flex-direction: row-reverse;
}

.chat-message__content {
  max-width: 70%;
}

.chat-message__bubble {
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.chat-message--user .chat-message__bubble {
  background-color: var(--q-primary);
  color: white;
  border-bottom-right-radius: 0.25rem;
}

.chat-message--bot .chat-message__bubble {
  background-color: white;
  border-bottom-left-radius: 0.25rem;
}

.chat-message--system .chat-message__bubble {
  background-color: #f0f0f0;
  border-bottom-left-radius: 0.25rem;
}

.chat-message--user .chat-message__time {
  text-align: right;
}

.chat-message__text {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>