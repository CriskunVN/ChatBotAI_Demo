export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string; // ISO string format for easy serialization
}
