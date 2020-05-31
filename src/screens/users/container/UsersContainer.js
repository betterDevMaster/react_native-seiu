import UsersView from './UsersView';
import {connect} from 'react-redux';
import {getUser} from '../../register/selectors';

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UsersView);
