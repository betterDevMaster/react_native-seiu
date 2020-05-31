import React, {Component} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';

export default class Avatar extends Component {
  render() {
    const {uri, name = 'A', small, extraSmall} = this.props;

    let avatarStyles = styles.avatar;
    let avatarAltStyles = styles.avatarAlt;
    if (small) {
      avatarStyles = styles.avatarSmall;
      avatarAltStyles = styles.avatarAltSmall;
    } else if (extraSmall) {
      avatarStyles = styles.avatarExtraSmall;
      avatarAltStyles = styles.avatarAltExtraSmall;
    }

    return (
      <View>
        <FastImage source={{uri}} style={avatarStyles} />
        {!uri && <Text style={avatarAltStyles}>{name[0]}</Text>}
      </View>
    );
  }
}
