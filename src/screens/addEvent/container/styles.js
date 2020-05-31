import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  subtitle: {
    color: '#6D6D72',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: -0.08,
    marginTop: 10,
  },
  sectionTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    lineHeight: 22,
    marginTop: 40,
  },
  uploadContainer: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    height: 180,
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  uploadText: {
    color: colors.textGrey,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
    letterSpacing: 0.4,
  },
  textError: {
    color: '#e04646',
  },
  button: {marginTop: 30},
  editPicText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.purple,
    paddingTop: 10,
  },
});
