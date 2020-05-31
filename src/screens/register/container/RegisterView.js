import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import {navigateToLogin} from '../../../navigation/NavigationHelpers';
import {styles} from './styles';
import Swiper from 'react-native-swiper';
import {addUser, getUnions, getAllUsers} from '../../../api/auth';
import BackButton from '../../../components/BackButton.js';
import LoginTitle from '../../../components/LoginTitle.js';
import Input from '../../../components/Input.js';
import Button from '../../../components/Button.js';
import {colors} from '../../../utils/colors';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

export default class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      first: true,
      email: '',
      firstName: '',
      lastName: '',
      location: null,
      password: '',
      confirmPassword: '',
      serverError: null,
      index: 0,
      union: null,
      unions: [],
      filteredList: [],
      selectedItems: [],
      selectList: [
        {
          id: 0,
          children: [],
        },
      ],
    };
  }

  componentDidMount() {
    getAllUsers().then(users => {
      this.setState({users});
    });
    getUnions().then(unions => {
      const copy = this.state.selectList;
      copy[0].children = [...unions];
      this.setState({
        unions: unions,
        filteredList: unions,
        selectList: [...copy],
      });
    });
  }

  handleIndexChange = index => {
    if (index == 0) {
      this.setState({first: true});
    } else {
      this.setState({first: false});
    }
    this.setState({index});
  };

  handleNextButton = () => {
    this._swiper.scrollBy(1);
  };

  handleBackButton = () => {
    this._swiper.scrollBy(-1);
  };

  handleEmailChange = value => {
    this.setState({email: value});
  };

  handleFirstNameChange = value => {
    this.setState({firstName: value});
  };

  handleLastNameChange = value => {
    this.setState({lastName: value});
  };

  handleLocationChange = value => {
    this.setState({location: value});
  };

  handlePasswordChange = value => {
    this.setState({password: value});
  };

  handleConfirmPasswordChange = value => {
    this.setState({confirmPassword: value});
  };

  disableEmailNext = () => {
    const expression = /\S+@\S+.+\S/;
    return !expression.test(this.state.email);
  };

  disableNameNext = () => {
    return this.state.firstName === '' || this.state.lastName === '';
  };

  disableLocationNext = () => {
    return !this.state.location;
  };

  disableUnionNext = () => {
    return !this.state.union;
  };

  disablePasswordNext = () => {
    return (
      this.state.password === '' ||
      this.state.confirmPassword === '' ||
      this.state.password !== this.state.confirmPassword
    );
  };

  handleCompleteButton = () => {
    let {email, password, firstName, lastName, union} = this.state;
    addUser(email, password, firstName, lastName, union)
      .then(user => {
        this.props.setUser({uid: user.uid, email: user.email});
        Alert.alert('Account created successfully. You may now log in.', '', [
          {text: 'Ok', onPress: () => navigateToLogin()},
        ]);
      })
      .catch(err => {
        this.setState({
          serverError: err.message,
        });
      });
  };

  onSelectedItemsChange = selectedItem => {
    let union = this.state.unions.find(union => union.id === selectedItem[0]);
    this.setState({selectedItems: selectedItem, union: {...union}});
  };

  handleMaybeLater = () => {
    this._swiper.scrollBy(1);
  };

  handleNextEmail = () => {
    let found = this.state.users.find(user => user.email === this.state.email);
    if (found) {
      this.setState({serverError: 'Email already exists'});
    } else {
      this.handleNextButton();
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton
          onPress={this.state.first ? navigateToLogin : this.handleBackButton}
          containerStyles={{marginLeft: 20}}
        />
        <Swiper
          ref={swiper => (this._swiper = swiper)}
          autoplay={false}
          showsPagination={false}
          scrollEnabled={false}
          loop={false}
          removeClippedSubviews={false}
          onIndexChanged={this.handleIndexChange}>
          <View style={styles.screenContainer}>
            <LoginTitle text="Create an account" />
            <Input
              label="Email"
              value={this.state.email}
              onChangeText={value => this.handleEmailChange(value)}
              keyboardType="email-address"
              autoCapitalize={'none'}
              value={this.state.email}
              editable={this.state.index === 0}
            />
            <View style={styles.row}>
              <Text style={styles.info}>
                By tapping "Next" you agree with our{' '}
              </Text>
              <TouchableOpacity>
                <Text style={styles.terms}>Terms and conditions</Text>
              </TouchableOpacity>
            </View>
            <Button
              containerStyles={styles.nextButton}
              text="Next"
              onPress={this.handleNextEmail}
              disabled={this.disableEmailNext()}
            />
            {this.state.serverError && (
              <Text style={styles.error}>{this.state.serverError}</Text>
            )}
          </View>
          <View style={styles.screenContainer}>
            <LoginTitle text="Your name" />
            <Input
              label="First Name"
              onChangeText={value => this.handleFirstNameChange(value)}
              value={this.state.firstName}
              editable={this.state.index === 1}
            />
            <Input
              label="Last Name"
              onChangeText={value => this.handleLastNameChange(value)}
              value={this.state.lastName}
              editable={this.state.index === 1}
            />
            <Button
              containerStyles={styles.nextButton}
              text="Next"
              onPress={this.handleNextButton}
              disabled={this.disableNameNext()}
            />
          </View>
          {/* <View style={styles.screenContainer}>
            <LoginTitle text="Location" />
            <Input
              label="Zip code"
              keyboardType="numeric"
              onChangeText={value => this.handleLocationChange(value)}
              value={this.state.location}
              editable={this.state.index === 2}
            />
            <Button
              text="Next"
              containerStyles={styles.nextButton}
              onPress={this.handleNextButton}
              //disabled={this.disableLocationNext()}
            />
          </View> */}
          <View style={styles.screenContainer}>
            <LoginTitle text="Your Local Union" />
            <SectionedMultiSelect
              searchPlaceholderText="Search unions..."
              items={this.state.selectList}
              uniqueKey="id"
              single={true}
              subKey="children"
              displayKey="name"
              selectText="Select union.."
              showDropDowns={true}
              readOnlyHeadings={true}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              iconKey="icon"
              autoFocus
              modalWithTouchable
              modalWithSafeAreaView
              hideConfirm
              selectedItems={this.state.selectedItems}
              colors={{
                success: colors.purple,
                subText: colors.black,
                searchPlaceholder: colors.grey,
                text: colors.grey,
                primary: colors.grey,
              }}
              styles={{
                selectToggle: styles.selectToggle,
                selectToggleText: styles.selectToggleText,
              }}
              showDropDowns={false}
            />
            <Button
              text="Next"
              containerStyles={styles.nextButton}
              onPress={this.handleNextButton}
              disabled={this.disableUnionNext()}
            />
          </View>
          <View style={styles.screenContainer}>
            <LoginTitle text="Create password" />
            <Input
              label="Password"
              secureTextEntry={true}
              onChangeText={value => this.handlePasswordChange(value)}
              value={this.state.password}
              editable={this.state.index === 3}
            />
            <Input
              label="Confirm Password"
              secureTextEntry={true}
              onChangeText={value => this.handleConfirmPasswordChange(value)}
              value={this.state.confirmPassword}
              editable={this.state.index === 3}
            />
            <Button
              text="Complete"
              containerStyles={styles.nextButton}
              onPress={this.handleCompleteButton}
              disabled={this.disablePasswordNext()}
            />
            {this.state.serverError && (
              <Text style={styles.error}>{this.state.serverError}</Text>
            )}
          </View>
        </Swiper>
      </SafeAreaView>
    );
  }
}
