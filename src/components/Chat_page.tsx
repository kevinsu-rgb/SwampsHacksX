import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Chat_page = () => {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
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
            messages: [...messages, newMessage],
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data?.output || "Sorry, I couldn’t understand that.";

      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-center px-4">
      <div className="flex-grow max-w-4xl mx-auto py-4 flex flex-col">
        <div className="flex-grow bg-muted-foreground/10 rounded-lg p-4 overflow-y-auto mb-4 shadow-md" style={{ height: "75vh" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 p-3 rounded-lg max-w-md ${
                msg.role === "assistant" ? "bg-primary/10 self-start" : "bg-primary/20 self-end"
              }`}
            >
              <p className="text-left">{msg.content}</p>
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex items-center">
          <input
            type="text"
            className="flex-grow border border-muted-foreground rounded-lg px-4 py-2 mr-2 shadow-sm"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-light hover-effect"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};
