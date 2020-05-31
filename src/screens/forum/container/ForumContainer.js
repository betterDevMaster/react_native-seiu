import {connect} from 'react-redux';
import {setCategories} from '../actions';
import ForumView from './ForumView';

const mapStateToProps = state => ({
  categories: state.forum.categories,
  user: state.register.user,
});

const mapDispatchToProps = dispatch => ({
  setCategories: categories => dispatch(setCategories(categories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForumView);
