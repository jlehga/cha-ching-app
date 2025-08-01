import React from 'react';
import { View, Text } from 'react-native';
import Layout from '../components/Layout';
import GlobalStyles from '../styles/GlobalStyles';

export default function PurchaseScreen({ navigation }) {
  return (
    <Layout navigation={navigation}>
      <View style={GlobalStyles.screenContent}>
        <Text style={GlobalStyles.title}>Purchase</Text>
        <Text style={GlobalStyles.text}>Purchase screen coming soon...</Text>
      </View>
    </Layout>
  );
}