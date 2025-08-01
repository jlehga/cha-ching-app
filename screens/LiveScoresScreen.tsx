import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MOCK_LIVE_SCORES, LiveGame, getLiveGames, getUpcomingGames, getRecentGames } from '../data/mock_live_scores';
import GlobalStyles from '../styles/GlobalStyles';
import { useUser } from '../contexts/UserContext';
import ChatRoomModal from '../components/ChatRoomModal';
import Layout from '../components/Layout';

interface LiveScoresScreenProps {
  navigation: any;
}

const GameCard = ({ game, onPress }: { game: LiveGame; onPress: () => void }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return '#FF6B6B';
      case 'upcoming': return '#39FF14';
      case 'final': return '#6BCF7F';
      default: return '#888';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'LIVE';
      case 'upcoming': return 'UPCOMING';
      case 'final': return 'FINAL';
      default: return 'UNKNOWN';
    }
  };

  return (
    <TouchableOpacity style={styles.gameCard} onPress={onPress}>
      <View style={styles.gameHeader}>
        <View style={styles.teamsContainer}>
          <Text style={styles.teamText}>{game.homeTeam}</Text>
          <Text style={styles.vsText}>vs</Text>
          <Text style={styles.teamText}>{game.awayTeam}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(game.status) }]}>
          <Text style={styles.statusText}>{getStatusText(game.status)}</Text>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreText}>{game.homeScore}</Text>
        </View>
        <Text style={styles.scoreSeparator}>-</Text>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreText}>{game.awayScore}</Text>
        </View>
      </View>

      <View style={styles.gameInfo}>
        <Text style={styles.sportText}>{game.sport}</Text>
        <Text style={styles.timeText}>
          {game.status === 'live' ? `${game.quarter} - ${game.timeRemaining}` : 
           game.status === 'upcoming' ? `Starts in ${game.timeRemaining}` : 
           `Final - ${game.gameTime}`}
        </Text>
        <View style={styles.chatInfo}>
          <Text style={styles.chatText}>💬 {game.activeUsers} chatting</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function LiveScoresScreen({ navigation }: LiveScoresScreenProps) {
  const { user } = useUser();
  const [selectedTab, setSelectedTab] = useState<'live' | 'upcoming' | 'recent'>('live');
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState<LiveGame | null>(null);

  const handleGamePress = (game: LiveGame) => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to join the chat room.');
      return;
    }
    
    setSelectedGame(game);
    setChatModalVisible(true);
  };

  const getGamesForTab = () => {
    switch (selectedTab) {
      case 'live':
        return getLiveGames();
      case 'upcoming':
        return getUpcomingGames();
      case 'recent':
        return getRecentGames();
      default:
        return [];
    }
  };

  const renderTabButton = (tab: 'live' | 'upcoming' | 'recent', label: string) => (
    <TouchableOpacity
      style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
      onPress={() => setSelectedTab(tab)}
    >
      <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Layout navigation={navigation}>
      <View style={GlobalStyles.screenContent}>
        <Text style={GlobalStyles.title}>Live Scores</Text>
      
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {renderTabButton('live', 'Live Games')}
        {renderTabButton('upcoming', 'Upcoming')}
        {renderTabButton('recent', 'Recent')}
      </View>

      {/* Games List */}
      <FlatList
        data={getGamesForTab()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard game={item} onPress={() => handleGamePress(item)} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No games available</Text>
          </View>
        )}
              />
      </View>

      {/* Chat Room Modal */}
      <ChatRoomModal
        visible={chatModalVisible}
        onClose={() => {
          setChatModalVisible(false);
          setSelectedGame(null);
        }}
        game={selectedGame}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#39FF14',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#000',
  },
  listContainer: {
    paddingBottom: 20,
  },
  gameCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  vsText: {
    color: '#888',
    fontSize: 14,
    marginHorizontal: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  scoreBox: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  scoreText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreSeparator: {
    color: '#888',
    fontSize: 20,
    marginHorizontal: 16,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sportText: {
    color: '#39FF14',
    fontSize: 12,
    fontWeight: '600',
  },
  timeText: {
    color: '#ccc',
    fontSize: 12,
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatText: {
    color: '#888',
    fontSize: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
}); 