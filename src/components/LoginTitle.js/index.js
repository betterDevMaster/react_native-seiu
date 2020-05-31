import React, {Component} from 'react';
import {Text} from 'react-native';
import {styles} from './styles';

export default class LoginTitle extends Component {
  render() {
    const {textStyles, text} = this.props;
    return (
      <Text style={[styles.textStyle, textStyles]}>
        {text}
      </Text>
    );
  }
}
