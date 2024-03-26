export const ACTION = {
  GET_CHATS: 'CHATS/GET',
  CREATE_CHAT: 'CHAT/CREATE',
};
export interface Chat {
  id: string;
  participants: string[];
}
