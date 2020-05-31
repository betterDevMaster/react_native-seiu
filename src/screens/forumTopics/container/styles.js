import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  topicCard: {
    marginLeft: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  tags: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tagView: {
    borderRadius: 5,
    backgroundColor: colors.light_purple,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 4,
    marginRight: 6,
  },
  tagText: {
    color: colors.purple,
    paddingHorizontal: 5,
    paddingVertical: -5,
    fontSize: 10,
  },
  content: {
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    marginRight: 16,
  },
  topicTitle: {
    color: colors.deepBlack,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    lineHeight: 25,
    marginBottom: 10,
  },
  stats: {
    color: colors.textGrey,
    fontSize: 12,
    lineHeight: 14,
  },
});
