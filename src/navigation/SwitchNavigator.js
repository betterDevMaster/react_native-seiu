import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {ScreenNames, StackNames} from './NavigationConstants';
import SplashScreenContainer from '../screens/splash/container/SplashScreenContainer';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import TabNavigator from './TabNavigator';

const SwitchNavigatorStack = createSwitchNavigator(
  {
    [ScreenNames.SPLASH]: SplashScreenContainer,
    [StackNames.AUTH_STACK]: AuthStack,
    [StackNames.MAIN_STACK]: MainStack,
  },
  {
    initialRouteName: ScreenNames.SPLASH,
  },
);

const SwitchNavigator = createAppContainer(SwitchNavigatorStack);

export default SwitchNavigator;
