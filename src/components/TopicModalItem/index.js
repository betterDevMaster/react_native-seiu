import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {styles} from './styles';

const TopicModalItem = ({text, deleteItem, noBorder, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.container, noBorder && styles.noBorder]}>
      <Text style={[styles.item, deleteItem && styles.delete]}>
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

export default TopicModalItem;
