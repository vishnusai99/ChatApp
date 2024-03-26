import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Header from '../../components/Header';
import {Chat} from '../../redux/types/chat';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import auth from '@react-native-firebase/auth';
import {getChats} from '../../redux/reducers/chat';
import {MESSAGE_CREATED} from '../../queries/create-message';
import {useSubscription} from '@apollo/client';
import {Path, Svg} from 'react-native-svg';
import dayjs from 'dayjs';
const HomeScreen = ({navigation}) => {
  // Sample data for chats

  const chats = useAppSelector(state => state.Chat.chats);
  const lastMessages = useAppSelector(state => state.Chat.lastMessages);
  const [chatData, setChatData] = useState<Chat[]>([]);

  console.log(chats.map(obj => obj.messages));

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Chat', {
          chatId: item.id,
        })
      }
      className="pl-3 bg-white pt-3"
      style={styles.chatItem}>
      {item.counterpartUser?.pictureUrl ? (
        <Image
          source={{
            uri: item.counterpartUser?.pictureUrl,
          }}
          style={styles.profileImage}
        />
      ) : (
        <View className="bg-[#ADBC9F] mr-2 items-center justify-center p-2 rounded-full w-[50] h-[50]">
          <Text className="text-white text-2xl font-bold">
            {item.counterpartUser?.displayName[0]}
          </Text>
        </View>
      )}
      <View
        style={{borderBottomWidth: 0.5, borderColor: '#CCCCCC'}}
        className="p-2 flex-1 flex-row">
        <View style={styles.messageContent}>
          <Text style={styles.chatName} className="text-black text-lg">
            {item.counterpartUser?.displayName}
          </Text>
          <Text style={styles.lastMessage} className="text-gray-500">
            {lastMessages && lastMessages[item.id].content}
          </Text>
        </View>
        <View className="h-full mr-1">
          <View className="flex-row space-x-1">
            {false && (
              <Svg width="20" height="20" viewBox="0 0 24 24">
                <Path
                  fill="grey"
                  d="M.41 13.41L6 19l1.41-1.42L1.83 12m20.41-6.42L11.66 16.17L7.5 12l-1.43 1.41L11.66 19l12-12M18 7l-1.41-1.42l-6.35 6.35l1.42 1.41z"
                />
              </Svg>
            )}
            <Text style={styles.timeAgo}>
              {dayjs(lastMessages && lastMessages[item.id]?.timestamp).format(
                'hh:mm A',
              )}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const uid = auth().currentUser?.uid;
      if (uid) {
        dispatch(getChats(uid));
      }
    })();
  }, []);
  const obj = useSubscription(MESSAGE_CREATED, {
    variables: {uid: auth().currentUser?.uid},
  });
  // console.log(obj)

  return (
    <View className="flex-1">
      <Header navigation={navigation} />
      <View style={styles.container}>
        <FlatList
          data={chats}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: 'white',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  messageContent: {
    flex: 1,
  },
  chatName: {
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#555',
  },
  timeAgo: {
    color: '#888',
  },
});

export default HomeScreen;
