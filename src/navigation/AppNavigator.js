// navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/Dashboard/WelcomeScreen';
import RoleSelectionScreen from '../screens/Auth/RoleSelectionScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import AdminHomeScreen from '../screens/Dashboard/AdminDashboard';
import StudentHomeScreen from '../screens/Dashboard/StudentDashboard';
import TeacherHomeScreen from '../screens/Dashboard/TeacherDashboard';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="StudentHome" component={StudentHomeScreen} /> 
      <Stack.Screen name="TeacherHome" component={TeacherHomeScreen} /> 
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      
    </Stack.Navigator>
  );
}
