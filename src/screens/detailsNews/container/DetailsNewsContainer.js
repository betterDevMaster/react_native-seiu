import DetailsNewsView from './DetailsNewsView';
import {connect} from 'react-redux';
import {setCurrentNews} from '../../news/actions';

const mapStateToProps = state => ({
  currentNews: state.news.currentNews,
  news: state.news.news,
});

const mapDispatchToProps = dispatch => ({
  setCurrentNews: currentNews => dispatch(setCurrentNews(currentNews)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsNewsView);
