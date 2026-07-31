import { useRef, useEffect, useState } from 'react';
import { useChatStore } from './store/useChatStore';
import { Sidebar } from './components/Sidebar';
import { ChatHeader } from './components/ChatHeader';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatMessage } from './components/ChatMessage';
import { TypingIndicator } from './components/TypingIndicator';
import { ChatInput } from './components/ChatInput';

function App() {
  const { messages, phase, sendMessage } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, phase]);

  const showSuggestions = messages.length <= 1;

  return (
    <div className="w-full h-screen bg-[#faf9f5] flex flex-row overflow-hidden relative z-10 font-sans-body">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 bg-[#faf9f5] flex flex-col h-full min-w-0 overflow-hidden relative">
        <ChatHeader
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
        />

        <div className="flex-1 overflow-y-auto px-8 py-12 md:px-16 flex flex-col scroll-smooth">
          <div className="w-full max-w-4xl lg:max-w-5xl mx-auto flex flex-col gap-10 md:gap-12">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {showSuggestions && (
              <WelcomeScreen onSelectPrompt={sendMessage} />
            )}

            {phase === 'thinking' && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput onSendMessage={sendMessage} isBusy={phase !== 'idle'} />
      </main>
    </div>
  );
}

export default App;
