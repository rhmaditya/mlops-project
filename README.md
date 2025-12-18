# Food Calories Estimation Using YOLOv8

> **Sistem Estimasi Kalori Makanan Berbasis Deep Learning menggunakan YOLOv8, Nuxt.js, Vue.js, dan Bootstrap**

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Nuxt.js](https://img.shields.io/badge/Nuxt.js-3.x-00DC82.svg)](https://nuxt.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D.svg)](https://vuejs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3.svg)](https://getbootstrap.com/)
[![YOLOv8](https://img.shields.io/badge/YOLOv8-Ultralytics-FF6F00.svg)](https://github.com/ultralytics/ultralytics)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB.svg)](https://www.python.org/)

---

## Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Cara Menjalankan](#-cara-menjalankan)
- [Struktur Proyek](#-struktur-proyek)
- [API Documentation](#-api-documentation)
- [Model YOLOv8](#-model-yolov8)
- [Screenshot](#-screenshot)
- [Troubleshooting](#-troubleshooting)
- [Tim Pengembang](#-tim-pengembang)
- [Lisensi](#-lisensi)

---

## Tentang Proyek

**Food Calories Estimation** adalah aplikasi web berbasis machine learning yang dapat mendeteksi jenis buah dan mengestimasi jumlah kalori secara otomatis melalui analisis gambar. Sistem ini menggunakan YOLOv8 (You Only Look Once version 8) untuk deteksi objek buah dengan akurasi tinggi dan antarmuka web modern menggunakan Nuxt.js dan Bootstrap.

### Latar Belakang

Dalam era modern, kesadaran akan pola makan sehat semakin meningkat. Namun, menghitung kalori makanan secara manual seringkali memakan waktu dan tidak praktis. Proyek ini hadir sebagai solusi untuk:

- Memudahkan tracking kalori harian
- Membantu diet dan program penurunan berat badan
- Edukasi nutrisi masyarakat
- Implementasi teknologi AI dalam kehidupan sehari-hari

### Tujuan Proyek

1. Mengembangkan sistem deteksi buah otomatis menggunakan YOLOv8
2. Mengestimasi kalori berdasarkan jenis dan ukuran buah
3. Menyediakan antarmuka web yang user-friendly dan responsif
4. Mengintegrasikan backend (Node.js) dengan model AI (Python)
5. Implementasi full-stack modern web application

---

## Fitur Utama

### Deteksi Buah dengan YOLOv8
- Deteksi real-time dengan confidence score
- Support berbagai jenis buah (apple, banana, orange, dll)
- Multi-object detection dalam satu gambar

### Estimasi Kalori
- Perhitungan kalori berdasarkan database nutrisi
- Informasi detail per buah
- Kalori per 100 gram
- Total kalori estimasi

### Antarmuka Modern
- **Nuxt.js 3** - Framework Vue.js yang powerful
- **Vue.js 3** - Composition API & Reactivity
- **Bootstrap 5** - Responsive design
- **Bootstrap Icons** - Icon library
- Dark/Light mode support
- Mobile-friendly responsive layout

### Performa Tinggi
- Fast detection (< 2 detik)
- Efficient image processing
- Optimized API endpoints
- Real-time feedback

---

## Teknologi yang Digunakan

### Frontend Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Nuxt.js** | 3.x | Framework Vue.js untuk SSR & SSG |
| **Vue.js** | 3.x | Progressive JavaScript Framework |
| **Bootstrap** | 5.x | CSS Framework untuk styling |
| **Bootstrap Icons** | 1.11+ | Icon library |
| **JavaScript/ES6+** | Latest | Programming Language |
| **CSS/SCSS** | - | Styling & Preprocessor |

### Backend Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Node.js** | 16+ | JavaScript Runtime |
| **Multer** | 1.4+ | File Upload Middleware |
| **CORS** | 2.8+ | Cross-Origin Resource Sharing |
| **python-shell** | 5.0+ | Python Integration |
| **Sharp** | 0.34+ | Image Processing |

### Machine Learning Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Python** | 3.8+ | Programming Language |
| **YOLOv8** | Latest | Object Detection Model |
| **Ultralytics** | Latest | YOLO Implementation |
| **OpenCV** | 4.x | Computer Vision Library |
| **NumPy** | Latest | Numerical Computing |
| **PyTorch** | Latest | Deep Learning Framework |

### Development Tools

- **npm/npx** - Package Manager
- **concurrently** - Run multiple commands
- **nodemon** - Auto-restart server
- **Git** - Version Control
- **VS Code** - Code Editor

---

## Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Nuxt.js Frontend (Port 3001)          │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │  Vue.js Components                           │ │    │
│  │  │  - NavBar.vue                                │ │    │
│  │  │  - UploadImage.vue                           │ │    │
│  │  │  - PredictionResult.vue                      │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │  Bootstrap 5 Styling                         │ │    │
│  │  │  - Responsive Grid                           │ │    │
│  │  │  - Components (Cards, Buttons, Forms)        │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP Request (Axios/Fetch)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        SERVER SIDE                           │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Express.js Backend (Port 3000)            │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │  API Endpoints                               │ │    │
│  │  │  - POST /api/predict                         │ │    │
│  │  │  - GET /api/health                           │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │  Middleware                                   │ │    │
│  │  │  - CORS, Multer, Body Parser                 │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Python Shell
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      AI/ML LAYER                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │         YOLOv8 Detection Model                     │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │  yolo_predict.py                             │ │    │
│  │  │  - Load YOLOv8 Model                         │ │    │
│  │  │  - Image Preprocessing                       │ │    │
│  │  │  - Object Detection                          │ │    │
│  │  │  - Calorie Calculation                       │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │  Calorie Database                            │ │    │
│  │  │  - Fruit nutrition data                      │ │    │
│  │  │  - Calorie per 100g                          │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Alur Kerja Sistem

1. **User Upload Image** → User mengunggah gambar buah melalui frontend Nuxt.js
2. **Frontend → Backend** → Image dikirim ke Express.js server via API
3. **Backend → Python** → Server memanggil script Python dengan python-shell
4. **YOLOv8 Detection** → Model mendeteksi buah dalam gambar
5. **Calorie Calculation** → Sistem menghitung kalori berdasarkan deteksi
6. **Response → Frontend** → Hasil dikembalikan ke frontend
7. **Display Result** → Vue.js menampilkan hasil dengan Bootstrap styling

---

## Prasyarat

Sebelum memulai instalasi, pastikan sistem Anda memiliki:

### Required Software

| Software | Versi Minimum | Download Link |
|----------|---------------|---------------|
| **Node.js** | 16.x atau lebih tinggi | [nodejs.org](https://nodejs.org/) |
| **npm** | 8.x atau lebih tinggi | Termasuk dengan Node.js |
| **Python** | 3.8 atau lebih tinggi | [python.org](https://www.python.org/) |
| **pip** | Latest | Termasuk dengan Python |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

### Python Dependencies

```bash
ultralytics>=8.0.0    # YOLOv8
opencv-python>=4.8.0  # Computer Vision
numpy>=1.24.0         # Numerical Computing
torch>=2.0.0          # Deep Learning
pillow>=10.0.0        # Image Processing
```

### Pengecekan Versi

```bash
# Cek Node.js version
node --version

# Cek npm version
npm --version

# Cek Python version
python --version

# Cek pip version
pip --version
```

---

## Instalasi

### 1️. Clone Repository

```bash
# Clone project dari GitHub
git clone https://github.com/rhmaditya/mlops-project/tree/main

# Masuk ke direktori project
cd mlops-project
```

### 2️. Install Python Dependencies

```bash
# Install semua package Python yang dibutuhkan
pip install ultralytics opencv-python numpy torch pillow

# Atau menggunakan requirements.txt (jika tersedia)
pip install -r requirements.txt
```

### 3. Install Node.js Dependencies

```bash
# Install dependencies untuk seluruh project
npm run install-all

# Perintah di atas akan menjalankan:
# 1. npm install (root)
# 2. cd backend && npm install
# 3. cd frontend && npm install
```

**Atau install manual:**

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4️. Setup YOLOv8 Model

```bash
# Buat folder untuk model (jika belum ada)
mkdir yolov8_model/models

# Download pre-trained YOLOv8 model
# Model akan otomatis didownload saat pertama kali dijalankan
# Atau download manual dari Ultralytics

# Pastikan file model bernama: best.pt
# Lokasi: yolov8_model/models/best.pt
```

### 5️. Konfigurasi Environment

**Backend (.env)**

Buat file `backend/.env`:

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
UPLOAD_DIR=./uploads
```

**Frontend (nuxt.config.ts)**

Sudah dikonfigurasi, pastikan `apiBase` mengarah ke `http://localhost:3000`

---

##  Cara Menjalankan

### Quick Start (Recommended)

```bash
# Jalankan frontend dan backend sekaligus dengan 1 perintah
npm run dev
```

Perintah ini akan menjalankan:
- **Backend** di `http://localhost:3000`
- **Frontend** di `http://localhost:3001`

###  Manual Start

Jika ingin menjalankan terpisah:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Akses Aplikasi

Setelah berhasil dijalankan:

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

### Stop Aplikasi

- Tekan `Ctrl + C` di terminal
- Atau jalankan: `.\kill-port-3000.bat` (Windows)

---

## Struktur Proyek

```
mlops-project/
│
├── 📂 backend/                    # Backend Express.js
│   ├── node_modules/              # Node dependencies
│   ├── uploads/                   # Uploaded images
│   ├── .env                       # Environment variables
│   ├── package.json               # Backend dependencies
│   ├── server.js                  # Main server file
│   └── yolov8n.pt                 # YOLOv8 nano model
│
├── 📂 frontend/                   # Frontend Nuxt.js
│   ├── .nuxt/                     # Nuxt build files
│   ├── assets/                    # Static assets
│   │   └── css/
│   │       ├── main.css           # Main styles
│   │       └── _variables.scss    # SCSS variables
│   ├── components/                # Vue Components
│   │   ├── NavBar.vue             # Navigation bar
│   │   ├── UploadImage.vue        # Image upload component
│   │   └── PredictionResult.vue   # Result display
│   ├── composables/               # Vue Composables
│   │   └── useApi.js              # API helper
│   ├── pages/                     # Page routes
│   │   ├── index.vue              # Home page
│   │   └── about.vue              # About page
│   ├── node_modules/              # Node dependencies
│   ├── nuxt.config.ts             # Nuxt configuration
│   └── package.json               # Frontend dependencies
│
├── 📂 yolov8_model/               # AI/ML Model
│   ├── models/                    # Model files
│   │   └── best.pt                # Trained YOLOv8 model
│   └── yolo_predict.py            # Prediction script
│
├── 📂 images/                     # Image processing output
│
├── 📄 calorie.py                  # Calorie calculation (legacy)
├── 📄 cnn_model.py                # CNN model (legacy)
├── 📄 demo.py                     # Demo script
├── 📄 image_segment.py            # Image segmentation
├── 📄 predict_api.py              # Prediction API (legacy)
├── 📄 train.py                    # Training script
├── 📄 kill-port-3000.bat          # Kill port script
├── 📄 .gitignore                  # Git ignore rules
├── 📄 package.json                # Root package.json
└── 📄 README.md                   # Documentation (this file)
```

### Penjelasan Struktur

#### Backend (`/backend`)
- `server.js` - Main server dengan Express.js
- API endpoints untuk upload dan prediksi
- Integration dengan Python script
- File upload handling dengan Multer

#### Frontend (`/frontend`)
- **Pages**: Routing dengan Nuxt.js
- **Components**: Reusable Vue components
- **Composables**: Utility functions
- **Assets**: CSS, images, fonts

#### AI/ML (`/yolov8_model`)
- `yolo_predict.py` - Script utama untuk deteksi
- `models/` - YOLOv8 model files
- Calorie database

---

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Health Check

**GET** `/api/health`

Mengecek status server.

**Response:**
```json
{
  "status": "OK",
  "message": "YOLOv8 Food Calories API is running",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "version": "2.0.0",
  "environment": "development"
}
```

#### 2. Predict Food

**POST** `/api/predict`

Upload gambar dan dapatkan prediksi.

**Headers:**
```
Content-Type: multipart/form-data
```

**Body:**
- `image` (file) - Image file (JPEG, JPG, PNG, BMP, WEBP)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Prediksi berhasil",
  "data": {
    "detections": [
      {
        "class": "apple",
        "confidence": 0.95,
        "calories_per_100g": 52,
        "estimated_weight_g": 150,
        "estimated_calories": 78,
        "bbox": {
          "x1": 100,
          "y1": 100,
          "x2": 300,
          "y2": 300
        }
      }
    ],
    "total_calories": 78,
    "total_items": 1,
    "processing_time_ms": 1250,
    "image_url": "http://localhost:3000/uploads/abc123.jpg"
  },
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

---

## Model YOLOv8

### Tentang YOLOv8

**YOLO (You Only Look Once)** adalah algoritma deteksi objek real-time yang sangat cepat dan akurat. YOLOv8 adalah versi terbaru dari Ultralytics yang menawarkan:

- Akurasi deteksi tinggi
- Kecepatan inference sangat cepat
- Easy to use API
- Support berbagai task (detection, segmentation, classification)

### Model Architecture

```
Input Image (640x640)
    ↓
Backbone (CSPDarknet)
    ↓
Neck (PANet)
    ↓
Head (Detection)
    ↓
Output (Bounding Boxes + Classes + Confidence)
```

### Supported Fruits

Model dapat mendeteksi berbagai jenis buah:

- Apple (Apel)
- Banana (Pisang)
- Orange (Jeruk)
- Mango (Mangga)
- Watermelon (Semangka)
- Grape (Anggur)
- Strawberry (Stroberi)
- Kiwi
- Dan banyak lagi..

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Windows
.\kill-port-3000.bat

# Or manual
netstat -ano | findstr :3000
taskkill /F /PID [PID_NUMBER]
```

#### 2. Python Module Not Found

**Error:** `ModuleNotFoundError: No module named 'ultralytics'`

**Solution:**
```bash
pip install ultralytics opencv-python numpy
```

#### 3. Model File Not Found

**Error:** `Model file not found: models/best.pt`

**Solution:**
- Pastikan file `best.pt` ada di `yolov8_model/models/`
- Download model atau train ulang model

#### 4. CORS Error

**Error:** `Access to fetch blocked by CORS policy`

**Solution:**
- Cek `backend/.env` pastikan `FRONTEND_URL` benar
- Restart backend server

#### 5. Image Upload Failed

**Error:** `Failed to upload image`

**Solution:**
- Cek format file (harus JPEG/PNG/BMP/WEBP)
- Cek ukuran file (max 10MB)
- Cek folder `backend/uploads/` exists

---

## Tim Pengembang

### MLOps Team - Kelompok [Nomor Kelompok]

| Nama | NIM | Role | Kontribusi |
|------|-----|------|-----------|
| **[Sofyan Fauzi Dzaki Arif]** | [122450116] | Project Lead & ML Engineer | YOLOv8 model training & optimization |
| **[Aditya Rahman]** | [122450113] | Frontend Developer | Nuxt.js & Vue.js implementation |
| **[Muhammad Regi Putra Amanta]** | [122450031] | Backend Developer | Express.js API & integration |
| **[Naufal Fakhri]** | [122450089] | UI/UX Designer | Bootstrap styling & responsive design |
| **[Try Yani Rizki Nur Rohmah]** | [122450020] | DevOps & Testing | Deployment & quality assurance |

### Dosen Pembimbing

- **Nama Dosen**: [Ahmad Luky Ramdani, S.Kom., M.Kom]
- **Mata Kuliah**: MLOps / Machine Learning Operations
---

## Referensi

### Documentation

- [Nuxt.js Documentation](https://nuxt.com/docs)
- [Vue.js Documentation](https://vuejs.org/guide/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [YOLOv8 Documentation](https://docs.ultralytics.com/)
- [Express.js Documentation](https://expressjs.com/)

### Papers & Research

1. Redmon, J., et al. (2016). "You Only Look Once: Unified, Real-Time Object Detection"
2. Ultralytics. (2023). "YOLOv8: State-of-the-Art Object Detection"


<div align="center">


**Last Updated**: December 15, 2025 | **Version**: 1.0.0

</div>
