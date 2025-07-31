import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface LiquidityData {
  totalVolume: number;
  availableLiquidity: number;
  matchedBets: number;
  pendingBets: number;
  averageOdds: number;
  recentActivity: Array<{
    time: string;
    action: string;
    amount: number;
    odds: number;
  }>;
}

interface LiquidityModalProps {
  visible: boolean;
  onClose: () => void;
  fixture: any;
  onPlaceBet: (fixture: any) => void;
}

export default function LiquidityModal({ visible, onClose, fixture, onPlaceBet }: LiquidityModalProps) {
  // Mock liquidity data - in production this would come from the database
  const liquidityData: LiquidityData = {
    totalVolume: 12500,
    availableLiquidity: 3200,
    matchedBets: 47,
    pendingBets: 12,
    averageOdds: -108,
    recentActivity: [
      { time: '2 min ago', action: 'Bet Placed', amount: 100, odds: -110 },
      { time: '5 min ago', action: 'Bet Matched', amount: 250, odds: -105 },
      { time: '8 min ago', action: 'Bet Placed', amount: 75, odds: -115 },
      { time: '12 min ago', action: 'Bet Matched', amount: 500, odds: -108 },
      { time: '15 min ago', action: 'Bet Placed', amount: 200, odds: -112 },
    ],
  };

  console.log('LiquidityModal - visible:', visible, 'fixture:', fixture);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Liquidity Overview</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {fixture ? (
            <>
              <Text style={styles.fixtureTitle}>
                {fixture.fixture.home_team_display} vs {fixture.fixture.away_team_display}
              </Text>
              <Text style={styles.sportInfo}>{fixture.sport.name} • {fixture.league.name}</Text>
            </>
          ) : (
            <Text style={styles.fixtureTitle}>Market Overview</Text>
          )}

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Liquidity Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>${liquidityData.totalVolume.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Total Volume</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>${liquidityData.availableLiquidity.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Available</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{liquidityData.matchedBets}</Text>
                <Text style={styles.statLabel}>Matched</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{liquidityData.pendingBets}</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
            </View>

            {/* Market Overview */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Market Overview</Text>
              <View style={styles.marketCard}>
                <Text style={styles.marketLabel}>Average Odds</Text>
                <Text style={styles.marketValue}>
                  {liquidityData.averageOdds > 0 ? `+${liquidityData.averageOdds}` : liquidityData.averageOdds}
                </Text>
              </View>
              <View style={styles.marketCard}>
                <Text style={styles.marketLabel}>Match Rate</Text>
                <Text style={styles.marketValue}>
                  {Math.round((liquidityData.matchedBets / (liquidityData.matchedBets + liquidityData.pendingBets)) * 100)}%
                </Text>
              </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              {liquidityData.recentActivity.map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <View style={styles.activityLeft}>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                    <Text style={styles.activityAction}>{activity.action}</Text>
                  </View>
                  <View style={styles.activityRight}>
                    <Text style={styles.activityAmount}>${activity.amount}</Text>
                    <Text style={styles.activityOdds}>
                      {activity.odds > 0 ? `+${activity.odds}` : activity.odds}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={styles.placeBetButton} 
            onPress={() => onPlaceBet(fixture)}
          >
            <Text style={styles.placeBetButtonText}>Place Bet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#111',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '90%',
    minHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#39FF14',
    fontSize: 20,
    fontWeight: 'bold',
  },
  fixtureTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sportInfo: {
    color: '#ccc',
    fontSize: 14,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
    paddingBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  statValue: {
    color: '#39FF14',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  marketCard: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  marketLabel: {
    color: '#ccc',
    fontSize: 14,
  },
  marketValue: {
    color: '#39FF14',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  activityLeft: {
    flex: 1,
  },
  activityTime: {
    color: '#888',
    fontSize: 12,
  },
  activityAction: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    color: '#39FF14',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activityOdds: {
    color: '#ccc',
    fontSize: 12,
  },
  placeBetButton: {
    backgroundColor: '#39FF14',
    margin: 20,
    marginBottom: 40,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeBetButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 