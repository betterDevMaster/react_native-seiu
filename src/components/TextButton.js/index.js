import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export default class TextButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.container, this.props.containerStyles]}>
        <Text style={[styles.textStyle, this.props.textStyles]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}
