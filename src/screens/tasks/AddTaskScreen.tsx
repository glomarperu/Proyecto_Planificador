import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import { styles } from '../../theme/styles';
import { ButtonComponent } from '../../components/ButtonComponent';

export const AddTaskScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pendiente'); // Estado predeterminado
  const [category, setCategory] = useState('General'); // Categoría predeterminada

  const handleAddTask = async () => {
    const user = auth().currentUser; // Obtener el usuario autenticado
    if (!user) {
      Alert.alert('Error', 'No se encontró usuario autenticado.');
      return;
    }
  
    if (!name || !description) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
  
    const date = new Date().toISOString().split('T')[0]; // Fecha actual
    const time = new Date().toLocaleTimeString(); // Hora actual
  
    try {
      await firestore()
        .collection('tasks')
        .doc(user.uid) // Documento del usuario
        .collection('userTasks') // Subcolección para las tareas del usuario
        .add({
          name,
          description,
          date,
          time,
          status,
          category,
        });
      Alert.alert('Éxito', 'Tarea añadida correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo añadir la tarea.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la tarea</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingrese el nombre de la tarea"/>
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Ingrese la descripción"
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
        onAction={handleAddTask} 
        label="Añadir Tarea"/>                      
    </View>
  );
};