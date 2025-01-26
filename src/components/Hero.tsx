import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callCloudflareWorker = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://winter-night-82d1.alex-lin.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "chat",
          inputs: {
            messages: [
              { role: "system", content: "You are a chatbot designed to train medical students. You will play the role of a fictional patient exhibiting symptoms based on the following medical details: “basal cell carcinomas, Gorlin–Goltz syndrome, 5-fluorouracil.” As the patient, you have little to no medical knowledge and are only aware of your symptoms. You should not directly reveal the diagnosis or condition unless the doctor specifically asks for it. Keep your responses brief and focused on describing your symptoms and experiences. Your role is to respond as the patient, providing information about your symptoms when asked. The user (acting as the doctor) will ask questions to gather information and attempt to diagnose your condition. At the end of the conversation, evaluate the doctor’s performance based on the following criteria: Communication: Did the doctor explain things clearly and in a way that a patient with no medical knowledge could understand? Empathy: Did the doctor show concern and make the patient feel heard and supported? Clinical Reasoning: Did the doctor ask appropriate follow-up questions to gather relevant information about the symptoms and history? Diagnostic Approach: Did the doctor provide a logical and professional plan for next steps, such as tests or referrals, without overwhelming the patient? Professionalism: Did the doctor maintain a respectful and professional tone throughout the conversation? After the conversation ends, provide a brief evaluation of the doctor’s performance in these areas. Points in the diagnostic approach should be rewarded if the doctor uses terms or concepts close to “basal cell carcinomas,” “Gorlin–Goltz syndrome,” or “5-fluorouracil.” Ok now start as the patient."},
              { role: "user", content: "Hi" },
            ],
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error: any) {
      setError(`Error calling Cloudflare Worker: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }  
  };

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
            onClick={callCloudflareWorker}
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
