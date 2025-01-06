import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigation'; 
import { styles } from '../../theme/styles';

export const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  // SE AGREGA PARA VER EL USUARIO REGISTRADO EN ESTE CASO EL CORREO
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUserName(currentUser.displayName || currentUser.email); // Usa el nombre o el correo si no hay nombre
    }
  }, []);

  //SE HACE CAMBIOS PARA QUE ESTE MEJOR DISTRIBUIDO Y EN UN CONTENEDOR TIPO CARD
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
        <View style={styles.cardContainer}>
          <Pressable
            style={[styles.card, { backgroundColor: '#4CAF50' }]}
            onPress={() => navigation.navigate('AddTask')}
          >
            <Image 
                    source={require('../../img/add.png')} // Ajusta la ruta a tu imagen
                    style={styles.icon}
                  />
            <Text style={styles.cardText}>Agregar Tarea</Text>
          </Pressable>

          <Pressable
            style={[styles.card, { backgroundColor: '#FF9800' }]}
            onPress={() => navigation.navigate('TaskList')}
          >
            <Image 
                    source={require('../../img/list.png')} // Ajusta la ruta a tu imagen
                    style={styles.icon}
                  />
            <Text style={styles.cardText}>Lista de Tareas</Text>
          </Pressable>
        </View> 
        <View style={{alignItems:'center', marginTop: 20 }}>        
          <Pressable
              style={[styles.card, {alignContent:'center',backgroundColor: '#FF3840' }]}
              onPress={() => navigation.navigate('Config')}
            >
            <Image 
                    source={require('../../img/config.png')} // Ajusta la ruta a tu imagen
                    style={styles.icon}
                  />
            <Text style={styles.cardText}>Configuración</Text>
          </Pressable>     
        </View>     
    </View>  
  );
};