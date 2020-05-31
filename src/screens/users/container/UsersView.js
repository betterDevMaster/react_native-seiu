import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import SearchBox from '../../../components/SearchBox.js';
import {styles} from './styles';
import {getUnionUsers, getAllUsers} from '../../../api/auth';
import InboxRow from '../../../components/InboxRow.js';
import UserModal from '../../../components/UserModal.js';
import Spinner from 'react-native-loading-spinner-overlay';
import {ScrollView} from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';

export default class UsersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredList: [],
      search: '',
      currentUser: {},
      currentItem: null,
      isLoading: true,
      showModal: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const unionId = navigation.getParam('unionId');
    firebase.auth().onAuthStateChanged(async currentUser => {
      if (currentUser) {
        getUnionUsers(unionId).then(users => {
          let myUser = {};
          let filtered = users.filter(user => {
            if (user.uid !== currentUser.uid) {
              return true;
            } else {
              myUser = user;
            }
          });

          navigation.setParams({
            subtitle:
              filtered.length === 1 ? '1 person' : `${filtered.length} people`,
          });

          this.setState({
            users: filtered,
            filteredList: filtered,
            currentUser: myUser,
            isLoading: false,
          });
        });
      }
    });
  }

  handleTextChange = text => {
    this.search(text);
    this.setState({search: text});
  };

  handleItemPress = item => {
    const {firstName, lastName, email, uid} = item;

    const triggerModal = !this.props.navigation.getParam('fromInbox');

    if (triggerModal) {
      return this.setState({currentItem: item, showModal: true});
    } else {
      this.props.navigation.navigate('Chat', {
        selectedUser: {
          firstName,
          lastName,
          email,
          uid,
        },
        currentUser: this.state.currentUser,
      });
    }
  };

  hideUserModal = () => {
    this.setState({currentItem: null, showModal: false});
  };

  search = substring => {
    let copy = [];
    const {users} = this.state;
    users.forEach(user => {
      if (
        (
          user.firstName.toLowerCase() +
          ' ' +
          user.lastName.toLowerCase()
        ).indexOf(substring.toLowerCase()) !== -1
      ) {
        copy.push(user);
      }
    });

    this.setState({filteredList: copy});
  };

  renderRow = ({item}) => {
    return (
      <InboxRow userInfo={item} onPress={() => this.handleItemPress(item)} />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isLoading} />
        <ScrollView style={styles.scrollView}>
          <View>
            <SearchBox
              placeholder="Search users"
              onChangeText={this.handleTextChange}
            />
            <FlatList
              data={this.state.filteredList}
              renderItem={this.renderRow}
              keyExtractor={user => user.uid}
            />
          </View>
        </ScrollView>
        {this.state.showModal && (
          <UserModal
            user={this.state.currentItem}
            currentUser={this.state.currentUser}
            onBack={this.hideUserModal}
            navigation={this.props.navigation}
          />
        )}
      </View>
    );
  }
}
