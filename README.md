# 🌫️ AirQForecast – Urban Air Quality Forecasting System

**AirQForecast** is a full-stack web application designed to monitor, analyze, and predict urban air quality using machine learning.  
The system provides real-time AQI values, pollutant-level insights, alerts, trend analysis, and a daily summary through an interactive dashboard.

## 🌐 Live Demo

**Frontend:** https://airqforecast.onrender.com

**Backend API:** https://airqforecast-backend.onrender.com

This project integrates a modern React frontend with a Python Flask backend and a trained machine learning model.

---

## 🚀 Features

- 📊 Real-time Air Quality Index (AQI) display
- 🧪 Pollutant monitoring (PM2.5, PM10, CO, NO₂, SO₂, O₃)
- 📈 AQI trend visualization
- 🚨 Warning & Critical air quality alerts
- 🧠 Machine Learning–based AQI prediction
- 📅 Daily air quality summary
- 🎨 Clean, responsive, and user-friendly UI

---

## 🧠 Machine Learning Overview

- Dataset: Air Quality Sensor Dataset
- Preprocessing: Handling missing values, scaling features
- Model Type: Regression-based AQI prediction
- Libraries: `scikit-learn`, `pandas`, `NumPy`
- Model Storage: `.pkl` files using `joblib`
- Prediction served via Flask REST API

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Recharts

### Backend

- Python
- Flask
- Flask-CORS
- scikit-learn
- pandas
- NumPy
- joblib

---

## 📂 Project Structure

```

air-quality-insights/
│
├── frontend/
│   ├── src/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── og-image.png
│   └── index.html
│
├── backend/
│   ├── app.py
│   ├── train_model.py
│   ├── models/
│   │   ├── aqi_model.pkl
│   │   └── scaler.pkl
│
├── .gitignore
└── README.md

```

---

## ⚙️ How to Run the Project Locally

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python app.py
```

Backend runs at:

```
http://127.0.0.1:5000
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

| Endpoint           | Description                                |
| ------------------ | ------------------------------------------ |
| `/api/air/current` | Current AQI, pollutants & environment data |
| `/api/air/history` | AQI trend data                             |
| `/api/air/alerts`  | Warning & critical alerts                  |
| `/api/air/summary` | Daily AQI summary                          |

---

## 📊 Dashboard Pages

- **Dashboard** – Live AQI & pollutant metrics
- **Trends** – AQI variation over time
- **Alerts** – Warning & critical air quality notifications
- **Summary** – Daily AQI statistics and status

---

## 🎯 Project Outcomes

- Demonstrates real-world use of machine learning in environmental monitoring
- Shows full-stack integration of ML models with a web application
- Provides meaningful visual insights for air quality analysis
- Suitable for academic evaluation and portfolio presentation

---

## 👩‍💻 Author

**Akshaya Somu**

---

## 📄 License

This project is developed for academic and learning purposes.


