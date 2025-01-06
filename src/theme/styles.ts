import { StyleSheet } from "react-native";

export const colors = {
    primary: '#1d2667', // Color Primario
    dark: 'black', // Color Secundario
    light: '#D2F4FA', // Color Terciario
    danger: '#ff4d4d', // Nuevo color para el botón de eliminar
    white: '#3D656C',      // Color para textos secundarios
    background: '#abd5d5', // Color de fondo
    
}; 

export const styles = StyleSheet.create({    
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background, // Fondo general
    }, 
    title: {
        color: colors.primary,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.light,
        fontSize: 15,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: '100%',
        backgroundColor: 'white',
    },
    linkText: {
        color: colors.primary,
        fontSize: 16,
        marginTop: 10,
        alignItems: 'center',
    },
});