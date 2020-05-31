import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {styles} from './styles';
import SearchBox from '../../../components/SearchBox.js';
import {getEvents, markAsInterested} from '../../../api/events';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../utils/colors';
import firebase from 'react-native-firebase';
import debounce from 'lodash/debounce';
import {SafeAreaView} from 'react-navigation';
import HTMLView from 'react-native-htmlview';

const itemsPerPage = 3;

export default class EventsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      filteredList: [],
      loading: false,
      lastVisible: null,
      refreshing: false,
      search: '',
    };
  }

  componentDidMount() {
    this.retrieveData();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.events) !== JSON.stringify(this.props.events)
    ) {
      this.setState({filteredList: [...this.props.events]});
    }
  }

  retrieveData = async () => {
    try {
      this.setState({loading: true});

      let initialQuery = await firebase
        .firestore()
        .collection('events')
        .where('unionId', '==', this.props.currentUser.unionId)
        .where('date', '>=', new Date().toISOString())
        .orderBy('date', 'asc')
        .limit(itemsPerPage);

      let documentSnapshots = await initialQuery.get();
      let lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      let documentData = documentSnapshots.docs.map(document => {
        return {id: document.id, ...document.data()};
      });

      this.props.setEvents(documentData);
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
      this.setState({
        loading: true,
        refreshing: true,
      });
      try {
        let additionalQuery = await firebase
          .firestore()
          .collection('events')
          .orderBy('date', 'asc')
          .startAfter(this.state.lastVisible)
          .where('unionId', '==', this.props.currentUser.unionId)
          .where('date', '>=', new Date().toISOString())
          .limit(itemsPerPage);

        let documentSnapshots = await additionalQuery.get();
        let lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        let documentData = documentSnapshots.docs.map(document => {
          return {id: document.id, ...document.data()};
        });

        this.props.setEvents([...this.props.events, ...documentData]);
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

  isInterestedByEvent = event => {
    const userId = this.props.currentUser.uid;
    return event.userIds && event.userIds.find(id => id === userId);
  };

  handleViewMore = item => {
    this.props.setCurrentEvent(item);
    this.props.navigation.navigate('DetailsEvent');
  };

  handleInterested = event => {
    const userId = this.props.currentUser.uid;
    const {events} = this.props;
    let index = events.findIndex(ev => ev.id === event.id);
    if (this.isInterestedByEvent(event)) {
      event.userIds = event.userIds.filter(id => id !== userId);
      markAsInterested(event);
    } else {
      event.userIds.push(userId);
      markAsInterested(event);
    }
    events[index] = {...event};
    this.props.setEvents([...events]);
    this.setState({filteredList: [...events]});
  };

  renderTopCard = item => {
    return (
      <View style={styles.cardContainer}>
        {item.imageHeader && item.imageHeader.src ? (
          <Image source={{uri: item.imageHeader.src}} style={styles.image} />
        ) : (
          <MapView
            showsBuildings={true}
            showsIndoors={true}
            scrollEnabled={false}
            pitchEnabled={false}
            zoomControlEnabled={false}
            zoomEnabled={false}
            cacheEnabled={false}
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(item.coordinates.latitude),
              longitude: parseFloat(item.coordinates.longitude),
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: parseFloat(item.coordinates.latitude),
              longitude: parseFloat(item.coordinates.longitude),
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              key={item.id}
              coordinate={{
                latitude: parseFloat(item.coordinates.latitude),
                longitude: parseFloat(item.coordinates.longitude),
              }}
            />
          </MapView>
        )}

        <View style={styles.innerContainer}>
          <View style={styles.date}>
            <Text style={styles.dayText}>{moment(item.date).format('DD')}</Text>
            <Text style={styles.monthText}>
              {moment(item.date).format('MMMM')}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={{maxHeight: 50}}>
              <HTMLView value={item.description} />
              <Text>...</Text>
            </View>
            <TouchableOpacity
              style={{width: 100}}
              onPress={() => this.handleViewMore(item)}>
              <Text style={styles.viewMore}>View more</Text>
            </TouchableOpacity>

            <View style={styles.rowSpace}>
              <View style={styles.rowFree}>
                <Text style={styles.daysUntil}>
                  {moment(new Date(item.date)).fromNow()}
                </Text>
                {item.free && <Text style={styles.free}>• Free</Text>}
              </View>
              <View>
                <TouchableOpacity onPress={() => this.handleInterested(item)}>
                  <Text
                    style={[
                      styles.interested,
                      {
                        color: this.isInterestedByEvent(item)
                          ? colors.textGrey
                          : colors.purple,
                      },
                    ]}>
                    Interested{' '}
                    {this.isInterestedByEvent(item) ? (
                      <Icon name="check" size={15} color={colors.textGrey} />
                    ) : (
                      ''
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderEvent = item => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.date}>
            <Text style={styles.dayText}>{moment(item.date).format('DD')}</Text>
            <Text style={styles.monthText}>
              {moment(item.date).format('MMMM')}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.daysUntilDesc}>
              {moment(new Date(item.date)).fromNow()}
            </Text>
            <TouchableOpacity
              style={{width: 100}}
              onPress={() => this.handleViewMore(item)}>
              <Text style={styles.viewMore}>View more</Text>
            </TouchableOpacity>
            <View style={styles.rowSpace}>
              <View style={styles.rowFree}>
                <Text style={styles.daysUntil}>
                  {moment(item.date).fromNow()}
                </Text>
                {item.free && <Text style={styles.free}>• Free</Text>}
              </View>
              <View>
                <TouchableOpacity onPress={() => this.handleInterested(item)}>
                  <Text
                    style={[
                      styles.interested,
                      {
                        color: this.isInterestedByEvent(item)
                          ? colors.textGrey
                          : colors.purple,
                      },
                    ]}>
                    Interested{' '}
                    {this.isInterestedByEvent(item) ? (
                      <Icon name="check" size={15} color={colors.textGrey} />
                    ) : (
                      ''
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
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

  updateSearch = text => {
    let {events} = this.props;
    if (text === '') {
      this.setState({filteredList: events, search: ''});
    } else {
      let filList = events.filter(
        event =>
          event.title.toLowerCase().includes(text.toLowerCase()) ||
          event.location.toLowerCase().includes(text.toLowerCase()) ||
          event.description.toLowerCase().includes(text.toLowerCase()),
      );
      this.setState({search: text, filteredList: filList});
    }
  };

  renderHeader = () => {
    let {filteredList, loading, search} = this.state;
    const {events} = this.props;
    if (events.length) {
      return (
        <View>
          <SearchBox
            placeholder="Search events"
            onChangeText={text => this.updateSearch(text)}
          />
          {search === '' && (
            <FlatList
              keyExtractor={(_, index) => index.toString() + '#'}
              extraData={events}
              data={this.props.events.slice(0, 3)}
              renderItem={({item}) => this.renderTopCard(item)}
            />
          )}

          <Text style={styles.allEventsText}>All Events</Text>
        </View>
      );
    } else {
      return <View />;
    }
  };

  returnFilteredList = () => {
    const {events} = this.props;
    let {search, filteredList} = this.state;
    if (search === '') {
      return events;
    } else {
      return filteredList;
    }
  };

  render() {
    let {filteredList, loading} = this.state;
    const {events} = this.props;
    return (
      <SafeAreaView style={styles.container} keyboardShouldPersistTaps="always">
        {events.length ? (
          <View>
            <FlatList
              extraData={this.state}
              keyExtractor={(_, index) => index.toString()}
              data={this.returnFilteredList()}
              renderItem={({item}) => this.renderEvent(item)}
              ListFooterComponent={this.renderFooter()}
              ListHeaderComponent={this.renderHeader()}
              onEndReached={debounce(this.retrieveMore, 1000)}
              onEndReachedThreshold={0.3}
              refreshing={this.state.refreshing}
            />
          </View>
        ) : (
          <View />
        )}
      </SafeAreaView>
    );
  }
}
