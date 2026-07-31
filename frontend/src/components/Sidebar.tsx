import React from 'react';
import { Plus, MessageSquare, Cpu, X, ShieldCheck, Activity } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { clearChat, messages, phase } = useChatStore();

  const handleNewChat = () => {
    clearChat();
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="md:hidden fixed inset-0 bg-[#141413]/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Dark Navy Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 bottom-0 h-full z-50 md:z-auto w-[280px] shrink-0 bg-[#181715] text-[#faf9f5] border-r border-[#252320] flex flex-col justify-between p-8 md:p-10 transition-all duration-300 ${
          isOpen
            ? 'translate-x-0 opacity-100 flex'
            : '-translate-x-full opacity-0 pointer-events-none hidden'
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#cc785c] flex items-center justify-center text-white shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
              <span className="font-serif-display text-2xl text-[#faf9f5] font-semibold tracking-tight">
                Claude
              </span>
            </div>
            <button onClick={onClose} className="text-[#a09d96] hover:text-[#faf9f5] p-1.5 rounded-lg transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat CTA */}
          <button
            onClick={handleNewChat}
            className="w-full h-11 px-4 rounded-lg bg-[#cc785c] hover:bg-[#a9583e] text-white font-medium text-sm transition-all flex items-center justify-between shadow-xs cursor-pointer active:scale-[0.98]"
          >
            <span>Cuộc trò chuyện mới</span>
            <Plus className="w-4 h-4" />
          </button>

          {/* History */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="px-1 text-[11px] font-semibold uppercase tracking-widest text-[#a09d96]">
              Gần đây
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-lg bg-[#252320] border border-[#252320] text-[#faf9f5] text-xs font-medium cursor-pointer hover:border-[#cc785c]/40 transition-colors">
              <MessageSquare className="w-4 h-4 text-[#cc785c] shrink-0" />
              <div className="flex-1 truncate">
                {messages.length > 1 ? messages[1].text : 'Trợ lý Claude'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Model Info */}
        <div className="flex flex-col gap-4 pt-5 border-t border-[#252320]">
          <div className="p-4 rounded-lg bg-[#252320] space-y-2.5 border border-[#252320]">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium">
                <Cpu className="w-4 h-4 text-[#cc785c]" />
                <span>Claude 3.5 Sonnet</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#a09d96]">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#5db872]" />
                {phase === 'thinking' ? 'Đang phân tích...' : phase === 'streaming' ? 'Đang phản hồi...' : 'Sẵn sàng'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-1 text-xs text-[#a09d96]">
            <ShieldCheck className="w-4 h-4 text-[#5db8a6]" />
            <span>Anthropic Privacy Protected</span>
          </div>
        </div>
      </aside>
    </>
  );
};
