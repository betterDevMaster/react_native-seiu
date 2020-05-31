import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  image: {
    width: '100%',
    height: 250,
  },
  map: {
    height: 250,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.4,
    color: colors.black,
  },
  daysUntil: {
    fontSize: 12,
    color: colors.textGrey,
    marginVertical: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  locationText: {
    fontSize: 12,
    color: colors.textGrey,
    marginLeft: 7,
  },
  interestedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  interested: {
    color: colors.purple,
    fontWeight: 'bold',
    fontSize: 12,
    marginVertical: 9,
  },
});
