import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textInput: {
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.36,
    color: colors.black,
    padding: 8,
    backgroundColor: 'rgba(216,216,216,0.1)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#D8D8D8',
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
  },
});
