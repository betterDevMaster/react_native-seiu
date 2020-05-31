import {createStackNavigator} from 'react-navigation-stack';
import {ScreenNames} from './NavigationConstants';
import TabNavigator from './TabNavigator';

const MainStack = createStackNavigator({
  [ScreenNames.MAIN]: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    },
  },
});

export default MainStack;
