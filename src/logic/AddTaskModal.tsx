import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../style/Colors.ts";
import { useState } from "react";
import { TaskStatus } from "../model/TaskStatus.ts";
import { Button, Layout, Modal, Input, Text } from '@ui-kitten/components';

interface AddTaskModalProps {

  /**
   * Visibility of modal
   */
  visible: boolean;

  onClose: () => void;

  defaultStatus: TaskStatus;
}

export const AddTaskModal = (props: AddTaskModalProps) => {

  const { visible, onClose, defaultStatus } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(defaultStatus);

  const handleSubmit = (data: any) => {

  }


  return (
    <Modal
      backdropStyle={styles.modal}
      visible={visible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <Layout style={styles.container} level="1">
          <Text category='h5' style={styles.title}>Добавить задачу</Text>
          <Layout style={styles.form}>
            <Input
              value={title}
              onChangeText={setTitle}
              placeholder="Название задачи"
              style={styles.textInput}
            />
            <Input
              value={description}
              onChangeText={setDescription}
              placeholder="Описание задачи"
              style={[styles.textInput, styles.descriptionInput]}
              multiline={true}
            />

            <Layout style={styles.actionButtons}>
              <Button
                appearance='outline'
                status='basic'
                onPress={onClose}
              >
                Отменить
              </Button>
              <Button
                appearance='outline'
                status='primary'
              >
                Сохранить
              </Button>
            </Layout>
          </Layout>
      </Layout>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLORS.BACKGROUND_TRANSPARENT,
  },
  container: {
    display: "flex",
    backgroundColor: COLORS.BACKGROUND,
    width: Dimensions.get("window").width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 30,
    borderRadius: 15,
  },
  title: {
    marginBottom: 20,
  },
  form: {
    width: "80%",
  },
  textInput: {
    marginVertical: 10,
    // borderColor: COLORS.SECONDARY,
    // borderWidth: 1,
  },
  descriptionInput: {
    // minHeight: 64,
  },
  actionButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
