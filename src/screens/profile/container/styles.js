import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 180,
  },
  topSection: {
    alignItems: 'center',
  },
  name: {
    marginTop: 8,
    color: colors.deepBlack,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    lineHeight: 22,
  },
  union: {
    marginTop: 12,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    backgroundColor: colors.light_purple,
    color: colors.purple,
    fontSize: 10,
    letterSpacing: 0.22,
    lineHeight: 12,
    textTransform: 'uppercase',
  },
  sectionHeader: {
    height: 24,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
