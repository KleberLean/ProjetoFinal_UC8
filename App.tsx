import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/AuthContext';
import Routes from './src/routes';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
