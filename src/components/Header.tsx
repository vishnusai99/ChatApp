import {View, Text, TouchableOpacity, TouchableHighlight} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

const Header = ({navigation}: any) => {
  return (
    <View className="p-2 border-b items-center bg-[#12372A] flex-row justify-between">
      <Text className="text-white font-bold text-lg">Chats</Text>
      <View className="flex-row space-x-2">
        <TouchableHighlight
          underlayColor={'#436850'}
          style={{borderRadius: 20}}
          className="p-2 w-[40] h-[40]"
          onPress={() => {
            navigation.navigate('NewChat');
          }}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M19 10H17V7H14V5H17V2H19V5H22V7H19V10Z" fill="#FFF" />
            <Path
              d="M21 12H19V15H8.334C7.90107 14.9988 7.47964 15.1393 7.134 15.4L5 17V5H12V3H5C3.89543 3 3 3.89543 3 5V21L7.8 17.4C8.14582 17.1396 8.56713 16.9992 9 17H19C20.1046 17 21 16.1046 21 15V12Z"
              fill="#FFF"
            />
          </Svg>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'#436850'}
          style={{borderRadius: 20}}
          className="p-2 w-[40] h-[40]"
          onPress={() => {
            navigation.navigate('Settings');
          }}>
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Path
              fill="#FFF"
              d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.013 2.475T12.05 15.5"
            />
          </Svg>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Header;
