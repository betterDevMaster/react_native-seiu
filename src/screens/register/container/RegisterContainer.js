import RegisterView from './RegisterView';
import {connect} from 'react-redux';
import {setUser} from '../actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setUser: payload => dispatch(setUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
