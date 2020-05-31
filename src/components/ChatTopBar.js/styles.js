import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors'

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 44,
    marginBottom: 16
  },
  name: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.black,
    fontWeight: "bold",
    letterSpacing: 0.33,
    textAlign: "center"
  },
  image: {
    width: 23,
    height: 17,
  },
  backButton: {
    width: "20%",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  moreButton: {
    width: "20%",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  nameWrapper: {
    justifyContent: "center",
    width: "60%",
    paddingHorizontal: "10%"
  }
});