import React, {useCallback} from 'react';
import {Alert, TouchableOpacity, Linking, Text} from 'react-native';
import {styles} from './styles';

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      try {
        await Linking.openURL(url);
      } catch (e) {
        Alert.alert(`This URL can't be opened: ${url}`);
      }
    } else {
      Alert.alert(`This URL can't be opened: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default OpenURLButton;