import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import fetchPrompt from './Chattest';

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("Press to Start");
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);

  const callCloudflareWorker = async () => {
    if (!inputMessage.trim()) return;
    
    setLoading(true);
    setError(null);
    
    // Add user message to chat
    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    setMessages(newMessages);
    setInputMessage(""); // Clear input after sending

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
              { role: "system", content: systemPrompt },
              { role: "user", content: inputMessage },
            ],
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = data[0].response.response;
      setAiResponse(aiMessage);
      setMessages([...newMessages, { role: 'assistant', content: aiMessage }]);
    } catch (error: any) {
      setError(`Error calling Cloudflare Worker: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }  
  };

  useEffect(() => {
    const getPrompt = async () => {
      const prompt = await fetchPrompt();
      setSystemPrompt(prompt);
      console.log("Fetched prompt:", prompt);
    };
    
    getPrompt();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      callCloudflareWorker();
    }
  };

  return (
    <div className="min-h-screen flex bg-background page-transition">
      <AppSidebar />
      <main className="flex-2 p-8 flex flex-col">
        <h1 className="text-3xl font-bold mb-8">AI Health Chat</h1>
        <Card className="flex-1 glass-effect p-6 mb-4 overflow-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                <div className={`rounded-lg p-6 max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : 'bg-primary/10'
                }`}>
                  <p className="text-lg font-medium mb-2">
                    {message.role === 'user' ? 'You' : 'Med Coach'}
                  </p>
                  <p className="text-xl leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-6 max-w-[80%]">
                  <p className="text-lg font-medium text-primary mb-2">Med Coach</p>
                  <p className="text-xl leading-relaxed">Loading...</p>
                </div>
              </div>
            )}
          </div>
        </Card>
        <div className="flex gap-4">
          <Input
            placeholder="Type your message..."
            className="flex-1 text-lg p-6 min-h-[60px]"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button 
            className="bg-primary hover:bg-primary-light px-6"
            onClick={callCloudflareWorker}
            disabled={loading}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Chat;