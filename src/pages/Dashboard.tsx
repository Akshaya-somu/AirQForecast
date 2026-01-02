import { useEffect, useState } from "react";
import { AQIGauge } from "@/components/dashboard/AQIGauge";
import { PollutantCard } from "@/components/dashboard/PollutantCard";
import { EnvironmentCard } from "@/components/dashboard/EnvironmentCard";

const Dashboard = () => {
  const [currentAQI, setCurrentAQI] = useState(0);
  const [pollutants, setPollutants] = useState<any[]>([]);
  const [environmentData, setEnvironmentData] = useState({
    temperature: 0,
    humidity: 0,
    windSpeed: 0,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/air/current")
      .then((res) => res.json())
      .then((data) => {
        setCurrentAQI(data.currentAQI);
        setPollutants(data.pollutants);
        setEnvironmentData(data.environmentData);
      });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Air Quality Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Real-time monitoring of air quality metrics and pollutant levels
        </p>
      </div>

      <div className="flex justify-center">
        <AQIGauge value={currentAQI} />
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Pollutant Levels
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pollutants.map((pollutant) => (
            <PollutantCard
              key={pollutant.name}
              name={pollutant.name}
              value={pollutant.value}
              unit={pollutant.unit}
              colorClass={pollutant.color}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Environmental Conditions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <EnvironmentCard
            type="temperature"
            value={environmentData.temperature}
          />
          <EnvironmentCard type="humidity" value={environmentData.humidity} />
          <EnvironmentCard type="windSpeed" value={environmentData.windSpeed} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
