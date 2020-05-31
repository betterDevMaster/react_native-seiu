import {connect} from 'react-redux';
import PersonalScreen from './PersonalView';
import {setUser} from '../../register/actions';
import {getUser} from '../../register/selectors';

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  setUser: payload => dispatch(setUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalScreen);
