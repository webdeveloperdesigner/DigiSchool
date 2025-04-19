import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Auth/LoginScreen'; // Correct import for LoginScreen
import RegisterScreen from './src/screens/Auth/SignupScreen'; // Correct import for SignupScreen
import HomeScreen from './src/screens/HomeScreen'; // Correct import for HomeScreen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
// Note: Ensure that the paths to your screens are correct based on your project structure.