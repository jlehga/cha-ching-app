// components/Layout.tsx
import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { BetModeProvider } from '../contexts/BetModeContext';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <BetModeProvider>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
    </BetModeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
});
