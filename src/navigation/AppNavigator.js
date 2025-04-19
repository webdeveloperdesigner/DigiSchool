import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RoleBasedNavigator from './RoleBasedNavigator';
import AuthNavigator from './AuthNavigator';
import { AuthContext } from '../context/AuthContext';

const AppNavigator = () => {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {user ? <RoleBasedNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
