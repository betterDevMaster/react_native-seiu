import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  categoryCard: {
    marginLeft: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  categoryTitle: {
    color: colors.deepBlack,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    lineHeight: 22,
    marginBottom: 10,
  },
  topicCount: {
    color: colors.textGrey,
    fontSize: 12,
    lineHeight: 14,
  },
});
