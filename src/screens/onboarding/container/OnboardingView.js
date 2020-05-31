import React, {Component} from 'react';
import {View, Text, Image, StatusBar, SafeAreaView} from 'react-native';
import Swiper from 'react-native-swiper';
import {colors} from '../../../utils/colors';
import {styles} from './styles';
import {
  navigateToLogin,
  navigateToSignup,
} from '../../../navigation/NavigationHelpers';
import TextButton from '../../../components/TextButton.js';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ONBOARDING_1,
  ONBOARDING_2,
  ONBOARDING_3,
  BREAKROOM,
} from '../../../assets';

export default class OnboardingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last: false,
    };
  }
  componentDidMount() {
    AsyncStorage.setItem('SECOND_TIME', 'true');
  }
  handleIndexChange = index => {
    if (index == 2) {
      this.setState({last: true});
    } else {
      this.setState({last: false});
    }
  };

  handleNextButton = () => {
    this._swiper.scrollBy(1);
  };

  handleSignUpButton = () => {
    navigateToSignup();
  };

  handleLoginButton = () => {
    navigateToLogin();
  };

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar hidden />
        <View style={styles.header}>
          <TextButton text="Sign up" onPress={this.handleSignUpButton} />
          <Image
            source={BREAKROOM}
            style={styles.breakroom}
            resizeMode="contain"
          />
          <TextButton text="Login" onPress={this.handleLoginButton} />
        </View>
        <Swiper
          ref={swiper => (this._swiper = swiper)}
          autoplay={false}
          activeDotColor={colors.yellow}
          paginationStyle={styles.dots}
          loop={false}
          onIndexChanged={this.handleIndexChange}>
          <View style={styles.container}>
            <Image
              source={ONBOARDING_1}
              resizeMode="contain"
              style={styles.image}
            />
            <View style={styles.containerFooter}>
              <Text style={styles.footerTitle}>Welcome to SEIU App!</Text>
              <Text style={styles.footerText}>
                Three simple lines of text for 3 slides of onboarding flow
                explaining main features of the app.
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <Image
              source={ONBOARDING_2}
              resizeMode="contain"
              style={styles.image}
            />
            <View style={styles.containerFooter}>
              <Text style={styles.footerTitle}>Welcome to SEIU App!</Text>
              <Text style={styles.footerText}>
                Three simple lines of text for 3 slides of onboarding flow
                explaining main features of the app.
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <Image
              source={ONBOARDING_3}
              resizeMode="contain"
              style={styles.image}
            />
            <View style={styles.containerFooter}>
              <Text style={styles.footerTitle}>Welcome to SEIU App!</Text>
              <Text style={styles.footerText}>
                Three simple lines of text for 3 slides of onboarding flow
                explaining main features of the app.
              </Text>
            </View>
          </View>
        </Swiper>
        <View style={styles.footer}>
          <TextButton
            text={this.state.last ? 'Create account' : 'Next'}
            textStyles={{fontWeight: 'bold'}}
            onPress={
              this.state.last ? this.handleSignUpButton : this.handleNextButton
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}
