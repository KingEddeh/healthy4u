<template>
  <q-card class="review-card">
    <q-card-section>
      <div class="row items-center justify-between q-mb-sm">
        <div class="text-subtitle1 text-weight-medium">{{ institutionName }}</div>
        <div class="row items-center q-gutter-x-sm">
          <q-badge
            :color="getStatusColor(review.status)"
            :label="review.status"
          />
          <q-btn-dropdown flat dense color="grey" icon="more_vert">
            <q-list>
              <q-item clickable v-close-popup @click="$emit('edit', review)">
                <q-item-section avatar>
                  <q-icon name="edit" />
                </q-item-section>
                <q-item-section>Edit</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="$emit('delete', review.id)">
                <q-item-section avatar>
                  <q-icon name="delete" color="negative" />
                </q-item-section>
                <q-item-section class="text-negative">Delete</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>

      <div class="row items-center q-mb-sm">
        <q-rating
          :model-value="review.rating"
          size="1.5em"
          color="primary"
          readonly
        />
        <q-space />
        <div class="text-caption text-grey">{{ formatDate(review.date) }}</div>
      </div>

      <div class="text-body2">{{ review.comment }}</div>

      <div v-if="review.isAnonymous" class="text-caption text-grey q-mt-sm">
        Posted anonymously
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Review } from '../../../types/data';

const props = defineProps<{
  review: Review;
}>();

defineEmits<{
  (e: 'edit', review: Review): void;
  (e: 'delete', id: string): void;
}>();

// Mock institutions data - replace with API call
const institutions: Record<string, string> = {
  'rhu1': 'Rural Health Unit 1',
  'rhu2': 'Rural Health Unit 2',
  'hosp1': 'City General Hospital'
};

const institutionName = computed(() => {
  return institutions[props.review.institutionId] || 'Unknown Institution';
});

const getStatusColor = (status: Review['status']) => {
  const colors = {
    pending: 'warning',
    approved: 'positive',
    rejected: 'negative'
  };
  return colors[status];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>

<style scoped>
.review-card {
  transition: transform 0.2s;
}

.review-card:hover {
  transform: translateY(-2px);
}
</style>