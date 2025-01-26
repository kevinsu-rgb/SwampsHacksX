import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Auth0Provider } from "@auth0/auth0-react";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Chat from "@/pages/Chat";
import SymptomChecker from "@/pages/SymptomChecker";
import Auth from "@/pages/Auth";
import "./App.css";

function App() {
  return (
    <Auth0Provider
      domain="dev-ptsd108qao32m5rs.us.auth0.com"
      clientId="wLxv8iU0xMFgRwDT44IxTTVSUerKFz1A"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/symptoms" element={<SymptomChecker />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </div>
        </SidebarProvider>
      </Router>
    </Auth0Provider>
  );
}

export default App;