import {BASE_URL} from '../../../config';
import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createReducer,
  createSlice,
} from '@reduxjs/toolkit';
import {ChatTypes, MessageTypes} from '../types';
import {Message, ReplyTo} from '../types/message';
import FetchHandler, {FetchOptions} from '../../common-utils/FetchHandler';
import {Profile} from '../types/profile';
const baseUrl = BASE_URL;
interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  counterpartUser: Profile;
  // Add other properties based on your Firestore schema
}

interface initialStateInterface {
  chats: Chat[];
  lastMessages?: {[chatId: string]: Message};
}

const initialState: initialStateInterface = {
  chats: [],
};



export const updateLastMessage = createAction(
  'chats/updateLastMessage',
  (chatId: string, newMessage: Message) => ({
    payload: {chatId, newMessage},
  }),
);

const getChats = createAsyncThunk(
  ChatTypes.ACTION.GET_CHATS,
  async (uid: string, thunkAPI) => {
    try {
      const options: FetchOptions = {
        method: 'GET',
        url: `${baseUrl}/chats/get-chats-user/${uid}`,
      };
      const data = await FetchHandler(options);
      console.log(data, 'data');
      return data;
    } catch (error) {
      throw error;
    }
  },
);
const createChat = createAsyncThunk(
  ChatTypes.ACTION.CREATE_CHAT,
  async (
    body: {participant1UID: string; participant2UID: string},
    thunkAPI,
  ) => {
    console.log(body, 'data');
    try {
      const options: FetchOptions = {
        method: 'POST',
        url: `${baseUrl}/chats/create-new-chat`,
        body: JSON.stringify(body),
      };
      const data = await FetchHandler(options);
      console.log(data, 'data');
      return data;
    } catch (error) {
      throw error;
    }
  },
);
const createMessage = createAsyncThunk(
  MessageTypes.ACTION.CREATE_MESSAGE,
  async (
    body: {
      conversationId: string;
      content: string;
      timestamp: string;
      senderId: string;
      type: string;
      receiverId: string;
      replyTo?: ReplyTo;
    },
    thunkAPI,
  ) => {
    try {
      console.log(body, 'body');
      const options: FetchOptions = {
        method: 'POST',
        url: `${baseUrl}/messages`,
        body: JSON.stringify(body),
      };
      const data = await FetchHandler(options);
      console.log(data, 'data');
      return data;
    } catch (error) {
      throw error;
    }
  },
);

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle the pending state
      .addCase(getChats.pending, state => {
        // You can update the state here if needed
        console.log('pending');
      })
      // Handle the fulfilled state
      .addCase(getChats.fulfilled, (state, action) => {
        console.log(action.payload, 'action payload');
        const lastMessages: {[chatId: string]: Message} = {};
        action.payload?.forEach((element: Chat) => {
          lastMessages[element.id] = [...element?.messages].sort(
            (a, b) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
          )[0];
        });
        // Update the state with the data received from the async operation
        state.lastMessages = lastMessages;
        state.chats = action.payload;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        // console.log(action.payload, 'action payload');
        // Update the state with the data received from the async operation
        // state.chats = action.payload;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        console.log(action.payload, 'action payload');
        // Update the state with the data received from the async operation
        // state.chats = action.payload;
      })
      // Handle the rejected state
      .addCase(getChats.rejected, (state, action) => {
        console.log('rejected');
      })

      .addCase(updateLastMessage, (state, action) => {
        const {chatId, newMessage} = action.payload;

        // Update the lastMessage for the specific chat
        if (chatId) {
          state.lastMessages = {
            ...state.lastMessages,
            [chatId]: newMessage,
          };
        }
      });
  },
});

export {getChats, createChat, createMessage};
export default chatSlice.reducer;
