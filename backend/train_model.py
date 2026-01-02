import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# ----------------------------
# 1. LOAD DATASET
# ----------------------------
df = pd.read_csv("data/AirQuality.csv", sep=";")

# Drop empty columns
df = df.drop(columns=["Unnamed: 15", "Unnamed: 16"], errors="ignore")

# Replace comma decimal with dot
for col in df.columns:
    if df[col].dtype == object:
        df[col] = df[col].str.replace(",", ".", regex=False)

# Convert numeric columns
numeric_cols = df.columns.drop(["Date", "Time"])
df[numeric_cols] = df[numeric_cols].astype(float)

# ----------------------------
# 2. CREATE DATETIME
# ----------------------------
df["Time"] = df["Time"].str.replace(".", ":", regex=False)
df["Datetime"] = pd.to_datetime(
    df["Date"] + " " + df["Time"],
    format="%d/%m/%Y %H:%M:%S",
    errors="coerce"
)

df = df.sort_values("Datetime")
df = df.drop(columns=["Date", "Time"])
df.set_index("Datetime", inplace=True)

# ----------------------------
# 3. HANDLE MISSING VALUES
# ----------------------------
df.replace(-200, np.nan, inplace=True)
df.fillna(method="ffill", inplace=True)

# ----------------------------
# 4. SELECT FEATURES & TARGET
# ----------------------------
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

TARGET = "CO(GT)"

X = df[FEATURES]
y = df[TARGET]

# ----------------------------
# 5. TRAIN–TEST SPLIT (TIME SERIES SAFE)
# ----------------------------
split_index = int(len(df) * 0.8)
X_train, X_test = X.iloc[:split_index], X.iloc[split_index:]
y_train, y_test = y.iloc[:split_index], y.iloc[split_index:]

# ----------------------------
# 6. SCALE FEATURES
# ----------------------------
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ----------------------------
# 7. TRAIN MODEL
# ----------------------------
model = RandomForestRegressor(
    n_estimators=100,
    max_depth=10,
    random_state=42
)

model.fit(X_train_scaled, y_train)

# ----------------------------
# 8. EVALUATION
# ----------------------------
y_pred = model.predict(X_test_scaled)

mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("✅ Model Training Complete")
print(f"MAE: {mae:.3f}")
print(f"R2 Score: {r2:.3f}")

# ----------------------------
# 9. SAVE MODELS
# ----------------------------
joblib.dump(model, "models/aqi_model.pkl")
joblib.dump(scaler, "models/scaler.pkl")

print("✅ Saved models:")
print(" - models/aqi_model.pkl")
print(" - models/scaler.pkl")
