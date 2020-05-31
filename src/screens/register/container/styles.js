import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    margin: 20,
  },
  info: {
    lineHeight: 16,
    fontSize: 11,
  },
  terms: {
    textDecorationLine: 'underline',
    fontSize: 11,
    lineHeight: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  nextButton: {
    marginTop: 15,
  },
  error: {
    color: 'red',
  },
  unionButtons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
  join: {
    width: 'auto',
    marginRight: 15,
  },
  maybeLater: {
    width: 'auto',
  },
  selectToggleText: {
    color: colors.textGrey,
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 20,
  },
  selectToggle: {
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
});
