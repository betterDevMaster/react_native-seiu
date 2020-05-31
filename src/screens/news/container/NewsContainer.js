import NewsView from './NewsView';
import {connect} from 'react-redux';
import {setNews, setCurrentNews} from '../actions';

const mapStateToProps = state => ({
  news: state.news.news,
  currentUser: state.register.user,
});

const mapDispatchToProps = dispatch => ({
  setNews: news => dispatch(setNews(news)),
  setCurrentNews: currentNews => dispatch(setCurrentNews(currentNews)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsView);
