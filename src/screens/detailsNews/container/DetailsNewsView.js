import React, {Component} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {CAROUSEL_TEST} from '../../../assets/index';
import TimeAgo from 'react-native-timeago';
import {colors} from '../../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import HTMLView from 'react-native-htmlview';
import OpenURLButton from '../../../components/UrlLink';

export default class DetailsNewsView extends Component {
  nextArticle = () => {
    let index = this.props.news.findIndex(
      news => news.id == this.props.currentNews.id,
    );
    if (index === this.props.news.length - 1) {
      this.props.navigation.navigate('AllNews');
    } else {
      this.props.setCurrentNews(this.props.news[index + 1]);
      this.props.navigation.navigate('DetailsNews');
      this.scrollView.scrollResponderScrollTo({x: 0, y: 0, animated: false});
    }
  };

  render() {
    const {currentNews} = this.props;
    return (
      <ScrollView ref={ref => (this.scrollView = ref)}>
        <View>
          <Image
            source={{uri: currentNews.imageHeader && currentNews.imageHeader.src}}
            style={styles.image}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>{currentNews.title}</Text>
          <Text style={styles.ago}>
            <TimeAgo
              time={currentNews.date.toDate()}
              interval={10000}
              hideAgo={true}
            />
          </Text>
          <HTMLView value={currentNews.content} stylesheet={styles.content} />
          {currentNews.contentUrl && (
            <OpenURLButton url={currentNews.contentUrl}>Read More</OpenURLButton>
          )}
          <TouchableOpacity style={styles.nextView} onPress={this.nextArticle}>
            <Icon name="arrow-circle-down" size={40} color={colors.grey} />
            <Text style={styles.nextText}>Next article</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
