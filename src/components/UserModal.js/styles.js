import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  content: {
    flex: 1,
    margin: 16,
    paddingVertical: 25,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  topSection: {
    alignItems: 'center',
  },
  name: {
    marginTop: 8,
    color: colors.deepBlack,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    lineHeight: 22,
  },
  menu: {
    marginTop: 20,
    flexDirection: 'column',
    flexGrow: 0,
  },
  hidden: {
    display: 'none',
  },
});
