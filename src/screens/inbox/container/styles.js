import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  rowBack: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  deleteButton: {
    width: 134,
    height: '100%',
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
