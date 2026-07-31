import React from 'react';
import { Menu, Share, MoreHorizontal } from 'lucide-react';

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  return (
    <header className="h-20 px-6 md:px-12 py-4 bg-[#faf9f5] border-b border-[#e6dfd8] flex items-center justify-between shrink-0 relative z-20">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-[#6c6a64] hover:text-[#141413] hover:bg-[#efe9de] transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="flex flex-col">
          <span className="font-serif-display text-lg text-[#141413] font-semibold tracking-tight">
            Trợ lý AI Claude
          </span>
          <span className="text-[10px] font-mono text-[#5db8a6] font-semibold -mt-1">
            Claude 3.5 Sonnet
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#6c6a64] hover:text-[#141413] hover:bg-[#efe9de] transition-colors cursor-pointer border border-transparent hover:border-[#e6dfd8]">
          <Share className="w-3.5 h-3.5" />
          <span>Chia sẻ</span>
        </button>
        <button className="p-2 rounded-md text-[#6c6a64] hover:text-[#141413] hover:bg-[#efe9de] transition-colors cursor-pointer">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
