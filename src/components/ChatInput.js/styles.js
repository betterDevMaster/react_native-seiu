import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.36,
    color: colors.black,
    padding: 10,
  },
  wrapper: {
    backgroundColor: "rgba(216,216,216,0.1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D8D8D8",
    borderRadius: 8,
    height: 41,
    justifyContent: "flex-end"
  },
});
