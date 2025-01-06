import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { db } from '../../firebaseConfig';
import { ButtonComponent } from '../../components/ButtonComponent';
import { styles } from '../../theme/styles';

export const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const ButtonRegister = async () => {
    if (!name || !lastName || !email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }
    try {     
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;      
      await db.collection('users').doc(user.uid).set({
        name,
        lastName,
        email,
      });
      // Al registrar, redirigir al Login
      Alert.alert('Éxito', 'Usuario registrado correctamente')      
    } catch (error) {
      Alert.alert('Error', 'Usuario no registrado');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}/>
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}/>
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
              onAction={ButtonRegister} 
              label="Registrar Usuario"/>  
    </View>
  );
};