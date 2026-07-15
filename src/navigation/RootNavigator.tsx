import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAppState } from '../state/AppStateContext';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export function RootNavigator() {
  const { isAuthenticated } = useAppState();
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
