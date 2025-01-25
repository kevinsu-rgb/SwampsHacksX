import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const Chat = () => {
  return (
    <div className="min-h-screen flex bg-background page-transition">
      <AppSidebar />
      <main className="flex-1 p-8 flex flex-col">
        <h1 className="text-3xl font-bold mb-8">AI Health Chat</h1>
        <Card className="flex-1 glass-effect p-6 mb-4 overflow-auto">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-lg p-4 max-w-[80%]">
                <p className="text-sm font-medium text-primary mb-1">AI Doctor</p>
                <p>Hello! How can I help you with your health today?</p>
              </div>
            </div>
          </div>
        </Card>
        <div className="flex gap-4">
          <Input
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button className="bg-primary hover:bg-primary-light">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Chat;