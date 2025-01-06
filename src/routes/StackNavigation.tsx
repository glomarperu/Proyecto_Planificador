import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';

export type RootStackParams = {
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
 
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />        
    </Stack.Navigator>
  );
};