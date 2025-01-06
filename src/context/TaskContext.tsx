import React, { createContext, useState, ReactNode, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface Task {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  status: string;
  category: string;
  //SE AGREGA PARA EL NUEVO TEXTO
  modificationDate?: string; // Fecha de modificación
  modificationTime?: string; // Hora de modificación
}

interface TaskContextProps {
  tasks: Task[];
  obtenerTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
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
      obtenerTasks(); // Actualiza las tareas después de agregar una nueva
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      //Actualiza la tarea
      if (!userId) return;
      await firestore()
        .collection('tasks')
        .doc(userId)
        .collection('userTasks')
        .doc(id)
        .update(updates);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task)
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      if (!userId) return;
      await firestore()
        .collection('tasks')
        .doc(userId)
        .collection('userTasks')
        .doc(taskId)
        .delete();
        setTasks(tasks.filter((task) => task.id !== taskId));//corregido para evitar redundancias
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, obtenerTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};