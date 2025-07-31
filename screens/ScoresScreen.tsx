import React from 'react';
import { View, Text } from 'react-native';
import Layout from '../components/Layout';
import GlobalStyles from '../styles/GlobalStyles';

export default function ScoresScreen() {
  return (
    <Layout>
      <View style={GlobalStyles.screenContent}>
        <Text style={GlobalStyles.title}>Scores</Text>
        <Text style={GlobalStyles.text}>Scores screen coming soon...</Text>
      </View>
    </Layout>
  );
}