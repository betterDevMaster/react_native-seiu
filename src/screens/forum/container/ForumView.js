import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {getCategories} from '../../../api/forum';
import SearchBox from '../../../components/SearchBox.js';
import {styles} from './styles';

export default class ForumView extends Component {
  static defaultProps = {
    categories: [],
  };

  state = {
    query: '',
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.loadData();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  loadData = async () => {
    const {user} = this.props;
    const categories = await getCategories(user.uid);
    this.props.setCategories(categories);
  };

  handleSearch = text => {
    this.setState({query: text});
  };

  goToTopics = item => {
    this.props.navigation.navigate('Topics', {
      categoryId: item.id,
      title: item.title,
    });
  };

  renderCategory = ({item}) => {
    const topicCount =
      item.topicCount === 1
        ? `${item.topicCount} topic`
        : `${item.topicCount || 0} topics`;
    return (
      <TouchableOpacity onPress={() => this.goToTopics(item)}>
        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
          <Text style={styles.topicCount}>{topicCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {categories} = this.props;
    const {query} = this.state;

    let filteredCategories = categories;
    if (query) {
      filteredCategories = categories.filter(
        c => c.title.toLowerCase().indexOf(query.toLowerCase()) > -1,
      );
    }

    return (
      <ScrollView style={styles.container}>
        <SearchBox
          placeholder="Search headings"
          onChangeText={this.handleSearch}
        />
        <FlatList data={filteredCategories} renderItem={this.renderCategory} />
      </ScrollView>
    );
  }
}
