import {connect} from 'react-redux';
import ForumTopicsView from './ForumTopicsView';

const mapStateToProps = state => ({
  user: state.register.user,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ForumTopicsView);
