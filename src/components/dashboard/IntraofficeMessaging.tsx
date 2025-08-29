import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ChevronUp, X, MoreVertical } from "lucide-react";

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  isOwn?: boolean;
  urgent?: boolean;
}

export default function IntraofficeMessaging() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'Sarah',
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
      author: 'You',
      content: 'Copy that, I\'ll let the patients know',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isOwn: true
    },
    {
      id: '4',
      author: 'Lisa',
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
        timestamp: new Date(),
        isOwn: true
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Auto-scroll to bottom
      setTimeout(() => {
        if (scrollAreaRef.current) {
          const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
          if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
          }
        }
      }, 100);
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

  const formatCompactTime = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffMinutes}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Get last 2 messages for compact view
  const recentMessages = messages.slice(-2);

  // Simulate typing indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(Math.random() > 0.8);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Expanded Chat Overlay */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-end">
          <div className="w-96 h-[500px] bg-background border border-border rounded-t-lg shadow-lg mr-6 mb-20 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-semibold">Team Chat</h3>
                <p className="text-xs text-muted-foreground">{messages.length} messages</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                      {!message.isOwn && (
                        <div className="text-xs font-medium text-muted-foreground mb-1">
                          {message.author}
                        </div>
                      )}
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.isOwn 
                          ? 'bg-primary text-primary-foreground ml-2' 
                          : 'bg-muted mr-2'
                      } ${message.urgent ? 'ring-2 ring-red-500' : ''}`}>
                        <p className="text-sm">{message.content}</p>
                        {message.urgent && (
                          <div className="text-xs font-medium text-red-400 mt-1">URGENT</div>
                        )}
                      </div>
                      <div className={`text-xs text-muted-foreground mt-1 ${
                        message.isOwn ? 'text-right mr-2' : 'ml-2'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-2 mr-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-end space-x-2">
                <Textarea
                  ref={textareaRef}
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                  rows={1}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim()}
                  className="rounded-full p-2 h-10 w-10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compact Footer Chat Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center space-x-4">
            {/* Recent Messages Preview */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium mb-1">Team Chat</div>
              <div className="space-y-1">
                {recentMessages.map((message, index) => (
                  <div key={message.id} className="flex items-center space-x-2 text-xs">
                    <span className={`font-medium ${message.isOwn ? 'text-primary' : 'text-muted-foreground'}`}>
                      {message.isOwn ? 'You' : message.author}:
                    </span>
                    <span className="text-muted-foreground truncate">
                      {message.content}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {formatCompactTime(message.timestamp)}
                    </span>
                    {message.urgent && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Input */}
            <div className="flex items-center space-x-2 flex-shrink-0 w-80">
              <Input
                placeholder="Quick message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!newMessage.trim()}
                size="sm"
                className="rounded-full p-2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Expand Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(true)}
              className="flex-shrink-0"
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}