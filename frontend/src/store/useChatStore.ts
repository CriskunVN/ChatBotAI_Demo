import { create } from 'zustand';
import type { Message, ChatPhase } from '../types/chat';

interface ChatState {
  sessionId: string;
  messages: Message[];
  phase: ChatPhase;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  text: 'Chào bạn! Tôi là một Senior Software Engineer, bạn có bất cứ điều gì muốn hỏi tôi có thể giúp. ',
  sender: 'bot',
  timestamp: new Date().toISOString(),
};

export const useChatStore = create<ChatState>((set, get) => ({
  sessionId: crypto.randomUUID(),
  messages: [WELCOME_MESSAGE],
  phase: 'idle',

  clearChat: () => set({ messages: [WELCOME_MESSAGE], phase: 'idle', sessionId: crypto.randomUUID() }),

  sendMessage: async (text: string) => {
    if (!text.trim() || get().phase !== 'idle') return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, userMsg],
      phase: 'thinking',
    }));

    try {
      // Gọi API thực tế
      const response = await fetch('http://localhost:3000/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          sessionId: get().sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      const data = await response.json();
      const responseText = data.reply || 'Xin lỗi, không có phản hồi từ máy chủ.';

      set({ phase: 'streaming' });
      
      const botMsgId = crypto.randomUUID();
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: botMsgId,
            text: '',
            sender: 'bot',
            timestamp: new Date().toISOString(),
          },
        ],
      }));

      // Mô phỏng hiệu ứng streaming cho câu trả lời thực tế
      let currentText = '';
      const words = responseText.split(' ');

      for (let i = 0; i < words.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 30)); // 30ms mỗi từ
        currentText += (i === 0 ? '' : ' ') + words[i];

        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === botMsgId ? { ...m, text: currentText } : m
          ),
        }));
      }
    } catch (error) {
      console.error('Lỗi khi gọi API chat:', error);
      const errorMsgId = crypto.randomUUID();
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: errorMsgId,
            text: 'Xin lỗi, đã có lỗi xảy ra khi kết nối tới máy chủ AI (Backend). Vui lòng thử lại sau!',
            sender: 'bot',
            timestamp: new Date().toISOString(),
          },
        ],
      }));
    } finally {
      set({ phase: 'idle' });
    }
  },
}));
