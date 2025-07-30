import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MarketsScreen from './screens/MarketsScreen';
import ScoresScreen from './screens/ScoresScreen';
import PurchaseScreen from './screens/PurchaseScreen';
import AIHistoryScreen from './screens/AIHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Markets" component={MarketsScreen} />
        <Tab.Screen name="Scores" component={ScoresScreen} />
        <Tab.Screen name="Purchase" component={PurchaseScreen} />
        <Tab.Screen name="AI History" component={AIHistoryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}