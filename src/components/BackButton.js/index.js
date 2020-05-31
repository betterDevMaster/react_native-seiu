import React, {Component} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {BACK_BUTTON} from '../../assets/index.js';

export default class BackButton extends Component {
  render() {
    const {onPress, containerStyles, imageStyles} = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, containerStyles]}>
        <Image source={BACK_BUTTON} style={[styles.image, imageStyles]} />
      </TouchableOpacity>
    );
  }
}
