import React, {Component} from 'react';
import {
  Platform,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Keyboard,
  SafeAreaView,
  StatusBar
} from 'react-native';
import moment from 'moment';
import {Header} from 'react-navigation-stack';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getUser} from '../../../api/auth';
import {getThreads, updateThread, createThread, deleteTopic} from '../../../api/forum';
import Avatar from '../../../components/Avatar.js';
import UserModal from '../../../components/UserModal.js';
import TopicModal from '../../../components/TopicModal';
import ConfirmModal from '../../../components/ConfirmModal';
import ActivityIndicator from '../../../components/ActivityIndicator.js';
import {LIKE, LIKE_HIGHLIGHTED} from '../../../assets';
import {styles} from './styles';

export default class ForumThreadsView extends Component {
  state = {
    threads: [],
    reply: '',
    submitting: false,
    userModalVisible: false,
    selectedUser: {},
    topicModalVisible: false,
    confirmModalVisible: false,
  };

  componentDidMount() {
    const { user, navigation } = this.props;

    this.loadData();
    navigation.setParams({
      isTopicAuthor: user.uid === navigation.getParam('topicAuthorId'),
      openTopicModal: this.openTopicModal,
    });
  }

  loadData = () => {
    const {navigation} = this.props;
    const categoryId = navigation.getParam('categoryId');
    const topicId = navigation.getParam('topicId');
    getThreads(categoryId, topicId).then(threads => this.setState({threads}));
  };

  handleChange = value => {
    this.setState({reply: value});
  };

  handleSubmit = () => {
    const {user, navigation} = this.props;
    const {reply} = this.state;
    const categoryId = navigation.getParam('categoryId');
    const topicId = navigation.getParam('topicId');
    const threadData = {
      authorId: user.uid,
      authorName: `${user.firstName} ${user.lastName}`,
      authorAvatar: user.avatar || '',
      date: new Date().getTime(),
      content: reply,
      likes: [],
    };

    this.setState({submitting: true}, () => {
      createThread(categoryId, topicId, threadData)
        .then(() => {
          this.setState({submitting: false, reply: ''});
          this.loadData();
          Keyboard.dismiss();
        })
        .catch(err => {
          this.setState({submitting: false});
          console.log('Error while creating thread:', err);
        });
    });
  };

  toggleLike = thread => {
    const {navigation, user} = this.props;
    const {id, likes = []} = thread;

    const categoryId = navigation.getParam('categoryId');
    const topicId = navigation.getParam('topicId');
    const likeIndex = likes.indexOf(user.uid);
    let newLikes = likes.slice();
    if (likeIndex > -1) {
      newLikes.splice(likeIndex, 1);
    } else {
      newLikes.push(user.uid);
    }

    updateThread(categoryId, topicId, id, {likes: newLikes})
      .then(() => this.loadData())
      .catch(err => console.log('Error while like/disliking a reply', err));
  };

  handleClickReply = () => {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  openUserModal = ({authorId}) => {
    // do not show user modal if you click on yourself
    if (authorId === this.props.user.uid) {
      return;
    }

    this.setState({submitting: true});
    getUser(authorId)
      .then(user => {
        this.setState({
          userModalVisible: true,
          selectedUser: user,
          submitting: false,
        });
      })
      .catch(() => {
        this.setState({submitting: false});
      });
  };

  closeUserModal = () => {
    this.setState({userModalVisible: false});
  };

  openTopicModal = () => this.setState({topicModalVisible: true});

  closeTopicModal = () => this.setState({topicModalVisible: false});

  openConfirmModal = () => this.setState({
    topicModalVisible: false,
    confirmModalVisible: true
  });

  closeConfirmModal = () => this.setState({confirmModalVisible: false});

  deleteTopic = (categoryId, topicId) => {
    const {navigation} = this.props;

    deleteTopic(categoryId, topicId)
      .then(async () => {
        this.closeConfirmModal();
        navigation.getParam('reloadTopics')();
        navigation.goBack();
      })
      .catch(err => {
        console.log('Error while deleting topic:', err);
      });
  };

  editTopic = () => {
    const {navigation} = this.props;

    this.closeTopicModal();

    navigation.navigate('NewTopic', {
      categoryId: navigation.getParam('categoryId'),
      topicId: navigation.getParam('topicId'),
      topicTitle: navigation.getParam('title'),
      topicType: navigation.getParam('type'),
      topicUsers: navigation.getParam('users'),
      reloadTopics: navigation.getParam('reloadTopics'),
      setTitle: (title) => navigation.setParams({title}),
      setType: (type) => navigation.setParams({type}),
      setUsers: (users) => navigation.setParams({users}),
    })
  };

  navigateToUnion = unionId => {
    this.props.navigation.navigate('UnionMembers', {backRoute: 'Threads'});
  };

  renderThread = ({item}) => {
    const offensiveContent = item.hasOwnProperty('offensiveContent') && item.offensiveContent

    if (offensiveContent) {
      return null;
    }
    
    const {user} = this.props;
    const timestamp = moment(item.date).fromNow(true);
    const likes = (item.likes || []).length;
    let likesString = '';
    if (likes) {
      likesString = likes === 1 ? `${likes} like` : `${likes} likes`;
    }
    const liked = (item.likes || []).indexOf(user.uid) > -1;
    return (
      <View style={styles.threadCard}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.button, styles.noLeftPadding]}
            onPress={() => this.openUserModal(item)}>
            <View style={styles.actions}>
              <Avatar
                extraSmall
                uri={item.authorAvatar}
                name={item.authorName}
              />
              <Text style={[styles.headerText, styles.authorName]}>
                {item.authorName}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.headerText}>{timestamp}</Text>
        </View>
        <Text style={styles.content}>{item.content}</Text>
        <View style={styles.header}>
          <Text style={styles.headerText}>{likesString}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.toggleLike(item)}>
              <Image
                source={liked ? LIKE_HIGHLIGHTED : LIKE}
                styles={styles.likeButton}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>•</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleClickReply}>
              <Text style={styles.headerText}>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {
      threads,
      reply,
      submitting,
      userModalVisible,
      selectedUser,
      topicModalVisible,
      confirmModalVisible
    } = this.state;
    const {navigation} = this.props;

    const categoryId = navigation.getParam('categoryId');
    const topicId = navigation.getParam('topicId');
    const keyboardVerticalOffset = Platform.OS === 'ios'
      ? Header.HEIGHT + getStatusBarHeight() - 20
      : 0;

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior = {Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View style={{flex: 1}}>
            <FlatList
              style={styles.threadsList}
              data={threads}
              renderItem={this.renderThread}
            />
            <View style={styles.inputContainer}>
              <TextInput
                multiline
                style={styles.input}
                placeholder="Write a reply"
                value={reply}
                onChangeText={this.handleChange}
                ref={ref => (this.inputRef = ref)}
                keyboardType="email-address"
              />
              {!!reply && (
                <TouchableOpacity
                  onPress={this.handleSubmit}
                  style={styles.sendButton}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              )}
            </View>
            {submitting && <ActivityIndicator />}
            {userModalVisible && (
              <UserModal
                user={selectedUser}
                currentUser={this.props.user}
                onBack={this.closeUserModal}
                onPressUnion={this.navigateToUnion}
                navigation={this.props.navigation}
                backRoute="Threads"
              />
            )}
            {topicModalVisible && (
              <TopicModal
                onBack={this.closeTopicModal}
                topicTitle={navigation.getParam('title')}
                deleteTopic={this.openConfirmModal}
                editTopic={this.editTopic}
              />
            )}
            {confirmModalVisible && (
              <ConfirmModal
                title="Are you sure you want to delete topic?"
                onBack={this.closeConfirmModal}
                confirm={() => this.deleteTopic(categoryId, topicId)}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
