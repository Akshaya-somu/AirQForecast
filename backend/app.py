from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
from datetime import datetime

# ----------------------------
# APP SETUP
# ----------------------------
app = Flask(__name__)
CORS(app)

# ----------------------------
# LOAD MODELS
# ----------------------------
model = joblib.load("models/aqi_model.pkl")
scaler = joblib.load("models/scaler.pkl")

FEATURES = [
    "PT08.S1(CO)",
    "NMHC(GT)",
    "C6H6(GT)",
    "PT08.S2(NMHC)",
    "NOx(GT)",
    "PT08.S3(NOx)",
    "NO2(GT)",
    "PT08.S4(NO2)",
    "PT08.S5(O3)",
    "T",
    "RH",
    "AH"
]

# ----------------------------
# HELPER: AQI CATEGORY
# ----------------------------
def get_aqi_category(value):
    if value > 4:
        return "Hazardous"
    elif value > 2:
        return "Moderate"
    else:
        return "Good"


@app.route("/")
def home():
    return jsonify({
        "message": "AirQForecast Backend is running!",
        "status": "success",
        "endpoints": [
            "/api/air/current",
            "/api/air/history",
            "/api/air/summary",
            "/api/air/alerts"
        ]
    })
# ----------------------------
# API: CURRENT AIR QUALITY
# ----------------------------
@app.route("/api/air/current")
def current_air():
    # Simulated sensor input (demo-friendly)
    input_data = {
        "PT08.S1(CO)": np.random.randint(400, 2200),
        "NMHC(GT)": 50.0,
        "C6H6(GT)": round(np.random.uniform(0.5, 5.0), 2),
        "PT08.S2(NMHC)": 500.0,
        "NOx(GT)": np.random.randint(20, 200),
        "PT08.S3(NOx)": 1000.0,
        "NO2(GT)": np.random.randint(10, 150),
        "PT08.S4(NO2)": 900.0,
        "PT08.S5(O3)": 600.0,
        "T": round(np.random.uniform(10, 40), 1),
        "RH": np.random.randint(20, 90),
        "AH": 0.7
    }

    df_input = pd.DataFrame([input_data])[FEATURES]
    scaled_input = scaler.transform(df_input)

    prediction = model.predict(scaled_input)[0]
    prediction = max(0.1, prediction)

    return jsonify({
    "currentAQI": int(prediction * 20),  # scale to AQI-like number (0–300)
    "pollutants": [
    {
        "name": "PM2.5",
        "value": round(np.random.uniform(10, 80), 1),
        "unit": "µg/m³",
        "color": "bg-blue-100 text-blue-600"
    },
    {
        "name": "PM10",
        "value": round(np.random.uniform(20, 120), 1),
        "unit": "µg/m³",
        "color": "bg-indigo-100 text-indigo-600"
    },
    {
        "name": "NO₂",
        "value": input_data["NO2(GT)"],
        "unit": "ppb",
        "color": "bg-purple-100 text-purple-600"
    },
    {
        "name": "SO₂",
        "value": round(np.random.uniform(2, 15), 1),
        "unit": "ppb",
        "color": "bg-pink-100 text-pink-600"
    },
    {
        "name": "CO",
        "value": round(prediction, 2),
        "unit": "ppm",
        "color": "bg-red-100 text-red-600"
    },
    {
        "name": "O₃",
        "value": round(np.random.uniform(10, 60), 1),
        "unit": "ppb",
        "color": "bg-green-100 text-green-600"
    }
]
,
    "environmentData": {
        "temperature": input_data["T"],
        "humidity": input_data["RH"],
        "windSpeed": round(np.random.uniform(5, 20), 1)
    }
})


# ----------------------------
# API: AIR QUALITY HISTORY
# ----------------------------
@app.route("/api/air/history")
def air_history():
    history = []

    for hour in range(24):
        history.append({
            "time": f"{hour}:00",
            "aqi": int(np.random.uniform(40, 150)),
            "pm25": round(np.random.uniform(10, 80), 1),
            "pm10": round(np.random.uniform(20, 120), 1),
            "no2": round(np.random.uniform(10, 100), 1)
        })

    return jsonify(history)


# ----------------------------
# API: DAILY SUMMARY
# ----------------------------
@app.route("/api/air/summary")
def air_summary():
    avg_aqi = int(2.8 * 20)
    max_aqi = int(5.2 * 20)

    return jsonify({
        "dailyAverageAQI": avg_aqi,
        "maxAQI": max_aqi,
        "highPollutionEvents": 3,
        "overallStatus": "Moderate" if avg_aqi <= 100 else "Unhealthy"
    })


# ----------------------------
# API: ALERTS
# ----------------------------
@app.route("/api/air/alerts")
def air_alerts():
    alerts = []

    for i in range(8):
        aqi_val = round(np.random.uniform(80, 220), 1)

        severity = "Critical" if aqi_val > 150 else "Warning"

        alerts.append({
            "id": i + 1,
            "timestamp": datetime.now().isoformat(),
            "pollutant": np.random.choice(["PM2.5", "PM10", "NO₂", "SO₂", "CO", "O₃"]),
            "aqiValue": aqi_val,
            "severity": severity
        })

    return jsonify(alerts)


# ----------------------------
# RUN SERVER
# ----------------------------
if __name__ == "__main__":
    app.run(debug=True)
