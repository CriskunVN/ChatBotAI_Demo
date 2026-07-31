import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Paperclip, Loader2, CornerDownLeft } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isBusy: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isBusy }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isBusy) return;

    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 140)}px`;
    }
  }, [inputValue]);

  return (
    <div className="px-8 py-8 md:px-16 md:pb-12 bg-[#faf9f5] border-t border-[#e6dfd8] z-20 shrink-0">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl lg:max-w-5xl mx-auto p-5 md:p-6 rounded-3xl bg-[#efe9de] border border-[#e6dfd8] focus-within:border-[#cc785c] focus-within:ring-2 focus-within:ring-[#cc785c]/20 transition-all shadow-md flex flex-col gap-4"
      >
        <textarea
          ref={textareaRef}
          className="w-full bg-transparent border-none text-[#141413] text-[0.95rem] leading-relaxed resize-none px-1 outline-none placeholder:text-[#8e8b82] min-h-[48px] max-h-[140px] font-sans-body"
          placeholder="Nhập câu hỏi hoặc yêu cầu dành cho Claude..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        <div className="h-[1px] bg-[#e6dfd8] my-0.5" />

        <div className="flex justify-between items-center px-1 pt-1">
          <div className="flex items-center gap-1.5">
            <button type="button" className="p-2 rounded-lg text-[#6c6a64] hover:text-[#141413] hover:bg-[#faf9f5] transition-colors cursor-pointer">
              <Paperclip className="w-4 h-4" />
            </button>
            <button type="button" className="p-2 rounded-lg text-[#6c6a64] hover:text-[#141413] hover:bg-[#faf9f5] transition-colors cursor-pointer">
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#6c6a64] font-mono">
              <span>Enter</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
              <span>để gửi</span>
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isBusy}
              className={`h-10 px-5 py-2 rounded-lg font-medium text-xs flex items-center gap-2 transition-all cursor-pointer active:scale-[0.98] ${inputValue.trim() && !isBusy
                  ? 'bg-[#cc785c] hover:bg-[#a9583e] text-white shadow-xs'
                  : 'bg-[#e6dfd8] text-[#8e8b82] cursor-not-allowed'
                }`}
            >
              <span className="font-semibold">{isBusy ? 'Đang suy luận' : 'Gửi'}</span>
              {isBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </form>
      <div className="text-center text-[11px] text-[#8e8b82] mt-3 font-mono select-none">
        Claude 3.5 Sonnet • Powered by Anthropic Intelligence
      </div>
    </div>
  );
};
