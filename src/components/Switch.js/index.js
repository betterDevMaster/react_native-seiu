import React, {Component} from 'react';
import {View, Text, Switch as RNSwitch} from 'react-native';
import {styles} from './styles';

export default class TextButton extends Component {
  render() {
    const {
      label,
      value,
      onValueChange,
      containerStyles,
      textStyles,
    } = this.props;
    return (
      <View style={[styles.container, containerStyles]}>
        <Text style={[styles.label, textStyles]}>{label}</Text>
        <RNSwitch value={value} onValueChange={onValueChange} />
      </View>
    );
  }
}
