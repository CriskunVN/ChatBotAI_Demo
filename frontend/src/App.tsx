import { useRef, useEffect } from 'react';
import { useChatStore } from './store/useChatStore';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { TypingIndicator } from './components/TypingIndicator';
import { ChatInput } from './components/ChatInput';

function App() {
  const { messages, isTyping, sendMessage } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    // Outer Shell (Frosted Glass Bezel - Apple-esque / Linear-tier style)
    <div className="w-full max-w-[850px] h-[100dvh] md:h-[82vh] bg-white/[0.03] backdrop-blur-2xl p-0 md:p-2.5 md:rounded-[2.5rem] md:border md:border-white/10 md:ring-1 md:ring-white/10 md:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] flex flex-col relative z-10 animate-[popIn_0.6s_cubic-bezier(0.16,1,0.3,1)]">
      
      {/* Inner Core (Concentric Glass layers) */}
      <div className="flex-1 bg-zinc-950/70 backdrop-blur-3xl md:rounded-[calc(2.5rem-0.625rem)] border-0 md:border md:border-white/5 flex flex-col overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        {/* Header */}
        <ChatHeader />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8 flex flex-col gap-6 scroll-smooth">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
