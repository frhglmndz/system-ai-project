import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Calendar, X, Plus } from "lucide-react";

const Reminders = () => {
  const [activeTab, setActiveTab] = useState<"today" | "upcoming">("today");

  const reminders = [
    {
      id: 1,
      type: "medication",
      title: "Medication - Metformin",
      time: "9:00 AM",
      detail: "Take with food",
      status: "upcoming",
      icon: Pill,
    },
    {
      id: 2,
      type: "appointment",
      title: "Appointment - Check-up",
      time: "3:00 PM",
      detail: "Ramirez Hospital",
      status: "upcoming",
      icon: Calendar,
    },
    {
      id: 3,
      type: "medication",
      title: "Missed Dose - Vitamin D",
      time: "Yesterday | 8:00 PM",
      detail: "Reschedule",
      status: "missed",
      icon: X,
    },
  ];

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto">
      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "today" ? "default" : "outline"}
          onClick={() => setActiveTab("today")}
          className={`flex-1 rounded-full font-semibold ${
            activeTab === "today"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground border-muted"
          }`}
        >
          Today
        </Button>
        <Button
          variant={activeTab === "upcoming" ? "default" : "outline"}
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 rounded-full font-semibold ${
            activeTab === "upcoming"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground border-muted"
          }`}
        >
          Next 7 days
        </Button>
      </div>

      {/* Reminder Cards */}
      <div className="space-y-4">
        {reminders.map((reminder) => (
          <Card
            key={reminder.id}
            className={`p-4 border-2 shadow-md ${
              reminder.status === "missed"
                ? "bg-red-50 border-red-200"
                : "bg-card border-border"
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={`p-3 rounded-full ${
                  reminder.status === "missed"
                    ? "bg-red-100"
                    : reminder.type === "medication"
                    ? "bg-pink-100"
                    : "bg-blue-100"
                }`}
              >
                <reminder.icon
                  className={`h-6 w-6 ${
                    reminder.status === "missed"
                      ? "text-red-600"
                      : reminder.type === "medication"
                      ? "text-pink-600"
                      : "text-blue-600"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">{reminder.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {reminder.time} | {reminder.detail}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {reminder.status === "missed" ? (
                    <Button
                      size="sm"
                      variant="link"
                      className="text-secondary hover:text-secondary/80 p-0 h-auto font-medium"
                    >
                      Reschedule
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs rounded-full px-3 py-1 h-auto font-semibold"
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs rounded-full px-3 py-1 h-auto font-semibold"
                      >
                        Snooze
                      </Button>
                    </>
                  )}
                  <span
                    className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                      reminder.status === "missed"
                        ? "bg-red-200 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {reminder.status === "missed" ? "Missed" : "Upcoming"}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Reminder Button */}
      <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-full py-6 shadow-lg">
        <Plus className="h-5 w-5 mr-2" />
        Add Reminder
      </Button>
    </div>
  );
};

export default Reminders;
