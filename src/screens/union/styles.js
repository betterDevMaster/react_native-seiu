import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    paddingHorizontal: 50,
  },
  content: {
    marginTop: '10%',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    color: colors.yellow,
    fontWeight: 'bold',
  },
  xButton: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    padding: 20,
  },
  phone: {
    color: colors.yellow,
    padding: 10,
    fontSize: 20,
    paddingTop: 15,
  },
  websiteText: {
    color: colors.yellow,
    padding: 5,
    fontSize: 20,
  },
  containerButton: {
    justifyContent: 'flex-end',
    flex: 1,
    width: '85%',
  },
  continue: {
    backgroundColor: 'rgba(255, 213, 82, 0.9)',
  },
  continueText: {
    color: colors.purple,
  },
});
