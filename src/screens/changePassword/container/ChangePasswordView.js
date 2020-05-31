import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {updatePassword} from '../../../api/auth.js';
import Input from '../../../components/Input.js';
import Button from '../../../components/Button.js';
import {styles} from './styles';

export default class ChangePasswordScreen extends Component {
  state = {
    currentPassword: '',
    newPassword: '',
  };

  handleCurrentPasswordChange = value => {
    this.setState({currentPassword: value});
  };

  handleNewPasswordChange = value => {
    this.setState({newPassword: value});
  };

  disableSubmit = () => {
    const {currentPassword, newPassword} = this.state;
    return !currentPassword || !newPassword;
  };

  handleSubmit = () => {
    const {currentPassword, newPassword} = this.state;
    updatePassword(currentPassword, newPassword)
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch(err => this.setState({serverError: err.message}));
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          secureTextEntry
          label="Current Password"
          onChangeText={value => this.handleCurrentPasswordChange(value)}
          value={this.state.currentPassword}
        />
        <Input
          secureTextEntry
          label="New Password"
          onChangeText={value => this.handleNewPasswordChange(value)}
          value={this.state.newPassword}
        />
        <Button
          containerStyles={styles.button}
          text="Submit"
          onPress={this.handleSubmit}
          disabled={this.disableSubmit()}
        />
        {this.state.serverError && (
          <Text style={styles.error}>{this.state.serverError}</Text>
        )}
      </View>
    );
  }
}
