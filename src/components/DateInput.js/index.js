import React, {Component} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {styles} from './styles';

export default class DateInput extends Component {
  render() {
    const {
      style,
      mode,
      placeholder,
      date,
      onDateChange,
      dateFormat,
    } = this.props;
    return (
      <View>
        <DatePicker
          date={date}
          confirmBtnText="Ok"
          cancelBtnText="Cancel"
          style={[styles.container, style]}
          mode={mode}
          placeholder={placeholder}
          customStyles={{
            dateInput: styles.dateInput,
            dateText: styles.dateText,
            placeholderText: styles.placeholderText,
          }}
          onDateChange={onDateChange}
          showIcon={false}
          format={this.props.dateFormat}
        />
      </View>
    );
  }
}
