import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const width = Dimensions.get('window').width

const Booting = () => {
  const lineWidth = useSharedValue(width*0.8); // Initial line width

  // Define the animation sequence
  const animateLine = () =>
    (lineWidth.value = withSequence(
      withTiming(width*0.9, {duration: 500, easing: Easing.linear}),
      withTiming(0, {duration: 650, easing: Easing.linear}),
    ));

  // Create the animated style
  const lineStyle = useAnimatedStyle(() => {
    return {
      width: lineWidth.value,
      height: 5, // Adjust the height as needed
      backgroundColor: 'blue', // Adjust the color as needed
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.line, lineStyle]} />
      {animateLine()}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    line: {
      backgroundColor: 'blue',
      height: 2, // Adjust the height as needed
    },
  });
  

export default Booting;
