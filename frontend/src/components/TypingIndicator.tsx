import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4 animate-slide-up">
      <div className="shrink-0 mt-1">
        <div className="w-8 h-8 rounded-full bg-[#181715] text-[#cc785c] flex items-center justify-center shadow-xs border border-[#252320]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-center gap-2 px-1 text-[11px] text-[#6c6a64]">
          <span className="font-serif-display text-xs text-[#141413] font-semibold">Claude</span>
        </div>
        <div className="px-5 py-4 rounded-2xl bg-[#efe9de] border border-[#e6dfd8] rounded-tl-xs shadow-xs flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#cc785c] animate-[pulseCoral_1.4s_ease-in-out_infinite]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#cc785c] animate-[pulseCoral_1.4s_ease-in-out_0.2s_infinite]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#cc785c] animate-[pulseCoral_1.4s_ease-in-out_0.4s_infinite]" />
        </div>
      </div>
    </div>
  );
};
