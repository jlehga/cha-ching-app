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
import LiquidityModal from '../components/LiquidityModal';

export default function MarketsScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const SPORTS = ['NBA', 'NFL', 'MLB', 'UFC', 'NHL'];
  const [selectedSport, setSelectedSport] = useState('NBA');
  const [selectedBet, setSelectedBet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [liquidityModalVisible, setLiquidityModalVisible] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState(null);

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

  const handleShowLiquidity = (fixture) => {
    console.log('handleShowLiquidity called with fixture:', fixture);
    setSelectedFixture(fixture);
    setLiquidityModalVisible(true);
  };

  const handleCloseLiquidityModal = () => {
    setLiquidityModalVisible(false);
    setSelectedFixture(null);
  };

  const handlePlaceBetFromLiquidity = (fixture) => {
    setLiquidityModalVisible(false);
    setSelectedFixture(null);
    // Open bet slip with the first available odds from the fixture
    if (fixture.odds && fixture.odds.length > 0) {
      setSelectedBet({ fixture, odd: fixture.odds[0] });
      setModalVisible(true);
    }
  };

  return (
    <Layout>
      <View style={GlobalStyles.screenContent}>
        <Text style={GlobalStyles.title}>Today's Odds</Text>

        <View style={{ marginBottom: 16 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        </View>

        <View style={{ height: 8 }} />

        <FlatList
          data={filteredFixtures}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FixtureCard 
              fixture={item} 
              onSelect={handleSelectBet}
              onShowLiquidity={handleShowLiquidity}
            />
          )}
          contentContainerStyle={{ paddingBottom: tabBarHeight + 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={GlobalStyles.text}>No games available for {selectedSport}</Text>
            </View>
          )}
        />
      </View>

      <BetSlipModal visible={modalVisible} onClose={handleCloseModal} bet={selectedBet} />
      <LiquidityModal 
        visible={liquidityModalVisible} 
        onClose={handleCloseLiquidityModal} 
        fixture={selectedFixture}
        onPlaceBet={handlePlaceBetFromLiquidity}
      />
    </Layout>
  );
}
