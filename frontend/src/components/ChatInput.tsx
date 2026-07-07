import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Paperclip, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-grow textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  return (
    <div className="p-4 md:p-6 bg-gradient-to-t from-zinc-950/80 to-zinc-950/40 border-t border-white/5 backdrop-blur-md">
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col bg-zinc-900/40 border border-white/10 rounded-2xl p-3 transition-all duration-300 focus-within:border-sky-500/30 focus-within:ring-1 focus-within:ring-sky-500/20 focus-within:bg-zinc-900/60 shadow-lg"
      >
        {/* Input Text Area */}
        <textarea
          ref={textareaRef}
          className="w-full bg-transparent border-none text-zinc-100 font-inherit text-[0.93rem] leading-relaxed resize-none py-1 px-2 outline-none placeholder:text-zinc-500 min-h-[44px]"
          placeholder="Hỏi trợ lý AI điều gì đó..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        
        {/* Divider */}
        <div className="h-[1px] bg-white/5 my-2 mx-1" />
        
        {/* Bottom Toolbar */}
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-1">
            <button 
              type="button" 
              className="bg-transparent border-none text-zinc-400 cursor-pointer p-2 rounded-lg transition-all duration-200 flex items-center justify-center hover:bg-white/5 hover:text-zinc-200 active:scale-95"
              title="Đính kèm tệp"
            >
              <Paperclip size={16} />
            </button>
            <button 
              type="button" 
              className="bg-transparent border-none text-zinc-400 cursor-pointer p-2 rounded-lg transition-all duration-200 flex items-center justify-center hover:bg-white/5 hover:text-zinc-200 active:scale-95"
              title="Đính kèm hình ảnh"
            >
              <ImageIcon size={16} />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Character count / status hint */}
            {inputValue.trim() && (
              <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
                {inputValue.length} ký tự
              </span>
            )}
            
            {/* Send Button */}
            <button 
              type="submit" 
              className={`border-none px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer text-xs font-medium transition-all duration-300 active:scale-[0.97] ${
                inputValue.trim() 
                  ? 'bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-[0_4px_12px_rgba(14,165,233,0.2)] hover:from-sky-400 hover:to-sky-500' 
                  : 'bg-white/5 text-zinc-500 cursor-not-allowed'
              }`}
              disabled={!inputValue.trim()}
            >
              <span>Gửi</span>
              <Send size={12} />
            </button>
          </div>
        </div>
      </form>
      
      <div className="text-center text-[10px] text-zinc-600 mt-3 opacity-60 tracking-wider uppercase font-semibold flex items-center justify-center gap-1">
        <Sparkles size={10} className="text-sky-500/80" />
        <span>Trợ lý AI thế hệ mới</span>
      </div>
    </div>
  );
};
