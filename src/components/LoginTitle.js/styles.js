import {StyleSheet, Platform} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  textStyle: {
    color: colors.black,
    fontWeight: Platform.OS === 'ios' ? '900' : 'bold',
    fontSize: 24,
    height: 28,
    lineHeight: 28,
    letterSpacing: 0.53,
    marginBottom: 16,
  },
});
