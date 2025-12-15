/**
 * YOLOv8 Food Calories API Server
 * Backend API untuk YOLOv8 Food Detection dengan Nuxt.js Frontend
 * 
 * @author Your Name
 * @version 2.0.0
 */

// ============================================
// DEPENDENCIES
// ============================================

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { PythonShell } = require('python-shell');
const { v4: uuidv4 } = require('uuid');
const { spawn } = require('child_process');
const sharp = require('sharp');

// ============================================
// APP INITIALIZATION
// ============================================

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ============================================
// MIDDLEWARE
// ============================================

// CORS Configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static Files - Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Request Logger
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// ============================================
// UPLOAD DIRECTORY SETUP
// ============================================

const uploadDir = process.env.UPLOAD_DIR || './uploads';

// Create uploads directory if not exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`✅ Created upload directory: ${uploadDir}`);
}

// ============================================
// MULTER CONFIGURATION
// ============================================

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueId = uuidv4();
        const ext = path.extname(file.originalname);
        const filename = `${uniqueId}${ext}`;
        cb(null, filename);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|bmp|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Hanya file gambar (JPEG, JPG, PNG, BMP, WEBP) yang diizinkan!'));
    }
};

// Multer instance
const upload = multer({
    storage: storage,
    limits: { 
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024  // 10MB
    },
    fileFilter: fileFilter
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Run Python YOLOv8 prediction script
 * @param {string} imagePath - Path to image file
 * @returns {Promise<Object>} - Prediction result
 */
function runPythonPrediction(imagePath) {
    return new Promise((resolve, reject) => {
        const pythonPath = process.env.PYTHON_PATH || 'python';
        const scriptPath = path.resolve(__dirname, process.env.YOLO_SCRIPT_PATH);
        
        console.log(`🐍 Running Python script: ${scriptPath}`);
        console.log(`📸 Image path: ${imagePath}`);
        
        const options = {
            mode: 'text',
            pythonPath: pythonPath,
            pythonOptions: ['-u'],  // unbuffered
            scriptPath: path.dirname(scriptPath),
            args: [imagePath]
        };

        PythonShell.run(path.basename(scriptPath), options, (err, results) => {
            if (err) {
                console.error('❌ Python Error:', err);
                reject({
                    message: 'Python script execution failed',
                    error: err.message,
                    traceback: err.traceback
                });
                return;
            }

            try {
                // Find JSON result in output
                let jsonResult = null;
                for (const line of results) {
                    try {
                        const parsed = JSON.parse(line);
                        if (parsed && typeof parsed === 'object') {
                            jsonResult = parsed;
                            break;
                        }
                    } catch (e) {
                        // Not JSON, skip
                        continue;
                    }
                }

                if (!jsonResult) {
                    throw new Error('No valid JSON result found in Python output');
                }

                console.log('✅ Python prediction successful');
                resolve(jsonResult);
                
            } catch (parseError) {
                console.error('❌ Parse Error:', parseError);
                console.error('Python output:', results);
                reject({
                    message: 'Failed to parse Python output',
                    error: parseError.message,
                    output: results
                });
            }
        });
    });
}

/**
 * Clean up old uploaded files (older than 1 hour)
 */
function cleanupOldFiles() {
    try {
        const files = fs.readdirSync(uploadDir);
        const now = Date.now();
        const maxAge = 60 * 60 * 1000; // 1 hour

        files.forEach(file => {
            const filepath = path.join(uploadDir, file);
            const stats = fs.statSync(filepath);
            const age = now - stats.mtimeMs;

            if (age > maxAge) {
                fs.unlinkSync(filepath);
                console.log(`🗑️  Deleted old file: ${file}`);
            }
        });
    } catch (error) {
        console.error('Cleanup error:', error);
    }
}

// Run cleanup every 30 minutes
setInterval(cleanupOldFiles, 30 * 60 * 1000);

// ============================================
// API ROUTES
// ============================================

/**
 * Health Check Endpoint
 * GET /
 */
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'YOLOv8 Food Calories API Server',
        version: '2.0.0',
        environment: NODE_ENV,
        endpoints: {
            health: 'GET /api/health',
            predict: 'POST /api/predict',
            delete: 'DELETE /api/image/:filename',
            list: 'GET /api/predictions'
        },
        documentation: 'https://github.com/ultralytics/ultralytics'
    });
});

/**
 * Detailed Health Check
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
    const pythonScriptPath = path.resolve(__dirname, process.env.YOLO_SCRIPT_PATH);
    
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        config: {
            port: PORT,
            python_path: process.env.PYTHON_PATH,
            script_exists: fs.existsSync(pythonScriptPath),
            upload_dir: uploadDir
        }
    });
});

/**
 * Predict Food and Calories
 * POST /api/predict
 */
app.post('/api/predict', upload.single('image'), async (req, res) => {
    console.log('📥 Received prediction request');
    
    if (!req.file) {
        console.log('❌ No file uploaded');
        return res.status(400).json({
            success: false,
            error: 'No image file uploaded'
        });
    }

    const imagePath = req.file.path;
    console.log('📁 File saved:', imagePath);
    console.log('📦 File size:', (req.file.size / 1024).toFixed(2), 'KB');

    try {
        // Resize image if too large (for faster processing)
        const optimizedPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '_optimized.$1');
        
        const startResize = Date.now();
        await sharp(imagePath)
            .resize(1280, 1280, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .toFile(optimizedPath);
        
        const resizeTime = Date.now() - startResize;
        console.log(`⚡ Image optimized in ${resizeTime}ms`);

        // Use optimized image for prediction
        const processPath = optimizedPath;

        // Path ke Python script
        const pythonScript = path.join(__dirname, '..', 'yolov8_model', 'yolo_predict.py');
        const pythonPath = process.env.PYTHON_PATH || 'python';

        console.log('🐍 Running Python script...');
        console.log('   Python:', pythonPath);
        console.log('   Script:', pythonScript);
        console.log('   Image:', processPath);

        const startPython = Date.now();

        // Spawn Python process
        const pythonProcess = spawn(pythonPath, [pythonScript, processPath]);

        let outputData = '';
        let errorData = '';

        pythonProcess.stdout.on('data', (data) => {
          outputData += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
          errorData += data.toString();
          console.log('🐍', data.toString().trim());
        });

        pythonProcess.on('close', (code) => {
          const pythonTime = Date.now() - startPython;
          console.log(`🐍 Python process exited with code ${code} (${pythonTime}ms)`);

          // Clean up files
          [imagePath, optimizedPath].forEach(file => {
            if (fs.existsSync(file)) {
              fs.unlink(file, (err) => {
                if (err) console.error('⚠️ Error deleting file:', err);
              });
            }
          });

          if (code !== 0) {
            console.error('❌ Python script error:', errorData);
            return res.status(500).json({
              success: false,
              error: 'Failed to process image',
              details: errorData
            });
          }

          try {
            const result = JSON.parse(outputData);
            console.log('✅ Prediction successful');
            console.log(`⏱️ Total time: ${resizeTime + pythonTime}ms (resize: ${resizeTime}ms, inference: ${pythonTime}ms)`);
            res.json(result);
          } catch (parseError) {
            console.error('❌ JSON parse error:', parseError);
            console.error('Raw output:', outputData);
            res.status(500).json({
              success: false,
              error: 'Invalid response from prediction model',
              details: outputData
            });
          }
        });

      } catch (error) {
        console.error('❌ Server error:', error);
        
        // Clean up file on error
        if (fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (err) => {
            if (err) console.error('⚠️ Error deleting file:', err);
          });
        }

        res.status(500).json({
          success: false,
          error: 'Server error',
          message: error.message
        });
      }
});

/**
 * Delete uploaded image
 * DELETE /api/image/:filename
 */
app.delete('/api/image/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        
        // Validate filename (prevent directory traversal)
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return res.status(400).json({
                success: false,
                error: 'Invalid filename'
            });
        }
        
        const filepath = path.join(uploadDir, filename);

        if (!fs.existsSync(filepath)) {
            return res.status(404).json({
                success: false,
                error: 'File not found',
                filename: filename
            });
        }

        fs.unlinkSync(filepath);
        
        console.log(`🗑️  Deleted file: ${filename}`);
        
        res.json({
            success: true,
            message: 'File deleted successfully',
            filename: filename
        });

    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete file',
            message: error.message
        });
    }
});

/**
 * Get list of all predictions (uploaded images)
 * GET /api/predictions
 */
app.get('/api/predictions', (req, res) => {
    try {
        const files = fs.readdirSync(uploadDir);
        
        const images = files
            .filter(file => /\.(jpg|jpeg|png|bmp|webp)$/i.test(file))
            .map(file => {
                const filepath = path.join(uploadDir, file);
                const stats = fs.statSync(filepath);
                
                return {
                    filename: file,
                    url: `${req.protocol}://${req.get('host')}/uploads/${file}`,
                    size: stats.size,
                    created_at: stats.birthtime,
                    modified_at: stats.mtime
                };
            })
            .sort((a, b) => b.created_at - a.created_at);

        res.json({
            success: true,
            total: images.length,
            images: images
        });

    } catch (error) {
        console.error('List Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to list files',
            message: error.message
        });
    }
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

/**
 * Multer Error Handler
 */
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File too large',
                message: 'Ukuran file maksimal adalah 10MB',
                max_size: '10MB'
            });
        }
        
        return res.status(400).json({
            success: false,
            error: 'Upload error',
            message: err.message
        });
    }
    
    next(err);
});

/**
 * General Error Handler
 */
app.use((err, req, res, next) => {
    console.error('Global Error:', err);
    
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message,
        stack: NODE_ENV === 'development' ? err.stack : undefined
    });
});

/**
 * 404 Handler
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        message: `Cannot ${req.method} ${req.path}`,
        available_endpoints: {
            health: 'GET /',
            predict: 'POST /api/predict',
            delete: 'DELETE /api/image/:filename',
            list: 'GET /api/predictions'
        }
    });
});

// ============================================
// START SERVER
// ============================================

const server = app.listen(PORT, () => {
    console.log('');
    console.log('='.repeat(70));
    console.log('🚀 YOLOv8 FOOD CALORIES API SERVER');
    console.log('='.repeat(70));
    console.log(`📍 Server URL        : http://localhost:${PORT}`);
    console.log(`🌍 Environment       : ${NODE_ENV}`);
    console.log(`🐍 Python Path       : ${process.env.PYTHON_PATH || 'python'}`);
    console.log(`📁 Upload Directory  : ${uploadDir}`);
    console.log(`🔗 Frontend URL      : ${process.env.FRONTEND_URL}`);
    console.log(`📊 Max File Size     : ${(parseInt(process.env.MAX_FILE_SIZE) / (1024*1024)).toFixed(0)}MB`);
    console.log('='.repeat(70));
    console.log(`⏰ Server started at : ${new Date().toLocaleString()}`);
    console.log('='.repeat(70));
    console.log('');
    console.log('📝 Available Endpoints:');
    console.log('   GET  /                    - Health check');
    console.log('   GET  /api/health          - Detailed health');
    console.log('   POST /api/predict         - Upload & predict');
    console.log('   GET  /api/predictions     - List images');
    console.log('   DELETE /api/image/:id     - Delete image');
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('');
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on('SIGTERM', () => {
    console.log('\n🛑 SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n🛑 SIGINT received, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;