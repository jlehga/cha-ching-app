import React from 'react';
import { View, Text } from 'react-native';
import Layout from '../components/Layout';
import GlobalStyles from '../styles/GlobalStyles';

export default function ProfileScreen() {
  return (
    <Layout>
      <View style={GlobalStyles.screenContent}>
        <Text style={GlobalStyles.title}>Profile</Text>
        <Text style={GlobalStyles.text}>Profile screen coming soon...</Text>
      </View>
    </Layout>
  );
}