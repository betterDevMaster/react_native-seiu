import React, {Component} from 'react';
import {View} from 'react-native';
import {updateUser} from '../../../api/auth.js';
import Switch from '../../../components/Switch.js';
import {styles} from './styles';

export default class NotificationsScreen extends Component {
  state = {
    notifications: this.props.user.notifications || false,
  };

  handleChange = value => {
    const {user, setUser} = this.props;
    this.setState({notifications: value});
    updateUser(user.uid, {notifications: value}).then(() => {
      setUser({...user, notifications: value});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Switch
          containerStyles={styles.switchContainer}
          textStyles={styles.switchText}
          label="I'd like to receive Chat notifications."
          value={this.state.notifications}
          onValueChange={this.handleChange}
        />
      </View>
    );
  }
}
