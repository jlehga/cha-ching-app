// components/BetSlipModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useWallet } from '../contexts/WalletContext';
import { useBetHistory } from '../contexts/BetHistoryContext';
import { useBetMode } from '../contexts/BetModeContext';

export default function BetSlipModal({ visible, onClose, bet }) {
  const [stake, setStake] = useState('');
  const [toWin, setToWin] = useState('0.00');
  const { coinBalance, cashBalance, deduct } = useWallet();
  const { placeBet } = useBetHistory();
  const { betMode } = useBetMode();

  useEffect(() => {
    const price = bet?.odd?.price || 0;
    const numericStake = parseFloat(stake) || 0;
    const payout = (price > 0) ? numericStake * (price / 100) : numericStake / Math.abs(price / 100);
    setToWin(numericStake ? payout.toFixed(2) : '0.00');
  }, [stake, bet]);

  const handlePlaceBet = () => {
    const numericStake = parseFloat(stake);
    
    if (!numericStake || numericStake <= 0) {
      Alert.alert('Invalid Stake', 'Please enter a valid stake amount.');
      return;
    }

    const currentBalance = betMode === 'coins' ? coinBalance : cashBalance;
    
    if (numericStake > currentBalance) {
      Alert.alert('Insufficient Balance', `You don't have enough ${betMode} to place this bet.`);
      return;
    }

    // Deduct the stake from wallet
    const deductionSuccess = deduct(numericStake, betMode);
    
    if (!deductionSuccess) {
      Alert.alert('Transaction Failed', 'Unable to deduct stake from your wallet.');
      return;
    }

    // Place the bet in history
    placeBet({
      sport: bet.fixture.sport.name,
      event: `${bet.fixture.fixture.home_team_display} vs ${bet.fixture.fixture.away_team_display}`,
      market: bet.odd.selection,
      selection: bet.odd.selection,
      odds: bet.odd.price,
      amount: numericStake,
    });

    Alert.alert(
      'Bet Placed!', 
      `Your bet of ${numericStake} ${betMode === 'coins' ? 'coins' : 'dollars'} has been placed successfully!`,
      [{ text: 'OK', onPress: onClose }]
    );

    // Reset form
    setStake('');
    setToWin('0.00');
  };

  if (!bet) return null;

  const currentBalance = betMode === 'coins' ? coinBalance : cashBalance;
  const balanceText = betMode === 'coins' ? `${currentBalance} Coins` : `$${currentBalance.toFixed(2)}`;

  return (
    <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
      <KeyboardAvoidingView 
        style={styles.overlay} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>{bet.fixture.fixture.home_team_display} vs {bet.fixture.fixture.away_team_display}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtext}>Line: {bet.odd.selection} @ {bet.odd.price > 0 ? `+${bet.odd.price}` : bet.odd.price}</Text>
          <Text style={styles.balanceText}>Balance: {balanceText}</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Stake"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={stake}
            onChangeText={setStake}
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={() => {}}
          />

          <Text style={styles.subtext}>To Win: ${toWin}</Text>

          <TouchableOpacity 
            style={[styles.placeButton, (!stake || parseFloat(stake) <= 0) && styles.disabledButton]} 
            onPress={handlePlaceBet}
            disabled={!stake || parseFloat(stake) <= 0}
          >
            <Text style={styles.placeButtonText}>Place Play</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modal: {
    backgroundColor: '#111',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  subtext: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
  balanceText: {
    color: '#39FF14',
    fontSize: 14,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#222',
    borderColor: '#39FF14',
    borderWidth: 1,
    borderRadius: 8,
    color: '#fff',
    padding: 10,
    marginBottom: 12,
  },
  placeButton: {
    backgroundColor: '#39FF14',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  disabledButton: {
    backgroundColor: '#555',
  },
  placeButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#39FF14',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
