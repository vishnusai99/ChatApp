import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {Divider} from '@gluestack-ui/themed';
import {Path, Svg} from 'react-native-svg';
import auth from '@react-native-firebase/auth';

const Settings = ({navigation}:any) => {
// const currentUser = 
const user = auth().currentUser;

  return (
    <View>
      <Pressable className="flex-row p-2" onPress={()=>{
        navigation.navigate('Profile')
      }}>
        <View className="">
          <Svg width="75" height="75" viewBox="0 0 24 24">
            <Path
              fill="#C7C8CC"
              d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10"
            />
          </Svg>
        </View>
        <View className="p-2">
          <Text className="text-lg font-semibold text-black">{}</Text>
          <Text className="text-base text-black">{auth().currentUser?.email}</Text>
        </View>
      </Pressable>
      <Divider />
    </View>
  );
};

export default Settings;
