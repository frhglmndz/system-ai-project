import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Thermometer, HandMetal, Plus } from "lucide-react";

const Vitals = () => {
  const trends = [
    { id: 1, icon: Heart, label: "Heart Rate", color: "bg-red-100 text-red-600" },
    { id: 2, icon: Thermometer, label: "Temperature", color: "bg-orange-100 text-orange-600" },
    { id: 3, icon: HandMetal, label: "Pain", color: "bg-yellow-100 text-yellow-600" },
  ];

  const symptoms = [
    { label: "Pain", level: "Mild", color: "bg-orange-100 text-orange-800" },
    { label: "Fatigue", level: "Low", color: "bg-blue-100 text-blue-800" },
    { label: "Mood", level: "Good", color: "bg-green-100 text-green-800" },
  ];

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto">
      {/* Trends Section */}
      <Card className="p-5 bg-accent border-none shadow-md">
        <h2 className="text-lg font-bold text-primary mb-4">Trends (7 days)</h2>
        <div className="grid grid-cols-3 gap-3">
          {trends.map((trend) => (
            <Button
              key={trend.id}
              variant="outline"
              className={`flex flex-col items-center justify-center p-4 h-auto rounded-2xl border-none ${trend.color}`}
            >
              <trend.icon className="h-6 w-6 mb-2" />
              <span className="text-xs font-semibold text-center leading-tight">
                {trend.label}
              </span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Latest Vitals */}
      <Card className="p-5 bg-card border border-border shadow-md">
        <h2 className="text-lg font-bold text-primary mb-3">Latest Vitals</h2>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center">
            <Heart className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-foreground">
              <span className="font-semibold">HR:</span> 77bpm
            </span>
          </div>
          <span className="text-muted-foreground">|</span>
          <div className="flex items-center">
            <Thermometer className="h-4 w-4 text-orange-500 mr-1" />
            <span className="text-foreground">
              <span className="font-semibold">Temp:</span> 36.8°C
            </span>
          </div>
          <span className="text-muted-foreground">|</span>
          <div className="flex items-center">
            <span className="text-foreground">
              <span className="font-semibold">BP:</span> 120/80
            </span>
          </div>
        </div>
      </Card>

      {/* Symptoms */}
      <div>
        <h2 className="text-lg font-bold text-primary mb-4">Symptoms</h2>
        <div className="flex flex-wrap gap-3">
          {symptoms.map((symptom) => (
            <div
              key={symptom.label}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${symptom.color}`}
            >
              {symptom.label} | {symptom.level}
            </div>
          ))}
        </div>
      </div>

      {/* Add Entry Button */}
      <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-full py-6 shadow-lg">
        <Plus className="h-5 w-5 mr-2" />
        Add Entry
      </Button>
    </div>
  );
};

export default Vitals;
