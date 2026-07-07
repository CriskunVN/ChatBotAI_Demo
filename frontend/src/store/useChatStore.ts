import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message } from '../types/chat';

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (text: string) => void;
  setTyping: (typing: boolean) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [
        {
          id: '1',
          text: 'Xin chào! Mình là trợ lý AI. Mình có thể giúp gì cho bạn hôm nay?',
          sender: 'bot',
          timestamp: new Date().toISOString(),
        },
      ],
      isTyping: false,

      sendMessage: (text: string) => {
        const newUserMessage: Message = {
          id: Date.now().toString(),
          text,
          sender: 'user',
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          messages: [...state.messages, newUserMessage],
          isTyping: true,
        }));

        // Simulate AI response
        setTimeout(() => {
          const botResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: 'Cảm ơn bạn đã gửi tin nhắn. Đây là một phản hồi tự động từ Zustand Store. Trạng thái tin nhắn đã được lưu trữ vào LocalStorage nên bạn tải lại trang tin nhắn vẫn được giữ nguyên!',
            sender: 'bot',
            timestamp: new Date().toISOString(),
          };

          set((state) => ({
            messages: [...state.messages, botResponse],
            isTyping: false,
          }));
        }, 1500);
      },

      setTyping: (typing: boolean) => set({ isTyping: typing }),

      clearChat: () => set({
        messages: [
          {
            id: '1',
            text: 'Xin chào! Mình là trợ lý AI. Mình có thể giúp gì cho bạn hôm nay?',
            sender: 'bot',
            timestamp: new Date().toISOString(),
          },
        ],
        isTyping: false,
      }),
    }),
    {
      name: 'chatbot-messages-storage', // key in localStorage
    }
  )
);
