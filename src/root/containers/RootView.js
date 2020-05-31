import React, {Component} from 'react';
import SwitchNavigator from '../../navigation/SwitchNavigator';
import NavigationService from '../../navigation/NavigationService';

class RootView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SwitchNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default RootView;
