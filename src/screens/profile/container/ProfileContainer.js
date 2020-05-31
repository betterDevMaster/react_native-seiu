import ProfileView from './ProfileView';
import {connect} from 'react-redux';
import {logout, setUser} from '../../register/actions';
import {getUser} from '../../register/selectors';

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  setUser: payload => dispatch(setUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
