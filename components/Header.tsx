import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useBetMode } from '../contexts/BetModeContext';
import { useWallet } from '../contexts/WalletContext';
import { useUser } from '../contexts/UserContext';

const Header = ({ navigation }: { navigation: any }) => {
  const { betMode, setBetMode } = useBetMode();
  const { coinBalance, cashBalance } = useWallet();
  const { user } = useUser();
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

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
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
      <View style={[styles.toggleContainer, !user && styles.toggleContainerNoUser]}>
        {user ? (
          // Signed in - show balance toggle
          <>
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
                {betMode === 'coins' ? `🪙 ${coinBalance}` : 'Coins'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
              <Text style={[styles.toggleText, betMode === 'cash' && styles.activeText, betMode !== 'cash' && styles.inactiveText]}>
                {betMode === 'cash' ? `💵 $${cashBalance.toFixed(2)}` : 'Cash'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          // Not signed in - show auth buttons
          <View style={styles.authContainer}>
            <TouchableOpacity 
              style={styles.signInButton}
              onPress={handleSignIn}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.signUpButton}
              onPress={handleSignUp}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
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
  toggleContainerNoUser: {
    backgroundColor: 'transparent',
    width: 'auto',
    height: 'auto',
    borderRadius: 0,
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
  authContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signInButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#39FF14',
  },
  signInButtonText: {
    color: '#39FF14',
    fontSize: 14,
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#39FF14',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  signUpButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Header;