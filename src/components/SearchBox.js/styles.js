import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.19,
    color: colors.black,
    padding: 10,
    marginHorizontal: 5,
    width:"85%"
  },
  wrapper: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 20,
    height: 40,
    flexDirection: "row",
    marginBottom: 16
  },
  image: {
    opacity: 0.2
  },
  searchButton: {
    width: "13%",
    paddingLeft: 7,
    justifyContent: "center",
  },
});
