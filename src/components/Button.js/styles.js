import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.purple,
    borderRadius: 5,
    textAlign: "center",
    width: "100%",
    marginBottom: 16,
  },
  disabled: {
    opacity: 0.2,
  },
  textStyle: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
    height: 22,
    letterSpacing: 0.4,
    lineHeight: 22,
  },
});
