import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Share,
  AsyncStorage,
  Platform,
} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import NewsContainer from '../screens/news/container/NewsContainer';
import EventsContainer from '../screens/events/container/EventsContainer';
import ForumContainer from '../screens/forum/container/ForumContainer';
import ForumTopicsContainer from '../screens/forumTopics/container/ForumTopicsContainer';
import ForumNewTopicContainer from '../screens/forumNewTopic/container/ForumNewTopicContainer';
import ForumThreadsContainer from '../screens/forumThreads/container/ForumThreadsContainer';
import InboxContainer from '../screens/inbox/container/InboxContainer';
import ChatContainer from '../screens/chat/container/ChatContainer';
import ProfileContainer from '../screens/profile/container/ProfileContainer';
import PersonalContainer from '../screens/personal/container/PersonalContainer';
import NotificationsContainer from '../screens/notifications/container/NotificationsContainer';
import ChangePasswordContainer from '../screens/changePassword/container/ChangePasswordContainer';
import PrivacyContainer from '../screens/privacy/container/PrivacyContainer';
import AboutContainer from '../screens/about/container/AboutContainer';
import DetailsNewsContainer from '../screens/detailsNews/container/DetailsNewsContainer';
import DetailsEventContainer from '../screens/detailsEvent/container/DetailsEventContainer';
import AddEventContainer from '../screens/addEvent/container/AddEventContainer';
import {ScreenNames} from './NavigationConstants';
import {colors} from '../utils/colors';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Entypo';
import {
  TAB_NEWS,
  TAB_NEWS_SELECTED,
  TAB_EVENTS,
  TAB_EVENTS_SELECTED,
  TAB_FORUM,
  TAB_FORUM_SELECTED,
  TAB_INBOX,
  TAB_INBOX_SELECTED,
  SHARE,
} from '../assets';
import UsersContainer from '../screens/users/container/UsersContainer';
import {NavigationActions} from 'react-navigation';
import BackButton from '../components/BackButton.js';
import TransparentButton from '../components/TransparentButton.js';

const onShare = async () => {
  AsyncStorage.getItem('newsTitle').then(title => {
    AsyncStorage.getItem('news').then(async message => {
      try {
        const result = await Share.share(
          {
            message: message,
          },
          {dialogTitle: title, subject: title, title: title},
        );
      } catch (error) {
        console.log(error.message);
      }
    });
  });
};

function UserProfile() {
  return (
    <View
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.brown,
        justifyContent: 'center',
      }}>
      <Text
        style={{fontWeight: 'bold', textAlign: 'center', color: colors.white}}>
        P
      </Text>
    </View>
  );
}

function hideBottomTabs(navigation, route) {
  const currentRoute = navigation.state.routes[navigation.state.index];
  const {routeName} = currentRoute;
  if (routeName === route) {
    return false;
  }
  return true;
}

export default createBottomTabNavigator(
  {
    [ScreenNames.NEWS]: {
      screen: createStackNavigator({
        AllNews: {
          screen: NewsContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: 'News',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: Platform.OS === 'ios' ? 0 : -10,
              marginBottom: Platform.OS === 'ios' ? 0 : -20,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
              marginHorizontal: 5,
            },
          }),
        },
        DetailsNews: {
          screen: DetailsNewsContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: '',

            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: (
              <TouchableOpacity style={{padding: 20}} onPress={() => onShare()}>
                <Image source={SHARE} />
              </TouchableOpacity>
            ),
          }),
        },
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          if (focused) {
            return <Image source={TAB_NEWS_SELECTED} />;
          } else {
            return <Image source={TAB_NEWS} />;
          }
        },
      },
    },
    [ScreenNames.EVENTS]: {
      screen: createStackNavigator({
        AllEvents: {
          screen: EventsContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: 'Events',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerRight: (
              <View style={{marginRight: 20}}>
                <TransparentButton
                  text="New event"
                  containerStyles={{
                    padding: 2,
                    paddingHorizontal: 10,
                  }}
                  textStyles={{fontSize: 12, fontWeight: 'bold'}}
                  onPress={() => navigation.navigate('AddEvent')}
                />
              </View>
            ),
          }),
        },
        DetailsEvent: {
          screen: DetailsEventContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: '',

            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => navigation.goBack()}
              />
            ),
          }),
        },
        AddEvent: {
          screen: AddEventContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: 'New Event',

            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => navigation.goBack()}
              />
            ),
          }),
        },
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          if (focused) {
            return <Image source={TAB_EVENTS_SELECTED} />;
          } else {
            return <Image source={TAB_EVENTS} />;
          }
        },
      },
    },
    [ScreenNames.FORUM]: {
      screen: createStackNavigator({
        Categories: {
          screen: ForumContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: 'Forum',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
          }),
        },
        Topics: {
          screen: ForumTopicsContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: navigation.getParam('title'),
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: (
              <View style={{marginRight: 20}}>
                <TransparentButton
                  text="New topic"
                  containerStyles={{
                    padding: 2,
                    paddingHorizontal: 10,
                  }}
                  textStyles={{fontSize: 12, fontWeight: 'bold'}}
                  onPress={() =>
                    navigation.navigate('NewTopic', {
                      categoryId: navigation.getParam('categoryId'),
                      reloadTopics: navigation.getParam('reloadTopics'),
                    })
                  }
                />
              </View>
            ),
          }),
        },
        NewTopic: {
          screen: ForumNewTopicContainer,
          navigationOptions: ({navigation}) => {
            const topicId = navigation.getParam('topicId');
            const isEditForm = !!topicId;

            return {
              headerTitle: isEditForm ? 'Edit Topic' : 'New Topic',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
              },
              headerStyle: {
                borderBottomWidth: 0,
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerLeft: (
                <BackButton
                  containerStyles={{marginLeft: 15, padding: 10}}
                  onPress={() => navigation.goBack()}
                />
              ),
            };
          },
        },
        Threads: {
          screen: ForumThreadsContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: navigation.getParam('title'),
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 14,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => {
                  navigation.goBack();
                  navigation.getParam('reloadTopics')();
                }}
              />
            ),
            headerRight: () => {
              if (navigation.getParam('isTopicAuthor')) {
                return (
                  <TouchableOpacity
                    style={{marginRight: 20}}
                    onPress={() => navigation.getParam('openTopicModal')()}>
                    <Icon
                      name="dots-three-horizontal"
                      size={25}
                      style={{color: colors.purple}}
                    />
                  </TouchableOpacity>
                );
              }
              return null;
            },
          }),
        },
      }),
      navigationOptions: ({navigation}) => ({
        tabBarVisible: hideBottomTabs(navigation, 'Threads'),
        tabBarIcon: ({focused}) => {
          if (focused) {
            return <Image source={TAB_FORUM_SELECTED} />;
          } else {
            return <Image source={TAB_FORUM} />;
          }
        },
      }),
    },
    [ScreenNames.INBOX]: {
      screen: createStackNavigator({
        AllInbox: {
          screen: InboxContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: 'Inbox',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerRight: (
              <TouchableOpacity
                onPress={() => {
                  const unionId = navigation.getParam('unionId');
                  const title = navigation.getParam('title');

                  if (unionId) {
                    navigation.navigate('UnionMembers', {
                      unionId,
                      title,
                      fromInbox: true,
                    });
                  }
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: colors.purple,
                    marginRight: 10,
                    padding: 10,
                    paddingTop: 0,
                  }}>
                  +
                </Text>
              </TouchableOpacity>
            ),
          }),
        },
        UnionMembers: {
          screen: UsersContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: (
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  {navigation.getParam('title')}
                </Text>
                <Text
                  style={{fontSize: 12, color: colors.textGrey, marginTop: 2}}>
                  {navigation.getParam('subtitle')}
                </Text>
              </View>
            ),
            headerTitleStyle: {
              fontWeight: 'bold',
              flex: 1,
              textAlign: 'center',
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => navigation.goBack()}
              />
            ),
          }),
        },
        Chat: {
          screen: ChatContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: navigation.getParam('chatTitle', ''),
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => {
                  navigation.goBack();
                  const backRoute = navigation.getParam('backRoute');
                  if (backRoute) {
                    navigation.navigate(backRoute);
                  }
                }}
              />
            ),
          }),
        },
      }),

      navigationOptions: ({navigation}) => ({
        tabBarVisible: hideBottomTabs(navigation, 'Chat'),
        tabBarIcon: ({focused}) => {
          if (focused) {
            return <Image source={TAB_INBOX_SELECTED} />;
          } else {
            return <Image source={TAB_INBOX} />;
          }
        },
      }),
    },
    [ScreenNames.PROFILE]: {
      screen: createStackNavigator({
        Profile: {
          screen: ProfileContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: 'Profile',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
          }),
        },
        UnionMembers: {
          screen: UsersContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: (
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  {navigation.getParam('title')}
                </Text>
                <Text
                  style={{fontSize: 12, color: colors.textGrey, marginTop: 2}}>
                  {navigation.getParam('subtitle')}
                </Text>
              </View>
            ),
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => {
                  navigation.goBack();
                  const backRoute = navigation.getParam('backRoute');
                  if (backRoute) {
                    navigation.navigate(backRoute);
                  }
                }}
              />
            ),
          }),
        },
        Personal: {
          screen: PersonalContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: 'Personal',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => navigation.goBack()}
              />
            ),
          }),
        },
        Privacy: {
          screen: PrivacyContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: 'Privacy',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => navigation.goBack()}
              />
            ),
          }),
        },
        ChangePassword: {
          screen: ChangePasswordContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: 'Password',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => navigation.goBack()}
              />
            ),
          }),
        },
        Notifications: {
          screen: NotificationsContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: 'Notifications',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => navigation.goBack()}
              />
            ),
          }),
        },
        About: {
          screen: AboutContainer,
          navigationOptions: ({navigation}) => ({
            headerTitle: 'About',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerLeft: (
              <BackButton
                containerStyles={{marginLeft: 15, padding: 10}}
                onPress={() => navigation.goBack()}
              />
            ),
          }),
        },
      }),
      navigationOptions: {
        tabBarIcon: () => {
          return UserProfile();
        },
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: colors.yellow,
      inactiveTintColor: colors.white,
      labelStyle: {fontWeight: 'bold', marginBottom: 10},
      style: {
        backgroundColor: colors.purple,
        height: 65,
      },
    },
  },
);
