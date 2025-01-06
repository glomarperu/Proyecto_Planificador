import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { AddTaskScreen } from '../screens/tasks/AddTaskScreen';
import { EditTaskScreen } from '../screens/tasks/EditTaskScreen';
import { TaskListScreen } from '../screens/tasks/TaskListScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export type RootStackParams = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddTask: undefined;
  EditTask: { taskId: string };
  TaskList: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

interface StackNavigationProps {
  user: any; // Ajusta el tipo según Firebase Auth
}

export const StackNavigation = ({ user }: StackNavigationProps) => {
  const navigation = useNavigation();
  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (!user) {
        // Si no hay usuario, redirigir a la pantalla de Login
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TaskList" component={TaskListScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
          <Stack.Screen name="EditTask" component={EditTaskScreen} />          
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};