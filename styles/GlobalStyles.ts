// GlobalStyles.ts
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from './theme';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  screenContent: {
    flex: 1,
    paddingTop: 16, // Consistent spacing from global header
  },
  balanceDisplay: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#111',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#39FF14',
    zIndex: 10,
  },
  balanceText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.primary,
    borderWidth: 1,
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.lg,
    color: colors.primary,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  text: {
    color: colors.text,
    fontSize: fontSize.md,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: 8,
    marginTop: spacing.sm,
  },
  buttonText: {
    color: colors.background,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
