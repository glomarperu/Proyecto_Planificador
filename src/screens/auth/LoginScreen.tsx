import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigation';
import { ButtonComponent } from '../../components/ButtonComponent';
import { styles } from '../../theme/styles';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParams, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const ButtonLogin = async () => {    
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor, ingresa tu correo y/o contraseña.');
      return;
    }
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
      setEmail('');
      setPassword('');
      navigation.navigate('Home'); // Redirige al Home después de un inicio de sesión exitoso
    } catch (error) {
      Alert.alert('Error', 'Correo y/o contraseña incorrectos');
    }
  };

  return (    
    <View style={styles.container}>  
      <Image 
        source={require('../../img/logo.png')} // Ajusta la ruta a tu imagen
        style={styles.logo}/>    
      <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={email}
          onChangeText={setEmail}/>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}/>
      <ButtonComponent 
        onAction={ButtonLogin} 
        label="Iniciar Sesión"/>            
      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Registrarse</Text>
      </Pressable>
    </View>
  );
};