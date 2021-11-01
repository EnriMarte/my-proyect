import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthDrawer from './src/components/AuthDrawer';
import { NavigationContainer } from '@react-navigation/native';
import Register from './src/screens/Register'



export default function App() {
  return (
      <AuthDrawer/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
