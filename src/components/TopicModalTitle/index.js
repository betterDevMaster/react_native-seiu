import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';

const TopicModalItem = ({text}) => (
  <View style={styles.container}>
    <Text style={styles.item}>
      {text}
    </Text>
  </View>
);

export default TopicModalItem;
