<!-- filepath: d:\dataScience\tugas_besar\mlops\Food-Calories-Estimation-Using-Image-Processing-main\frontend\components\NavBar.vue -->

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
    <div class="container">
      <!-- Brand -->
      <NuxtLink to="/" class="navbar-brand fw-bold d-flex align-items-center">
        <i class="bi bi-robot fs-3 me-2 text-warning"></i>
        <span class="d-none d-md-inline">YOLOv8 Food Calories</span>
        <span class="d-inline d-md-none">YOLOv8</span>
      </NuxtLink>

      <!-- Mobile Toggle -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <NuxtLink 
              to="/" 
              class="nav-link"
              active-class="active"
            >
              <i class="bi bi-house-fill me-1"></i>
              Home
            </NuxtLink>
          </li>

          <li class="nav-item">
            <NuxtLink 
              to="/about" 
              class="nav-link"
              active-class="active"
            >
              <i class="bi bi-info-circle-fill me-1"></i>
              About
            </NuxtLink>
          </li>

          <li class="nav-item">
            <a 
              href="https://github.com/ultralytics/ultralytics" 
              target="_blank" 
              class="nav-link"
              rel="noopener noreferrer"
            >
              <i class="bi bi-github me-1"></i>
              YOLOv8
            </a>
          </li>

          <li class="nav-item">
            <button 
              class="nav-link btn btn-link" 
              @click="checkApiStatus"
              :class="{ 'text-success': apiStatus === 'online', 'text-danger': apiStatus === 'offline' }"
            >
              <i class="bi bi-circle-fill me-1" style="font-size: 0.5rem;"></i>
              API {{ apiStatus }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const apiStatus = ref('checking')
const { checkHealth } = useApi()

// Check API status on mount
onMounted(async () => {
  await checkApiStatus()
  
  // Check every 30 seconds
  setInterval(checkApiStatus, 30000)
})

const checkApiStatus = async () => {
  try {
    await checkHealth()
    apiStatus.value = 'online'
  } catch (error) {
    apiStatus.value = 'offline'
  }
}
</script>

<style scoped>
.navbar {
  backdrop-filter: blur(10px);
  background: rgba(13, 110, 253, 0.95) !important;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.nav-link {
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 1rem;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #ffd700;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 80%;
}

.nav-link:hover,
.nav-link.active {
  color: #ffd700 !important;
}

.text-warning {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@media (max-width: 768px) {
  .navbar-brand {
    font-size: 1.2rem;
  }
}
</style>