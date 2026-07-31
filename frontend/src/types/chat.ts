export type SenderRole = 'user' | 'bot';

export interface Message {
  id: string;
  text: string;
  sender: SenderRole;
  timestamp: string;
}

export type ChatPhase = 'idle' | 'thinking' | 'streaming';
