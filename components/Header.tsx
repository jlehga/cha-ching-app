import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useBetMode } from '../contexts/BetModeContext';
import { useWallet } from '../contexts/WalletContext';

const Header = () => {
  const { betMode, setBetMode } = useBetMode();
  const { coinBalance, cashBalance } = useWallet();
  const slideAnim = React.useRef(new Animated.Value(betMode === 'coins' ? 0 : 1)).current;

  // TODO: Replace with actual sign-in state when implemented
  const isSignedIn = true; // For now, assume signed in

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: betMode === 'coins' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [betMode, slideAnim]);

  const handleToggle = () => {
    setBetMode(betMode === 'coins' ? 'cash' : 'coins');
  };

  const getBalanceText = () => {
    if (betMode === 'coins') {
      return `💰 ${coinBalance} Coins`;
    } else {
      return `💵 $${cashBalance.toFixed(2)} Cash`;
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Text style={styles.logo}>ChaChing</Text>
      </View>
      <View style={styles.toggleContainer}>
        <Animated.View 
          style={[
            styles.slider,
            {
              transform: [{
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 75], // Slide exactly the width of the slider
                })
              }]
            }
          ]} 
        />
        <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
          <Text style={[styles.toggleText, betMode === 'coins' && styles.activeText, betMode !== 'coins' && styles.inactiveText]}>
            {betMode === 'coins' ? `🪙 ${coinBalance}` : `${isSignedIn ? '' : '🪙 '}Coins`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
          <Text style={[styles.toggleText, betMode === 'cash' && styles.activeText, betMode !== 'cash' && styles.inactiveText]}>
            {betMode === 'cash' ? `💵 $${cashBalance.toFixed(2)}` : `${isSignedIn ? '' : '💵 '}Cash`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: '#111',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomColor: '#39FF14',
    borderBottomWidth: 1,
  },
  leftSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logo: {
    color: '#39FF14',
    fontSize: 32,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 26,
    padding: 0,
    position: 'relative',
    width: 150,
    height: 42,
  },
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 75,
    height: 42,
    backgroundColor: '#39FF14',
    borderRadius: 26,
    zIndex: 1,
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  toggleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: '#000',
  },
  inactiveText: {
    color: '#555',
  },
});

export default Header;
