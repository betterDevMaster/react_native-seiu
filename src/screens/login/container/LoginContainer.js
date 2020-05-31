import LoginView from './LoginView';
import {connect} from 'react-redux';
import {setUser, setUnion} from '../../register/actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setUser: payload => dispatch(setUser(payload)),
  setUnion: union => dispatch(setUnion(union)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
