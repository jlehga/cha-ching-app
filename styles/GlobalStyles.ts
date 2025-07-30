// GlobalStyles.ts
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from './theme';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
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
    fontWeight: 'bold',
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
