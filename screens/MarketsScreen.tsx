import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useWallet } from '../contexts/WalletContext';
import { useBetHistory } from '../contexts/BetHistoryContext';
import Layout from '../components/Layout';
import { useBetMode } from '../contexts/BetModeContext';
import { MOCK_FIXTURES } from '../data/mock_fixtures';
import FixtureCard from '../components/FixtureCard';
import BetSlipModal from '../components/BetSlipModal';

export default function MarketsScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const SPORTS = ['NBA', 'NFL', 'MLB', 'UFC', 'NHL'];
  const [selectedSport, setSelectedSport] = useState('NBA');
  const [selectedBet, setSelectedBet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { coinBalance, deduct } = useWallet();
  const { placeBet } = useBetHistory();
  const { betMode } = useBetMode();

  const filteredFixtures = MOCK_FIXTURES.filter(
    (fixture) => fixture.sport.id.toLowerCase() === selectedSport.toLowerCase()
  );

  const handleSelectBet = (bet) => {
    setSelectedBet(bet);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBet(null);
  };

  return (
    <Layout>
      <View style={[GlobalStyles.screenContainer, { paddingBottom: tabBarHeight + 10, flex: 1 }]}>
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
              <Text style={{ color: selectedSport === sport ? '#000' : '#39FF14', fontWeight: 'bold' }}>{sport}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredFixtures}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FixtureCard fixture={item} onSelect={handleSelectBet} />
          )}
          ListEmptyComponent={() => (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={GlobalStyles.text}>No games available for {selectedSport}</Text>
            </View>
          )}
        />
      </View>

      <BetSlipModal visible={modalVisible} onClose={handleCloseModal} bet={selectedBet} />
    </Layout>
  );
}
