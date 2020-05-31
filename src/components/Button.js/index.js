import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export default class Button extends Component {
  render() {
    const {onPress, containerStyles, disabled, textStyles, text} = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, containerStyles, disabled ? styles.disabled : ""]}
        disabled={disabled}>
        <Text style={[styles.textStyle, textStyles]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}
