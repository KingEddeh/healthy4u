<template>
  <q-page padding>
    <h2 class="text-h5 q-mb-md">Reviews & Feedback</h2>

    <!-- Overall Rating -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Overall Rating</div>
        <div class="row items-center q-mt-md">
          <div class="col-12 col-md-6 text-center">
            <div class="text-h3 text-primary">{{ averageRating }}/5</div>
            <q-rating
              v-model="averageRating"
              max="5"
              size="2em"
              color="primary"
              readonly
            />
            <div class="text-caption">Based on {{ reviews.length }} reviews</div>
          </div>
          <div class="col-12 col-md-6">
            <div v-for="stat in ratingStats" :key="stat.rating" class="q-mb-sm">
              <div class="row items-center">
                <div class="col-2">{{ stat.rating }}★</div>
                <div class="col-8">
                  <q-linear-progress
                    :value="stat.percentage / 100"
                    color="primary"
                    class="q-mt-sm"
                  />
                </div>
                <div class="col-2 text-right">{{ stat.percentage }}%</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Recent Reviews -->
    <q-card>
      <q-card-section>
        <div class="text-h6">Recent Reviews</div>
        <q-list separator>
          <q-item v-for="review in reviews" :key="review.id">
            <q-item-section>
              <q-item-label>
                <q-rating
                  v-model="review.rating"
                  max="5"
                  size="1em"
                  color="primary"
                  readonly
                />
              </q-item-label>
              <q-item-label>{{ review.comment }}</q-item-label>
              <q-item-label caption>{{ review.date }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-chip
                :color="review.issue ? 'negative' : 'positive'"
                text-color="white"
                size="sm"
              >
                {{ review.issue ? 'Issue Flagged' : 'Positive' }}
              </q-chip>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Mock data for MVP
const reviews = ref([
  {
    id: 1,
    rating: 5,
    comment: 'Very thorough and professional doctor. Explained everything clearly.',
    date: '2025-10-15',
    issue: false
  },
  {
    id: 2,
    rating: 4,
    comment: 'Good consultation but had to wait a bit longer than expected.',
    date: '2025-10-14',
    issue: true
  },
  {
    id: 3,
    rating: 5,
    comment: 'Excellent care and attention to detail.',
    date: '2025-10-13',
    issue: false
  }
]);

const averageRating = computed(() => {
  const total = reviews.value.reduce((acc, review) => acc + review.rating, 0);
  return Number((total / reviews.value.length).toFixed(1));
});

const ratingStats = [
  { rating: 5, percentage: 70 },
  { rating: 4, percentage: 20 },
  { rating: 3, percentage: 5 },
  { rating: 2, percentage: 3 },
  { rating: 1, percentage: 2 }
];
</script>