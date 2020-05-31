import React, {Component} from 'react';
import {View, ActivityIndicator as RNActivityIndicator} from 'react-native';
import {styles} from './styles';

export default class ActivityIndicator extends Component {
  render() {
    const {size = 'large', color} = this.props;
    return (
      <View style={styles.container}>
        <RNActivityIndicator size={size} color={color} />
      </View>
    );
  }
}
