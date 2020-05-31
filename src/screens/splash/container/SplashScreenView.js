import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  navigateToLogin,
  navigateToOnboarding,
  navigateToMain,
} from '../../../navigation/NavigationHelpers';
import {styles} from './styles';
import {getUser, listenForAuthStatus, logout} from '../../../api/auth';

export default class SplashScreen extends Component {
  componentDidMount() {
    this.unregisterAuthStatusListener = listenForAuthStatus(async user => {
      if (user) {
        const userData = await getUser(user.uid);
        if (userData) {
          this.props.setUser({
            ...userData,
            uid: user.uid,
          });
          this.props.navigation.navigate('Main');
        } else {
          logout()
            .then(() => navigateToLogin())
            .catch(() => console.log('user was deleted'))
        }
      } else {
        AsyncStorage.getItem('SECOND_TIME').then(item => {
          if (item !== null && item === 'true') {
            navigateToLogin();
          } else {
            navigateToOnboarding();
          }
        });
      }
    });
  }

  componentWillUnmount() {
    this.unregisterAuthStatusListener();
  }

  render() {
    return <View style={styles.container}></View>;
  }
}
