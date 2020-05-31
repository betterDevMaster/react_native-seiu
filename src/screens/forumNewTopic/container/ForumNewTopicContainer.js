import {connect} from 'react-redux';
import ForumNewTopicView from './ForumNewTopicView';

const mapStateToProps = state => ({
  user: state.register.user,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ForumNewTopicView);
