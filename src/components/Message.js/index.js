import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

export default class Message extends Component {
  render() {
    const {textStyles, text, fromMe} = this.props;
    return (
      <View style={[styles.textWrapper, fromMe == true ? styles.fromMeWrapper : styles.toMeWrapper]}>
        <Text style={[styles.textStyle, textStyles, fromMe == true ? styles.fromMe : styles.toMe]}>
            {text}
        </Text>
      </View>
    );
  }
}
