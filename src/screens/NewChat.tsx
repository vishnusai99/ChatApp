import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input, InputField, InputIcon, InputSlot} from '@gluestack-ui/themed';
import {Path, Svg} from 'react-native-svg';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {searchProfile} from '../redux/reducers/profile';
import auth from '@react-native-firebase/auth';
import {createChat} from '../redux/reducers/chat';

const NewChat = ({navigation}: any) => {
  const [query, setQuery] = useState('');
  const resultUsers = useAppSelector(state => state.profile.profile);
  const chats = useAppSelector(state => state.Chat.chats);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleSearchQueryChange = (text: string) => {
    setQuery(text);
    setLoading(true);
    // Dispatch the searchProfile action with the current query
    dispatch(searchProfile(text));
  };
  useEffect(() => {
    setLoading(false);
  }, [resultUsers]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        const k = chats.find(ob => ob.otherUser === item.uid);
        if (k) {
          navigation.navigate('Chat', {
            chatId: k.id,
          });
        } else {
          dispatch(
            createChat({
              participant1UID: auth().currentUser?.uid || '',
              participant2UID: item.uid,
            }),
          );
        }
      }}
      style={styles.chatItem}>
      <Image
        source={{
          uri: 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png',
        }}
        style={styles.profileImage}
      />
      <View style={styles.messageContent}>
        <Text style={styles.chatName} className="text-black text-lg">
          {item.displayName?.length > 0 ? item.displayName : '(No name)'}
        </Text>
        <Text style={styles.lastMessage} className="text-black text-lg">
          {item.email}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View className="flex-1 bg-white p-3">
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}>
        <InputSlot>
          <InputIcon>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M18.677 19.607L12.962 13.891C10.4196 15.6984 6.91642 15.2563 4.90285 12.8739C2.88929 10.4915 3.03714 6.96358 5.24298 4.75799C7.44824 2.55144 10.9765 2.40295 13.3594 4.4164C15.7422 6.42986 16.1846 9.93344 14.377 12.476L20.092 18.192L18.678 19.606L18.677 19.607ZM9.48498 4.99997C7.58868 4.99955 5.95267 6.33066 5.56745 8.18742C5.18224 10.0442 6.15369 11.9163 7.89366 12.6702C9.63362 13.4242 11.6639 12.8528 12.7552 11.302C13.8466 9.75126 13.699 7.64731 12.402 6.26399L13.007 6.86399L12.325 6.18399L12.313 6.17199C11.5648 5.41917 10.5464 4.99712 9.48498 4.99997Z"
                fill="#ADB5BD"
              />
            </Svg>
          </InputIcon>
        </InputSlot>
        <InputField
          value={query}
          onChangeText={handleSearchQueryChange}
          placeholder="Search"
        />
      </Input>
      {loading ? (
        <View>
          <ActivityIndicator size={'large'} color={'#12372A'} />
        </View>
      ) : (
        <FlatList data={resultUsers || []} renderItem={renderItem} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
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

export default NewChat;
