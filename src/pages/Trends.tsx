import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";

const Trends = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://airqforecast-backend.onrender.com/api/air/history")
      .then((res) => res.json())
      .then((apiData) => setData(apiData))
      .catch((err) => console.error("History API error:", err));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Air Quality Trends
        </h1>
        <p className="mt-1 text-muted-foreground">
          Historical data and trend analysis for air quality metrics
        </p>
      </div>

      {/* Top Button (Today only) */}
      <div className="flex gap-2">
        <Button variant="default" size="sm" className="shadow-md">
          Today
        </Button>
      </div>

      {/* AQI Trend Chart */}
      <section className="rounded-2xl bg-card p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          AQI Over Time
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 200]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="aqi"
                name="AQI"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Pollutant Trends */}
      <section className="rounded-2xl bg-card p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Major Pollutants Comparison
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pm25"
                name="PM2.5"
                stroke="hsl(var(--pollutant-pm25))"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="pm10"
                name="PM10"
                stroke="hsl(var(--pollutant-pm10))"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="no2"
                name="NO₂"
                stroke="hsl(var(--pollutant-no2))"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Trends;
