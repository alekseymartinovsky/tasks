import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Task } from "../model/Task.tsx";
import { COLORS } from "../style/Colors.ts";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface TaskCardProps {

  /**
   * Displayed data
   */
  task: Task;

  /**
   * Callback drag n drop
   */
  finishDrag: (taskId: number, x: number, y: number) => void;
}

/**
 * Empty card of task. Displayed title and description of task
 */
export const TaskCard = (props: TaskCardProps) => {

  const { task, finishDrag } = props;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isInteractiveCard = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onStart((event) => {
      translateX.value = event.absoluteX;
      translateY.value = event.absoluteY;
      isInteractiveCard.value = true;
    })
    .runOnJS(true)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      runOnJS(finishDrag)(task.id, event.absoluteX, event.absoluteY);
      if(isInteractiveCard.value) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        isInteractiveCard.value = false;
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
   return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const getTitleNumberOfLines = (description: string) => {
    return description.length > 1 ? 2 : 4;
  };

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, animatedStyle]} >
        <Text
          style={styles.title}
          numberOfLines={getTitleNumberOfLines(task.description)}
          ellipsizeMode="tail">
          {task.title}
        </Text>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={styles.description}
        >
          {task.description}
        </Text>
    </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    zIndex: 3,
  },
  title: {
    padding: 10,
    paddingBottom: 2,
    fontWeight: "500"
  },
  description: {
    padding: 10,
    paddingTop: 0,
    fontWeight: "300",
    color: COLORS.SECONDARY,
  }
});
