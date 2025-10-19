import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Footprints, Wind, Save, Share2 } from "lucide-react";

const Tips = () => {
  const tips = [
    {
      id: 1,
      icon: Droplets,
      title: "Stay Hydrated",
      description: "Drink 8 glasses of water today.",
      bgColor: "bg-accent",
      featured: true,
    },
    {
      id: 2,
      icon: Footprints,
      title: "Walking - 10-15 mins",
      description: "Turning steps into strength, one walk at a time.",
      bgColor: "bg-muted/50",
    },
    {
      id: 3,
      icon: Wind,
      title: "Deep Breathing - 3x",
      description: "Breathing in calm, breathing out stress",
      bgColor: "bg-muted/50",
    },
  ];

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto">
      {/* Featured Tip */}
      <Card className="p-6 bg-accent border-none shadow-lg">
        <div className="flex items-start gap-4">
          <div className="bg-muted/40 p-4 rounded-full">
            <Droplets className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-primary mb-2">Stay Hydrated</h2>
            <p className="text-foreground mb-4">Drink 8 glasses of water today.</p>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full px-6">
              Learn More
            </Button>
          </div>
        </div>
      </Card>

      {/* Other Tips */}
      <div className="space-y-4">
        {tips.slice(1).map((tip) => (
          <Card
            key={tip.id}
            className={`p-5 ${tip.bgColor} border border-border shadow-md`}
          >
            <div className="flex items-center gap-4">
              <div className="bg-muted/60 p-3 rounded-full">
                <tip.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-base mb-1">
                  {tip.title}
                </h3>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-2">
        <Button
          variant="outline"
          className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-full py-6"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Tip
        </Button>
        <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full py-6">
          <Share2 className="h-5 w-5 mr-2" />
          Share Tip
        </Button>
      </div>
    </div>
  );
};

export default Tips;
