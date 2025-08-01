import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Bet {
  id: string;
  sport: string;
  event: string;
  market: string;
  selection: string;
  odds: number;
  amount: number;
  timestamp: number;
  status: 'matched' | 'unmatched' | 'open' | 'settled';
  result?: 'win' | 'lose' | 'pending';
  matchedAt?: number;
  settledAt?: number;
  originalBetId?: string;
  splitBets?: string[];
  isSplitBet?: boolean;
  totalOriginalAmount?: number;
  matchedAmount?: number;
  remainingAmount?: number;
}

interface ExpandableBetCardProps {
  bet: Bet;
  splitBets?: Bet[];
  onPress?: () => void;
}

export default function ExpandableBetCard({ bet, splitBets = [], onPress }: ExpandableBetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'matched': return '#39FF14';
      case 'unmatched': return '#FF6B6B';
      case 'open': return '#FFD93D';
      case 'settled': return '#6BCF7F';
      default: return '#555';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'matched': return 'Matched';
      case 'unmatched': return 'Unmatched';
      case 'open': return 'Open';
      case 'settled': return 'Settled';
      default: return 'Unknown';
    }
  };

  const hasSplits = splitBets.length > 0;
  const isOriginalBet = !bet.isSplitBet;
  const progressPercentage = bet.matchedAmount && bet.totalOriginalAmount 
    ? (bet.matchedAmount / bet.totalOriginalAmount) * 100 
    : 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.mainCard}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.header}>
          <Text style={styles.eventText}>{bet.event}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bet.status) }]}>
            <Text style={styles.statusText}>{getStatusText(bet.status)}</Text>
          </View>
        </View>
        
        <Text style={styles.marketText}>{bet.market}: {bet.selection}</Text>
        <Text style={styles.oddsText}>Odds: {bet.odds > 0 ? `+${bet.odds}` : bet.odds}</Text>
        
        {bet.status === 'settled' ? (
          // For settled bets, show amount bet and result
          <View style={styles.amountRow}>
            <Text style={styles.amountText}>
              Amount Bet: ${bet.amount}
            </Text>
            {bet.result && (
              <Text style={[
                styles.resultAmountText,
                { color: bet.result === 'win' ? '#39FF14' : '#FF6B6B' }
              ]}>
                {bet.result === 'win' ? `+$${bet.amount * (bet.odds > 0 ? bet.odds / 100 : 1)}` : `-$${bet.amount}`}
              </Text>
            )}
          </View>
        ) : isOriginalBet && bet.totalOriginalAmount ? (
          // For open bets, show progress
          <View style={styles.progressContainer}>
            <View style={styles.amountRow}>
              <Text style={styles.amountText}>
                ${bet.matchedAmount || 0} / ${bet.totalOriginalAmount} Matched
              </Text>
              <Text style={styles.remainingText}>
                ${bet.remainingAmount || 0} Remaining
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressPercentage}%` }
                ]} 
              />
            </View>
          </View>
        ) : (
          <Text style={styles.amountText}>Amount: ${bet.amount}</Text>
        )}
        
        {bet.result && (
          <View style={[styles.resultBadge, { backgroundColor: bet.result === 'win' ? '#39FF14' : '#FF6B6B' }]}>
            <Text style={styles.resultText}>{bet.result.toUpperCase()}</Text>
          </View>
        )}

        {hasSplits && (
          <TouchableOpacity 
            style={styles.expandButton}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text style={styles.expandButtonText}>
              {isExpanded ? '▼' : '▶'} {splitBets.length} Split Bets
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {isExpanded && hasSplits && (
        <View style={styles.splitBetsContainer}>
          {splitBets.map((splitBet, index) => (
            <View key={splitBet.id} style={styles.splitBetCard}>
              <View style={styles.splitBetHeader}>
                <Text style={styles.splitBetNumber}>Split #{index + 1}</Text>
                <Text style={styles.splitBetAmount}>${splitBet.amount}</Text>
              </View>
              <Text style={styles.splitBetTime}>
                Matched: {new Date(splitBet.matchedAt || 0).toLocaleTimeString()}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  mainCard: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 16,
    borderColor: '#39FF14',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  marketText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  oddsText: {
    color: '#39FF14',
    fontSize: 14,
    marginBottom: 8,
  },
  progressContainer: {
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  amountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  remainingText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  resultAmountText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#39FF14',
    borderRadius: 2,
  },
  resultBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  resultText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  expandButton: {
    marginTop: 12,
    paddingVertical: 8,
    alignItems: 'center',
    borderTopColor: '#333',
    borderTopWidth: 1,
  },
  expandButtonText: {
    color: '#39FF14',
    fontSize: 14,
    fontWeight: '600',
  },
  splitBetsContainer: {
    backgroundColor: '#0A0A0A',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 12,
    marginTop: -1, // Overlap with main card border
  },
  splitBetCard: {
    backgroundColor: '#222',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
  },
  splitBetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  splitBetNumber: {
    color: '#39FF14',
    fontSize: 14,
    fontWeight: '600',
  },
  splitBetAmount: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  splitBetTime: {
    color: '#888',
    fontSize: 12,
  },
}); 