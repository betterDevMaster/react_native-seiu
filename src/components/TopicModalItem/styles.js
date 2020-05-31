import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  item: {
    fontSize: 17,
    color: colors.purple,
  },
  delete: {
    color: colors.red,
  },
  noBorder: {
    borderBottomWidth: 0,
  },

});
