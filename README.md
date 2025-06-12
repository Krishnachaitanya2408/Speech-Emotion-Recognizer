# 🎙️ Speech Emotion Recognition System

An AI-powered web application that analyzes human emotions from speech using deep learning. Upload audio files or record your voice in real-time to discover the emotional content of speech.

## ✨ Key Features

- 🎤 Real-time voice recording with duration controls (3-13 seconds)
- 📁 Support for multiple audio formats (WAV, MP3, WebM)
- 🎯 Accurate emotion prediction for 6 emotional states
- 😊 Visual feedback with emotion-specific emojis
- 🔄 Instant processing and results
- 📱 Responsive design for all devices

## 🧠 How It Works

The system processes speech through multiple stages:
1. Audio capture/upload
2. Feature extraction using Librosa
3. Emotion classification via PyTorch model
4. Real-time feedback to user interface

## 🏗️ Technical Architecture

### 🎨 Frontend
- **Framework**: React.js + Vite
- **Key Features**:
  - Modern Audio APIs for recording
  - Real-time audio visualization
  - Drag-and-drop file upload
  - Responsive emotion display
  - Progress indicators

### ⚙️ Backend
- **Server**: Node.js + Express
- **ML Processing**: Python + PyTorch
- **Features**:
  - Audio feature extraction with Librosa
  - PyTorch-based emotion classification
  - Audio file handling with Multer
  - CORS-enabled API endpoints
  - Real-time processing
  - Error handling & validation

## 🛠️ Setup Guide

### Prerequisites
```bash
# Node.js v14+
# Python v3.7+
# Required Python packages
pip install torch torchaudio librosa numpy

# Required Node packages
npm install
```

### Quick Start

1. **Clone & Setup**
```bash
git clone [<repository-url>](https://github.com/Krishnachaitanya2408/Speech-Emotion-Recognizer.git)
cd speech-emotion-recognizer
```

2. **Frontend Development**
```bash
cd Frontend
npm install
npm run dev
# Access at http://localhost:5173
```

3. **Backend Server**
```bash
cd Backend
npm install
node backend.js
# Server runs on http://localhost:5000
```

## 🎯 API Endpoints

### POST `/predict`
- **Purpose**: Emotion analysis from audio
- **Accepts**: Audio file upload (WAV, MP3, WebM)
- **Returns**: Predicted emotion
- **Limits**: 
  - Max file size: 10MB
  - Duration: 3-13 seconds

## 🔍 Supported Emotions

- 😊 Happy
- 😐 Neutral
- 😢 Sad
- 😠 Angry
- 😨 Fear
- 🤢 Disgust

## 🚀 Development

```bash
# Start frontend development server
npm run dev

# Start backend server
node backend.js

# Build for production
npm run build
```

