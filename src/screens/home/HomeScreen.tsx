import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../theme/styles';
import { ButtonComponent } from '../../components/ButtonComponent';
import auth from '@react-native-firebase/auth';


export const HomeScreen = () => {
  const logout = async () => {
    try {
      await auth().signOut(); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleAddTask = () => {
    console.log('Agregar tarea');
  };

  const handleTaskList = () => {
    console.log('Lista de tareas');
  };

  const handleCerrarSesion = () => {
    console.log('Cerrar Sesión');
  };

  return (
    <View>
      <Text style={styles.title}>Bienvenido</Text>
      <ButtonComponent onAction={handleCerrarSesion} label="Cerrar Sesión" />
      <ButtonComponent onAction={handleAddTask} label="Agregar Tarea" />
      <ButtonComponent onAction={handleTaskList} label="Lista de Tareas" />
    </View>
  );
};