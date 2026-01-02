import { cn } from "@/lib/utils";

interface PollutantCardProps {
  name: string;
  value: number;
  unit: string;
  colorClass: string;
}

const pollutantColors: Record<string, string> = {
  'pollutant-pm25': 'bg-pollutant-pm25',
  'pollutant-pm10': 'bg-pollutant-pm10',
  'pollutant-no2': 'bg-pollutant-no2',
  'pollutant-so2': 'bg-pollutant-so2',
  'pollutant-co': 'bg-pollutant-co',
  'pollutant-o3': 'bg-pollutant-o3',
};

const pollutantTextColors: Record<string, string> = {
  'pollutant-pm25': 'text-pollutant-pm25',
  'pollutant-pm10': 'text-pollutant-pm10',
  'pollutant-no2': 'text-pollutant-no2',
  'pollutant-so2': 'text-pollutant-so2',
  'pollutant-co': 'text-pollutant-co',
  'pollutant-o3': 'text-pollutant-o3',
};

export function PollutantCard({ name, value, unit, colorClass }: PollutantCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-card p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Color accent bar */}
      <div className={cn("absolute left-0 top-0 h-full w-1", pollutantColors[colorClass])} />
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{name}</p>
          <p className={cn("mt-1 text-2xl font-bold", pollutantTextColors[colorClass])}>
            {value}
          </p>
          <p className="text-xs text-muted-foreground">{unit}</p>
        </div>
        
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full opacity-20",
          pollutantColors[colorClass]
        )}>
          <span className="text-lg font-bold text-foreground">{name.charAt(0)}</span>
        </div>
      </div>
    </div>
  );
}
