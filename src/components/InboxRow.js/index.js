import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import TimeAgo from 'react-native-timeago';
import Avatar from '../Avatar.js';
import {styles} from './styles';

export default class InboxRow extends Component {
  render() {
    const {
      onPress,
      containerStyles,
      userInfo,
      newMessage,
      message,
      date,
    } = this.props;
    const {avatar, firstName, lastName} = userInfo;
    return (
      <TouchableHighlight onPress={onPress} underlayColor={'#AAA'}>
        <View>
          <View style={[styles.container, containerStyles]}>
            <View
              style={
                newMessage == true
                  ? styles.newMessageDotActive
                  : styles.newMessageDotInactive
              }
            />

            <Avatar small uri={avatar} name={firstName} />

            <View style={styles.nameWrapper}>
              <Text
                style={[
                  styles.name,
                  newMessage == true ? styles.nameActive : null,
                  message ? null : {marginTop: 8},
                ]}>
                {firstName} {lastName}
              </Text>

              {message !== '' && (
                <View style={styles.infoWrapper}>
                  <View>
                    <Text
                      style={[
                        styles.message,
                        newMessage == true ? styles.messageActive : null,
                      ]}>
                      {message}
                    </Text>
                  </View>
                  <View style={styles.dateWrapper}>
                    <View style={styles.smallDot} />
                    <Text style={styles.date}>
                      <TimeAgo time={date} interval={20000} />
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={[styles.divider]} />
        </View>
      </TouchableHighlight>
    );
  }
}
