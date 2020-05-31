import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils/colors';
import {styles} from './styles';
import {navigateToMain} from '../../navigation/NavigationHelpers';
import Button from '../../components/Button.js';

export default class UnionView extends Component {
  visitWebsite = () => {
    Linking.canOpenURL(this.props.union.website)
      .then(supported => {
        if (!supported) {
          console.tron.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(this.props.union.website);
        }
      })
      .catch(err => console.log('An error occurred', err));
  };

  callNumber = () => {
    Linking.openURL(`tel:${this.props.union.phone}`);
  };

  render() {
    const {union} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Image source={{uri: union.logo && union.logo.src}} style={styles.image} />
          <Text style={styles.title}>{union.name}</Text>
          <TouchableOpacity onPress={this.callNumber}>
            <Text style={styles.phone}>{union.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.visitWebsite}>
            <Text style={styles.websiteText}>Visit union website</Text>
          </TouchableOpacity>
          <View style={styles.containerButton}>
            <Button
              onPress={() => navigateToMain()}
              text="Continue"
              containerStyles={styles.continue}
              textStyles={styles.continueText}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
