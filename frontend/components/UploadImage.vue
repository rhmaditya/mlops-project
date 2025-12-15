<!-- filepath: d:\dataScience\tugas_besar\mlops\Food-Calories-Estimation-Using-Image-Processing-main\frontend\components\UploadImage.vue -->

<script setup>
import { ref, nextTick } from 'vue'

const selectedFile = ref(null)
const previewUrl = ref(null)
const isLoading = ref(false)
const error = ref(null)
const result = ref(null)
const uploadProgress = ref(0)
const estimatedTime = ref(30)

const { predictImage } = useApi()

const onFileChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  
  try {
    if (file.size > 10 * 1024 * 1024) {
      error.value = 'File size must be less than 10MB'
      return
    }
    
    const sizeMB = file.size / 1024 / 1024
    estimatedTime.value = Math.ceil(10 + (sizeMB * 5))
    
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
    error.value = null
    result.value = null
    uploadProgress.value = 0
  } catch (err) {
    console.error('Error in onFileChange:', err)
    error.value = 'Failed to load image preview'
  }
}

const uploadImage = async () => {
  if (!selectedFile.value) {
    error.value = 'Please select an image first'
    return
  }

  isLoading.value = true
  error.value = null
  result.value = null
  uploadProgress.value = 0

  const progressInterval = setInterval(() => {
    if (uploadProgress.value < 90) {
      uploadProgress.value += 5
    }
  }, 500)

  try {
    console.log('🚀 Starting prediction...')
    const startTime = Date.now()
    
    const data = await predictImage(selectedFile.value)
    
    clearInterval(progressInterval)
    uploadProgress.value = 100
    
    const actualTime = Math.round((Date.now() - startTime) / 1000)
    console.log(`⏱️ Completed in ${actualTime}s`)
    console.log('📊 Response data:', data)
    
    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format')
    }
    
    if (data.success === true) {
      // Ensure safe data structure
      result.value = {
        success: true,
        total_calories: Number(data.total_calories) || 0,
        detections: Array.isArray(data.detections) ? data.detections.map(d => ({
          class: d.class || d.name || 'Unknown',
          confidence: Number(d.confidence) || 0,
          calories: Number(d.calories) || 0,
          bbox: Array.isArray(d.bbox) ? d.bbox : []
        })) : [],
        metadata: data.metadata || {}
      }
      
      console.log('✅ Result set:', result.value)
      
      // Force component update
      await nextTick()
      
    } else {
      throw new Error(data.error || 'Prediction failed')
    }
  } catch (err) {
    clearInterval(progressInterval)
    uploadProgress.value = 0
    
    console.error('❌ Upload error:', err)
    console.error('Error stack:', err.stack)
    
    if (err.message.includes('timeout')) {
      error.value = 'Request timeout. Try a smaller image.'
    } else if (err.message.includes('Failed to fetch')) {
      error.value = 'Cannot connect to backend server'
    } else if (err.message.includes('width') || err.message.includes('height')) {
      error.value = 'Invalid image dimensions. Try another image.'
    } else {
      error.value = `Failed: ${err.message}`
    }
  } finally {
    isLoading.value = false
  }
}

const resetUpload = () => {
  try {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
    }
    
    selectedFile.value = null
    previewUrl.value = null
    result.value = null
    error.value = null
    uploadProgress.value = 0
    
    const input = document.getElementById('imageInput')
    if (input) input.value = ''
  } catch (err) {
    console.error('Error in resetUpload:', err)
  }
}
</script>

<template>
  <div class="card shadow-lg">
    <div class="card-header bg-primary text-white">
      <h4 class="mb-0">
        <i class="bi bi-cloud-upload me-2"></i>
        Upload Food Image
      </h4>
    </div>
    
    <div class="card-body p-4">
      <!-- Upload Form -->
      <div v-if="!previewUrl" class="upload-area text-center p-5 border border-2 border-dashed rounded">
        <i class="bi bi-image fs-1 text-muted mb-3 d-block"></i>
        <h5 class="text-muted mb-3">Choose an image to analyze</h5>
        <label for="imageInput" class="btn btn-primary btn-lg">
          <i class="bi bi-folder2-open me-2"></i>
          Choose Image
        </label>
        <input 
          id="imageInput"
          type="file" 
          accept="image/*" 
          @change="onFileChange"
          class="d-none"
        >
        <p class="text-muted small mt-3 mb-0">Supported: JPG, PNG, GIF (Max 10MB)</p>
      </div>

      <!-- Image Preview -->
      <div v-if="previewUrl" class="preview-area">
        <div class="text-center mb-4">
          <img :src="previewUrl" alt="Preview" class="img-fluid rounded shadow img-preview">
        </div>
        
        <!-- File Info -->
        <div class="row mb-3 small text-muted">
          <div class="col-4">
            <i class="bi bi-file-earmark me-1"></i>
            {{ selectedFile?.name || 'Unknown' }}
          </div>
          <div class="col-4">
            <i class="bi bi-hdd me-1"></i>
            {{ selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) : '0' }} MB
          </div>
          <div class="col-4">
            <i class="bi bi-file-image me-1"></i>
            {{ selectedFile?.type || 'Unknown' }}
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div v-if="isLoading" class="mb-4">
          <div class="progress" style="height: 30px;">
            <div 
              class="progress-bar progress-bar-striped progress-bar-animated bg-success" 
              :style="`width: ${uploadProgress}%`"
              role="progressbar"
            >
              {{ uploadProgress }}%
            </div>
          </div>
          <p class="text-center text-muted mt-2 mb-0">
            <small>
              <i class="bi bi-hourglass-split me-1"></i>
              Processing... (~{{ estimatedTime }}s estimated)
            </small>
          </p>
        </div>
        
        <!-- Buttons -->
        <div class="d-flex gap-2 justify-content-center">
          <button 
            @click="uploadImage" 
            :disabled="isLoading"
            class="btn btn-success btn-lg"
          >
            <span v-if="!isLoading">
              <i class="bi bi-lightning-charge me-2"></i>
              Predict Calories
            </span>
            <span v-else>
              <span class="spinner-border spinner-border-sm me-2"></span>
              Analyzing...
            </span>
          </button>
          
          <button 
            @click="resetUpload" 
            class="btn btn-outline-secondary btn-lg"
            :disabled="isLoading"
          >
            <i class="bi bi-arrow-clockwise me-2"></i>
            Reset
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="alert alert-danger mt-4 d-flex align-items-start">
        <i class="bi bi-exclamation-triangle-fill fs-4 me-3 mt-1"></i>
        <div>
          <strong>Error!</strong>
          <p class="mb-0 mt-2">{{ error }}</p>
        </div>
      </div>

      <!-- Results -->
      <div v-if="result && result.success" class="mt-4">
        <PredictionResult :result="result" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-area {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  transition: all 0.3s ease;
  cursor: pointer;
}

.upload-area:hover {
  background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
  border-color: #0d6efd !important;
}

.img-preview {
  max-height: 400px;
  object-fit: contain;
}

.preview-area {
  animation: fadeIn 0.5s ease;
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

.progress {
  border-radius: 15px;
  overflow: hidden;
}
</style>