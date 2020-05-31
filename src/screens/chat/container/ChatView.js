import React, {Component} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {GiftedChat} from 'react-native-gifted-chat';
import {intersection} from 'lodash';
import ChatAPI from '../../../api/chat';
import firebase from 'react-native-firebase';
import Message from '../../../components/Message.js';
import {encrypt, decrypt} from '../../../utils/encryption';
import ChatGoEnd from '../../../components/ChatGoToEnd';

export default class InboxView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      numMessagesToShow: 15, // no of messages shown initially
      numMessagesToIncrement: 15, // no of messages for "load earlier"
      isLoadEarlierVisible: false,
      lastMessageScrollTo: null,
      isGoEndVisible: false,
    };

    // These are required already for the first render
    // so they must be defined here
    this.chatRoomId = this.props.navigation.state.params.chatId;
    this.selectedUser = this.props.navigation.state.params.selectedUser;
    this.currentUser = this.props.navigation.state.params.currentUser;
  }

  async componentDidMount() {
    // Set the Screen Title in header the name of the person you're talking to
    this.props.navigation.setParams({
      chatTitle: this.selectedUser.firstName + ' ' + this.selectedUser.lastName,
    });

    const lastMessageScrollTo = this.props.navigation.getParam('lastMessage');
    if (lastMessageScrollTo) {
      this.setState({lastMessageScrollTo, isGoEndVisible: true});
    }

    this.roomUsers = await this.getUsersForChat();

    // Check if there's a previous chat between these 2 users
    const isChat = await this.haveWeChatBefore();
    if (isChat) {
      this.chatRoomId = isChat;
    }

    // Get DB reference to the chat room conversation
    // or create a new chat room
    if (this.chatRoomId) {
      await this.prepareTheChat();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // If the number of messages to show has changed,
    // remove the old listener and run the event listener again
    const {lastMessageScrollTo} = this.state;
    if (prevState.numMessagesToShow !== this.state.numMessagesToShow) {
      this.chatRoomRef.off(this.liveUpdateListener);
      let messagesRef;
      if (lastMessageScrollTo) {
        messagesRef = this.chatRoomRef
          .child('messages')
          .endAt(lastMessageScrollTo.createdAt)
          .orderByChild('createdAt')
          .limitToLast(this.state.numMessagesToShow);
      } else {
        messagesRef = this.chatRoomRef
          .child('messages')
          .limitToLast(this.state.numMessagesToShow)
      }
      this.liveUpdateMessages(messagesRef);
    }

    // If the messages change, check if the number returned is equal to the number requested.
    // If it is not, then that means there are no more messages coming after that
    // and we can hide the `load earlier` button.
    if (prevState.messages !== this.state.messages) {
      this.toggleLoadEarlierButton(this.state.messages);
    }
  }

  componentWillUnmount() {
    // Remove all event listeners on reference
    if (this.chatRoomId) {
      this.chatRoomRef.off();
      this.chatRoomRef.child('messages').off();
    }
  }

  prepareTheChat = async () => {
    const {lastMessageScrollTo} = this.state;
    this.chatRoomRef = await this.getChatRoomRef();

    // Reset the unread messages count
    ChatAPI.setOrIncrementUnreadMessageCount({
      roomId: this.chatRoomRef.key,
      userId: this.currentUser.uid,
      isCountBeingReset: true,
    });

    // Save the existing messages into state and update them
    // if a message is added/removed from the DB

    let messagesRef;
    if (lastMessageScrollTo) {
      messagesRef = this.chatRoomRef
        .child('messages')
        .endAt(lastMessageScrollTo.createdAt)
        .orderByChild('createdAt')
        .limitToLast(this.state.numMessagesToShow);
    } else {
      messagesRef = this.chatRoomRef
        .child('messages')
        .limitToLast(this.state.numMessagesToShow)
    }

    this.liveUpdateListener = this.liveUpdateMessages(messagesRef);
  };

  haveWeChatBefore = async () => {
    const currentUserChats = await ChatAPI.getUserChatsIds(
      this.currentUser.uid,
    );
    const selectedUserChats = await ChatAPI.getUserChatsIds(
      this.selectedUser.uid,
    );

    const chatIntersection = intersection(currentUserChats, selectedUserChats);
    if (!chatIntersection.length) return false;
    else return chatIntersection[0];
  };

  getChatRoomRef = async () => {
    // Get the chat room id that was passed to the chat (if it is provided)
    // Otherwise get the chat room based on the current user and the selected user
    if (!this.chatRoomId) {
      const isChat = await this.haveWeChatBefore();
      if (isChat) {
        this.chatRoomId = isChat;
      } else {
        this.chatRoomId = await this.createNewChat();
      }
    }

    return ChatAPI.dbRef.child(`chats/${this.chatRoomId}`);
  };

  saveUsersIdsToChat = async chatRef => {
    const usersIds = Object.keys(this.roomUsers);
    await chatRef.child('users').set(usersIds);
    return;
  };

  createNewChat = () =>
    new Promise(async resolve => {
      ChatAPI.dbRef
        .child('chats')
        .push()
        .then(async response => {
          const chatRoomId = response.key;
          const chatRef = ChatAPI.dbRef.child(`chats/${chatRoomId}`);

          await this.saveUsersIdsToChat(chatRef);

          await firebase
            .firestore()
            .collection('users')
            .doc(this.currentUser.uid)
            .update({
              chats: firebase.firestore.FieldValue.arrayUnion(chatRoomId),
            });

          await firebase
            .firestore()
            .collection('users')
            .doc(this.selectedUser.uid)
            .update({
              chats: firebase.firestore.FieldValue.arrayUnion(chatRoomId),
            });

          resolve(chatRoomId);
        });
    });

  incrementNumMessagesToShow = numMessagesToIncrement => {
    this.setState(prevState => ({
      numMessagesToShow: prevState.numMessagesToShow + numMessagesToIncrement,
    }));
  };

  goToChatEnd = () => {
    this.setState({
      numMessagesToShow: 15,
      lastMessageScrollTo: null,
      isGoEndVisible: false,
    }, () => this.prepareTheChat());
  };

  // Add the message to the messages property for the chat
  onSend = async messages => {
    if (!this.chatRoomId) {
      await this.prepareTheChat();
    }
    // Increment the unread messages count for users other than the current user
    ChatAPI.setOrIncrementUnreadMessageCount({
      roomId: this.chatRoomRef.key,
      userId: this.selectedUser.uid,
    });
    // Increase the limit of messages that are requested from firebase realtime database
    this.incrementNumMessagesToShow(1);

    const now = new Date().getTime();
    const encrypted = encrypt(messages[0].text);
    console.log(encrypted);
    console.log(decrypt(encrypted));
    const messageValues = {
      text: encrypted,
      createdAt: now,
      senderId: this.currentUser.uid,
    };
    this.chatRoomRef.child('messages').push(messageValues);
  };

  // Hide the Load Earlier Visible Messages button
  // if less messages are returned than are requested
  // The number of messages being requested is always a set amount
  // more than the last set, so if there are less than the number of requested messages,
  // then that means there are no more to send.
  toggleLoadEarlierButton = messages => {
    this.setState(prevState => ({
      isLoadEarlierVisible: messages.length === prevState.numMessagesToShow,
    }));
  };

  getUsersForChat = async () => {
    let roomUsers = {};

    const currUid = this.currentUser.uid;
    const selUid = this.selectedUser.uid;

    roomUsers[selUid] = this.selectedUser;
    roomUsers[currUid] = this.currentUser;

    return roomUsers;
  };

  // Firebase socket connection that will run every time a message
  // is added/removed from the messages property for the chat room
  liveUpdateMessages = messagesRef => {
    messagesRef.on('value', messagesSnapshot => {
      // Get all messages and re-map the array to a format that works for Gifted Chat component
      const messages = this.snapshotToArray(messagesSnapshot).map(message => {
        return {
          _id: message.createdAt,
          text: decrypt(message.text),
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.senderId,
            name:
              this.roomUsers[message.senderId].firstName +
              ' ' +
              this.roomUsers[message.senderId].lastName,
            // photoURL: this.roomUsers[message.uid].avatar
          },
        };
      });

      this.setState({messages: messages.reverse()});
    });
  };

  snapshotToArray(snapshot) {
    const returnArr = [];

    snapshot.forEach(childSnapshot => {
      const item = childSnapshot.val();
      item.id = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  }

  renderMessageBubble(props) {
    const myMessage =
      props.currentMessage.user._id === props.user._id ? true : false;
    return <Message text={props.currentMessage.text} fromMe={myMessage} />;
  }

  render() {
    const {isLoadEarlierVisible, messages, isGoEndVisible} = this.state;
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={this.onSend}
          renderMessage={this.renderMessageBubble}
          onLoadEarlier={() =>
            this.incrementNumMessagesToShow(this.state.numMessagesToIncrement)
          }
          user={{
            _id: this.currentUser.uid,
            name: this.currentUser.firstName + ' ' + this.currentUser.lastName,
            // photoURL: this.currentUser.avatar,
          }}
          loadEarlier={isLoadEarlierVisible}
          textInputStyle={styles.textInput}
          renderChatFooter={() => isGoEndVisible
            ? <ChatGoEnd onPress={this.goToChatEnd} text="Go to the end of chat" />
            : null
          }
        />
      </View>
    );
  }
}
