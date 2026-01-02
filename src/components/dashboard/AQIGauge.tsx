import { getAQICategory } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface AQIGaugeProps {
  value: number;
}

export function AQIGauge({ value }: AQIGaugeProps) {
  const category = getAQICategory(value);
  
  // Calculate rotation based on AQI (0-300 scale to 0-180 degrees)
  const rotation = Math.min((value / 300) * 180, 180);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-card p-8 shadow-lg">
      <h2 className="mb-2 text-lg font-semibold text-muted-foreground">Current Air Quality Index</h2>
      
      {/* Gauge Container */}
      <div className="relative mb-4 h-40 w-64">
        {/* Background Arc */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 120">
          {/* Gradient segments */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(142, 76%, 36%)" />
              <stop offset="33%" stopColor="hsl(48, 96%, 53%)" />
              <stop offset="66%" stopColor="hsl(25, 95%, 53%)" />
              <stop offset="100%" stopColor="hsl(0, 84%, 60%)" />
            </linearGradient>
          </defs>
          
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            className="opacity-30"
          />
          
          {/* Active arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(rotation / 180) * 251.2} 251.2`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Needle */}
        <div
          className="absolute bottom-5 left-1/2 h-16 w-1 origin-bottom -translate-x-1/2 rounded-full bg-foreground transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-50%) rotate(${rotation - 90}deg)` }}
        />
        
        {/* Center Circle */}
        <div className="absolute bottom-3 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-foreground" />
      </div>

      {/* AQI Value */}
      <div className="text-center">
        <span className={cn("text-6xl font-bold transition-colors", category.color)}>
          {value}
        </span>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className={cn("h-3 w-3 rounded-full", category.bgColor)} />
          <span className={cn("text-xl font-semibold", category.color)}>
            {category.label}
          </span>
        </div>
      </div>

      {/* Scale Labels */}
      <div className="mt-4 flex w-full justify-between px-4 text-xs text-muted-foreground">
        <span>0</span>
        <span>Good</span>
        <span>Moderate</span>
        <span>Unhealthy</span>
        <span>300+</span>
      </div>
    </div>
  );
}
