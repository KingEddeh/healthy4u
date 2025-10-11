<template>
  <div class="review-list">
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h6">My Reviews</div>
      <q-btn
        color="primary"
        icon="rate_review"
        label="Write Review"
        @click="showReviewForm = true"
      />
    </div>

    <div class="row q-col-gutter-md">
      <div
        v-for="review in sortedReviews"
        :key="review.id"
        class="col-12 col-md-6"
      >
        <ReviewCard
          :review="review"
          @edit="editReview"
          @delete="confirmDelete"
        />
      </div>
    </div>

    <!-- No reviews message -->
    <div v-if="!reviews.length" class="text-center q-pa-xl">
      <q-icon name="rate_review" size="48px" color="grey-6" />
      <p class="text-h6 text-grey-6">No reviews yet</p>
      <p class="text-grey-6">Share your experience with others</p>
    </div>

    <!-- Review Form Dialog -->
    <q-dialog v-model="showReviewForm">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ editingReview ? 'Edit Review' : 'New Review' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <ReviewForm
            v-if="editingReview"
            :review="editingReview as Review"
            :loading="false"
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Delete Confirmation Dialog -->
    <q-dialog v-model="showDeleteConfirm">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this review?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="handleDelete" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Review } from '../../../types/data';
import ReviewCard from './ReviewCard.vue';
import ReviewForm from './ReviewForm.vue';

const props = defineProps<{
  reviews: Review[];
}>();

const emit = defineEmits<{
  (e: 'add', review: Omit<Review, 'id' | 'date'>): void;
  (e: 'update', id: string, review: Partial<Review>): void;
  (e: 'delete', id: string): void;
}>();

const showReviewForm = ref(false);
const showDeleteConfirm = ref(false);
const editingReview = ref<Review | null>(null);
const reviewToDelete = ref<string>('');

const sortedReviews = computed(() => {
  return [...props.reviews].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

const editReview = (review: Review) => {
  editingReview.value = review;
  showReviewForm.value = true;
};

const handleSubmit = (reviewData: Partial<Review>) => {
  if (editingReview.value) {
    emit('update', editingReview.value.id, reviewData);
  } else {
    emit('add', reviewData as Omit<Review, 'id' | 'date'>);
  }
  showReviewForm.value = false;
  editingReview.value = null;
};

const handleCancel = () => {
  showReviewForm.value = false;
  editingReview.value = null;
};

const confirmDelete = (reviewId: string) => {
  reviewToDelete.value = reviewId;
  showDeleteConfirm.value = true;
};

const handleDelete = () => {
  emit('delete', reviewToDelete.value);
  showDeleteConfirm.value = false;
  reviewToDelete.value = '';
};
</script>

<style scoped>
.review-list {
  padding: 1rem;
}
</style>