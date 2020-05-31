import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import ProfileListItem from '../../components/ProfileListItem.js';
import Avatar from '../../components/Avatar.js';
import menuItems from './menuItems';
import {styles} from './styles';
import {getUnion} from '../../api/auth';

export default class UserModal extends Component {
  state = {
    union: null,
  };

  componentDidMount() {
    const {unionId} = this.props.user;
    getUnion(unionId).then(union => this.setState({union}));
  }

  handlePressMenuItem = link => {
    const {
      onBack,
      currentUser,
      user,
      backRoute = 'Profile',
      onPressUnion,
    } = this.props;
    switch (link) {
      case '#union':
        return onPressUnion ? onPressUnion(user.unionId) : onBack();
      case '#chat':
        this.props.navigation.navigate('Chat', {
          currentUser,
          selectedUser: user,
          backRoute,
        });
        break;
      case '#report':
        break;
    }
  };

  handleClickOutside = e => {
    this.props.onBack();
  };

  handleClickInside = e => {
    e.stopPropagation();
  };

  render() {
    const {firstName, lastName, avatar} = this.props.user || {};
    const {union} = this.state;
    const unionName = union ? union.name : 'No Union';

    return (
      <View
        onTouchEnd={this.handleClickOutside}
        style={[styles.container, !this.props.user && styles.hidden]}>
        <View style={styles.content} onTouchEnd={this.handleClickInside}>
          <View style={styles.topSection}>
            <Avatar uri={avatar} name={firstName} />
            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>
          </View>
          <FlatList
            data={menuItems(unionName)}
            renderItem={({item}) => (
              <ProfileListItem
                text={item.label}
                icon={item.icon}
                link={item.link}
                onPress={this.handlePressMenuItem}
              />
            )}
            keyExtractor={(item, index) => String(index)}
            style={styles.menu}
          />
        </View>
      </View>
    );
  }
}
