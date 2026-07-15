import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAppState } from '../state/AppStateContext';
import { theme } from '../theme';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

function LoadingScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.paper }}>
      <ActivityIndicator color={theme.colors.grass} />
    </View>
  );
}

export function RootNavigator() {
  const { session, sessionLoading, dataLoading, hasProfile } = useAppState();
  const showApp = !!session && hasProfile;
  const loading = sessionLoading || (!!session && !hasProfile && dataLoading);

  return (
    <NavigationContainer>
      {loading ? <LoadingScreen /> : showApp ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
