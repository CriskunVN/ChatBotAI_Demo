import React from 'react';
import { Sparkles, Trash2 } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

export const ChatHeader: React.FC = () => {
  const clearChat = useChatStore((state) => state.clearChat);

  return (
    <div className="flex justify-between items-center px-6 md:px-8 py-5 bg-zinc-900/40 border-b border-white/5 backdrop-blur-md select-none">
      <div className="flex items-center gap-4">
        {/* Glowing breathing Avatar */}
        <div className="flex justify-center items-center w-11 h-11 rounded-full relative bg-gradient-to-br from-sky-500 to-sky-600 shadow-[0_0_20px_rgba(14,165,233,0.15)] before:absolute before:inset-0 before:rounded-full before:bg-sky-400/20 before:animate-ping before:duration-1000">
          <Sparkles size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-zinc-100 tracking-tight">Trợ lý AI Thông Minh</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
            <span className="text-xs text-zinc-400 font-medium">Đang hoạt động</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Reset Chat Button */}
        <button 
          onClick={clearChat}
          className="bg-transparent border-none text-zinc-400 cursor-pointer p-2 rounded-full transition-all duration-300 flex items-center justify-center hover:bg-white/5 hover:text-red-400 active:scale-95"
          title="Xoá lịch sử chat"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
