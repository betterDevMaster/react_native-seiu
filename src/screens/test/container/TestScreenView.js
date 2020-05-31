import React, {Component} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

import MainContainer from '../../../components/MainContainer.js';
import Button from '../../../components/Button.js';
import TransparentButton from '../../../components/TransparentButton.js';
import Link from '../../../components/Link.js';
import LoginTitle from '../../../components/LoginTitle.js';
import LoginSubtitle from '../../../components/LoginSubtitle.js';
import Input from '../../../components/Input.js';
import BackButton from '../../../components/BackButton.js';
import ChatTopBar from '../../../components/ChatTopBar.js';
import Message from '../../../components/Message.js';
import ChatInput from '../../../components/ChatInput.js';
import SearchBox from '../../../components/SearchBox.js';
import InboxRow from '../../../components/InboxRow.js';

export default class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
    };
  }

  user1 = {
    "avatar": "",
    "name": "Amolika Shaikh",
    "message": "Hello, friend! How are you? How are things going?",
    "date": "3 days"
  }
  user2 = {
    "avatar": "",
    "name": "Dobroslawa Antokolskiy",
    "message": "Caritas-Nursing ethics presentation.",
    "date": "4 days"
  }
  user3 = {
    "avatar": "",
    "name": "Chandrashekar Ganguli",
    "message": "Hello, friend! How are you?",
    "date": "5 days"
  }

  handleContentChange = text => {
    this.setState({text});
  };

  render() {
    return (
      <MainContainer>

        <BackButton />

        <LoginTitle text="Forgot Password" />

        <Button text="Next" disabled={true} />

        <TransparentButton text="Maybe later" />

        <Link text="Forgot password?" /> 

        <LoginTitle text="Login" />

        <LoginSubtitle text="SEIU United Heathcare USA" />

        <Input label="Something" />

        <Input label="Zip Code" />

        <View style={styles.separator} />

        <ChatTopBar name="Dobroslawa Antokolskiy"/>

        <Message text="Welcome!" fromMe={false} />
        <Message text="Hi, thank you!" fromMe={true} />

        <ChatInput 
          placeholder="Write a message"
          onChangeText={value => this.handleContentChange(value)}
        />

        <View style={styles.separator} />

        <SearchBox 
          placeholder="Search message"
          onChangeText={value => this.handleContentChange(value)}
        />

        <InboxRow userInfo={this.user1} newMessage={true} />
        <InboxRow userInfo={this.user2} newMessage={false} />
        <InboxRow userInfo={this.user3} newMessage={true} />


      </MainContainer>
    );
  }
}
