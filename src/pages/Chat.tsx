import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import fetchPrompt from './Chattest';

const Chat = () => {
  const MAX_HISTORY = 50;
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
    
    // Add user message to chat and trim history
    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    const trimmedMessages = newMessages.slice(-MAX_HISTORY);
    setMessages(trimmedMessages);
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
              ...trimmedMessages, // Send all trimmed messages as context
            ],
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = data[0].response.response;
      
      // Update messages with AI response while maintaining history limit
      const updatedMessages = [...trimmedMessages, { role: 'assistant', content: aiMessage }].slice(-MAX_HISTORY);
      setAiResponse(aiMessage);
      setMessages(updatedMessages);
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
    <div className="min-h-screen flex bg-background page-transition w-full">
      <AppSidebar />
      <main className="flex-2 p-8 flex flex-col w-full">
        <h1 className="text-3xl font-bold mb-8">AI Health Chat</h1>
        <Card className="flex-1 glass-effect p-6 mb-4 overflow-auto w-full">
          <div className="space-y-4 w-full">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-4 w-full ${message.role === 'user' ? 'justify-end' : ''}`}>
                <div className={`rounded-lg p-6 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto max-w-[70%]' 
                    : 'bg-primary/10 max-w-[70%]'
                }`}>
                  <p className="text-lg font-medium mb-2">
                    {message.role === 'user' ? 'You' : 'Patient'}
                  </p>
                  <p className="text-xl leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-4 w-full">
                <div className="bg-primary/10 rounded-lg p-6 max-w-[70%]">
                  <p className="text-lg font-medium text-primary mb-2">Patient</p>
                  <p className="text-xl leading-relaxed">Loading...</p>
                </div>
              </div>
            )}
          </div>
        </Card>
        <div className="flex gap-4 w-full">
          <Input
            placeholder="Type your message..."
            className="flex-1 text-lg p-6 min-h-[60px] w-full"
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
