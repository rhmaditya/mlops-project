<!-- filepath: d:\dataScience\tugas_besar\mlops\Food-Calories-Estimation-Using-Image-Processing-main\frontend\components\PredictionResult.vue -->

<script setup>
import { computed } from 'vue'

const props = defineProps({
  result: {
    type: Object,
    required: true
  }
})

// Safe access with fallbacks
const totalCalories = computed(() => {
  return props.result?.total_calories ?? 0
})

const detections = computed(() => {
  return Array.isArray(props.result?.detections) ? props.result.detections : []
})

const hasDetections = computed(() => {
  return detections.value.length > 0
})

const metadata = computed(() => {
  return props.result?.metadata ?? {}
})

// Safe bbox formatter
const formatBbox = (bbox) => {
  if (!bbox || !Array.isArray(bbox) || bbox.length < 4) {
    return 'N/A'
  }
  try {
    return `[${bbox.map(v => Math.round(v ?? 0)).join(', ')}]`
  } catch (e) {
    return 'N/A'
  }
}

// Safe confidence calculator
const getConfidencePercent = (confidence) => {
  if (typeof confidence !== 'number' || isNaN(confidence)) {
    return 0
  }
  return Math.min(100, Math.max(0, confidence * 100))
}

console.log('🎯 PredictionResult props:', props.result)
</script>

<template>
  <div class="result-container">
    <!-- Summary Card -->
    <div class="card shadow-lg mb-4 result-card">
      <div class="card-header bg-success text-white">
        <h4 class="mb-0">
          <i class="bi bi-check-circle-fill me-2"></i>
          Analysis Results
        </h4>
      </div>
      <div class="card-body p-4">
        <div class="row text-center g-3">
          <!-- Total Calories -->
          <div class="col-md-4">
            <div class="metric-card p-4 bg-light rounded shadow-sm h-100">
              <i class="bi bi-fire fs-1 text-danger mb-2"></i>
              <h2 class="display-3 fw-bold text-primary mb-0">
                {{ totalCalories }}
              </h2>
              <p class="text-muted mb-0">Total Calories (kcal)</p>
            </div>
          </div>
          
          <!-- Items Detected -->
          <div class="col-md-4">
            <div class="metric-card p-4 bg-light rounded shadow-sm h-100">
              <i class="bi bi-grid-3x3-gap-fill fs-1 text-success mb-2"></i>
              <h2 class="display-3 fw-bold text-primary mb-0">
                {{ detections.length }}
              </h2>
              <p class="text-muted mb-0">Items Detected</p>
            </div>
          </div>
          
          <!-- Processing Time -->
          <div class="col-md-4">
            <div class="metric-card p-4 bg-light rounded shadow-sm h-100">
              <i class="bi bi-speedometer2 fs-1 text-info mb-2"></i>
              <h2 class="display-3 fw-bold text-primary mb-0">
                {{ metadata.total_time || 'N/A' }}
              </h2>
              <p class="text-muted mb-0">Processing Time (s)</p>
            </div>
          </div>
        </div>

        <!-- Metadata -->
        <div v-if="metadata.model_used" class="mt-3 text-center">
          <small class="text-muted">
            <i class="bi bi-cpu me-1"></i>
            Model: <strong>{{ metadata.model_used }}</strong>
            <span v-if="metadata.inference_time"> | Inference: {{ metadata.inference_time }}s</span>
          </small>
        </div>
      </div>
    </div>

    <!-- Detection Details -->
    <div v-if="hasDetections" class="card shadow-lg">
      <div class="card-header bg-info text-white">
        <h5 class="mb-0">
          <i class="bi bi-list-ul me-2"></i>
          Detected Food Items ({{ detections.length }})
        </h5>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th width="5%">#</th>
                <th width="25%">Food Item</th>
                <th width="20%">Confidence</th>
                <th width="15%">Calories</th>
                <th width="35%">Bounding Box</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(detection, index) in detections" 
                :key="`detection-${index}`" 
                class="detection-row"
              >
                <td class="fw-bold align-middle">{{ index + 1 }}</td>
                <td class="align-middle">
                  <span class="badge bg-primary fs-6 px-3 py-2">
                    <i class="bi bi-egg-fried me-1"></i>
                    {{ detection.class || detection.name || 'Unknown' }}
                  </span>
                </td>
                <td class="align-middle">
                  <div class="d-flex align-items-center">
                    <div class="progress flex-grow-1 me-2" style="height: 25px;">
                      <div 
                        class="progress-bar" 
                        :class="{
                          'bg-success': detection.confidence >= 0.7,
                          'bg-warning': detection.confidence >= 0.5 && detection.confidence < 0.7,
                          'bg-danger': detection.confidence < 0.5
                        }"
                        :style="`width: ${getConfidencePercent(detection.confidence)}%`"
                        role="progressbar"
                      >
                        {{ getConfidencePercent(detection.confidence).toFixed(1) }}%
                      </div>
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <strong class="text-danger fs-5">{{ detection.calories ?? 0 }}</strong>
                  <small class="text-muted"> kcal</small>
                </td>
                <td class="align-middle">
                  <code class="small text-dark">
                    {{ formatBbox(detection.bbox) }}
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- No Detections -->
    <div v-else class="alert alert-warning d-flex align-items-center mt-4">
      <i class="bi bi-exclamation-circle fs-4 me-3"></i>
      <div>
        <strong>No food items detected</strong>
        <p class="mb-0 mt-1 small">Try uploading a clearer image with recognizable food items.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-card {
  animation: slideUp 0.6s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.metric-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
  border-color: #0d6efd;
}

.detection-row {
  transition: all 0.2s ease;
}

.detection-row:hover {
  background-color: #f8f9fa;
  transform: scale(1.01);
}

.progress {
  border-radius: 10px;
}

.table {
  font-size: 0.95rem;
}

code {
  background: #f1f3f5;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.badge {
  font-weight: 500;
  letter-spacing: 0.5px;
}
</style>