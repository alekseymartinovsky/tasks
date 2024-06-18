import { Button, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { VerticalSpace } from "../components/VerticalSpace.tsx";
import React, { useState } from "react";
import { Task } from "../model/Task.tsx";
import { TaskStatus } from "../model/TaskStatus.ts";
import AddButton from "../components/AddButotn.tsx";
import { AddTaskModal } from "../logic/AddTaskModal.tsx";

export const HomeScreen = () => {

  const DNDCallback = (taskId: number, x: number, y: number) => {
    const task = tasks.find((task) => task.id === taskId);

    if(!task) {return;}

    const { width } = Dimensions.get('window');
    const columnWidth = width / 3;
    const cardWidth = columnWidth / 4;

    if(x <= columnWidth + cardWidth && task.status != TaskStatus.TODO) {
      task.status = TaskStatus.TODO;
      changeTask(task);
      return;
    }

    if(x > columnWidth - cardWidth && x <= columnWidth * 2 + cardWidth && task.status != TaskStatus.IN_PROGRESS) {
      task.status = TaskStatus.IN_PROGRESS;
      changeTask(task);
      return;
    }

    if(x > columnWidth * 2 - cardWidth && task.status != TaskStatus.DONE) {
      task.status = TaskStatus.DONE;
      changeTask(task);
      return;
    }
  }

  const changeTask = (task: Task) => {
    const updatedTasks = tasks.filter(item => item.id !== task.id);

    setTasks(prev => [...updatedTasks, task]);
  }

  const [tasks, setTasks] = useState<Task[]>([
    new Task(1, "Помыть полы подручными средставми",
      "Осуществить мытье полов при помощи швабры, мыла и ведра с водой",
      TaskStatus.TODO),
    new Task(2, "Лечь спать",
      "Осуществить мытье полов при помощи швабры, мыла и ведра с водой",
      TaskStatus.TODO),
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const filterTaskByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  }

  const handleAddTask = () => {
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  }

  const verticalSpacesConfig = [
    {
      title: "Предстоящие",
      tasks: filterTaskByStatus(TaskStatus.TODO),
    },
    {
      title: "На сегодня",
      style: styles.centeredSpace,
      tasks: filterTaskByStatus(TaskStatus.IN_PROGRESS),
    },
    {
      title: "Готово",
      tasks: filterTaskByStatus(TaskStatus.DONE),
    },
  ]

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {
            verticalSpacesConfig.map((config, index) =>
              <VerticalSpace key={"verticalSpace" + index} {...config} finishDrag={DNDCallback} />)
          }
        </View>
      </ScrollView>
      <AddButton onPress={handleAddTask} />
      <AddTaskModal visible={isModalVisible}  onClose={handleCloseModal} defaultStatus={TaskStatus.TODO} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    minHeight: Dimensions.get("window").height,
  },
  centeredSpace: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "gray",
  },
  addButton: {
    position: "static",
    zIndex: 2,
    bottom: 30,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 100,
    fontSize: 40,
  }
});

