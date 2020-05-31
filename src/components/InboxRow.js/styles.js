import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 57,
    backgroundColor: colors.white,
  },
  newMessageDotActive: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: colors.purple,
    justifyContent: 'center',
    marginVertical: 24,
  },
  newMessageDotInactive: {
    width: 8,
  },
  nameWrapper: {
    width: 'auto',
    marginVertical: 11,
    flex: 1,
  },
  name: {
    fontSize: 14,
    lineHeight: 17,
    height: 17,
    fontWeight: 'bold',
    color: colors.black,
    letterSpacing: 0.31,
    marginBottom: 4,
  },
  nameActive: {
    fontWeight: 'bold',
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  message: {
    maxWidth: 200,
    fontSize: 12,
    lineHeight: 14,
    height: 14,
    color: 'rgba(0,0,0,0.4)',
    flex: 3,
  },
  messageActive: {
    color: 'rgba(0,0,0,0.8)',
  },
  dateWrapper: {
    flexDirection: 'row',
    marginRight: 6,
  },
  smallDot: {
    width: 4,
    height: 4,
    borderRadius: 50,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    marginHorizontal: 8,
    marginVertical: 5,
  },
  date: {
    fontSize: 12,
    lineHeight: 14,
    height: 14,
    color: 'rgba(0,0,0,0.4)',
  },
  divider: {
    height: 0.5,
    backgroundColor: colors.grey,
    marginLeft: 16,
  },
});
