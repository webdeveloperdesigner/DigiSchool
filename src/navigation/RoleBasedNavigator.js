import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeacherDashboard from '../screens/Dashboard/TeacherDashboard';
import PrincipalDashboard from '../screens/Dashboard/PrincipalDashboard';
import StudentDashboard from '../screens/Dashboard/StudentDashboard';
import AdminDashboard from '../screens/Dashboard/AdminDashboard';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const RoleBasedNavigator = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role;

  return (
    <Stack.Navigator>
      {role === 'teacher' && <Stack.Screen name='Teacher' component={TeacherDashboard} />}
      {role === 'principal' && <Stack.Screen name='Principal' component={PrincipalDashboard} />}
      {role === 'student' && <Stack.Screen name='Student' component={StudentDashboard} />}
      {role === 'admin' && <Stack.Screen name='Admin' component={AdminDashboard} />}
    </Stack.Navigator>
  );
};

export default RoleBasedNavigator;
