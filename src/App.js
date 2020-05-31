import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Provider} from 'react-redux';
import configureStore from './store';
import Root from './root/containers/RootContainer';
import firebase from 'react-native-firebase';
import {listenForAuthStatus, updateUser} from './api/auth';
import {navigateToLogin} from './navigation/NavigationHelpers';

const store = configureStore();

export default class App extends Component {
  state = {
    userUid: null
  }

  removeNotificationListener = null;

  componentDidMount() {
    listenForAuthStatus(async (user) => {
      if (user) {
        const channel = new firebase.notifications.Android.Channel('chat-channel', 'Chat Channel', firebase.notifications.Android.Importance.Max)
        await firebase.notifications().android.createChannel(channel);
        this.setState({userUid: user.uid}, async () => {
          this.checkPermission();
          this.createNotificationListeners();
        })
      } else {
        this.setState({userUid: null}, () => {
          if (this.removeNotificationListener) {
            this.removeNotificationListener();
          }
        });
      }
    })
  }

  componentWillUnmount() {
    if (this.removeNotificationListener) {
      this.removeNotificationListener();
    }
    this.messageListener();
  }

  async createNotificationListeners() {
    this.removeNotificationListener = firebase.notifications().onNotification((notification) => {
      if (this.state.userUid) {
        notification.android.setChannelId('chat-channel').setSound('default');
        firebase.notifications().displayNotification(notification);
      }
    });

    this.messageListener = firebase.messaging().onMessage((message) => {
      if (message.data && message.data.action === 'logout') {
        navigateToLogin();
      }
    });
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    const {userUid} = this.state;
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    await updateUser(userUid,{fcmToken});
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <Root />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  icon: {
    justifyContent: 'center',
    marginLeft: 30,
  },
});
