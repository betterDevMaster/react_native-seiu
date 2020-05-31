import ChatView from './ChatView';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  user: state.register.user,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
