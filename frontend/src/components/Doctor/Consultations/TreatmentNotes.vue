<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Treatment Notes</div>
      <div class="q-mt-md">
        <q-input
          v-model="notes"
          type="textarea"
          filled
          autogrow
          label="Add treatment notes"
          @update:model-value="$emit('update', notes)"
        />
      </div>
      <div class="row q-gutter-sm q-mt-md">
        <q-btn
          color="primary"
          icon="print"
          label="Generate & Print"
          @click="$emit('print')"
        />
        <q-btn
          color="secondary"
          icon="save"
          label="Save Notes"
          @click="$emit('save')"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  initialNotes?: string;
}>();

defineEmits<{
  (e: 'update', notes: string): void;
  (e: 'print'): void;
  (e: 'save'): void;
}>();

const notes = ref(props.initialNotes || '');

watchEffect(() => {
  if (props.initialNotes !== undefined) {
    notes.value = props.initialNotes;
  }
});
</script>