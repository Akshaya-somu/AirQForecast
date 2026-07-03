import { useEffect, useState } from "react";
import { getAQICategory } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Activity,
} from "lucide-react";

/* ---------------- TYPES ---------------- */

type SummaryData = {
  dailyAverageAQI: number;
  maxAQI: number;
  highPollutionEvents: number;
  overallStatus: string;
};

type HistoryPoint = {
  time: string;
  aqi: number;
};

/* ---------------- COMPONENT ---------------- */

const Summary = () => {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [historyData, setHistoryData] = useState<HistoryPoint[]>([]);

  /* -------- FETCH SUMMARY FROM BACKEND -------- */
  useEffect(() => {
    Promise.all([
      fetch("/api/air/summary").then((res) => res.json()),
      fetch("/api/air/history").then((res) => res.json()),
    ])
      .then(([summary, history]) => {
        setSummaryData(summary);
        setHistoryData(history);
      })
      .catch((err) => console.error("Summary API error:", err));
  }, []);

  /* -------- LOADING SAFETY -------- */
  if (!summaryData) return null;

  const category = getAQICategory(summaryData.dailyAverageAQI);

  /* -------- BAR CHART DATA -------- */
  const hourlyData = historyData.slice(-12).map((item) => ({
    hour: item.time,
    aqi: item.aqi,
  }));

  const getBarColor = (aqi: number) => {
    if (aqi <= 50) return "hsl(var(--aqi-good))";
    if (aqi <= 100) return "hsl(var(--aqi-moderate))";
    if (aqi <= 150) return "hsl(var(--aqi-unhealthy))";
    return "hsl(var(--aqi-hazardous))";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Daily Summary</h1>
        <p className="mt-1 text-muted-foreground">
          Overview of today's air quality statistics
        </p>
      </div>

      {/* -------- KEY STATS -------- */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Daily Average */}
        <div className="rounded-2xl bg-card p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <Activity className="h-8 w-8 text-primary" />
            <span
              className={cn(
                "text-sm font-medium px-2 py-1 rounded-full",
                category.bgColor,
                "text-primary-foreground",
              )}
            >
              {category.label}
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Daily Average AQI
          </p>
          <p className={cn("text-4xl font-bold", category.color)}>
            {summaryData.dailyAverageAQI}
          </p>
        </div>

        {/* Max AQI */}
        <div className="rounded-2xl bg-card p-6 shadow-lg">
          <TrendingUp className="h-8 w-8 text-aqi-hazardous" />
          <p className="mt-4 text-sm text-muted-foreground">
            Maximum AQI Recorded
          </p>
          <p className="text-4xl font-bold text-aqi-hazardous">
            {summaryData.maxAQI}
          </p>
        </div>

        {/* Pollution Events */}
        <div className="rounded-2xl bg-card p-6 shadow-lg">
          <AlertTriangle className="h-8 w-8 text-aqi-unhealthy" />
          <p className="mt-4 text-sm text-muted-foreground">
            High Pollution Events
          </p>
          <p className="text-4xl font-bold text-aqi-unhealthy">
            {summaryData.highPollutionEvents}
          </p>
        </div>

        {/* Trend */}
        <div className="rounded-2xl bg-card p-6 shadow-lg">
          <TrendingDown className="h-8 w-8 text-aqi-good" />
          <p className="mt-4 text-sm text-muted-foreground">24h Change</p>
          <p className="text-4xl font-bold text-aqi-good">-12%</p>
        </div>
      </div>

      {/* -------- STATUS -------- */}
      <div className="rounded-2xl p-8 shadow-lg text-center bg-gradient-to-br from-card to-primary/5">
        <h2 className="text-xl font-semibold text-muted-foreground">
          Overall Air Quality Status
        </h2>
        <p className={cn("mt-4 text-6xl font-bold", category.color)}>
          {summaryData.overallStatus}
        </p>
      </div>

      {/* -------- BAR CHART -------- */}
      <section className="rounded-2xl bg-card p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Hourly AQI Distribution (Last 12 Hours)
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis domain={[0, 200]} />
              <Tooltip formatter={(value: number) => [value, "AQI"]} />
              <Bar dataKey="aqi" radius={[4, 4, 0, 0]}>
                {hourlyData.map((entry, index) => (
                  <Cell key={index} fill={getBarColor(entry.aqi)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Summary;
