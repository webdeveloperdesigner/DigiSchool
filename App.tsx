// App.tsx
import React from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens(); // <-- Call this at the top, before any navigation code

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
