import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {styles} from './styles';
import {getNews} from '../../../api/news';
import Carousel from 'react-native-snap-carousel';
import {CAROUSEL_TEST} from '../../../assets/index';
import {colors} from '../../../utils/colors';
import TimeAgo from 'react-native-timeago';
import firebase from 'react-native-firebase';
import debounce from 'lodash/debounce';

const itemsPerPage = 3;

export default class NewsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      filteredList: [],
      all: true,
      local: false,
      national: false,
      loading: false,
      lastVisible: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      this.setState({loading: true});
      let initialQuery = await firebase
        .firestore()
        .collection('news')
        .orderBy('date', 'desc')
        .limit(itemsPerPage);

      let documentSnapshots = await initialQuery.get();
      let lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      let documentData = documentSnapshots.docs.map(document => {
        return {id: document.id, ...document.data()};
      });

      this.props.setNews(documentData);
      this.setState({
        lastVisible: lastVisible,
        loading: false,
        filteredList: documentData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  retrieveMore = async () => {
    if (this.state.lastVisible) {
      try {
        this.setState({
          loading: true,
          refreshing: true,
        });

        let additionalQuery = await firebase
          .firestore()
          .collection('news')
          .orderBy('date', 'desc')
          .startAfter(this.state.lastVisible)
          .limit(itemsPerPage);

        let documentSnapshots = await additionalQuery.get();
        let lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        let documentData = documentSnapshots.docs.map(document => {
          return {id: document.id, ...document.data()};
        });
        this.props.setNews([...this.props.news, ...documentData]);
        this.setState({
          lastVisible: lastVisible,
          loading: false,
          refreshing: false,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleCardPress = item => {
    this.props.setCurrentNews(item);
    this.props.navigation.navigate('DetailsNews');
  };

  renderCard = item => {
    return (
      <View style={{marginLeft: 20}}>
        <TouchableOpacity onPress={() => this.handleCardPress(item.item)}>
          <Image
            source={{uri: item.item.imageHeader && item.item.imageHeader.src}}
            style={styles.imageCarousel}
          />
          <Text style={styles.carouselTitle}>{item.item.title}</Text>
          <Text style={styles.cardAgo}>
            <TimeAgo
              time={item.item.date.toDate()}
              interval={20000}
              hideAgo={true}
            />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderTopRows = item => {
    return (
      <TouchableOpacity
        style={styles.topRowView}
        onPress={() => this.handleCardPress(item.item)}>
        <View style={styles.circleView}>
          <Text style={styles.circleText}>{item.index + 1}</Text>
        </View>
        <View>
          <Text style={styles.topRowTitle}>{item.item.title}</Text>
          <Text style={styles.topRowAgo}>
            <TimeAgo
              time={item.item.date.toDate()}
              interval={20000}
              hideAgo={true}
            />
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderRows = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => this.handleCardPress(item)}>
        <View style={{width: '57%', marginBottom: 10}}>
          <Text numberOfLines={2} style={styles.rowTitle}>
            {item.title}
          </Text>
          <View style={styles.rowTags}>
            <View
              style={[
                styles.nationalTagView,
                {
                  backgroundColor:
                    item.type == 'national'
                      ? colors.light_purple
                      : colors.light_yellow,
                },
              ]}>
              <Text
                style={[
                  styles.nationalText,
                  {
                    color:
                      item.type == 'national' ? colors.purple : colors.yellow,
                  },
                ]}>
                {item.type.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.rowAgo}>
              <TimeAgo
                time={item.date.toDate()}
                interval={20000}
                hideAgo={true}
              />
            </Text>
          </View>
        </View>
        <Image source={{uri: item.imageHeader && item.imageHeader.src}} style={styles.imageRow} />
      </TouchableOpacity>
    );
  };

  returnFilteredList = () => {
    let {all, local, national} = this.state;
    let {news, currentUser} = this.props;
    if (all) {
      return news.filter(item => {
        const {type, unionId} = item;
        return (
          type !== 'local' ||
          (type === 'local' && unionId === currentUser.unionId)
        );
      });
    }
    if (local) {
      return news.filter(
        item => item.type === 'local' && item.unionId === currentUser.unionId,
      );
    }
    if (national) {
      return news.filter(item => item.type === 'national');
    }
  };

  onPressLocal = () => {
    const {currentUser} = this.props;
    this.setState({
      local: true,
      all: false,
      national: false,
      filteredList: this.props.news.filter(
        item => item.type === 'local' && item.unionId === currentUser.unionId,
      ),
    });
  };

  onPressNational = () => {
    this.setState({
      national: true,
      local: false,
      all: false,
      filteredList: this.props.news.filter(item => item.type === 'national'),
    });
  };

  onPressAll = () => {
    const {currentUser} = this.props;
    this.setState({
      all: true,
      local: false,
      national: false,
      filteredList: this.props.news.filter(item => {
        const {type, unionId} = item;
        return (
          type !== 'local' ||
          (type === 'local' && unionId === currentUser.unionId)
        );
      }),
    });
  };

  renderFooter = () => {
    if (this.state.loading) {
      if (Platform.OS === 'ios') {
        return (
          <View style={{position: 'absolute', bottom: 10, left: '50%'}}>
            <ActivityIndicator size="large" />
          </View>
        );
      } else {
        return (
          <View style={{marginBottom: 10}}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
    } else {
      return <View />;
    }
  };

  renderHeader = () => {
    let {news, filteredList, all, local, national, loading} = this.state;
    const {currentUser} = this.props;
    const filteredNews = this.props.news
      .filter(item => {
        const {type, unionId} = item;
        return (
          type !== 'local' ||
          (type === 'local' && unionId === currentUser.unionId)
        );
      })
      .slice(0, 3);

    return (
      <View>
        <Carousel
          useScrollView={true}
          layout={'default'}
          data={filteredNews}
          renderItem={this.renderCard}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 30}
          activeSlideAlignment="start"
          windowSize={1}
          swipeThreshold={0}
          inactiveSlideScale={1}
        />
        <FlatList
          data={filteredNews}
          renderItem={this.renderTopRows}
          keyExtractor={(_, index) => index.toString() + '#'}
        />
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterView} onPress={this.onPressAll}>
            <Text
              style={[
                styles.filterText,
                {
                  color: all ? colors.black : colors.textGrey,
                  fontWeight: all ? 'bold' : 'normal',
                },
              ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterView}
            onPress={this.onPressNational}>
            <Text
              style={[
                styles.filterText,
                {
                  color: national ? colors.black : colors.textGrey,
                  fontWeight: national ? 'bold' : 'normal',
                },
              ]}>
              National
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterView}
            onPress={this.onPressLocal}>
            <Text
              style={[
                styles.filterText,
                {
                  color: local ? colors.black : colors.textGrey,
                  fontWeight: local ? 'bold' : 'normal',
                },
              ]}>
              Local
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    let {news, filteredList, all, local, national, loading} = this.state;
    return (
      <SafeAreaView>
        <View style={{marginTop: 25}}>
          <FlatList
            data={this.returnFilteredList()}
            keyExtractor={(_, index) => index.toString()}
            extraData={this.props}
            renderItem={this.renderRows}
            onEndReached={debounce(this.retrieveMore, 1000)}
            onEndReachedThreshold={0.5}
            refreshing={this.state.refreshing}
            ListHeaderComponent={this.renderHeader()}
            ListFooterComponent={this.renderFooter()}
          />
        </View>
      </SafeAreaView>
    );
  }
}
