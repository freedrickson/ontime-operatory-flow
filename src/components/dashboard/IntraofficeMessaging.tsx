import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageSquare, ChevronUp, ChevronDown } from "lucide-react";

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  urgent?: boolean;
}

export default function IntraofficeMessaging() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'Sarah (Front Desk)',
      content: 'Walk-in toothache seated in lobby chair 8',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      urgent: true
    },
    {
      id: '2',
      author: 'Dr. Smith',
      content: 'Running 10 minutes behind schedule',
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: '3',
      author: 'Lisa (Hygienist)',
      content: 'Room 1 patient is ready for doctor review',
      timestamp: new Date(Date.now() - 20 * 60 * 1000)
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        author: 'You',
        content: newMessage.trim(),
        timestamp: new Date()
      };
      setMessages(prev => [message, ...prev]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="border-t bg-card">
      {/* Collapsed State - Chat Bar */}
      {!isExpanded && (
        <div className="px-6 py-3 flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Team Chat</span>
            <ChevronUp className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 flex items-center space-x-2">
            <Input
              placeholder="Quick message to team..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button size="sm" onClick={handleSendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {messages.some(m => m.urgent) && (
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </div>
      )}

      {/* Expanded State - Full Chat */}
      {isExpanded && (
        <Card className="m-0 rounded-t-lg border-t-0">
          <CardContent className="p-0">
            {/* Header */}
            <div className="px-6 py-3 border-b flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span className="font-medium">Team Chat</span>
                <span className="text-sm text-muted-foreground">
                  ({messages.length} messages)
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="h-64 p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`p-3 rounded-lg ${
                    message.urgent ? 'bg-red-50 border border-red-200' : 'bg-muted'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{message.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    {message.urgent && (
                      <div className="text-xs text-red-600 font-medium mt-1">URGENT</div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}