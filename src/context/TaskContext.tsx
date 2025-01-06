import React, { createContext, useState, ReactNode, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//agregar las variables a usar
interface Task {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  status: string;
  category: string;
}

interface TaskContextProps {
  tasks: Task[];
  obtenerTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
}

export const TaskContext = createContext<TaskContextProps | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    
  // Obtener el ID del usuario autenticado
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    if (userId) {
      obtenerTasks();
    }
  }, [userId]);

  const obtenerTasks = async () => {
    const user = auth().currentUser; // Obtener el usuario autenticado
    if (!user) {
      console.error('No se encontró usuario autenticado.');
      return;
    }  
    try {
      const taskCollection = await firestore()
        .collection('tasks')
        .doc(user.uid) // Documento del usuario
        .collection('userTasks') // Subcolección
        .get();
  
      const taskData = taskCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Task));
      setTasks(taskData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task: Omit<Task, 'id'>) => {
    const user = auth().currentUser;
    if (!user) {
      console.error('No se encontró usuario autenticado.');
      return;
    }  
    try {
      await firestore()
        .collection('tasks')
        .doc(user.uid)
        .collection('userTasks')
        .add(task);
        obtenerTasks();// Actualiza las tareas después de agregar una nueva
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, obtenerTasks }}>
      {children}
    </TaskContext.Provider>
  );
};