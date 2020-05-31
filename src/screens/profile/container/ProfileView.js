import React, {Component} from 'react';
import {
  SectionList,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {getUnion, logout, uploadAvatar} from '../../../api/auth';
import ProfileListItem from '../../../components/ProfileListItem.js';
import ActivityIndicator from '../../../components/ActivityIndicator.js';
import Avatar from '../../../components/Avatar.js';
import menuItems from './menuItems';
import {styles} from './styles';

export default class ProfileView extends Component {
  state = {
    avatar: this.props.avatar,
    submitting: false,
    union: null,
  };

  componentDidMount() {
    const {unionId} = this.props.user;

    getUnion(unionId).then(union => {
      this.setState({union});
    });
  }

  handlePressMenuItem = link => {
    const {union} = this.state;

    if (!link) {
      return;
    }
    if (link === '#logout') {
      return this.handleLogout();
    }
    if (link.startsWith('mailto')) {
      Linking.openURL(link);
    } else {
      const navigationOptions =
        link === 'UnionMembers'
          ? {
              title: (union && union.name) || 'All users',
              unionId: union && union.id,
            }
          : {};
      this.props.navigation.navigate(link, navigationOptions);
    }
  };

  handleLogout = () => {
    logout().then(() => {
      this.props.logout();
      this.props.navigation.navigate('Login');
    });
  };

  showImagePicker = () => {
    const {user, setUser} = this.props;

    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      this.setState({submitting: true});
      if (response.didCancel) {
        this.setState({submitting: false});
        console.log('User cancelled image picker');
      } else if (response.error) {
        this.setState({submitting: false});
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          avatar: Platform.OS === 'ios' ? response.uri : response.path,
        });
        uploadAvatar(
          user.uid,
          Platform.OS === 'ios' ? response.uri : response.path,
        )
          .then(() => {
            this.setState({submitting: false});
            setUser({...user, avatar: response.uri});
          })
          .catch(err => {
            this.setState({submitting: false});
            console.log('Image upload error:', err);
          });
      }
    });
  };

  render() {
    const {submitting, union} = this.state;
    const {user} = this.props;
    const unionName = union ? union.name : 'No Union';

    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <TouchableOpacity onPress={this.showImagePicker}>
            <Avatar uri={user.avatar} name={user.firstName} />
          </TouchableOpacity>
          <Text style={styles.name}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.union}>{unionName}</Text>
        </View>
        <SectionList
          sections={menuItems(unionName)}
          renderItem={({item}) => (
            <ProfileListItem
              text={item.label}
              icon={item.icon}
              link={item.link}
              onPress={this.handlePressMenuItem}
            />
          )}
          renderSectionHeader={() => <View style={styles.sectionHeader} />}
          keyExtractor={(item, index) => index}
          stickySectionHeadersEnabled={false}
        />
        {submitting && <ActivityIndicator />}
      </View>
    );
  }
}
