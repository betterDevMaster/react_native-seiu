import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  error: {
    color: 'red',
  },
  forgotPassword: {
    color: colors.purple,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
});
