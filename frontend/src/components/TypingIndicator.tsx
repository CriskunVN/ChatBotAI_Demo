import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-3 max-w-[80%] animate-[slideUpFade_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards] self-start">
      <div className="w-8 h-8 rounded-full flex justify-center items-center shrink-0 bg-zinc-900 border border-white/10 text-sky-400 shadow-md">
        <Bot size={15} strokeWidth={2} />
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3.5 bg-zinc-900/60 border border-white/5 rounded-2xl rounded-bl-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-[typingBounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.32s]"></div>
        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-[typingBounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.16s]"></div>
        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-[typingBounce_1.4s_infinite_ease-in-out_both]"></div>
      </div>
    </div>
  );
};
