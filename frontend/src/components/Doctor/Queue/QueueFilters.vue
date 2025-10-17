<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model="searchText"
          outlined
          dense
          placeholder="Search patients..."
          clearable
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-12 col-md-6">
        <div class="row q-col-gutter-sm items-center">
          <div v-for="priority in priorities" :key="priority" class="col-auto">
            <q-chip
              :class="['priority-' + priority]"
              :label="priority"
              outline
              clickable
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PriorityLevel } from './types'

const searchText = ref('')
const priorities: PriorityLevel[] = ['routine', 'urgent', 'emergency']
</script>

<style scoped>
.priority-emergency.q-chip { color: #FF4444 }
.priority-urgent.q-chip { color: #FFBB33 }
.priority-routine.q-chip { color: #00C851 }
</style>