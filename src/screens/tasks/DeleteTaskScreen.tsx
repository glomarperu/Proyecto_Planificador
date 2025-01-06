import React, { useContext } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { TaskContext } from '../../context/TaskContext';
import { styles } from '../../theme/styles';

export const DeleteTaskScreen = () => {
  const { tasks, deleteTask } = useContext(TaskContext)!;

  const handleDeleteTask = async (id: string) => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await deleteTask(id);
              Alert.alert('Éxito', 'Tarea eliminada correctamente');
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la tarea');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminar Tareas</Text>
      {tasks.length === 0 ? (
        <Text style={styles.noTasks}>No hay tareas para eliminar</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskName}>{item.name}</Text>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDeleteTask(item.id)}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
};