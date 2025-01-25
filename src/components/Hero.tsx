import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-center px-4">
      <div className="max-w-3xl mx-auto animate-fade-up">
        <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4 inline-block">
          AI-Powered Healthcare
        </span>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Your Personal AI Doctor
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Get instant health insights, symptom analysis, and personalized recommendations powered by advanced artificial intelligence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-light hover-effect"
            asChild
          >
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hover-effect"
            asChild
          >
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};