import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'transparent',
    borderColor: colors.purple,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 4,
    textAlign: "center",
    width: "100%",
  },
  disabled: {
    opacity: 0.2,
  },
  textStyle: {
    fontSize: 18,
    color: colors.purple,
    fontWeight: "bold",
    textAlign: "center",
    height: 22,
    letterSpacing: 0.4,
    lineHeight: 22,
  },
});
