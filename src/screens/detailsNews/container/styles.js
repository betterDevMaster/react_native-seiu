import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
  },
  container: {
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ago: {
    fontSize: 12,
    color: colors.textGrey,
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.4,
    color: colors.black,
  },
  nextView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  nextText: {
    fontSize: 12,
    color: colors.textGrey,
  },
});
