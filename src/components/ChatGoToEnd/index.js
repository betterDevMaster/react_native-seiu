import React from 'react';
import {styles} from './styles';
import {Text, TouchableOpacity, View} from 'react-native';

const ChatGoEnd = ({onPress, text}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  </View>
);

export default ChatGoEnd;