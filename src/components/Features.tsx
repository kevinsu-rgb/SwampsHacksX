import { Brain, MessageSquare, Shield, Activity } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Learn Diagnostics",
    description: "Advanced AI conversations to improve your skills",
  },
  {
    icon: MessageSquare,
    title: "24/7 AI Chat", 
    description: "Get instant practice with our AI chatbot",
  },
  {
    icon: Shield,
    title: "Assessment",
    description: "See your progress and get feedback",
  },
  {
    icon: Activity,
    title: "Real Cases",
    description: "Access real medical cases to practice on",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-background-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Med Coach?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of healthcare with our advanced AI-powered features
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl glass-effect hover-effect"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
