import SplashScreen from './SplashScreenView';
import {connect} from 'react-redux';
import {setUser} from '../../register/actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setUser: payload => dispatch(setUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
