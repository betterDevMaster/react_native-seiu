import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.purple,
    //padding: 20,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
  },
  footerTitle: {
    color: colors.white,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: 'bold',
    marginTop: 20,
  },
  footerText: {
    marginTop: 15,
    marginBottom: 30,
    color: colors.white,
    maxWidth: '70%',
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    bottom: '35%',
    width: '100%',
    maxHeight: '40%',
  },
  containerFooter: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dots: {
    bottom: '26%',
  },
  breakroom: {
    width: '36%',
    height: 32,
    marginTop: 3,
  },
});
