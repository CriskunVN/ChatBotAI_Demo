import React, { useState } from 'react';
import { User, Copy, Check } from 'lucide-react';
import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const handleCopy = () => {
    if (!message.text) return;
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group flex items-start gap-4 max-w-[88%] sm:max-w-[82%] md:max-w-[75%] lg:max-w-2xl xl:max-w-3xl animate-slide-up ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto flex-row'
        }`}
    >
      <div className="shrink-0 mt-1 select-none">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-[#cc785c] text-white flex items-center justify-center shadow-xs">
            <User className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#181715] text-[#cc785c] flex items-center justify-center shadow-xs border border-[#252320]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        )}
      </div>

      <div className={`flex flex-col gap-1.5 min-w-0 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 px-1 text-[11px] text-[#6c6a64] select-none">
          <span className="font-serif-display text-xs text-[#141413] font-semibold">
            {isUser ? 'Bạn' : 'Claude'}
          </span>
          <span>•</span>
          <span className="font-mono text-[10px]">{formatTime(message.timestamp)}</span>
        </div>

        <div
          className={`px-6 py-4 rounded-3xl text-[0.95rem] leading-relaxed border transition-all shadow-md ${isUser
              ? 'bg-[#cc785c] border-[#a9583e] text-white rounded-tr-xs font-normal'
              : 'bg-[#efe9de] border-[#e6dfd8] text-[#141413] rounded-tl-xs font-normal'
            }`}
        >
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        </div>

        <div
          className={`flex items-center gap-1 px-1 transition-opacity ${copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
        >
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#6c6a64] hover:text-[#cc785c] px-2.5 py-1 rounded-md hover:bg-[#efe9de] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#5db872]" />
                <span className="text-[#5db872] font-semibold">Đã sao chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#6c6a64]" />
                <span>Sao chép</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
