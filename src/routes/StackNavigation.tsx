import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AddTaskScreen } from '../screens/tasks/AddTaskScreen';
import { TaskListScreen } from '../screens/tasks/TaskListScreen';

export type RootStackParams = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddTask: undefined;
  TaskList: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

interface StackNavigationProps {
  user: any; 
}

export const StackNavigation = ({ user }: StackNavigationProps) => {
  const navigation = useNavigation();
  //cambios en el estado de autenticación
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