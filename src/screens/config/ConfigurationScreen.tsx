import React from 'react';
import { View, Text, Pressable} from 'react-native';
import auth from '@react-native-firebase/auth';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigation'; // Asegúrate de importar RootStackParams
import { styles } from '../../theme/styles';

export const ConfigurationScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const logout = async () => {
        try {
          await auth().signOut();
          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            );
          }, 200); // Dar tiempo a que se complete la salida antes de resetear la navegación
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      };

  return (    
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </Pressable>      
        </View>
      );
};