<!-- filepath: d:\dataScience\tugas_besar\mlops\Food-Calories-Estimation-Using-Image-Processing-main\frontend\pages\about.vue -->

<template>
  <div class="app-container">
    <NavBar />

    <main class="flex-grow-1 py-5">
      <div class="container">
        <!-- Hero Section -->
        <div class="text-center mb-5 about-card">
          <h1 class="display-4 fw-bold text-white mb-3">
            <i class="bi bi-info-circle-fill me-3"></i>
            About YOLOv8 Food Calories Estimator
          </h1>
          <p class="lead text-white-50">
            AI-powered food detection and calorie estimation using state-of-the-art YOLOv8 deep learning model
          </p>
        </div>

        <!-- Tech Stack -->
        <div class="row g-4 mb-5">
          <div class="col-md-4">
            <div class="card tech-card h-100 shadow">
              <div class="card-body text-center">
                <i class="bi bi-robot fs-1 text-primary mb-3"></i>
                <h5 class="card-title">YOLOv8</h5>
                <p class="card-text text-muted">
                  Latest YOLO architecture for real-time object detection with high accuracy
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card tech-card h-100 shadow">
              <div class="card-body text-center">
                <i class="bi bi-code-square fs-1 text-success mb-3"></i>
                <h5 class="card-title">Nuxt.js 3</h5>
                <p class="card-text text-muted">
                  Modern Vue.js framework for building fast and responsive web applications
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card tech-card h-100 shadow">
              <div class="card-body text-center">
                <i class="bi bi-server fs-1 text-danger mb-3"></i>
                <h5 class="card-title">Node.js + Express</h5>
                <p class="card-text text-muted">
                  Robust backend API server for handling image processing requests
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- How It Works -->
        <div class="card shadow-lg mb-5">
          <div class="card-header bg-primary text-white">
            <h3 class="mb-0">
              <i class="bi bi-gear-fill me-2"></i>
              How It Works
            </h3>
          </div>
          <div class="card-body p-4">
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-icon bg-primary">1</div>
                <div class="timeline-content">
                  <h5>Upload Image</h5>
                  <p class="text-muted">User uploads a food image through the web interface</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-icon bg-success">2</div>
                <div class="timeline-content">
                  <h5>Image Processing</h5>
                  <p class="text-muted">Backend receives and preprocesses the image for YOLOv8 model</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-icon bg-warning">3</div>
                <div class="timeline-content">
                  <h5>Object Detection</h5>
                  <p class="text-muted">YOLOv8 detects food items with bounding boxes and confidence scores</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-icon bg-danger">4</div>
                <div class="timeline-content">
                  <h5>Calorie Estimation</h5>
                  <p class="text-muted">System calculates calories based on detected food type and portion size</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-icon bg-purple">5</div>
                <div class="timeline-content">
                  <h5>Display Results</h5>
                  <p class="text-muted">Results are displayed with detailed nutritional information</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="card shadow-lg mb-5">
          <div class="card-header bg-success text-white">
            <h3 class="mb-0">
              <i class="bi bi-stars me-2"></i>
              Key Features
            </h3>
          </div>
          <div class="card-body p-4">
            <div class="row g-3">
              <div class="col-12">
                <div class="feature-item">
                  <i class="bi bi-lightning-charge-fill text-warning"></i>
                  <strong>Real-time Detection:</strong> Fast food recognition in seconds
                </div>
              </div>
              <div class="col-12">
                <div class="feature-item">
                  <i class="bi bi-graph-up text-primary"></i>
                  <strong>High Accuracy:</strong> State-of-the-art YOLOv8 model with 90%+ accuracy
                </div>
              </div>
              <div class="col-12">
                <div class="feature-item">
                  <i class="bi bi-camera-fill text-info"></i>
                  <strong>Multiple Foods:</strong> Detect multiple food items in a single image
                </div>
              </div>
              <div class="col-12">
                <div class="feature-item">
                  <i class="bi bi-calculator-fill text-success"></i>
                  <strong>Smart Estimation:</strong> Portion-aware calorie calculation
                </div>
              </div>
              <div class="col-12">
                <div class="feature-item">
                  <i class="bi bi-phone-fill text-danger"></i>
                  <strong>Responsive Design:</strong> Works on desktop, tablet, and mobile devices
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Requirements -->
        <div class="row g-4 mb-5">
          <div class="col-md-6">
            <div class="card req-card shadow h-100">
              <div class="card-header bg-info text-white">
                <h5 class="mb-0">
                  <i class="bi bi-pc-display me-2"></i>
                  Frontend Requirements
                </h5>
              </div>
              <div class="card-body">
                <ul class="list-unstyled mb-0">
                  <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Node.js 16+</li>
                  <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Nuxt.js 3</li>
                  <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Vue.js 3</li>
                  <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Bootstrap 5</li>
                  <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Modern Browser</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card req-card shadow h-100">
              <div class="card-header bg-warning text-dark">
                <h5 class="mb-0">
                  <i class="bi bi-server me-2"></i>
                  Backend Requirements
                </h5>
              </div>
              <div class="card-body">
                <ul class="list-unstyled mb-0">
                  <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Python 3.8+</li>
                  <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Ultralytics (YOLOv8)</li>
                  <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>OpenCV</li>
                  <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>PyTorch</li>
                  <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Express.js</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center">
          <NuxtLink to="/" class="btn btn-primary btn-lg shadow-lg">
            <i class="bi bi-arrow-left-circle me-2"></i>
            Back to Home
          </NuxtLink>
          <a href="https://github.com/ultralytics/ultralytics" target="_blank" class="btn btn-outline-light btn-lg ms-3 shadow-lg">
            <i class="bi bi-github me-2"></i>
            View on GitHub
          </a>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4 mt-5">
      <div class="container text-center">
        <p class="mb-2">
          <i class="bi bi-heart-fill text-danger me-2"></i>
          Built with YOLOv8, Nuxt.js, and Express.js
        </p>
        <p class="text-muted mb-0">
          <small>&copy; 2025 YOLOv8 Food Calories Estimator. All rights reserved.</small>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
useHead({
  title: 'About - YOLOv8 Food Calories Estimator',
  meta: [
    {
      name: 'description',
      content: 'Learn about YOLOv8 Food Calories Estimator - AI-powered food detection and calorie estimation system'
    }
  ]
})
</script>

<style scoped>
.about-card {
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tech-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px solid #dee2e6;
  transition: all 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.timeline {
  position: relative;
  padding-left: 50px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
}

.timeline-icon {
  position: absolute;
  left: -40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.bg-purple {
  background-color: #764ba2;
}

.timeline-content {
  flex: 1;
}

.feature-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #0d6efd;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: #e7f1ff;
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-item i {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.req-card {
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
}

.req-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .timeline {
    padding-left: 30px;
  }

  .timeline::before {
    left: 10px;
  }

  .timeline-icon {
    left: -30px;
    width: 30px;
    height: 30px;
    font-size: 0.875rem;
  }
}
</style>