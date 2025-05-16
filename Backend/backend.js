const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000; // ← use PORT from environment (important for Render)
const uploadDir = path.join(__dirname, 'uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://speech-emotion-recognizer-fiuq.onrender.com/'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Accept'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../Frontend/dist'))); // ← NEW

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/webm'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only WAV, MP3, and WebM files are allowed.'));
    }
  }
}).single('audio');

// Backend API routes
app.post('/predict', (req, res) => {
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'File upload error: ' + err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    try {
      const audioPath = req.file.path;
      const pythonScriptPath = path.join(__dirname, 'predict.py');

      const pythonProcess = spawn('python', [pythonScriptPath, audioPath]);

      let result = '';
      let error = '';

      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      pythonProcess.on('close', (code) => {
        fs.unlink(audioPath, (err) => {
          if (err) console.error('Error deleting file:', err);
        });

        if (code === 0) {
          try {
            const prediction = JSON.parse(result);
            res.send({ emotion: prediction.emotion });
          } catch (err) {
            res.status(500).send({ error: 'Error parsing prediction result' });
          }
        } else {
          res.status(500).send({ error: `Error processing prediction: ${error}` });
        }
      });
    } catch (err) {
      res.status(500).send({ error: 'Error processing file' });
    }
  });
});

// ← NEW: Fallback route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
