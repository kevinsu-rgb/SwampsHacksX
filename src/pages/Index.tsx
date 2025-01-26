import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";

const Index = () => {
  return (
    <div className="page-transition">
      <Navigation />
      <Hero />
      <Features />
    </div>
  );
};

export default Index;