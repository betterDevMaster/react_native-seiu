import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {styles} from './styles';
import {BACK_BUTTON} from '../../assets/index.js';
import {MORE_BUTTON} from '../../assets/index.js';

export default class ChatTopBar extends Component {
  render() {
    const {onPressBack, onPressMore, containerStyles, imageStyles, name, nameStyles} = this.props;

    return (
      <View style={[styles.container, containerStyles]}>
        <TouchableOpacity
            onPress={onPressBack}
            style={[styles.backButton]}>
            <Image source={BACK_BUTTON} style={[styles.image, imageStyles]} />
        </TouchableOpacity>
        
        <View style={styles.nameWrapper}>
            <Text style={[styles.name, nameStyles]}>
                {name}
            </Text>
        </View>

        <TouchableOpacity
            onPress={onPressMore}
            style={[styles.moreButton]}>
            <Image source={MORE_BUTTON} style={[styles.image, imageStyles]} />
        </TouchableOpacity>
      </View>
    );
  }
}
