import React, {Component} from 'react';
import {View} from 'react-native';
import TopicModalItem from '../../components/TopicModalItem';
import TopicModalTitle from '../../components/TopicModalTitle';
import {styles} from './styles';

export default class TopicModal extends Component {
  handleClickOutside = () => {
    this.props.onBack();
  };

  handleClickInside = e => {
    e.stopPropagation();
  };

  render() {
    const {topicTitle, onBack, deleteTopic, editTopic} = this.props;

    return (
      <View
        onTouchEnd={this.handleClickOutside}
        style={styles.container}
      >
        <View style={styles.content} onTouchEnd={this.handleClickInside}>
          <TopicModalTitle text={topicTitle} />
          <TopicModalItem
            text="Edit"
            onPress={editTopic}
          />
          <TopicModalItem
            text="Delete"
            onPress={deleteTopic}
            deleteItem
            noBorder
          />
        </View>
        <View style={styles.content} onTouchEnd={this.handleClickInside}>
          <TopicModalItem
            text="Cancel"
            onPress={onBack}
            noBorder
          />
        </View>
      </View>
    );
  }
}
