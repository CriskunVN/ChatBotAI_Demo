import { GoogleGenAI } from '@google/genai';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

type ChatReply = {
  reply: string;
  provider: string;
  sessionId: string;
};

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  role: ChatRole;
  text: string;
};

type ChatHistory = {
  sessionId: string;
  messages: ChatMessage[];
};

@Injectable()
export class ChatbotService {
  private googleAi?: GoogleGenAI;
  private readonly histories = new Map<string, ChatMessage[]>();

  async getReply(message: string, sessionId?: string): Promise<ChatReply> {
    const resolvedSessionId = sessionId?.trim() || randomUUID();
    const provider = (process.env.AI_PROVIDER ?? 'gemini').toLowerCase();
    const prompt = this.buildPrompt(resolvedSessionId, message);

    try {
      if (provider === 'gemini' || provider === 'google') {
        const reply = await this.getGeminiReply(prompt);
        this.appendMessage(resolvedSessionId, 'user', message);
        this.appendMessage(resolvedSessionId, 'assistant', reply);
        return { reply, provider: 'gemini', sessionId: resolvedSessionId };
      }

      const reply = await this.getOllamaReply(prompt);
      this.appendMessage(resolvedSessionId, 'user', message);
      this.appendMessage(resolvedSessionId, 'assistant', reply);
      return { reply, provider: 'ollama', sessionId: resolvedSessionId };
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        `Không thể lấy phản hồi từ AI model: ${detail}`,
      );
    }
  }

  getHistory(sessionId: string): ChatHistory {
    return {
      sessionId,
      messages: this.histories.get(sessionId) ?? [],
    };
  }

  clearHistory(sessionId: string): ChatHistory {
    this.histories.delete(sessionId);

    return {
      sessionId,
      messages: [],
    };
  }

  private buildPrompt(sessionId: string, message: string): string {
    const history = this.histories.get(sessionId) ?? [];
    const historyText = history
      .slice(-8)
      .map(
        (entry) =>
          `${entry.role === 'user' ? 'Người dùng' : 'Trợ lý'}: ${entry.text}`,
      )
      .join('\n');

    return [
      'Bạn là một chatbot hữu ích. Trả lời ngắn gọn, rõ ràng, bằng tiếng Việt.',
      historyText ? `Lịch sử hội thoại gần đây:\n${historyText}` : '',
      `Người dùng hỏi: ${message}`,
    ]
      .filter(Boolean)
      .join('\n\n');
  }

  private appendMessage(sessionId: string, role: ChatRole, text: string): void {
    const currentHistory = this.histories.get(sessionId) ?? [];
    currentHistory.push({ role, text });
    this.histories.set(sessionId, currentHistory.slice(-20));
  }

  private async getGeminiReply(prompt: string): Promise<string> {
    const model = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';
    const googleAi = this.getGoogleAiClient();

    const response = await googleAi.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction:
          'Bạn là một chatbot hỗ trợ người dùng. Trả lời ngắn gọn, rõ ràng, thân thiện.',
      },
    });

    const reply = response.text?.trim();

    if (!reply) {
      throw new Error('Gemini response did not contain a reply');
    }

    return reply;
  }

  private getGoogleAiClient(): GoogleGenAI {
    if (!this.googleAi) {
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is missing');
      }

      this.googleAi = new GoogleGenAI({ apiKey });
    }

    return this.googleAi;
  }

  private async getOllamaReply(prompt: string): Promise<string> {
    const baseUrl = process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434';
    const model = process.env.OLLAMA_MODEL ?? 'llama3.2';

    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              'Bạn là một chatbot hỗ trợ người dùng. Trả lời ngắn gọn, rõ ràng, thân thiện.',
          },
          { role: 'user', content: prompt },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Ollama API error: ${response.status} ${text}`);
    }

    const data = await response.json();
    const reply = data?.message?.content?.trim();

    if (!reply) {
      throw new Error('Ollama response did not contain a reply');
    }

    return reply;
  }
}
