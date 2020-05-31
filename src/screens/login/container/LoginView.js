import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {
  navigateToMain,
  navigateToSignup,
  navigateToUnion,
} from '../../../navigation/NavigationHelpers';
import {styles} from './styles';
import {login, getUser, getUnion} from '../../../api/auth';
import {ScreenNames} from '../../../navigation/NavigationConstants';
import BackButton from '../../../components/BackButton.js';
import LoginTitle from '../../../components/LoginTitle.js';
import Input from '../../../components/Input.js';
import Link from '../../../components/Link.js';
import Button from '../../../components/Button.js';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      serverError: null,
    };
  }

  handleEmailChange = value => {
    this.setState({email: value});
  };

  handlePasswordChange = value => {
    this.setState({password: value});
  };

  disableLoginButton = () => {
    let {email, password} = this.state;
    const expression = /\S+@\S+.+\S/;
    return !expression.test(email) || !password;
  };

  handleLoginButton = () => {
    let {email, password} = this.state;
    login(email, password)
      .then(async snap => {
        const userData = await getUser(snap.user.uid);
        this.props.setUser({
          uid: snap.user.uid,
          ...userData,
        });
        await getUnion(userData.unionId).then(union => {
          this.props.setUnion(union);
        });
        navigateToUnion();
      })
      .catch(err => {
        this.setState({serverError: 'Wrong username or password'});
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton onPress={navigateToSignup} />
        <View>
          <LoginTitle text="Login" />
          <Input
            label="Email"
            autoCapitalize={'none'}
            onChangeText={value => this.handleEmailChange(value)}
            keyboardType="email-address"
          />
          <Input
            label="Password"
            secureTextEntry={true}
            onChangeText={value => this.handlePasswordChange(value)}
          />
          <Link
            textStyles={styles.forgotPassword}
            text="Forgot password?"
            onPress={() =>
              this.props.navigation.navigate(ScreenNames.FORGOT_PASSWORD)
            }
          />
          <Button
            onPress={this.handleLoginButton}
            disabled={this.disableLoginButton()}
            text="Login"
          />
          {this.state.serverError && (
            <Text style={styles.error}>{this.state.serverError}</Text>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
