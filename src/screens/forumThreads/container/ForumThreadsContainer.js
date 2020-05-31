import {connect} from 'react-redux';
import ForumThreadsView from './ForumThreadsView';

const mapStateToProps = state => ({
  user: state.register.user,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ForumThreadsView);
