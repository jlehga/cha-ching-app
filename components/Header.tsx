import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useBetMode } from '../contexts/BetModeContext';
import { useWallet } from '../contexts/WalletContext';

const Header = () => {
  const { betMode, setBetMode } = useBetMode();
  const { coinBalance, cashBalance } = useWallet();
  const slideAnim = React.useRef(new Animated.Value(betMode === 'coins' ? 0 : 1)).current;

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
      <Text style={styles.logo}>{getBalanceText()}</Text>
      <View style={styles.toggleContainer}>
        <Animated.View 
          style={[
            styles.slider,
            {
              transform: [{
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 60], // Increased to slide all the way
                })
              }]
            }
          ]} 
        />
        <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
          <Text style={[styles.toggleText, betMode === 'coins' && styles.activeText]}>
            💰 Coins
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
          <Text style={[styles.toggleText, betMode === 'cash' && styles.activeText]}>
            💵 Cash
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#111',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomColor: '#39FF14',
    borderBottomWidth: 1,
  },
  logo: {
    color: '#39FF14',
    fontSize: 20,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 2,
    position: 'relative',
    width: 120,
    height: 32,
  },
  slider: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 56,
    height: 28,
    backgroundColor: '#39FF14',
    borderRadius: 16,
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
    fontSize: 12,
    fontWeight: '600',
  },
  activeText: {
    color: '#000',
  },
});

export default Header;
