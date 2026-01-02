// Mock data for AirQForecast dashboard

export interface PollutantData {
  name: string;
  value: number;
  unit: string;
  color: string;
}

export interface EnvironmentData {
  temperature: number;
  humidity: number;
  windSpeed: number;
}

export interface AlertData {
  id: string;
  timestamp: Date;
  pollutant: string;
  aqiValue: number;
  severity: 'Warning' | 'Critical';
}

export interface TrendDataPoint {
  time: string;
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
}

// Current AQI and pollutant readings
export const currentAQI = 72;

export const pollutants: PollutantData[] = [
  { name: 'PM2.5', value: 35.2, unit: 'µg/m³', color: 'pollutant-pm25' },
  { name: 'PM10', value: 58.4, unit: 'µg/m³', color: 'pollutant-pm10' },
  { name: 'NO₂', value: 42.1, unit: 'ppb', color: 'pollutant-no2' },
  { name: 'SO₂', value: 8.3, unit: 'ppb', color: 'pollutant-so2' },
  { name: 'CO', value: 0.8, unit: 'ppm', color: 'pollutant-co' },
  { name: 'O₃', value: 28.5, unit: 'ppb', color: 'pollutant-o3' },
];

export const environmentData: EnvironmentData = {
  temperature: 24,
  humidity: 65,
  windSpeed: 12,
};

// AQI category helper
export const getAQICategory = (aqi: number): { label: string; color: string; bgColor: string } => {
  if (aqi <= 50) return { label: 'Good', color: 'text-aqi-good', bgColor: 'bg-aqi-good' };
  if (aqi <= 100) return { label: 'Moderate', color: 'text-aqi-moderate', bgColor: 'bg-aqi-moderate' };
  if (aqi <= 150) return { label: 'Unhealthy', color: 'text-aqi-unhealthy', bgColor: 'bg-aqi-unhealthy' };
  return { label: 'Hazardous', color: 'text-aqi-hazardous', bgColor: 'bg-aqi-hazardous' };
};

// Generate trend data for different time ranges
const generateTrendData = (hours: number): TrendDataPoint[] => {
  const data: TrendDataPoint[] = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const baseAQI = 50 + Math.sin(i / 3) * 30 + Math.random() * 20;
    
    data.push({
      time: hours <= 24 
        ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        : time.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit' }),
      aqi: Math.round(baseAQI),
      pm25: Math.round(20 + Math.random() * 30),
      pm10: Math.round(40 + Math.random() * 40),
      no2: Math.round(30 + Math.random() * 25),
    });
  }
  
  return data;
};

export const hourlyTrends = generateTrendData(1);
export const dailyTrends = generateTrendData(24);
export const weeklyTrends = generateTrendData(168);

// Alerts data
export const alerts: AlertData[] = [
  { id: '1', timestamp: new Date(Date.now() - 30 * 60 * 1000), pollutant: 'PM2.5', aqiValue: 156, severity: 'Critical' },
  { id: '2', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), pollutant: 'O₃', aqiValue: 112, severity: 'Warning' },
  { id: '3', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), pollutant: 'NO₂', aqiValue: 145, severity: 'Critical' },
  { id: '4', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), pollutant: 'PM10', aqiValue: 108, severity: 'Warning' },
  { id: '5', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), pollutant: 'CO', aqiValue: 118, severity: 'Warning' },
  { id: '6', timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), pollutant: 'PM2.5', aqiValue: 162, severity: 'Critical' },
  { id: '7', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), pollutant: 'SO₂', aqiValue: 105, severity: 'Warning' },
];

// Summary data
export const summaryData = {
  dailyAverageAQI: 68,
  maxAQI: 162,
  highPollutionEvents: 3,
  overallStatus: 'Moderate' as const,
};
