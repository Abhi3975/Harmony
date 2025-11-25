import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { Colors } from './src/constants/Colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <StatusBar style="light" backgroundColor={Colors.background} />
        <AppNavigator />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
