<!-- filepath: d:\dataScience\tugas_besar\mlops\Food-Calories-Estimation-Using-Image-Processing-main\frontend\pages\index.vue -->

<script setup>
useHead({
  title: 'YOLOv8 Food Calories Estimator',
  meta: [
    {
      name: 'description',
      content: 'AI-powered food calorie estimation using YOLOv8 deep learning'
    }
  ]
})
</script>

<template>
  <div class="min-vh-100 d-flex flex-column">
    <!-- Navigation -->
    <NavBar />

    <!-- Main Content -->
    <main class="flex-grow-1 py-5">
      <div class="container">
        <!-- Hero Section -->
        <div class="text-center mb-5">
          <h1 class="display-4 fw-bold text-white mb-3">
            🍎 YOLOv8 Food Calories Estimator
          </h1>
          <p class="lead text-white-50">
            Upload a food image and get instant calorie estimates using AI
          </p>
        </div>

        <!-- Upload Component -->
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <UploadImage />
          </div>
        </div>

        <!-- Features -->
        <div class="row mt-5 g-4">
          <div class="col-md-4">
            <div class="card feature-card h-100 shadow">
              <div class="card-body text-center p-4">
                <i class="bi bi-lightning-charge-fill fs-1 text-warning mb-3"></i>
                <h5 class="card-title">Fast Detection</h5>
                <p class="card-text text-muted">
                  Real-time food recognition in seconds
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card feature-card h-100 shadow">
              <div class="card-body text-center p-4">
                <i class="bi bi-graph-up fs-1 text-success mb-3"></i>
                <h5 class="card-title">High Accuracy</h5>
                <p class="card-text text-muted">
                  State-of-the-art YOLOv8 model
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card feature-card h-100 shadow">
              <div class="card-body text-center p-4">
                <i class="bi bi-calculator-fill fs-1 text-info mb-3"></i>
                <h5 class="card-title">Smart Estimation</h5>
                <p class="card-text text-muted">
                  Accurate calorie calculation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-3 mt-auto">
      <div class="container text-center">
        <p class="mb-0">
          <i class="bi bi-heart-fill text-danger me-2"></i>
          Built with YOLOv8, Nuxt.js, and Express.js
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.feature-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px solid #dee2e6;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15) !important;
  border-color: #0d6efd;
}
</style>