import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary hover-effect">
            AI Doctor
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="hover-effect"
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              className="bg-primary hover:bg-primary-light hover-effect"
              asChild
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};