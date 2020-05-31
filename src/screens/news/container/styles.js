import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  carouselTitle: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    width: '100%',
  },
  filterView: {
    marginRight: 25,
  },
  filterText: {
    fontSize: 24,
    color: colors.textGrey,
  },
  topRowView: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.grey,
    marginTop: 10,
  },
  circleView: {
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    borderColor: colors.yellow,
  },
  circleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.yellow,
  },
  imageCarousel: {
    borderRadius: 5,
    height: 220,
    width: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 40,
    marginHorizontal: 20,
  },
  topRowTitle: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: '85%',
  },
  topRowAgo: {
    marginHorizontal: 20,
    marginTop: 10,
    fontSize: 12,
    marginBottom: 20,
    color: colors.textGrey,
  },
  cardAgo: {
    fontSize: 12,
    color: colors.textGrey,
    marginTop: 10,
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    borderBottomWidth: 0.2,
    borderColor: colors.grey,
    justifyContent: 'space-around',
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rowTags: {
    flexDirection: 'row',
    marginTop: 10,
  },
  nationalTagView: {
    borderRadius: 5,
    backgroundColor: colors.light_purple,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nationalText: {
    color: colors.purple,
    //padding: 5,
    paddingHorizontal: 5,
    paddingVertical: -5,
    fontSize: 10,
  },
  localTagView: {
    borderRadius: 5,
    backgroundColor: colors.light_purple,
  },
  localText: {
    color: colors.purple,
    padding: 5,
    fontSize: 10,
  },
  rowAgo: {
    fontSize: 12,
    color: colors.textGrey,
    padding: 7,
  },
  imageRow: {
    width: '32%',
    height: 80,
    borderRadius: 5,
    marginBottom: 10,
  },
});
