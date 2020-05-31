import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export default class Link extends Component {
  render() {
    const {onPress, containerStyles, textStyles, text} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, containerStyles]}>
        <Text style={[styles.textStyle, textStyles]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}
