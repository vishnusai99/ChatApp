import React from 'react';
import { View, StyleSheet } from 'react-native';

const Triangle = () => {
  return (
    <View style={styles.triangleContainer}>
      <View style={styles.triangle} />
    </View>
  );
};

const styles = StyleSheet.create({
  triangleContainer: {
    width: 0,
    height: 0,
    borderLeftWidth: 50, // Change this value to adjust the size of the triangle
    borderBottomWidth: 50, // Change this value to adjust the size of the triangle
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'red', // Border color
    borderTopColor: 'blue', // Fill color
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 50, // Change this value to adjust the size of the triangle
    borderBottomWidth: 50, // Change this value to adjust the size of the triangle
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});

export default Triangle;
