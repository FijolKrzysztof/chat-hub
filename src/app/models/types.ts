export interface User {
  name: string;
  status: string;
}

export interface Message {
  id: number;
  text: string;
  timestamp: Date;
  userId: string;
}

export interface ChatResponses {
  default: string[];
  image?: string[];
}

export interface Chat {
  id: number;
  name: string;
  description: string;
  unread: number;
  lastRead: number;
  messages: Message[];
  responses: ChatResponses;
}
