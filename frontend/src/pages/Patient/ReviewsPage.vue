<template>
  <q-page>
    <div class="q-pa-md">
      <div class="text-h5 q-mb-lg">My Reviews & Feedback</div>
      
      <ReviewList
        :reviews="reviews"
        @add="handleAddReview"
        @update="handleUpdateReview"
        @delete="handleDeleteReview"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Review } from '../../types/data';
import ReviewList from '../../components/Patient/Reviews/ReviewList.vue';

const reviews = ref<Review[]>([]);

// Mock data - replace with API calls
const fetchReviews = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  reviews.value = [
    {
      id: '1',
      patientId: 'pat1',
      institutionId: 'rhu1',
      rating: 5,
      comment: 'Excellent service and caring staff. Very clean facility.',
      date: '2025-10-01',
      isAnonymous: false,
      status: 'approved'
    },
    {
      id: '2',
      patientId: 'pat1',
      institutionId: 'hosp1',
      rating: 4,
      comment: 'Good experience overall. Wait times could be shorter.',
      date: '2025-09-15',
      isAnonymous: true,
      status: 'pending'
    }
  ];
};

const handleAddReview = async (reviewData: Omit<Review, 'id' | 'date'>) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newReview: Review = {
    ...reviewData,
    id: `${Date.now()}`,
    date: new Date().toISOString(),
    status: 'pending',
    patientId: 'pat1' // Mock patient ID - should come from auth context
  };
  reviews.value.unshift(newReview);
};

const handleUpdateReview = async (id: string, reviewData: Partial<Review>) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = reviews.value.findIndex(r => r.id === id);
  if (index !== -1) {
    const currentReview = reviews.value[index];
    reviews.value[index] = {
      ...currentReview,
      ...reviewData,
      status: 'pending' // Reset to pending when updated
    } as Review;
  }
};

const handleDeleteReview = async (id: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  reviews.value = reviews.value.filter(r => r.id !== id);
};

onMounted(async () => {
  await fetchReviews();
});
</script>