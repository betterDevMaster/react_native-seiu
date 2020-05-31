import React, {Component} from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import {styles} from './styles';
import {navigateToLogin} from '../../../navigation/NavigationHelpers';
import {sendResetPasswordEmail} from '../../../api/auth';
import BackButton from '../../../components/BackButton.js';
import LoginTitle from '../../../components/LoginTitle.js';
import Input from '../../../components/Input.js';
import Button from '../../../components/Button.js';

export default class ForgotPasswordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      serverError: null,
    };
  }

  handleEmailChange = value => {
    this.setState({email: value});
  };

  callForgotPassword = () => {
    sendResetPasswordEmail(this.state.email)
      .then(() => {
        Alert.alert(
          'An email with password reset instructions has been sent to the email address you provided.',
          '',
          [{text: 'Ok', onPress: () => navigateToLogin()}],
        );
      })
      .catch(err => {
        this.setState({
          serverError: err.message,
        });
      });
  };

  disableNextButton = () => {
    let {email} = this.state;
    const expression = /\S+@\S+.+\S/;
    return !expression.test(email);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton onPress={navigateToLogin} />
        <View>
          <LoginTitle text="Forgot Password" />
          <Input
            label="Email"
            autoCapitalize={'none'}
            onChangeText={value => this.handleEmailChange(value)}
            keyboardType="email-address"
          />
          <Button
            containerStyles={styles.nextButton}
            text="Next"
            disabled={this.disableNextButton()}
            onPress={this.callForgotPassword}
          />
          {this.state.serverError && (
            <Text style={styles.error}>{this.state.serverError}</Text>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
