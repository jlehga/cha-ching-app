// components/FixtureCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

interface FixtureCardProps {
  fixture: any;
  onSelect: (bet: any) => void;
  onShowLiquidity: (fixture: any) => void;
}

export default function FixtureCard({ fixture, onSelect, onShowLiquidity }: FixtureCardProps) {
  const { fixture: f, odds } = fixture;

  return (
    <TouchableOpacity 
      style={GlobalStyles.card}
      onPress={() => onShowLiquidity(fixture)}
      activeOpacity={0.8}
    >
      <Text style={GlobalStyles.text}>{f.home_team_display} vs {f.away_team_display}</Text>

      {odds.slice(0, 2).map((odd: any) => (
        <TouchableOpacity
          key={odd.id}
          style={styles.oddButton}
          onPress={(e) => {
            e.stopPropagation(); // Prevent card click
            onSelect({ fixture, odd });
          }}
        >
          <Text style={styles.oddText}>{odd.selection} @ {odd.price > 0 ? `+${odd.price}` : odd.price}</Text>
        </TouchableOpacity>
      ))}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  oddButton: {
    backgroundColor: '#111',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
    borderColor: '#39FF14',
    borderWidth: 1,
  },
  oddText: {
    color: '#39FF14',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
