import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TaskProvider } from './src/context/TaskContext';
import { StackNavigation } from './src/routes/StackNavigation';
import auth from '@react-native-firebase/auth';

function App(): React.JSX.Element {
  const [user, setUser] = useState<any>(null);

  const onAuthStateChanged = (user: any) => {
    console.log('Estado de autenticación cambiado:', user);
    setUser(user);    
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

 return (   
      <TaskProvider>
        <NavigationContainer>
          <StackNavigation user={user} />
        </NavigationContainer>
      </TaskProvider>
  );
}

export default App;