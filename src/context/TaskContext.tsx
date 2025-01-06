import React, { createContext, useState, ReactNode } from 'react';
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
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
}

export const TaskContext = createContext<TaskContextProps | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks] = useState<Task[]>([]);  

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
        .add(task);// Actualiza las tareas después de agregar una nueva
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};