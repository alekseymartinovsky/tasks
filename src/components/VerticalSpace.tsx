import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { Task } from "../model/Task.tsx";
import { TaskCard } from "./TaskCard.tsx";

interface VerticalSpaceProps {

  /**
   * Title of vertical space
   */
  title: string;

  /**
   * List of displayed tasks
   */
  tasks: Task[];

  /**
   * Callback drag n drop card
   */
  finishDrag: (taskId: number, x: number, y: number) => void;

  /**
   * Custom style of component, applied to the component container
   */
  style?: ViewStyle;
}

export const VerticalSpace = (props: VerticalSpaceProps) => {

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.title}>{props.title}</Text>
      {
        props.tasks.map((task: Task, index) =>
          <TaskCard key={`task_${task.status}_${index}`} task={task} finishDrag={props.finishDrag}  />)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    margin: 10,
    textAlign: "center",
  }
});
