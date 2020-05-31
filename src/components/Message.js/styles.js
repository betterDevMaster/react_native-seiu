import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.36,
    padding: 10,
    marginHorizontal: 5,
  },
  fromMe: {
    color: colors.white,
  },
  toMe: {
    color: 'rgba(0,0,0,0.8)',
  },
  textWrapper: {
    width: 'auto',
    borderRadius: 20,
    marginBottom: 6,
  },
  fromMeWrapper: {
    backgroundColor: colors.purple,
    color: colors.white,
    marginLeft: 'auto',
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  toMeWrapper: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: 'rgba(0,0,0,0.8)',
    marginRight: 'auto',
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
});
