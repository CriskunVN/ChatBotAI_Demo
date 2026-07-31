import React from 'react';
import { Code2, PenTool, BrainCircuit, Sparkles, ArrowUpRight } from 'lucide-react';

interface WelcomeScreenProps {
  onSelectPrompt: (promptText: string) => void;
}

interface SuggestionItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  prompt: string;
}

const SUGGESTIONS: SuggestionItem[] = [
  {
    id: 'code-refactor',
    icon: Code2,
    title: 'Viết & tối ưu hóa Code',
    description: 'Refactor code, phát hiện bug và thiết kế thuật toán tối ưu',
    prompt: 'Hãy giúp tôi kiểm tra và tối ưu hóa đoạn code này theo chuẩn Clean Code:',
  },
  {
    id: 'explain-concept',
    icon: BrainCircuit,
    title: 'Giải thích tư duy & khái niệm',
    description: 'Phân tích chiều sâu các chủ đề kỹ thuật và kiến trúc phức tạp',
    prompt: 'Giải thích cho tôi một cách rõ ràng và sâu sắc về khái niệm:',
  },
  {
    id: 'content-creation',
    icon: PenTool,
    title: 'Sáng tạo văn bản & biên tập',
    description: 'Soạn thảo bài viết, tài liệu kỹ thuật và email chuyên nghiệp',
    prompt: 'Hãy lên dàn ý và viết cho tôi một bài viết biên tập chất lượng về:',
  },
  {
    id: 'ai-brainstorm',
    icon: Sparkles,
    title: 'Phân tích & Chiến lược',
    description: 'Đóng góp giải pháp kiến trúc và tư duy chiến lược cho dự án',
    prompt: 'Cho tôi 5 ý tưởng sáng tạo và khả thi nhất để giải quyết vấn đề:',
  },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectPrompt }) => {
  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto py-12 md:py-20 flex flex-col gap-12 animate-slide-up">
      <div className="text-center space-y-4 select-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efe9de] border border-[#e6dfd8] mb-1">
          <svg className="w-4 h-4 text-[#cc785c]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3d3d3a]">
            Claude AI Partner
          </span>
        </div>

        <h2 className="font-serif-display text-3xl md:text-5xl text-[#141413] tracking-tight leading-tight">
          Gặp gỡ Trợ lý tư duy của bạn
        </h2>
        <p className="text-sm md:text-base text-[#6c6a64] max-w-lg mx-auto leading-relaxed">
          Sức mạnh từ mô hình Claude 3.5 Sonnet. Hãy chọn một gợi ý hoặc bắt đầu cuộc hội thoại mới.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {SUGGESTIONS.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onSelectPrompt(item.prompt)}
              className="p-8 md:p-10 rounded-3xl bg-[#efe9de] border border-[#e6dfd8] hover:border-[#cc785c] hover:bg-[#e8e0d2] transition-all duration-200 group cursor-pointer active:scale-[0.99] flex flex-col justify-between gap-8 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-[#cc785c]">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#faf9f5] flex items-center justify-center text-[#6c6a64] group-hover:text-[#cc785c] transition-colors">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base md:text-lg font-semibold text-[#141413] group-hover:text-[#cc785c] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#6c6a64] leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
