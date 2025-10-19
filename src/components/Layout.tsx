import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Bell, Lightbulb, Activity, MoreHorizontal, Menu } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Bell, label: "Reminders", path: "/reminders" },
    { icon: Lightbulb, label: "Tips", path: "/tips" },
    { icon: Activity, label: "Vitals", path: "/vitals" },
    { icon: MoreHorizontal, label: "More", path: "/more" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between sticky top-0 z-10">
        <Menu className="h-6 w-6" />
        <h1 className="text-lg font-semibold uppercase tracking-wide">
          {navItems.find((item) => isActive(item.path))?.label || "Patient Dashboard"}
        </h1>
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
          <Activity className="h-4 w-4 text-secondary-foreground" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 overflow-y-auto">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-muted border-t border-border">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive(path)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div
                className={`rounded-full p-2 ${
                  isActive(path) ? "bg-accent" : ""
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1 font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
