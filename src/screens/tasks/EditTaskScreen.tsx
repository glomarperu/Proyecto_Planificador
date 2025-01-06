import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { TaskContext } from '../../context/TaskContext';
import { RootStackParams } from '../../routes/StackNavigation';
import { styles } from '../../theme/styles';
import { ButtonComponent } from '../../components/ButtonComponent';

export const EditTaskScreen = () => {
  const { updateTask, tasks } = useContext(TaskContext)!;
  const route = useRoute<RouteProp<RootStackParams, 'EditTask'>>();
  const { taskId } = route.params;
  const navigation = useNavigation(); // Acceso a la navegación

  // Buscar la tarea seleccionada
  const task = tasks.find(t => t.id === taskId);

  // Estados para los cambios
  const [name, setName] = useState(task?.name || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'Pendiente');
  const [category, setCategory] = useState(task?.category || 'General');

  const handleUpdateTask = async () => {
    if (!name || !description) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }
    // SE CAMBIA POR EL NUEVO DATO PARA CAMBIAR EL ESTADO DE LA FECHA Y HORA
    const modificationDate = new Date().toISOString().split('T')[0]; // Fecha actual
    const modificationTime = new Date().toLocaleTimeString(); // Hora actual
  
    try {
      await updateTask(taskId, {
        name,
        description,
        status,
        category,
        modificationDate, // Fecha de modificación
        modificationTime, // Hora de modificación
      });
      Alert.alert('Éxito', 'Tarea actualizada correctamente', [
        {
          text: 'Aceptar',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la tarea.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la tarea"
        value={name}
        onChangeText={setName}/>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline/>
      <Text style={styles.label}>Estado</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Pendiente" value="Pendiente" />
        <Picker.Item label="En progreso" value="En progreso" />
        <Picker.Item label="Completado" value="Completado" />
      </Picker>
      <Text style={styles.label}>Categoría</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}>
        <Picker.Item label="General" value="General" />
        <Picker.Item label="Trabajo" value="Trabajo" />
        <Picker.Item label="Escuela" value="Escuela" />
      </Picker>
      <ButtonComponent 
              onAction={handleUpdateTask} 
              label="Actualizar Tarea"/>  
    </View>
  );
};