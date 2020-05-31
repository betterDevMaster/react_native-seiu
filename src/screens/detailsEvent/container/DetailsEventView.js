import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {styles} from './styles';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../utils/colors';
import {markAsInterested} from '../../../api/events';
import HTMLView from 'react-native-htmlview';

export default class DetailsEventView extends Component {
  isInterestedByEvent = () => {
    const userId = this.props.currentUser.uid;
    return (
      this.props.currentEvent.userIds &&
      this.props.currentEvent.userIds.find(id => id === userId)
    );
  };

  handleInterested = () => {
    const userId = this.props.currentUser.uid;
    const {events, currentEvent} = this.props;
    let index = events.findIndex(ev => ev.id === currentEvent.id);
    if (this.isInterestedByEvent(currentEvent)) {
      currentEvent.userIds = currentEvent.userIds.filter(id => id !== userId);
      markAsInterested(currentEvent);
    } else {
      currentEvent.userIds.push(userId);
      markAsInterested(currentEvent);
    }
    events[index] = {...currentEvent};
    this.props.setEvents(events);
  };

  render() {
    const {currentEvent} = this.props;
    return (
      <ScrollView>
        {currentEvent.imageHeader && currentEvent.imageHeader.src ? (
          <Image
            source={{uri: currentEvent.imageHeader.src}}
            style={styles.image}
          />
        ) : (
          <MapView
            showsBuildings={true}
            showsIndoors={true}
            scrollEnabled={false}
            pitchEnabled={false}
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(currentEvent.coordinates.latitude),
              longitude: parseFloat(currentEvent.coordinates.longitude),
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              key={currentEvent.id}
              coordinate={{
                latitude: parseFloat(currentEvent.coordinates.latitude),
                longitude: parseFloat(currentEvent.coordinates.longitude),
              }}
            />
          </MapView>
        )}
        <View style={styles.container}>
          <Text style={styles.title}>{currentEvent.title}</Text>
          <View style={styles.locationContainer}>
            <Icon name="map-marker" color={colors.textGrey} />
            <Text style={styles.locationText}>{currentEvent.location}</Text>
          </View>
          <View style={styles.interestedRow}>
            <Text style={styles.daysUntil}>
              {moment(currentEvent.date).fromNow()}
            </Text>
            <TouchableOpacity onPress={() => this.handleInterested()}>
              <Text
                style={[
                  styles.interested,
                  {
                    color: this.isInterestedByEvent()
                      ? colors.textGrey
                      : colors.purple,
                  },
                ]}>
                Interested{' '}
                {this.isInterestedByEvent() ? (
                  <Icon name="check" size={15} color={colors.textGrey} />
                ) : (
                  ''
                )}
              </Text>
            </TouchableOpacity>
          </View>

          <HTMLView
            value={currentEvent.description}
            stylesheet={styles.content}
          />
        </View>
      </ScrollView>
    );
  }
}
