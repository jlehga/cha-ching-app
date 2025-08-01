import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Layout from '../components/Layout';
import GlobalStyles from '../styles/GlobalStyles';
import { useUser } from '../contexts/UserContext';

export default function ProfileScreen({ navigation }) {
  const { user, signOut } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Navigation will be handled by the auth state change
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Authentication guard
  if (!user) {
    return (
      <Layout navigation={navigation}>
        <View style={[GlobalStyles.screenContent, styles.authGuardContainer]}>
          <Text style={styles.authGuardTitle}>Sign In Required</Text>
          <Text style={styles.authGuardText}>
            Please sign in to view your profile and account settings.
          </Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout navigation={navigation}>
      <View style={GlobalStyles.screenContent}>
        <Text style={GlobalStyles.title}>Profile</Text>
        <Text style={GlobalStyles.text}>Profile screen coming soon...</Text>
        
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  authGuardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authGuardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  authGuardText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  signOutButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});