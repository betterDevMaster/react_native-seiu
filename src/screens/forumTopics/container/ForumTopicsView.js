import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import moment from 'moment';
import {getTopics} from '../../../api/forum';
import SearchBox from '../../../components/SearchBox.js';
import Avatar from '../../../components/Avatar.js';
import {styles} from './styles';

export default class ForumTopicsView extends Component {
  state = {
    topics: [],
    query: '',
  };

  componentDidMount() {
    this.loadData();
    this.props.navigation.setParams({reloadTopics: this.loadData});
  }

  loadData = () => {
    const {navigation, user} = this.props;
    const categoryId = navigation.getParam('categoryId');
    getTopics(categoryId)
      .then(topics => this.setState({
        topics: topics.filter(topic =>
          !topic.type ||
          topic.type === 'public' ||
          (topic.type === 'private' && topic.users.includes(user.uid))
        )
      }));
  };

  handleSearch = text => {
    this.setState({query: text});
  };

  goToThread = item => {
    const {navigation} = this.props;
    const categoryId = navigation.getParam('categoryId');
    this.props.navigation.navigate('Threads', {
      categoryId,
      topicId: item.id,
      title: item.title,
      type: item.type,
      users: item.users,
      reloadTopics: this.loadData,
      topicAuthorId: item.authorId
    });
  };

  renderTopic = ({item}) => {
    const offensiveContent = item.hasOwnProperty('offensiveContent') && item.offensiveContent

    if (offensiveContent) {
      return null;
    }

    const timestamp = moment(item.updatedAt).fromNow(true);
    const replies =
      item.replyCount === 1
        ? `${item.replyCount} reply`
        : `${item.replyCount || 0} replies`;
    return (
      <TouchableOpacity onPress={() => this.goToThread(item)}>
        <View style={styles.topicCard}>
          <View style={styles.tags}>
            {item.tags &&
            item.tags.map((tag, i) => (
              <View key={`${tag}${i}`} style={styles.tagView}>
                <Text style={styles.tagText}>{tag.toUpperCase()}</Text>
              </View>
            ))}
          </View>
          <View style={styles.content}>
            <View style={styles.left}>
              <Text style={styles.topicTitle}>{item.title}</Text>
              <Text style={styles.stats}>
                {item.authorName}&nbsp;&nbsp;•&nbsp;&nbsp;
                {replies}&nbsp;&nbsp;•&nbsp;&nbsp;
                {timestamp}
              </Text>
            </View>
            <Avatar small uri={item.authorAvatar} name={item.authorName} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {topics, query} = this.state;

    let filteredTopics = topics;
    if (query) {
      filteredTopics = topics.filter(
        c => c.title.toLowerCase().indexOf(query.toLowerCase()) > -1,
      );
    }

    return (
      <ScrollView style={styles.container}>
        <SearchBox
          placeholder="Search topics"
          onChangeText={this.handleSearch}
        />
        <FlatList data={filteredTopics} renderItem={this.renderTopic} />
      </ScrollView>
    );
  }
}
