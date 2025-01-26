import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";



export const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-center px-4">
      <div className="max-w-3xl mx-auto animate-fade-up">
        <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4 inline-block">
          AI-Powered Education
        </span>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Med Coach
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Practice your diagnosis skills by identifying real medical conditions.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-light hover-effect"
            disabled={loading}
          >
            {loading ? "Loading..." : "Let's Practice"}
          </Button>
          { 
 
            }
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};
