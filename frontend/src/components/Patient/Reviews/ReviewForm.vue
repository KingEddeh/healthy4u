<template>
  <div class="review-form">
    <q-form @submit="onSubmit">
      <!-- Institution Selection -->
      <div class="q-mb-md">
        <q-select
          v-model="form.institutionId"
          :options="institutionOptions"
          label="Select Institution *"
          emit-value
          map-options
          :rules="[val => !!val || 'Please select an institution']"
        />
      </div>

      <!-- Rating -->
      <div class="q-mb-md">
        <div class="text-subtitle2 q-mb-sm">Rating *</div>
        <q-rating
          v-model="form.rating"
          size="2em"
          color="primary"
          icon="star_border"
          icon-selected="star"
          :rules="[(val: number) => val > 0 || 'Please select a rating']"
        />
      </div>

      <!-- Review Comment -->
      <div class="q-mb-md">
        <q-input
          v-model="form.comment"
          type="textarea"
          label="Your Review *"
          rows="4"
          :rules="[
            val => !!val || 'Please write your review',
            val => val.length >= 10 || 'Review must be at least 10 characters'
          ]"
        />
      </div>

      <!-- Anonymous Option -->
      <div class="q-mb-lg">
        <q-checkbox
          v-model="form.isAnonymous"
          label="Post anonymously"
        />
      </div>

      <!-- Submit Buttons -->
      <div class="row justify-end q-gutter-sm">
        <q-btn
          flat
          color="primary"
          label="Cancel"
          @click="$emit('cancel')"
        />
        <q-btn
          type="submit"
          color="primary"
          :label="review ? 'Update Review' : 'Submit Review'"
          :loading="loading"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Review } from '../../../types/data';

const props = defineProps<{
  review?: Review;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit', review: Partial<Review>): void;
  (e: 'cancel'): void;
}>();

interface InstitutionOption {
  label: string;
  value: string;
}

// Mock institutions data - replace with API call
const institutionOptions: InstitutionOption[] = [
  { label: 'Rural Health Unit 1', value: 'rhu1' },
  { label: 'Rural Health Unit 2', value: 'rhu2' },
  { label: 'City General Hospital', value: 'hosp1' }
];

const form = ref({
  institutionId: '',
  rating: 0,
  comment: '',
  isAnonymous: false
});

const onSubmit = () => {
  emit('submit', {
    institutionId: form.value.institutionId,
    rating: form.value.rating,
    comment: form.value.comment,
    isAnonymous: form.value.isAnonymous
  });
};

onMounted(() => {
  if (props.review) {
    form.value = {
      institutionId: props.review.institutionId,
      rating: props.review.rating,
      comment: props.review.comment,
      isAnonymous: props.review.isAnonymous
    };
  }
});
</script>

<style scoped>
.review-form {
  padding: 1rem;
}
</style>