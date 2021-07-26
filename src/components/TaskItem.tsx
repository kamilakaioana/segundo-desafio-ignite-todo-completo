import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png'
import { Task } from './TasksList';
import { EditTaskArguments } from '../pages/Home';


interface TaskItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ taskId: number, taskNewTitle: string }: EditTaskArguments) => void
}
const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        // paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    infoContainer: {
        flex: 1,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24,
    }


})

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {

    const [taskIsEditing, setTaskIsEditing] = useState(false);
    const [valueTaskEdit, setValueTaskEdit] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setTaskIsEditing(true);
    }
    function handleCancelEditing() {
        setValueTaskEdit(task.title);
        setTaskIsEditing(false);
    }
    function handleSubmitEditing() {
        editTask({ taskId: task.id, taskNewTitle: valueTaskEdit });
        setTaskIsEditing(false);
    }
    useEffect(() => {
        if (textInputRef.current) {
            if (taskIsEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [taskIsEditing])
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity

                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}

                >
                    <View

                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}

                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        value={valueTaskEdit}
                        onChangeText={setValueTaskEdit}
                        editable={taskIsEditing}
                        onSubmitEditing={handleSubmitEditing}
                    />

                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer} >
                {taskIsEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>
                )}

                <View
                    style={styles.iconsDivider}
                />

                <TouchableOpacity
                    disabled={taskIsEditing}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} style={{ opacity: taskIsEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>


        </View >
    )
}

export default TaskItem;