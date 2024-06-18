import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { COLORS } from "../style/Colors.ts";

interface AddButtonProps {
  onPress: () => void;
}

const AddButton = (props: AddButtonProps) => {

  const {onPress} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    // alignSelf: 'center',
    right: 30,
    backgroundColor: COLORS.PRIMARY,
    zIndex: 2,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.BACKGROUND,
    fontSize: 32,
    fontWeight: "300",
  },
});
