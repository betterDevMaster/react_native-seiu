import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  description: {
    color: colors.middleGrey,
    fontSize: 13,
    letterSpacing: -0.08,
    lineHeight: 15,
  },
  button: {
    marginTop: 22,
  },
  selectToggleText: {
    color: colors.textGrey,
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 20,
  },
  selectSelectedText: {
    color: colors.black,
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 20,
  },
  selectToggle: {
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  selectedItem: {
    color: colors.black,
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 20,
  },
});
