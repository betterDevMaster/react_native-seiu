import React, {Component} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Alert} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import firebase from 'react-native-firebase';
import {styles} from './styles';
import SearchBox from '../../../components/SearchBox.js';
import InboxRow from '../../../components/InboxRow.js';
import ChatAPI from '../../../api/chat';
import {decrypt} from '../../../utils/encryption';
import {getUnion} from '../../../api/auth';

export default class InboxView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      rooms: [],
      filteredList: [],
      search: '',
    };

    this.currentUserId = '';
  }

  componentDidMount() {
    const {unionId} = this.props.user;

    getUnion(unionId).then(union => {
      this.props.navigation.setParams({
        unionId,
        title: union.name,
      });
    });

    this._subscribeToChanges = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.refreshInbox();
      },
    );
    // This will delete the chats for all users and clear the entire realtime DB
    // ChatAPI.deleteAllChats();
  }


  async refreshInbox() {
    // Get the chats for the current user
    // const currentId = ChatAPI.getUid();
    firebase.auth().onAuthStateChanged(async currentUser => {
      if (currentUser) {
        this.currentUserId = currentUser.uid;
        const userChatsIds = await ChatAPI.getUserChatsIds(currentUser.uid);
        let chats = [];
        let decryptedChats = [];
        if (userChatsIds) {
          chats = await ChatAPI.getChatsByIds(userChatsIds);
          chats.sort((chat1, chat2) => {
            const chat1Date = new Date(Math.max.apply(null, chat1.messages.map(message =>
              new Date(message.createdAt)
            )));
            const chat2Date = new Date(Math.max.apply(null, chat2.messages.map(message =>
              new Date(message.createdAt)
            )));
            return chat2Date - chat1Date;
          })

          decryptedChats = chats.map(chat => ({
            ...chat,
            messages: chat.messages.map(message => ({
              ...message,
              text: decrypt(message.text),
            })),
          }));

          await this.setUnreadMessagesCounts(userChatsIds);
        }
        this.setState({
          chats: decryptedChats,
          filteredList: decryptedChats,
        });
      }
    });
  }

  handleTextChange = text => {
    this.search(text);
    this.setState({search: text});
  };

  search = substring => {
    const myUser = this.props.user;
    let copy = [];
    const {chats} = this.state;
    const typedString = substring.toLowerCase();

    chats.forEach(chat => {
      const user = chat.users.filter(user => user.uid !== myUser.uid)[0];
      const messages = chat.messages;
      const userName =
        user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase();

      if (userName.indexOf(typedString) !== -1) {
        copy.push(chat);
      } else {
        messages.some(msg => {
          const text = msg.text.toLowerCase();
          if (text.indexOf(typedString) !== -1) {
            copy.push(chat);
            return true;
          }
        });
      }
    });

    this.setState({filteredList: copy});
  };

  setUnreadMessagesCounts = async chatsIds => {
    // Get the counts of unread messages for each room that the current user is in
    const currentUserUnreadMessagesCounts = await this.getUserUnreadMessagesCounts(
      chatsIds,
      this.currentUserId,
    );
    this.setState(prevState => ({
      unreadMessagesCounts: {
        ...prevState.unreadMessagesCounts,
        ...currentUserUnreadMessagesCounts,
      },
    }));
  };

  getUserUnreadMessagesCounts = async (chatsIds, userId) => {
    // Get unread messages as an array of objects
    const unreadMessages = await Promise.all(
      chatsIds.map(async chatId => {
        // Get the unread message count for the current user and the room being looped over
        const roomUnreadMessagesCount = await this.getUserUnreadMessagesCount(
          chatId,
          userId,
        );

        return {
          chatId,
          count: roomUnreadMessagesCount,
        };
      }),
    );

    // Convert the array of objects to an object using the room id as the key and the unread messages count as the value
    return unreadMessages.reduce(
      (obj, item) => ({
        ...obj,
        [item.chatId]: item.count,
      }),
      {},
    );
  };

  getUserUnreadMessagesCount = async (chatId, userId) => {
    const unreadMessagesCountSnap = await ChatAPI.dbRef
      .child(`unreadMessagesCount/${chatId}/${userId}`)
      .once('value');
    return unreadMessagesCountSnap.val() || 0;
  };

  sortUsers = users => {
    let currentUser = {};
    let otherUser = {};

    if (users[0].uid === this.currentUserId) {
      currentUser = users[0];
      otherUser = users[1];
    } else {
      currentUser = users[1];
      otherUser = users[0];
    }

    return {currentUser, otherUser};
  };

  renderRow = (rowData, rowMap) => {
    const {search} = this.state;
    const {item} = rowData;
    const {users, id, messages} = item;
    const sortedUsers = this.sortUsers(users);

    let lastMessage;
    if (search === '') {
      lastMessage = messages[messages.length - 1];
    } else {
      const sortedMessages = [...messages].reverse();

      const lastMatchingMessage = sortedMessages.find(message => {
        const text = message.text.toLowerCase();
        return text.indexOf(search.toLowerCase()) !== -1
      });

      lastMessage = lastMatchingMessage || messages[messages.length - 1];
    }

    return (
      <InboxRow
        userInfo={sortedUsers.otherUser}
        newMessage={this.state.unreadMessagesCounts[id] > 0}
        message={lastMessage.text}
        date={lastMessage.createdAt}
        onPress={() => {
          if (rowMap[item.id].isOpen) {
            rowMap[item.id].closeRow();
            return;
          }
          const navigationParams = {
            chatId: id,
            currentUser: sortedUsers.currentUser,
            selectedUser: sortedUsers.otherUser,
            runFunction: async () => {
              await this.setUnreadMessagesCounts([id]);
            },
          };
          if (this.state.search !== '') {
            navigationParams.lastMessage = lastMessage;
          }
          this.setState({search: ''}, () => {
            this.props.navigation.navigate('Chat', navigationParams);
          })
        }}
      />
    );
  };

  deleteChat = async (chat) => {
    const chatRoomRef = ChatAPI.dbRef.child(`chats/${chat.id}`);

    ChatAPI.deleteSingleChat(chat, chatRoomRef).then(() => {
      this.refreshInbox();
    });
  };

  renderDeleteRow = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            "Delete chat?",
            "Please confirm",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "OK",
                onPress: () => this.deleteChat(item),
              }
            ],
            { cancelable: false }
          );
        }}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View>
        <ScrollView style={styles.container}>
          <View>
            <SearchBox
              placeholder="Search messages"
              onChangeText={this.handleTextChange}
              value={this.state.search}
            />
            <SwipeListView
              disableRightSwipe
              data={this.state.filteredList}
              renderItem={this.renderRow}
              renderHiddenItem={this.renderDeleteRow}
              rightOpenValue={-150}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
