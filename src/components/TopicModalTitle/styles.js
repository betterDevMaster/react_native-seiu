import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  item: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.middleGrey,
  },
});
