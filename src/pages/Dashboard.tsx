import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Activity, Brain, Heart, Thermometer } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-background page-transition">
      <AppSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 glass-effect hover-effect">
            <Heart className="w-8 h-8 text-secondary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Heart Rate</h3>
            <p className="text-3xl font-bold">72 BPM</p>
          </Card>
          <Card className="p-6 glass-effect hover-effect">
            <Thermometer className="w-8 h-8 text-secondary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Temperature</h3>
            <p className="text-3xl font-bold">98.6°F</p>
          </Card>
          <Card className="p-6 glass-effect hover-effect">
            <Brain className="w-8 h-8 text-secondary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Mental Health</h3>
            <p className="text-3xl font-bold">Good</p>
          </Card>
          <Card className="p-6 glass-effect hover-effect">
            <Activity className="w-8 h-8 text-secondary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Activity</h3>
            <p className="text-3xl font-bold">Active</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;