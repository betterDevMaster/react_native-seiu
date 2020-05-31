import React, {Component} from 'react';
import {View} from 'react-native';
import {updateUser} from '../../../api/auth.js';
import Input from '../../../components/Input.js';
import Button from '../../../components/Button.js';
import {styles} from './styles';

export default class PersonalScreen extends Component {
  state = {
    firstName: this.props.user.firstName || '',
    lastName: this.props.user.lastName || '',
  };

  disableSubmit = () => {
    const {firstName, lastName} = this.state;
    const {user} = this.props;
    return (
      !firstName ||
      !lastName ||
      (firstName === user.firstName && lastName === user.lastName)
    );
  };

  handleFirstNameChange = value => {
    this.setState({firstName: value});
  };

  handleLastNameChange = value => {
    this.setState({lastName: value});
  };

  handleSubmit = () => {
    const {firstName, lastName} = this.state;
    const {user, setUser, navigation} = this.props;
    updateUser(user.uid, {firstName, lastName}).then(() => {
      setUser({...user, firstName, lastName});
      navigation.goBack();
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          label="First Name"
          onChangeText={value => this.handleFirstNameChange(value)}
          value={this.state.firstName}
        />
        <Input
          label="Last Name"
          onChangeText={value => this.handleLastNameChange(value)}
          value={this.state.lastName}
        />
        <Button
          containerStyles={styles.button}
          text="Submit"
          onPress={this.handleSubmit}
          disabled={this.disableSubmit()}
        />
      </View>
    );
  }
}
