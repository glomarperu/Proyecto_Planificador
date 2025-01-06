import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '../theme/styles';

interface Props {
  onAction: () => void;
  label: string;
}

//Boton creado para reusar en mis vistas
export const ButtonComponent = ({ onAction, label }: Props) => {
  return (
    <Pressable style={styles.button} onPress={onAction}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
};