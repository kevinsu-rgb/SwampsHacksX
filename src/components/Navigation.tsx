import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@/components/ui/use-toast";

export const Navigation = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const { toast } = useToast();

  const handleSignOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary hover-effect">
            Med Coach
          </Link>
          <div className="flex items-center gap-4">
            {isLoading ? (
              <span className="text-sm text-muted-foreground">Loading...</span>
            ) : isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user?.email}
                </span>
                <Button
                  variant="ghost"
                  className="hover-effect"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="hover-effect"
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 hover-effect"
                  onClick={() => loginWithRedirect({
                    authorizationParams: {
                      screen_hint: 'signup'
                    }
                  })}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};