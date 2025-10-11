<template>
  <div class="chat-input q-pa-md bg-white">
    <q-input
      v-model="inputValue"
      type="textarea"
      :rows="1"
      :maxRows="4"
      outlined
      dense
      autogrow
      :placeholder="placeholder"
      :loading="disabled"
      :disable="disabled"
      @keydown.enter.prevent="handleEnter"
      class="q-mr-sm"
    >
      <template v-slot:append>
        <q-btn
          round
          dense
          flat
          :color="inputValue.trim() ? 'primary' : 'grey'"
          icon="send"
          :disable="!inputValue.trim() || disabled"
          @click="handleSend"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
  disabled?: boolean;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'send'): void;
}>();

const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});

const handleSend = () => {
  if (inputValue.value.trim() && !props.disabled) {
    emit('send');
  }
};

const handleEnter = (event: KeyboardEvent) => {
  if (!event.shiftKey) {
    handleSend();
  }
};
</script>

<style scoped>
.chat-input {
  border-top: 1px solid #e0e0e0;
}

.chat-input :deep(.q-field__control) {
  padding-right: 4px;
}

.chat-input :deep(.q-field__append) {
  height: 100%;
  padding: 0;
}
</style>