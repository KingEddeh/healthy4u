<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!-- Reviews Overview -->
      <div class="col-12 col-lg-8">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Reviews & Feedback</div>
            <q-space />
            <q-select
              v-model="filter"
              :options="filterOptions"
              label="Filter"
              outlined
              dense
              style="width: 150px"
              class="q-mr-sm"
            />
            <q-input
              v-model="search"
              outlined
              dense
              placeholder="Search reviews..."
              style="width: 200px"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-card-section>

          <!-- Reviews List -->
          <q-list separator>
            <q-item v-for="review in filteredReviews" :key="review.id">
              <q-item-section avatar>
                <q-avatar>
                  <q-icon
                    :name="getSentimentIcon(review.sentiment)"
                    :color="getSentimentColor(review.sentiment)"
                    size="md"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <div class="row items-center">
                    <div class="text-weight-medium">{{ review.patientName }}</div>
                    <q-rating
                      v-model="review.rating"
                      size="1em"
                      color="amber"
                      readonly
                      class="q-ml-sm"
                    />
                  </div>
                </q-item-label>
                <q-item-label caption>{{ review.date }}</q-item-label>
                <q-item-label class="q-mt-sm">{{ review.comment }}</q-item-label>
                <div class="row q-gutter-x-sm q-mt-sm">
                  <q-chip
                    v-for="tag in review.tags"
                    :key="tag"
                    size="sm"
                    outline
                    color="primary"
                  >
                    {{ tag }}
                  </q-chip>
                </div>
              </q-item-section>

              <q-item-section side>
                <div class="column items-end">
                  <q-btn-dropdown flat dense>
                    <template v-slot:label>
                      <q-chip
                        :color="getStatusColor(review.status)"
                        text-color="white"
                        size="sm"
                      >
                        {{ review.status }}
                      </q-chip>
                    </template>

                    <q-list>
                      <q-item clickable v-close-popup @click="updateStatus(review, 'resolved')">
                        <q-item-section>Mark as Resolved</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="updateStatus(review, 'flagged')">
                        <q-item-section>Flag for Review</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="updateStatus(review, 'pending')">
                        <q-item-section>Mark as Pending</q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>

                  <div class="q-mt-sm">
                    <q-btn flat round size="sm" color="primary" icon="reply" @click="handleReply(review)">
                      <q-tooltip>Reply</q-tooltip>
                    </q-btn>
                    <q-btn flat round size="sm" color="negative" icon="flag" @click="handleFlag(review)">
                      <q-tooltip>Report</q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- Feedback Analytics -->
      <div class="col-12 col-lg-4">
        <!-- Overall Rating -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Overall Rating</div>
            <div class="row items-center q-mt-md">
              <div class="col text-center">
                <div class="text-h3 text-weight-medium">{{ stats.averageRating }}</div>
                <q-rating
                  v-model="stats.averageRating"
                  max="5"
                  size="2em"
                  color="amber"
                  readonly
                />
                <div class="text-caption q-mt-sm">Based on {{ stats.totalReviews }} reviews</div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Rating Distribution -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Rating Distribution</div>
            <div class="q-mt-md">
              <div v-for="n in 5" :key="n" class="row items-center q-mb-sm">
                <div class="col-2">{{ n }}★</div>
                <div class="col">
                  <q-linear-progress
                    :value="getDistributionValue(n)"
                    rounded
                    class="q-mx-sm"
                  />
                </div>
                <div class="col-2 text-right">{{ stats.distribution[n - 1] }}%</div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Common Tags -->
        <q-card>
          <q-card-section>
            <div class="text-h6">Common Feedback Tags</div>
            <div class="q-mt-md">
              <q-chip
                v-for="tag in commonTags"
                :key="tag.name"
                :color="tag.sentiment"
                text-color="white"
                size="md"
                class="q-ma-xs"
              >
                {{ tag.name }} ({{ tag.count }})
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Reply Dialog -->
    <q-dialog v-model="showReplyDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Reply to Review</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="submitReply" class="q-gutter-md">
            <q-input
              v-model="replyText"
              type="textarea"
              label="Your Reply"
              :rules="[val => !!val || 'Reply is required']"
              autogrow
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="negative" flat v-close-popup />
              <q-btn label="Send Reply" type="submit" color="primary" class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import type { Review } from '../../types/admin'

const $q = useQuasar()

// State
const search = ref('')
const filter = ref('all')
const showReplyDialog = ref(false)
const replyText = ref('')
const selectedReview = ref<Review | null>(null)

// Options
const filterOptions = [
  { label: 'All Reviews', value: 'all' },
  { label: 'Positive', value: 'positive' },
  { label: 'Neutral', value: 'neutral' },
  { label: 'Negative', value: 'negative' },
  { label: 'Flagged', value: 'flagged' }
]

// Mock data
const reviews = ref<Review[]>([
  {
    id: 1,
    patientName: 'Juan Dela Cruz',
    rating: 5,
    comment: 'Excellent service! The staff was very professional and caring.',
    date: '2025-10-15',
    sentiment: 'positive',
    status: 'resolved',
    tags: ['Professional', 'Caring', 'Quick Service']
  },
  {
    id: 2,
    patientName: 'Maria Santos',
    rating: 2,
    comment: 'Long waiting time and confusing instructions.',
    date: '2025-10-14',
    sentiment: 'negative',
    status: 'flagged',
    tags: ['Long Wait', 'Confusing']
  }
])

interface Stats {
  averageRating: number;
  totalReviews: number;
  distribution: [number, number, number, number, number];
}

const stats = ref<Stats>({
  averageRating: 4.2,
  totalReviews: 156,
  distribution: [70, 15, 10, 3, 2]
})

const distributionValues = computed(() => ({
  1: stats.value.distribution[0] / 100,
  2: stats.value.distribution[1] / 100,
  3: stats.value.distribution[2] / 100,
  4: stats.value.distribution[3] / 100,
  5: stats.value.distribution[4] / 100,
}))

const commonTags = ref([
  { name: 'Professional', count: 45, sentiment: 'positive' },
  { name: 'Long Wait', count: 23, sentiment: 'negative' },
  { name: 'Friendly Staff', count: 38, sentiment: 'positive' },
  { name: 'Clean Facility', count: 30, sentiment: 'positive' }
])

// Computed
const filteredReviews = computed(() => {
  let filtered = reviews.value

  if (filter.value !== 'all') {
    filtered = filtered.filter(review => review.sentiment === filter.value)
  }

  if (search.value) {
    const searchLower = search.value.toLowerCase()
    filtered = filtered.filter(review =>
      review.patientName.toLowerCase().includes(searchLower) ||
      review.comment.toLowerCase().includes(searchLower)
    )
  }

  return filtered
})

// Handlers
const handleReply = (review: Review) => {
  selectedReview.value = review
  showReplyDialog.value = true
}

const handleFlag = (review: Review) => {
  $q.dialog({
    title: 'Flag Review',
    message: 'Are you sure you want to flag this review for further investigation?',
    ok: {
      color: 'negative',
      label: 'Flag'
    },
    cancel: true
  }).onOk(() => {
    review.status = 'flagged'
    $q.notify({
      color: 'negative',
      message: 'Review has been flagged',
      icon: 'flag'
    })
  })
}

const submitReply = () => {
  console.log('Replying to review:', {
    review: selectedReview.value,
    reply: replyText.value
  })
  showReplyDialog.value = false
  $q.notify({
    color: 'positive',
    message: 'Reply sent successfully',
    icon: 'reply'
  })
  replyText.value = ''
}

const updateStatus = (review: Review, status: 'resolved' | 'flagged' | 'pending') => {
  review.status = status
  $q.notify({
    color: 'positive',
    message: `Review status updated to ${status}`,
    icon: 'update'
  })
}

// Utility functions
const getSentimentIcon = (sentiment: string): string => {
  const icons = {
    positive: 'sentiment_satisfied',
    neutral: 'sentiment_neutral',
    negative: 'sentiment_dissatisfied'
  }
  return icons[sentiment as keyof typeof icons] || 'help'
}

const getSentimentColor = (sentiment: string): string => {
  const colors = {
    positive: 'positive',
    neutral: 'grey',
    negative: 'negative'
  }
  return colors[sentiment as keyof typeof colors] || 'grey'
}

const getStatusColor = (status: string): string => {
  const colors = {
    resolved: 'positive',
    pending: 'warning',
    flagged: 'negative'
  }
  return colors[status as keyof typeof colors] || 'grey'
}

const getDistributionValue = (n: number): number => {
  return distributionValues.value[n as keyof typeof distributionValues.value] || 0
}
</script>

<style lang="scss" scoped>
.q-rating {
  .q-icon {
    font-size: 1.2em;
  }
}

.q-linear-progress {
  height: 8px;
}
</style>
