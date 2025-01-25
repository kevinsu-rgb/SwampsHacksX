import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SymptomChecker = () => {
  return (
    <div className="min-h-screen flex bg-background page-transition">
      <AppSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Symptom Checker</h1>
        <Card className="p-6 glass-effect mb-8">
          <div className="flex gap-4">
            <Input
              placeholder="Search symptoms..."
              className="flex-1"
            />
            <Button className="bg-primary hover:bg-primary-light">
              <Search className="w-4 h-4 mr-2" />
              Check Symptoms
            </Button>
          </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 glass-effect">
            <h3 className="text-xl font-semibold mb-4">Common Symptoms</h3>
            <div className="space-y-2">
              {["Headache", "Fever", "Cough", "Fatigue", "Nausea"].map((symptom) => (
                <Button
                  key={symptom}
                  variant="outline"
                  className="mr-2 mb-2 hover-effect"
                >
                  {symptom}
                </Button>
              ))}
            </div>
          </Card>
          <Card className="p-6 glass-effect">
            <h3 className="text-xl font-semibold mb-4">Recent Searches</h3>
            <p className="text-muted-foreground">No recent searches</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SymptomChecker;