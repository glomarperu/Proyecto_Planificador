import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TaskContext } from '../../context/TaskContext';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../../routes/StackNavigation';
import { styles } from '../../theme/styles';
import { ButtonComponent } from '../../components/ButtonComponent';

export const TaskListScreen = () => {
  const { tasks, obtenerTasks, deleteTask } = useContext(TaskContext)!;
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    obtenerTasks();
  }, []);
  
  const handleDeleteTask = (id: string) => {
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
      <Text style={styles.title}>Lista de Tareas</Text>
      {tasks.length === 0 ? (
        <Text style={styles.noTasks}>No hay tareas disponibles.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            //pongo el pressable para poder editar en el texto de la tarea   
            //SE ANULA EL PRESSABLE PARA DAR MEJOS ASPECTO         
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
                {/* SE AGREA modificationDate PARA MEJORAR LA FECHA AL MOSTRAR UNA ACTUALIZACIÓN */}
                <Text>
                    <Text style={styles.taskNameSecundario}>
                    {item.modificationDate ? 'Fecha Modificación: ' : 'Fecha Creación: '}
                    </Text>
                    <Text style={styles.taskDescription}>
                    {item.modificationDate || item.date}
                    </Text>
                </Text>
                    <Text>
                    <Text style={styles.taskNameSecundario}>
                    {item.modificationTime ? 'Hora Modificación: ' : 'Hora Creación: '}
                    </Text>
                    <Text style={styles.taskDescription}>
                    {item.modificationTime || item.time}
                    </Text>
                </Text> 
                <Pressable
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditTask', { taskId: item.id })}>
                    <Text style={styles.buttonText}>Editar</Text>
                </Pressable>
                <Pressable
                    style={styles.deleteButton}
                    onPress={() => handleDeleteTask(item.id)}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </Pressable>
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