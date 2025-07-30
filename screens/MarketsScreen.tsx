import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const MOCK_ODDS = [
  {
    id: '1',
    sport: 'NBA',
    match: 'Lakers vs Warriors',
    spread: '-3.5',
    total: 'O/U 223.5',
    moneyline: 'LAL -150',
  },
  {
    id: '2',
    sport: 'NBA',
    match: 'Celtics vs Heat',
    spread: '+2.5',
    total: 'O/U 215.0',
    moneyline: 'BOS -120',
  },
  {
    id: '3',
    sport: 'NFL',
    match: 'Bengals vs Chiefs',
    spread: '+1.5',
    total: 'O/U 46.0',
    moneyline: 'KC -110',
  },
  {
    id: '4',
    sport: 'NFL',
    match: 'Eagles vs Cowboys',
    spread: '-3.0',
    total: 'O/U 48.5',
    moneyline: 'PHI -140',
  },
  {
    id: '5',
    sport: 'MLB',
    match: 'Yankees vs Red Sox',
    spread: '-1.5',
    total: 'O/U 9.0',
    moneyline: 'NYY -125',
  },
  {
    id: '6',
    sport: 'MLB',
    match: 'Dodgers vs Giants',
    spread: '+1.5',
    total: 'O/U 8.5',
    moneyline: 'SF +110',
  },
  {
    id: '7',
    sport: 'UFC',
    match: 'Jones vs Miocic',
    spread: '-200',
    total: 'O/U 2.5',
    moneyline: 'JONES -180',
  },
  {
    id: '8',
    sport: 'UFC',
    match: 'Adesanya vs Pereira',
    spread: '+150',
    total: 'O/U 3.5',
    moneyline: 'PEREIRA +130',
  },
  {
    id: '9',
    sport: 'NHL',
    match: 'Bruins vs Maple Leafs',
    spread: '-1.5',
    total: 'O/U 5.5',
    moneyline: 'BOS -110',
  },
  {
    id: '10',
    sport: 'NHL',
    match: 'Oilers vs Flames',
    spread: '+1.5',
    total: 'O/U 6.0',
    moneyline: 'EDM +120',
  },
];

export default function MarketsScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const SPORTS = ['NBA', 'NFL', 'MLB', 'UFC', 'NHL'];
  const [selectedSport, setSelectedSport] = useState('NBA');
  const filteredOdds = MOCK_ODDS.filter((item) => item.sport === selectedSport);
  console.log('Selected sport:', selectedSport);
  console.log('Available sports in data:', [...new Set(MOCK_ODDS.map(item => item.sport))]);
  console.log('Filtered odds count:', filteredOdds.length);

  return (
    <SafeAreaView style={[GlobalStyles.screenContainer, { paddingBottom: tabBarHeight + 10, flex: 1}]}>
      <Text style={GlobalStyles.title}>Today's Odds</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {SPORTS.map((sport) => (
          <TouchableOpacity
            key={sport}
            onPress={() => setSelectedSport(sport)}
            style={{
              backgroundColor: selectedSport === sport ? '#39FF14' : '#222',
              paddingVertical: 8,
              paddingHorizontal: 16,
              marginRight: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#39FF14',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: selectedSport === sport ? '#000' : '#39FF14', fontWeight: 'bold' }}>
              {sport}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


         <FlatList
            data={filteredOdds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={GlobalStyles.card}>
            <Text style={GlobalStyles.text}>{item.match}</Text>
            <Text style={GlobalStyles.text}>Sport: {item.sport}</Text>
            <Text style={GlobalStyles.text}>Spread: {item.spread}</Text>
            <Text style={GlobalStyles.text}>Total: {item.total}</Text>
            <Text style={GlobalStyles.text}>Moneyline: {item.moneyline}</Text>
            <TouchableOpacity style={GlobalStyles.button}>
              <Text style={GlobalStyles.buttonText}>Bet</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={GlobalStyles.text}>No games available for {selectedSport}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
