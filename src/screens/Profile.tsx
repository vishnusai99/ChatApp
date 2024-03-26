import {View, Text, Pressable, TouchableHighlight, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Path, Svg} from 'react-native-svg';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../redux/hooks';

const Profile = () => {
  const dispatch = useAppDispatch();
  
  const [picture, setPicture] = useState<string>();
  const {userProfile} = useAppSelector(state => state.profile);
  useEffect(() => {
    if (userProfile && userProfile?.pictureUrl) {
      setPicture(userProfile.pictureUrl);
    }
  }, [userProfile]);
  return (
    <View className="p-3 bg-white flex-1">
      <View className="justify-center items-center flex-row">
        {picture ? (
          <Pressable>
            <Image
              width={150}
              height={150}
              source={{
                uri: picture,
              }}
            />
          </Pressable>
        ) : (
          <Pressable
            className="rounded-full bg-white"
            onPress={async () => {
              const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.1,
              });
              console.log('comes');
              console.log(result, 'the result');
              try {
                const reference = storage().ref(
                  `profiles/${auth().currentUser?.uid}.png`,
                );
                if (result?.assets && result.assets[0]?.uri) {
                  console.log(result.assets[0].uri);
                  const task = reference.putFile(result.assets[0].uri);
                  task.on('state_changed', taskSnapshot => {
                    console.log(
                      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
                    );
                  });

                  task.then(async () => {
                    console.log('Image uploaded to the bucket!');
                    const url = await storage()
                      .ref(`profiles/${auth().currentUser?.uid}.png`)
                      .getDownloadURL();
                    setPicture(url);
                  });
                  // console.log(k);
                }
              } catch (error) {
                console.log(error, 'the error');
              }
            }}>
            <Svg width="150" height="150" viewBox="0 0 24 24">
              <Path
                fill="#C7C8CC"
                d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10"
              />
            </Svg>
          </Pressable>
        )}
      </View>
      <View className="flex-row justify-between">
        <View className="w-[15%]">
          <Svg width="30" height="30" viewBox="0 0 24 24">
            <Path
              fill="black"
              d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
            />
          </Svg>
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-[#7E7474]">Name</Text>
          <Text>{}</Text>
        </View>
        <View>
          <TouchableHighlight
            underlayColor={'#DDDDDD'}
            style={{borderRadius: 20}}
            className="p-2 w-[40] h-[40]"
            onPress={() => {
              //   navigation.navigate('Settings');
            }}>
            <Svg width="24" height="24" viewBox="0 0 24 24">
              <Path
                fill="black"
                d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
              />
            </Svg>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default Profile;
