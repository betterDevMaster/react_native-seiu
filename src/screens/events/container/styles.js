import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  allEventsText: {
    fontSize: 24,
    color: colors.black,
    fontWeight: 'bold',
    lineHeight: 28,
    letterSpacing: 0.53,
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 10,
  },
  cardContainer: {
    borderBottomWidth: 0.2,
    borderColor: colors.grey,
    marginBottom: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  date: {
    width: '20%',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
  },
  monthText: {
    fontSize: 12,
    color: colors.textGrey,
  },
  content: {
    width: '75%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 22,
    letterSpacing: 0.4,
    color: colors.black,
  },
  description: {
    fontSize: 12,
    color: colors.black,
    lineHeight: 14,
  },
  viewMore: {
    color: colors.purple,
    paddingVertical: 10,
  },
  interested: {
    color: colors.purple,
    fontWeight: 'bold',
    fontSize: 12,
  },
  free: {
    color: colors.textGrey,
    fontSize: 12,
    marginLeft: 10,
  },
  daysUntil: {
    color: colors.textGrey,
    fontSize: 12,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  map: {
    height: 180,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    height: 180,
    width: '100%',
    borderRadius: 5,
  },
  rowFree: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  daysUntilDesc: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 14,
  },
});
