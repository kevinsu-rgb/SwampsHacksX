import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Chat from "@/pages/Chat";
import SymptomChecker from "@/pages/SymptomChecker";
import "./App.css";

function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/symptoms" element={<SymptomChecker />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </SidebarProvider>
    </Router>
  );
}

export default App;