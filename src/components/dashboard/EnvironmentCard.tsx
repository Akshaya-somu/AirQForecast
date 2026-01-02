import { Thermometer, Droplets, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnvironmentCardProps {
  type: 'temperature' | 'humidity' | 'windSpeed';
  value: number;
}

const config = {
  temperature: {
    icon: Thermometer,
    label: 'Temperature',
    unit: '°C',
    iconColor: 'text-chart-4',
    bgColor: 'bg-chart-4/10',
  },
  humidity: {
    icon: Droplets,
    label: 'Humidity',
    unit: '%',
    iconColor: 'text-chart-2',
    bgColor: 'bg-chart-2/10',
  },
  windSpeed: {
    icon: Wind,
    label: 'Wind Speed',
    unit: 'km/h',
    iconColor: 'text-chart-1',
    bgColor: 'bg-chart-1/10',
  },
};

export function EnvironmentCard({ type, value }: EnvironmentCardProps) {
  const { icon: Icon, label, unit, iconColor, bgColor } = config[type];

  return (
    <div className="flex items-center gap-4 rounded-xl bg-card p-5 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl", bgColor)}>
        <Icon className={cn("h-7 w-7", iconColor)} />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground">
          {value}
          <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>
        </p>
      </div>
    </div>
  );
}
