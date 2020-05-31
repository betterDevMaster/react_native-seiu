import React, {Component} from 'react';
import {View} from 'react-native';
import TopicModalItem from '../../components/TopicModalItem';
import TopicModalTitle from '../../components/TopicModalTitle';
import {styles} from './styles';

export default class ConfirmModal extends Component {
  handleClickOutside = () => {
    this.props.onBack();
  };

  handleClickInside = e => {
    e.stopPropagation();
  };

  render() {
    const {confirm, onBack, title} = this.props;

    return (
      <View
        onTouchEnd={this.handleClickOutside}
        style={styles.container}
      >
        <View style={styles.content} onTouchEnd={this.handleClickInside}>
          <TopicModalTitle text={title} />
          <TopicModalItem
            text="Cancel"
            onPress={onBack}
          />
          <TopicModalItem
            text="Confirm"
            onPress={confirm}
            deleteItem
            noBorder
          />
        </View>
      </View>
    );
  }
}
