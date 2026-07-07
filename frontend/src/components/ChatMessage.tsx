import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex items-end gap-3 max-w-[85%] md:max-w-[75%] animate-[slideUpFade_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards] ${isUser ? 'self-end justify-end' : 'self-start'}`}>
      
      {/* Bot Avatar */}
      {!isUser && (
        <div className="w-8.5 h-8.5 rounded-full flex justify-center items-center shrink-0 bg-zinc-900 border border-white/10 text-sky-400 shadow-md">
          <Bot size={15} strokeWidth={2} />
        </div>
      )}
      
      {/* Message Bubble */}
      <div className={`px-4 py-3 relative leading-relaxed text-[0.93rem] border transition-all duration-300 min-w-[80px] ${
        isUser 
          ? 'bg-gradient-to-br from-sky-500 to-sky-600 border-sky-400/20 rounded-2xl rounded-br-sm text-zinc-50 shadow-[0_4px_16px_rgba(14,165,233,0.12)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]' 
          : 'bg-zinc-900/50 border-white/5 rounded-2xl rounded-bl-sm text-zinc-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]'
      }`}>
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <span className="block text-[9px] mt-1.5 opacity-60 font-mono tracking-tight text-right">
          {formatTime(message.timestamp)}
        </span>
      </div>
      
      {/* User Avatar */}
      {isUser && (
        <div className="w-8.5 h-8.5 rounded-full flex justify-center items-center shrink-0 bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-md">
          <User size={15} strokeWidth={2} />
        </div>
      )}
    </div>
  );
};
