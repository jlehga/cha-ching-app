import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useWallet } from '../contexts/WalletContext';
import { useBetHistory } from '../contexts/BetHistoryContext';
import { useBetMode } from '../contexts/BetModeContext';

type BetCardProps = {
  sport: string;
  event: string;
  market: string;
  selection: string;
  odds: number;
};

const BetCard: React.FC<BetCardProps> = ({
  sport,
  event,
  market,
  selection,
  odds,
}) => {
  const { coinBalance, cashBalance, deduct } = useWallet();
  const { placeBet } = useBetHistory();
  const { betMode } = useBetMode();

  const handleBet = () => {
    const betAmount = 10;
    const currentBalance = betMode === 'coins' ? coinBalance : cashBalance;
    
    if (currentBalance < betAmount) {
      alert(`Not enough ${betMode}!`);
      return;
    }

    const deductionSuccess = deduct(betAmount, betMode);
    
    if (!deductionSuccess) {
      alert('Transaction failed!');
      return;
    }

    placeBet({
      sport,
      event,
      market,
      selection,
      odds,
      amount: betAmount,
    });

    alert(`Bet placed on ${selection} at ${odds} odds!`);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.event}>{event}</Text>
      <Text style={styles.market}>{market}: {selection}</Text>
      <Text style={styles.odds}>Odds: {odds}</Text>
      <TouchableOpacity style={styles.button} onPress={handleBet}>
        <Text style={styles.buttonText}>Place 10 {betMode === 'coins' ? 'Coin' : 'Dollar'} Bet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderColor: '#39FF14',
    borderWidth: 1,
  },
  event: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  market: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  odds: {
    color: '#39FF14',
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#39FF14',
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
});

export default BetCard;
