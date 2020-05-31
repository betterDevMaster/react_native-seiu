import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {createTopic, editTopic} from '../../../api/forum';
import Input from '../../../components/Input.js';
import Button from '../../../components/Button.js';
import ActivityIndicator from '../../../components/ActivityIndicator.js';
import {styles} from './styles';
import {colors} from '../../../utils/colors';
import {getUnionUsers} from '../../../api/auth';

export default class ForumNewTopicView extends Component {
  state = {
    title: '',
    selectedType: [],
    type: '',
    usersList: [],
    selectedUsersList: []
  };

  componentDidMount() {
    const {user, navigation} = this.props;

    getUnionUsers(user.unionId)
      .then(users => {
        const filtered = users
          .filter(item => item.uid !== user.uid)
          .map(item => ({id: item.uid, name: `${item.firstName} ${item.lastName}`}))

        this.setState({
          usersList: [{
            id: 0,
            children: filtered
          }]
        })
      })

    const topicTitleEdit = navigation.getParam('topicTitle');
    const topicTypeEdit = navigation.getParam('topicType');
    const topicUsersEdit = navigation.getParam('topicUsers');

    if (topicTitleEdit) {
      this.setState({
        title: topicTitleEdit,
      });
    }

    if (topicTypeEdit) {
      this.setState({
        selectedType: [topicTypeEdit],
        type: topicTypeEdit,
      });
    }

    if (topicUsersEdit && Array.isArray(topicUsersEdit)) {
      this.setState({
        selectedUsersList: topicUsersEdit.filter(id => id !== user.uid),
      });
    }
  }

  disableSubmit = () => {
    const {title, type, selectedUsersList} = this.state;
    if (type === 'public' && title) {
      return false;
    } else if (type === 'private' && title && selectedUsersList.length > 0) {
      return false;
    }
    return true;
  };

  handleChange = value => {
    this.setState({title: value});
  };

  onSelectedTypeChange = (type) => {
    if (type[0] === 'public') {
      this.setState({
        selectedType: type,
        type: type[0],
        selectedUsersList: []
      });
    } else {
      this.setState({
        selectedType: type,
        type: type[0],
      });
    }
  };

  onSelectedUsersChange = (selectedUsers) => {
    this.setState({selectedUsersList: [...selectedUsers]});
  };

  handleCreate = () => {
    const {title, type, selectedUsersList} = this.state;
    const {user, navigation} = this.props;
    const categoryId = navigation.getParam('categoryId');
    const topicData = {
      title,
      type,
      authorId: user.uid,
      authorName: `${user.firstName} ${user.lastName}`,
      authorAvatar: user.avatar || '',
      // TODO: revisit
      tags: ['discussion'],
      replyCount: 0,
      updatedAt: new Date().getTime(),
    };

    if (type === 'private') {
      topicData.users = [user.uid, ...selectedUsersList];
    }

    this.setState({submitting: true});
    createTopic(categoryId, topicData)
      .then(() => {
        this.setState({submitting: false});
        navigation.getParam('reloadTopics')();
        navigation.goBack();
      })
      .catch(err => {
        this.setState({submitting: false});
        console.log('Error while creating topic:', err);
      });
  };

  handleEdit = () => {
    const {title, type, selectedUsersList} = this.state;
    const {navigation, user} = this.props;
    const categoryId = navigation.getParam('categoryId');
    const topicId = navigation.getParam('topicId');

    let topicUsers = [];
    if (type === 'private') {
      topicUsers = [user.uid, ...selectedUsersList];
    }

    this.setState({submitting: true});
    editTopic(categoryId, topicId, title, type, topicUsers)
      .then(() => {
        this.setState({submitting: false});
        navigation.getParam('reloadTopics')();
        navigation.getParam('setTitle')(title);
        navigation.getParam('setType')(type);
        navigation.getParam('setUsers')(topicUsers);
        navigation.goBack();
      })
      .catch(err => {
        this.setState({submitting: false});
        console.log('Error while updating topic:', err);
      });
  };

  render() {
    const {title, submitting, type, usersList, selectedType, selectedUsersList} = this.state;
    const {navigation} = this.props;

    const topicId = navigation.getParam('topicId');
    const isEditForm = !!topicId;

    return (
      <View style={styles.container}>
        <Input
          label="Topic name"
          onChangeText={this.handleChange}
          value={title}
        />
        <Text style={styles.description}>
          Will appear under the current forum heading
        </Text>
        <SectionedMultiSelect
          items={[
            {
              id: 0,
              children: [
                {
                  name: 'Public',
                  id: 'public',
                },
                {
                  name: 'Private',
                  id: 'private',
                },
              ],
            },
          ]}
          uniqueKey="id"
          subKey="children"
          searchPlaceholderText="Search topic types..."
          selectText="Select topic type"
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedTypeChange}
          selectedItems={selectedType}
          single={true}
          modalWithTouchable
          modalWithSafeAreaView
          hideConfirm
          showDropDowns={false}
          colors={{
            success: colors.purple,
            subText: colors.black,
            searchPlaceholder: colors.grey,
            text: colors.grey,
            primary: colors.black,
            chipColor: colors.black
          }}
          styles={{
            selectToggle: styles.selectToggle,
            selectToggleText: type ? styles.selectSelectedText : styles.selectToggleText,
          }}
        />
        {type === 'private' && (
          <SectionedMultiSelect
            items={usersList}
            uniqueKey="id"
            subKey="children"
            searchPlaceholderText="Search union users..."
            selectText="Select topic users"
            readOnlyHeadings={true}
            onSelectedItemsChange={this.onSelectedUsersChange}
            selectedItems={selectedUsersList}
            modalWithTouchable
            modalWithSafeAreaView
            showDropDowns={false}
            showChips={false}
            colors={{
              success: colors.purple,
              subText: colors.black,
              searchPlaceholder: colors.grey,
              text: colors.grey,
              primary: colors.black,
              chipColor: colors.black
            }}
            styles={{
              selectToggle: styles.selectToggle,
              selectToggleText: selectedUsersList.length > 0 ? styles.selectSelectedText : styles.selectToggleText,
            }}
          />
        )}
        <Button
          containerStyles={styles.button}
          text={isEditForm ? "Edit" : "Create"}
          onPress={isEditForm ? this.handleEdit : this.handleCreate}
          disabled={this.disableSubmit()}
        />
        {submitting && <ActivityIndicator />}
      </View>
    );
  }
}
