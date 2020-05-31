import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
import {styles} from './styles';

export default class ChatInput extends Component {
  render() {
    const {inputStyles, text, onChangeText, placeholder} = this.props;
    return (
      <View style={styles.wrapper}>
        <TextInput 
          placeholder={placeholder}
          onChangeText={onChangeText} 
          style={[styles.input, inputStyles]}
          multiline>
            {text}
        </TextInput>
      </View>
    );
  }
}
