import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  BubbleProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
} from 'react-native-gifted-chat';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {G, Path, Svg} from 'react-native-svg';
import {MessageTypes, ProfileTypes} from '../redux/types';
import {createMessage, updateLastMessage} from '../redux/reducers/chat';

import AntDesign from 'react-native-vector-icons/AntDesign';
import ChatMessageBox from '../components/ChatMessageBox';
import {Swipeable} from 'react-native-gesture-handler';
import {useSubscription} from '@apollo/client';
import {MESSAGE_CREATED} from '../queries/create-message';
import {launchImageLibrary} from 'react-native-image-picker';

const sortMessages = (messages: any[]) =>
  [...messages]
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    )
    .reverse();

interface MessageReply {
  clearReply: () => void;
  message: IMessage;
  userName: string;
}

const Chat = ({route, navigation}: any) => {
  const obj = useSubscription(MESSAGE_CREATED, {
    variables: {uid: auth().currentUser?.uid},
  });
  const [chatId, setChatId] = useState<string>();
  const chatIdRef = useRef(chatId);
  useEffect(() => {
    // console.log(obj);
    // console.log('this happens');
    if (obj?.data) {
      const object = obj?.data?.messageCreated;
      if (object && object?.chatId === chatIdRef.current) {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [
            {
              text: object.content,
              _id: object.messageId,
              createdAt: new Date(object.timestamp),
              user: {
                _id: object.senderId,
              },
              ...(object?.replyTo && {replyTo: object.replyTo}),
            },
          ]),
        );
      }
      // console.log(obj.data)
    }
  }, [obj]);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState<IMessage | null>(null);
  const replyRef = useRef(reply);
  const swipeableRowRef = useRef<Swipeable | null>(null);
  // console.log('chat id chat id', chatId);
  const chats = useAppSelector(state => state.Chat.chats);
  useEffect(() => {
    chatIdRef.current = chatId;
  }, [chatId]);
  useEffect(() => {
    replyRef.current = reply;
  }, [reply]);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<ProfileTypes.Profile>();
  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);
  // console.log(user,"the user")
  const createNewMessage = (content: string) => {
    const uid = auth().currentUser?.uid;
    console.log(uid, chatId);
    if (uid && chatIdRef.current) {
      const timestamp = new Date().toISOString();
      // console.log('uid and stuff', uid, chatId);
      // console.log({
      //   senderId: uid,
      //   timestamp,
      //   content,
      //   conversationId: chatIdRef.current,
      //   type: 'message',
      //   receiverId: userRef.current?.uid || '',
      //   ...(replyRef.current && {
      //     replyTo: {
      //       content: replyRef.current.text,
      //       type: 'message',
      //       senderId: String(replyRef.current.user._id),
      //       messageId: String(replyRef.current._id),
      //     },
      //   }),
      // });
      dispatch(
        createMessage({
          senderId: uid,
          timestamp,
          content,
          conversationId: chatIdRef.current,
          type: 'message',
          receiverId: userRef.current?.uid || '',
          ...(replyRef.current && {
            replyTo: {
              content: replyRef.current.text,
              type: 'message',
              senderId: String(replyRef.current.user._id),
              messageId: String(replyRef.current._id),
            },
          }),
        }),
      );
      dispatch(
        updateLastMessage(chatIdRef.current, {
          senderId: uid,
          timestamp,
          content,
          conversationId: chatIdRef.current,
        }),
      );
    }
  };
  useEffect(() => {
    if (route.params?.chatId) {
      console.log(route.params.chatId, 'params');
      setChatId(route.params.chatId);
      const chat = chats.find(obj => obj.id === route.params.chatId);
      if (chat) {
        setUser(chat.counterpartUser);
        const k = sortMessages(chat.messages).map(obj => ({
          text: obj.content,
          _id: obj?.messageId,
          createdAt: new Date(obj.timestamp),
          user: {
            _id: obj.senderId,
          },
          sent: true,
          received: obj?.read,
          ...(obj.replyTo && {replyTo: obj.replyTo}),
        }));
        setMessages(k);
      }
    }
  }, [route.params?.chatId]);
  // console.log(messages, 'messages');
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback((messages: any[] = [], reply: IMessage | null) => {
    // console.log(messages[0].text)
    createNewMessage(messages[0].text);
    if (reply) {
      // console.log('comes here');
      messages[0].reply = {...reply};
      setReply(null);
    }
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const customRenderInputToolbar = (props: InputToolbarProps<any>) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputContainer}
      accessoryStyle={styles.replyBarContainer}
    />
  );

  const ReplyMessageBar = ({clearReply, message, userName}: MessageReply) => {
    return (
      <View className="flex-row items-center p-2 justify-between">
        <View className="flex-row">
          <View className="p-2">
            <Svg width="20" height="20" viewBox="0 0 24 24">
              <Path
                fill="black"
                fill-rule="evenodd"
                d="M10 2a1 1 0 0 0-1.79-.614l-7 9a1 1 0 0 0 0 1.228l7 9A1 1 0 0 0 10 20v-3.99c5.379.112 7.963 1.133 9.261 2.243c1.234 1.055 1.46 2.296 1.695 3.596l.061.335a1 1 0 0 0 1.981-.122c.171-2.748-.086-6.73-2.027-10.061C19.087 8.768 15.695 6.282 10 6.022z"
                clip-rule="evenodd"
              />
            </Svg>
          </View>
          <View>
            <Text className="" style={{fontSize: 16}}>
              {`Reply to ${userName}`}
            </Text>
            <Text className="">{message.text}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.crossButton} onPress={clearReply}>
          <AntDesign name="close" size={25} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        reply &&
        ref.props.children.props.currentMessage?._id === reply._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [reply],
  );
  useEffect(() => {
    if (reply && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [reply]);

  const renderReplyMessageView = (props: BubbleProps<any>) =>
    props.currentMessage &&
    props.currentMessage?.replyTo && (
      <View className="m-1 mt-2 bg-white p-2 rounded-md border-l-2">
        <Text>You</Text>
        <Text>{props.currentMessage.replyTo?.content}</Text>
      </View>
    );

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between border-b border-[#DDDDDD] h-[50] items-center px-2">
        <View className="flex-row space-x-2 items-center">
          <TouchableHighlight
            underlayColor={'#DDDDDD'}
            style={{borderRadius: 20}}
            className="p-2 w-[40] h-[40] items-center justify-center"
            onPress={() => {
              navigation.goBack();
            }}>
            <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <Path
                d="M8.28799 12L14.298 18.01L15.712 16.596L11.112 11.996L15.712 7.39599L14.298 5.98999L8.28799 12Z"
                fill="#0F1828"
              />
            </Svg>
          </TouchableHighlight>
          <Text className="text-lg font-semibold text-black">
            {user?.displayName}
          </Text>
        </View>
        <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <Path
            d="M18.677 19.607L12.962 13.891C10.4197 15.6984 6.91645 15.2563 4.90288 12.8739C2.88932 10.4915 3.03717 6.96358 5.24301 4.75799C7.44827 2.55144 10.9765 2.40295 13.3594 4.4164C15.7423 6.42986 16.1846 9.93344 14.377 12.476L20.092 18.192L18.678 19.606L18.677 19.607ZM9.48501 4.99997C7.58871 4.99955 5.9527 6.33066 5.56749 8.18742C5.18227 10.0442 6.15372 11.9163 7.89369 12.6702C9.63365 13.4242 11.6639 12.8528 12.7553 11.302C13.8466 9.75126 13.6991 7.64731 12.402 6.26399L13.007 6.86399L12.325 6.18399L12.313 6.17199C11.5648 5.41917 10.5464 4.99712 9.48501 4.99997Z"
            fill="#0F1828"
          />
        </Svg>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages, reply)}
        user={{
          _id: auth().currentUser?.uid || '',
        }}
        onLongPress={({_, message}: {_: string; message: IMessage}) => {
          console.log(_, message);
          // setReply({
          //   content: 'hell0',
          // });
        }}
        isKeyboardInternallyHandled={false}
        renderMessage={props => (
          <ChatMessageBox
            {...props}
            updateRowRef={updateRowRef}
            setReplyOnSwipeOpen={setReply}
          />
        )}
        showUserAvatar={false}
        renderCustomView={renderReplyMessageView}
        renderInputToolbar={customRenderInputToolbar}
        messagesContainerStyle={styles.messageContainer}
        renderAccessory={() =>
          reply && (
            <ReplyMessageBar
              message={reply}
              userName="Mani_56"
              clearReply={() => setReply(null)}
            />
          )
        }
        scrollToBottom
        scrollToBottomComponent={() => (
          <Svg width="48" height="48" viewBox="0 0 48 48">
            <G
              fill="none"
              stroke="black"
              stroke-linejoin="round"
              stroke-width="4">
              <Path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
              <Path stroke-linecap="round" d="m33 21l-9 9l-9-9" />
            </G>
          </Svg>
          // <Svg width="30" height="30" viewBox="0 0 48 48">
          //   <G fill="none" stroke-linejoin="round" stroke-width="4">
          //     <Path
          //       fill="#2F88FF"
          //       stroke="#000"
          //       d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
          //     />
          //     <Path
          //       stroke="#fff"
          //       stroke-linecap="round"
          //       d="M33 21L24 30L15 21"
          //     />
          //   </G>
          // </Svg>
        )}
        // renderSend={props => {
        //   return (
        //     <View className="items-center flex-row justify-center h-[45]">
        //       {(!props.text || props.text.trim().length === 0) && (
        //         <TouchableHighlight
        //           underlayColor={'#DDDDDD'}
        //           style={{borderRadius: 20}}
        //           className="p-2 w-[40] h-[40] mt-1 flex-row items-center justify-center mb-1.5"
        //           onPress={async () => {
        //             const result = await launchImageLibrary({
        //               mediaType: 'photo',
        //               quality: 0.3,
        //             });
        //             console.log(result, 'rehte result');
        //           }}>
        //           <Svg width="30" height="30" viewBox="0 0 24 24">
        //             <G
        //               fill="none"
        //               stroke="black"
        //               stroke-linecap="round"
        //               stroke-linejoin="round"
        //               stroke-width="2">
        //               <Path d="M15 8h.01M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" />
        //               <Path d="m3 16l5-5c.928-.893 2.072-.893 3 0l5 5" />
        //               <Path d="m14 14l1-1c.928-.893 2.072-.893 3 0l3 3" />
        //             </G>
        //           </Svg>
        //         </TouchableHighlight>
        //       )}
        //       <View className="">
        //         <Send {...props} />
        //       </View>
        //     </View>
        //   );
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  replyImageContainer: {
    paddingLeft: 8,
    paddingRight: 6,
    borderRightWidth: 2,
    borderRightColor: '#2196F3',
    marginRight: 6,
    height: '100%',
    justifyContent: 'center',
  },
  crossButtonIcon: {
    width: 24,
    height: 24,
  },
  crossButton: {
    padding: 4,
  },
  messageContainer: {
    flex: 1,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'column-reverse',
  },
  replyBarContainer: {
    height: 'auto',
  },
  replyMessageContainer: {
    padding: 8,
    paddingBottom: 0,
  },
  replyMessageDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingTop: 6,
  },
});

export default Chat;
