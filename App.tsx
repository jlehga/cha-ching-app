import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MarketsScreen from './screens/MarketsScreen';
import ScoresScreen from './screens/ScoresScreen';
import PurchaseScreen from './screens/PurchaseScreen';
import AIHistoryScreen from './screens/AIHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoadingScreen from './components/LoadingScreen';
import { WalletProvider } from './contexts/WalletContext';
import { BetHistoryProvider } from './contexts/BetHistoryContext';
import { BetModeProvider } from './contexts/BetModeContext';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Simulate data loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <WalletProvider>
      <BetHistoryProvider>
      <BetModeProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#000',
            borderTopColor: '#39FF14',
            borderTopWidth: 1,
            height: 90,
            position: 'relative',
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#39FF14',
          tabBarInactiveTintColor: '#555',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            marginTop: 2,
          },
        }}
      >
        <Tab.Screen
          name="Markets"
          component={MarketsScreen}
          options={{
            tabBarLabel: 'Markets',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size + 6 }}>📊</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Scores"
          component={ScoresScreen}
          options={{
            tabBarLabel: 'Scores',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size + 6 }}>🏆</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Purchase"
          component={PurchaseScreen}
          options={{
            tabBarLabel: 'Purchase',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size + 6 }}>💳</Text>
            ),
          }}
        />
        <Tab.Screen
          name="AI History"
          component={AIHistoryScreen}
          options={{
            tabBarLabel: 'AI History',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size + 6 }}>🤖</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size + 6 }}>👤</Text>
            ),
          }}
        />
        </Tab.Navigator>
      </NavigationContainer>
      </BetModeProvider>
      </BetHistoryProvider>
    </WalletProvider>
  );
}