import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArguments = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);



  function handleAddTask(newTaskTitle: string) {
    const foundEqualName = tasks.find(task => task.title === newTaskTitle)
    if (foundEqualName) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome.")

      return;
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldTasks => [...oldTasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const found = updatedTasks.find(task => task.id === id)

    if (!found)
      return;

    found.done = !found.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [{
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          setTasks(oldTasks => oldTasks.filter(
            task => task.id !== id
          ));
        },
      }
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArguments) {

    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItemToBeUpdate = updatedTasks.find(task => task.id === taskId)

    if (!foundItemToBeUpdate)
      return;

    foundItemToBeUpdate.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})