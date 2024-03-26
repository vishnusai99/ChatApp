export const ACTION = {
  CREATE_MESSAGE: 'MESSAGE/CREATE',
};

export interface Message {
  messageId?: string;
  senderId: string;
  content: string;
  timestamp: string;
  conversationId: string;
  read?: boolean;
  replyTo?: ReplyTo;
}

export interface ReplyTo {
  messageId: string;
  type: string;
  content: string;
  senderId: string;
}
