import Union from './UnionView';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  union: state.register.union,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Union);
