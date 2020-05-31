import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {SEARCH} from '../../assets/index';

export default class SearchBox extends Component {
  render() {
    const {inputStyles, text, onChangeText, placeholder, onPress, value} = this.props;
    return (
      <View style={styles.wrapper}>
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          style={[styles.input, inputStyles]}
          value={value}
        >
          {text}
        </TextInput>
        <TouchableOpacity
            onPress={onPress}
            style={[styles.searchButton]}>
            <Image source={SEARCH} style={[styles.image]} />
        </TouchableOpacity>
      </View>
    );
  }
}
