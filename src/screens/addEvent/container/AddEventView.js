import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './styles';
import ImagePicker from 'react-native-image-picker';
import Input from '../../../components/Input.js';
import Button from '../../../components/Button.js';
import Switch from '../../../components/Switch.js';
import DateInput from '../../../components/DateInput.js';
import validate from '../../../utils/validation';
import {addEvent, uploadImage} from '../../../api/events';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ImageCropPicker from 'react-native-image-crop-picker';

export default class AddEventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      eventName: '',
      date: '',
      time: '',
      description: '',
      location: '',
      free: false,
      price: '',
      ticketsUrl: '',
      messageMe: false,
      eventUrl: '',
      phone: '',
      photoAndroid: '',
      formErrors: {
        eventName: '',
        date: '',
        location: '',
        price: '',
        ticketsUrl: '',
        eventUrl: '',
        phone: '',
      },
      serverError: '',
      isLoading: false,
      latitude: 0,
      longitude: 0,
    };
    this.validationRules = {
      eventName: {
        presence: {
          message: '^Event name is required',
          allowEmpty: false,
        },
      },
      date: {
        presence: {
          message: '^Date is required',
          allowEmpty: false,
        },
      },
      location: {
        presence: {
          message: '^Location is required',
          allowEmpty: false,
        },
      },
      price: {
        presence: {
          message: '^Price is required',
          allowEmpty: false,
        },
      },
      ticketsUrl: {
        presence: {
          message: '^Tickets URL is required',
          allowEmpty: false,
        },
      },
      eventUrl: {
        presence: {
          message: '^Event URL is required',
          allowEmpty: false,
        },
      },
      phone: {
        presence: {
          message: '^Phone number is required',
          allowEmpty: false,
        },
      },
    };
  }

  showImagePicker = () => {
    const options = {
      title: 'Upload photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        this.setState({submitting: false});
        console.log('User cancelled image picker');
      } else if (response.error) {
        this.setState({submitting: false});
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response, 'REsp');
        this.setState({
          photo: response.uri,
          photoAndroid: Platform.OS === 'ios' ? '' : response.path,
        });
      }
    });
  };

  handleSubmit = () => {
    this.setState({isLoading: true});
    let {
      eventName,
      date,
      time,
      description,
      location,
      free,
      price,
      ticketsUrl,
      messageMe,
      eventUrl,
      phone,
      photo,
    } = this.state;
    let errors;
    if (!free) {
      errors = validate(
        {eventName, date, location, price, ticketsUrl, eventUrl, phone},
        this.validationRules,
      );
    } else {
      errors = validate(
        {eventName, date, location, phone},
        this.validationRules,
      );
    }

    let test = date + ' ' + time;
    if (
      errors &&
      (errors.eventName ||
        errors.date ||
        errors.location ||
        errors.price ||
        errors.phone)
    ) {
      this.setState({formErrors: errors, isLoading: false});
    } else {
      let splitResult = date.split('-');
      let newDate =
        splitResult[2] + '-' + splitResult[0] + '-' + splitResult[1];
      let formatDate = moment(
        newDate + ' ' + time,
        'YYYY-MM-DD HH:mm',
      ).format();
      let event = {
        coordinates: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
        date: formatDate,
        description: description,
        eventUrl: eventUrl,
        free: free,
        location: location,
        phone: phone,
        ticketsUrl: ticketsUrl,
        title: eventName,
        userIds: [],
        userId: this.props.currentUser.uid,
        unionId: this.props.currentUser.unionId,
        imageHeader: {
          src: photo,
        },
      };
      addEvent(event)
        .then(response => {
          if (photo) {
            let customPhoto =
              Platform.OS == 'ios' ? photo : this.state.photoAndroid;
            uploadImage(response.id, customPhoto)
              .then(res => {
                this.setState({isLoading: false});
                let newEventsList = this.props.events;
                newEventsList.push(event);
                this.props.setEvents(newEventsList);
                this.props.navigation.navigate('AllEvents');
              })
              .catch(() => {
                this.setState({isLoading: false});
              });
          } else {
            this.setState({isLoading: false});
            let newEventsList = this.props.events;
            newEventsList.push(event);
            this.props.setEvents(newEventsList);
            this.props.navigation.navigate('AllEvents');
          }
        })
        .catch(err => {
          this.setState({isLoading: false});
        });
    }
  };

  handleAdjustPic = () => {
    ImageCropPicker.openCropper({
      path: this.state.photo,
      width: 400,
      height: 180,
    })
      .then(response => {
        this.setState({
          photo: response.path,
          photoAndroid: response.path,
        }).catch(() => {});
      })
      .catch(() => {});
  };

  render() {
    let {
      eventName,
      date,
      time,
      description,
      location,
      free,
      price,
      ticketsUrl,
      messageMe,
      eventUrl,
      phone,
      photo,
      formErrors,
      isLoading,
    } = this.state;
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        {photo ? (
          <View>
            <TouchableOpacity onPress={this.showImagePicker}>
              <Image source={{uri: photo}} style={styles.uploadContainer} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleAdjustPic}>
              <Text style={styles.editPicText}>Edit </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={this.showImagePicker}
            style={styles.uploadContainer}>
            <Text style={styles.uploadText}>Upload photo</Text>
          </TouchableOpacity>
        )}

        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}>
          <View style={{marginHorizontal: 15}}>
            <Text style={styles.subtitle}>
              Just leave it blank if you want to use map as a cover for your
              location
            </Text>

            <Text style={styles.sectionTitle}>Details</Text>
            <Input
              value={eventName}
              label="Event name"
              onChangeText={value => this.setState({eventName: value})}
            />
            {!!formErrors.eventName && (
              <Text style={styles.textError}>{formErrors.eventName}</Text>
            )}
            <Text style={styles.subtitle}>Will be shown on the forums tab</Text>
            <DateInput
              date={date}
              mode="date"
              placeholder="Date"
              showIcon={false}
              onDateChange={value => this.setState({date: value})}
              dateFormat="MM-DD-YYYY"
            />
            {!!formErrors.date && (
              <Text style={styles.textError}>{formErrors.date}</Text>
            )}
            <DateInput
              date={time}
              mode="time"
              placeholder="Time"
              showIcon={false}
              onDateChange={value => this.setState({time: value})}
              dateFormat="hh:mm a"
            />
            <Text style={styles.subtitle}>Optional</Text>
            <Input
              value={description}
              label="Description"
              onChangeText={value => this.setState({description: value})}
              keyboardType="web-search"
            />
            <Text style={styles.subtitle}>Optional</Text>
            {/* <Input
              value={location}
              label="Location"
              onChangeText={value => this.setState({location: value})}
            /> */}
            <GooglePlacesAutocomplete
              listViewDisplayed={false}
              placeholder="Location"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'}
              keyboardAppearance={'light'}
              fetchDetails={true}
              renderDescription={row => row.description}
              onPress={(data, details = null) => {
                console.log(details);
                this.setState({
                  location: details.formatted_address,
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                });
              }}
              getDefaultValue={() => ''}
              query={{
                key: 'AIzaSyB06-2vI_pQ_e4NMCFc-s8hCWJTsojynV4',
                language: 'en',
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: '#fff',
                  borderTopWidth: 0,
                  width: '100%',
                  paddingLeft: 0,
                },
                textInput: {
                  paddingLeft: 0,
                  marginLeft: 0,
                  fontSize: 20,
                  color: 'rgba(0,0,0,0.4)',
                },
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              GooglePlacesSearchQuery={{
                rankby: 'distance',
              }}
              GooglePlacesDetailsQuery={{
                fields: ['formatted_address', 'geometry'],
              }}
              debounce={200}
            />
            {!!formErrors.location && (
              <Text style={styles.textError}>{formErrors.location}</Text>
            )}
            <Text style={styles.sectionTitle}>Tickets</Text>
            <Switch
              value={free}
              label="Free"
              onValueChange={value => this.setState({free: value})}
            />
            {!free && (
              <View>
                <Input
                  value={price}
                  label="Price range"
                  onChangeText={value => this.setState({price: value})}
                  keyboardType="numbers-and-punctuation"
                />
                {!!formErrors.price && (
                  <Text style={styles.textError}>{formErrors.price}</Text>
                )}
              </View>
            )}

            <Input
              value={ticketsUrl}
              label="Tickets URL"
              onChangeText={value => this.setState({ticketsUrl: value})}
              keyboardType="url"
              autoCorrect={false}
              autoCapitalize={'none'}
            />
            {!!formErrors.ticketsUrl && (
              <Text style={styles.textError}>{formErrors.ticketsUrl}</Text>
            )}
            <Text style={styles.subtitle}>
              Please enter url where users can buy tickets
            </Text>
            <Text style={styles.sectionTitle}>Contact</Text>
            <Switch
              value={messageMe}
              label="Message me"
              onValueChange={value => this.setState({messageMe: value})}
              onChangeText={value => this.setState({messageMe: value})}
            />
            <Text style={styles.subtitle}>
              Users can contact you regarding this event via app
            </Text>
            <Input
              value={eventUrl}
              label="Event URL"
              onChangeText={value => this.setState({eventUrl: value})}
              keyboardType="url"
              autoCorrect={false}
              autoCapitalize={'none'}
            />
            <Text style={styles.subtitle}>Optional</Text>
            {!!formErrors.eventUrl && (
              <Text style={styles.textError}>{formErrors.eventUrl}</Text>
            )}
            <Input
              value={phone}
              label="Contact phone"
              onChangeText={value => this.setState({phone: value})}
              keyboardType="phone-pad"
            />
            {!!formErrors.phone && (
              <Text style={styles.textError}>{formErrors.phone}</Text>
            )}
            <Button
              text="Create"
              containerStyles={styles.button}
              onPress={this.handleSubmit}
              disabled={isLoading}
            />
          </View>
        </KeyboardAwareScrollView>

        {isLoading && <ActivityIndicator />}
      </ScrollView>
    );
  }
}
