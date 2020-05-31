import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.4,
    borderColor: 'rgba(0,0,0,0.4)',
  },
  label: {
    fontSize: 20,
    letterSpacing: 0.27,
    color: 'rgba(0,0,0,0.4)',
    paddingVertical: 15,
  },
});
