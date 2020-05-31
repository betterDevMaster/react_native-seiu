import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {styles} from './styles';

const ProfileListItem = ({text, icon, link, onPress}) => (
  <TouchableOpacity onPress={() => onPress(link)}>
    <View style={styles.container}>
      {icon && <Image source={icon} style={styles.icon} />}
      <View style={styles.content}>
        <Text style={styles.item}>{text}</Text>
        <Icon name="chevron-right" size={15} style={styles.chevron} />
      </View>
    </View>
  </TouchableOpacity>
);

export default ProfileListItem;
