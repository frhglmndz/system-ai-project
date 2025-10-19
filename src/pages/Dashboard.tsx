import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const recoveryScore = 65;
  const stats = [
    { label: "Medication", value: 90, color: "bg-secondary" },
    { label: "Appointments", value: 95, color: "bg-secondary" },
    { label: "Exercises", value: 70, color: "bg-secondary" },
  ];

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto">
      {/* Recovery Summary Card */}
      <Card className="p-6 bg-accent border-none shadow-md">
        <div className="flex items-center gap-6">
          {/* Circular Progress */}
          <div className="relative">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted opacity-30"
              />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 48}`}
                strokeDashoffset={`${2 * Math.PI * 48 * (1 - recoveryScore / 100)}`}
                className="text-secondary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-primary">{recoveryScore}%</div>
              <div className="text-xs text-muted-foreground font-medium">ON TRACK</div>
            </div>
          </div>

          {/* Recovery Stats */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-primary mb-3">RECOVERY SUMMARY</h2>
            <ul className="space-y-1 text-sm">
              <li className="text-foreground">• Meds on time: <span className="font-semibold">90%</span></li>
              <li className="text-foreground">• Appointments kept: <span className="font-semibold">95%</span></li>
              <li className="text-foreground">• Exercises done: <span className="font-semibold">70%</span></li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Progress Bars */}
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{stat.label}</span>
              <span className="font-bold text-primary">{stat.value}%</span>
            </div>
            <Progress value={stat.value} className="h-3" />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="default"
          className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full shadow-md"
        >
          View History
        </Button>
        <Button
          variant="default"
          className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full shadow-md"
        >
          Update Status
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
