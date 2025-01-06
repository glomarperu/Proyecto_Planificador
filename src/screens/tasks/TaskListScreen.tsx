import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TaskContext } from '../../context/TaskContext';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../../routes/StackNavigation';
import { styles } from '../../theme/styles';
import { ButtonComponent } from '../../components/ButtonComponent';

export const TaskListScreen = () => {
  const { tasks, obtenerTasks } = useContext(TaskContext)!;
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    obtenerTasks();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      {tasks.length === 0 ? (
        <Text style={styles.noTasks}>No hay tareas disponibles.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text>
                <Text style={styles.taskName}>Tarea: </Text>
                <Text style={styles.taskName}> {item.name}</Text>
              </Text>
              <Text>
                <Text style={[styles.taskNameSecundario]}>Descripción: </Text>
                <Text style={styles.taskDescription}> {item.description}</Text>
              </Text>
              <Text>
                <Text style={[styles.taskNameSecundario]}>Estado: </Text>
                <Text style={styles.taskDescription}> {item.status}</Text>
              </Text>
              <Text>
                <Text style={[styles.taskNameSecundario]}>Categoría: </Text>
                <Text style={styles.taskDescription}> {item.category}</Text>
              </Text>
              <Text>
                <Text style={[styles.taskNameSecundario]}>Fecha Creación: </Text>
                <Text style={styles.taskDescription}> {item.date}</Text>
              </Text>
              <Text>
                <Text style={[styles.taskNameSecundario]}>Hora Creación: </Text>
                <Text style={styles.taskDescription}> {item.time}</Text>
              </Text>              
            </View>
          )}
        />
      )}
      <ButtonComponent
        onAction={() => navigation.navigate('Home')}
        label="Volver al Home"
      />
    </View>
  );
};