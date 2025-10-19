import { Card } from "@/components/ui/card";
import { User, Settings, FileText, HelpCircle, LogOut } from "lucide-react";

const More = () => {
  const menuItems = [
    { icon: User, label: "Profile", description: "View and edit your profile" },
    { icon: Settings, label: "Settings", description: "App preferences" },
    { icon: FileText, label: "Medical Records", description: "View your records" },
    { icon: HelpCircle, label: "Help & Support", description: "Get assistance" },
    { icon: LogOut, label: "Logout", description: "Sign out of your account" },
  ];

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      {menuItems.map((item) => (
        <Card
          key={item.label}
          className="p-5 bg-card border border-border shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="bg-accent p-3 rounded-full">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default More;
