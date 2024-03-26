import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {IMessage, MessageProps} from 'react-native-gifted-chat';
import dayjs from 'dayjs';
import {Path, Svg} from 'react-native-svg';
import Triangle from './Triangle';

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
  }),
};
const styles2 = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

const Message = (props: MessageProps<IMessage>) => {
  return (
    <View
      className="relative flex-row"
      style={[styles[props.position].container, , {}]}>
      <View
        className="p-3 rounded-lg"
        style={{
          elevation: 5,
          backgroundColor: props.position === 'left' ? 'white' : '#294B29',
          marginLeft: props.position === 'left' ? 8 : 0,
          marginRight: props.position === 'left' ? 0 : 8,
          marginBottom: 8,
          borderColor: props.position === 'left' ? '#CCCCCC' : undefined,
          borderWidth: props.position === 'left' ? 1 : undefined,
        }}>
        <View></View>
        <View className="">
          <Text
            className=" text-base"
            style={{color: props.position === 'left' ? 'black' : 'white'}}>
            {props.currentMessage?.text}
          </Text>
          <Text
            className="text-right"
            style={{color: props.position === 'left' ? 'black' : 'white'}}>
            {dayjs(props.currentMessage?.createdAt).format('hh:mm A')}
          </Text>
        </View>
      </View>
      {/* <View
        style={[
          styles2.triangle,
          {
            borderLeftWidth: props.position === 'left' ? 15 : 0,
            borderRightWidth: props.position === 'left' ? 0 : 15,
            borderBottomWidth: props.position === 'left' ? 0 : 0,
            borderTopWidth: props.position === 'left' ? 15 : 15,
            borderTopColor: props.position === 'left' ? '#FFF' : '#294B29',
            elevation: 5,
          },
        ]}
        className={
          'absolute ' +
          (props.position === 'left' ? 'left-0 -top-[1]' : 'right-0 top-0')
        }
      /> */}
      {/* <Triangle /> */}
    </View>
  );
};

export default Message;
