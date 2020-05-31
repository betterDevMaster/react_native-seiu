import {createStackNavigator} from 'react-navigation-stack';
import LoginContainer from '../screens/login/container/LoginContainer';
import RegisterContainer from '../screens/register/container/RegisterContainer';
import OnboardingContainer from '../screens/onboarding/container/OnboardingContainer';
import {ScreenNames} from './NavigationConstants';
import ForgotPasswordContainer from '../screens/forgotPassword/container/ForgorPasswordContainer';
import UnionContainer from '../screens/union/UnionContainer';

const AuthStack = createStackNavigator({
  [ScreenNames.LOGIN]: {
    screen: LoginContainer,
    navigationOptions: {
      header: null,
    },
  },
  [ScreenNames.SIGNUP]: {
    screen: RegisterContainer,
    navigationOptions: {
      header: null,
    },
  },
  [ScreenNames.ONBOARDING]: {
    screen: OnboardingContainer,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ScreenNames.FORGOT_PASSWORD]: {
    screen: ForgotPasswordContainer,
    navigationOptions: {
      header: null,
    },
  },
  [ScreenNames.UNION]: {
    screen: UnionContainer,
    navigationOptions: {
      header: null,
    },
  },
});

export default AuthStack;
