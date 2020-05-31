import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';
import {Platform} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  threadsList: {
    margin: 10,
  },
  threadCard: {
    marginLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: colors.textGrey,
    fontSize: 12,
    lineHeight: 14,
  },
  authorName: {
    marginLeft: 8,
  },
  content: {
    color: colors.textDarkGrey,
    fontSize: 16,
    letterSpacing: 0.4,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopColor: colors.grey,
    borderTopWidth: 0.5,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  input: {
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
  },
  noLeftPadding: {
    paddingLeft: 0,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Platform.OS === 'ios' ? '#ffffff' : '#2196F3',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: 8
  },
  sendButtonText: {
    color: Platform.OS === 'ios' ? '#2196F3' : '#ffffff',
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
  }
});
