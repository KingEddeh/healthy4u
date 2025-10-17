<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="row items-center q-gutter-sm">
        <q-input
          v-model="filters.searchText"
          dense
          outlined
          placeholder="Search appointments..."
          class="col"
          @update:model-value="emitFilters"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-select
          v-model="filters.status"
          :options="statusOptions"
          dense
          outlined
          label="Status"
          class="col-2"
          @update:model-value="emitFilters"
        />
        <q-select
          v-model="filters.date"
          :options="dateOptions"
          dense
          outlined
          label="Date"
          class="col-2"
          @update:model-value="emitFilters"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FilterOptions } from './types';
import { statusOptions, dateOptions } from './types';

const filters = ref<FilterOptions>({
  searchText: '',
  status: null,
  date: null
});

const emit = defineEmits<{
  (e: 'filter', filters: FilterOptions): void;
}>();

const emitFilters = () => {
  emit('filter', filters.value);
};
</script>