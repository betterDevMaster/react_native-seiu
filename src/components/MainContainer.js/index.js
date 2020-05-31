import React, {Component} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {styles} from './styles';

export default class MainContainer extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {this.props.children}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
