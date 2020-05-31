import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.brown,
  },
  avatarAlt: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
    position: 'absolute',
    top: 40,
    left: 48,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.brown,
    margin: 8,
  },
  avatarAltSmall: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
    position: 'absolute',
    top: 15,
    left: 21,
  },
  avatarExtraSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.brown,
  },
  avatarAltExtraSmall: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
    position: 'absolute',
    top: 3,
    left: 7,
  },
});
