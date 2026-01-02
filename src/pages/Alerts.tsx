import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle } from "lucide-react";

/* ---------------- TYPES ---------------- */

export type AlertData = {
  id: number;
  timestamp: Date;
  pollutant: string;
  aqiValue: number;
  severity: "Warning" | "Critical";
};

type SeverityFilter = "all" | "Warning" | "Critical";

/* ---------------- COMPONENT ---------------- */

const Alerts = () => {
  const [filter, setFilter] = useState<SeverityFilter>("all");
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  /* -------- FETCH FROM BACKEND -------- */
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/air/alerts")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((a: any) => ({
          ...a,
          timestamp: new Date(a.timestamp),
        }));
        setAlerts(formatted);
      })
      .catch((err) => console.error("Alerts API error:", err));
  }, []);

  /* -------- FILTERED DATA -------- */
  const filteredAlerts =
    filter === "all"
      ? alerts
      : alerts.filter((alert) => alert.severity === filter);

  /* -------- HELPERS -------- */
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getSeverityStyles = (severity: AlertData["severity"]) => {
    if (severity === "Critical") {
      return {
        badge: "bg-aqi-hazardous/10 text-aqi-hazardous border-aqi-hazardous/30",
        icon: AlertCircle,
        row: "bg-aqi-hazardous/5",
      };
    }
    return {
      badge: "bg-aqi-moderate/10 text-aqi-moderate border-aqi-moderate/30",
      icon: AlertTriangle,
      row: "",
    };
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Air Quality Alerts
        </h1>
        <p className="mt-1 text-muted-foreground">
          Historical alerts and warnings based on pollutant levels
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All Alerts
        </Button>

        <Button
          variant={filter === "Warning" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("Warning")}
          className={cn(
            filter === "Warning" && "bg-aqi-moderate hover:bg-aqi-moderate/90"
          )}
        >
          Warning
        </Button>

        <Button
          variant={filter === "Critical" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("Critical")}
          className={cn(
            filter === "Critical" &&
              "bg-aqi-hazardous hover:bg-aqi-hazardous/90"
          )}
        >
          Critical
        </Button>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-card p-5 shadow-md">
          <p className="text-sm text-muted-foreground">Total Alerts</p>
          <p className="mt-1 text-3xl font-bold text-foreground">
            {alerts.length}
          </p>
        </div>

        <div className="rounded-xl bg-aqi-moderate/10 p-5 shadow-md">
          <p className="text-sm text-aqi-moderate">Warnings</p>
          <p className="mt-1 text-3xl font-bold text-aqi-moderate">
            {alerts.filter((a) => a.severity === "Warning").length}
          </p>
        </div>

        <div className="rounded-xl bg-aqi-hazardous/10 p-5 shadow-md">
          <p className="text-sm text-aqi-hazardous">Critical</p>
          <p className="mt-1 text-3xl font-bold text-aqi-hazardous">
            {alerts.filter((a) => a.severity === "Critical").length}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-xl bg-card shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Timestamp</TableHead>
              <TableHead>Pollutant</TableHead>
              <TableHead>AQI Value</TableHead>
              <TableHead>Severity</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredAlerts.map((alert) => {
              const styles = getSeverityStyles(alert.severity);
              const Icon = styles.icon;

              return (
                <TableRow key={alert.id} className={styles.row}>
                  <TableCell className="font-medium">
                    {formatTimestamp(alert.timestamp)}
                  </TableCell>
                  <TableCell>{alert.pollutant}</TableCell>
                  <TableCell className="font-mono font-bold">
                    {alert.aqiValue}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("gap-1", styles.badge)}
                    >
                      <Icon className="h-3 w-3" />
                      {alert.severity}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Alerts;
