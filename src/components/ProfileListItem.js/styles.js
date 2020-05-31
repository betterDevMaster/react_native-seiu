import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingLeft: 15,
  },
  icon: {
    marginRight: 14,
    marginBottom: 8,
  },
  item: {
    fontSize: 17,
  },
  content: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  chevron: {
    color: colors.grey,
  },
});
