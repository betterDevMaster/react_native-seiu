import React, {useEffect, useRef} from 'react';
import {styles} from './styles';
import {colors} from '../../utils/colors';
import {TextField} from 'react-native-material-textfield';

export default ({
                  label,
                  keyboardType,
                  onChangeText,
                  autoCapitalize,
                  secureTextEntry,
                  value,
                  editable,
                  autoCorrect
                }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.setValue(value);
  }, [value]);

  return (
    <TextField
      label={label}
      labelTextStyle={{...styles.label}}
      titleTextStyle={{...styles.inputText}}
      activeLineWidth={1}
      tintColor={colors.yellow}
      baseColor="rgba(0,0,0,0.4)"
      textColor={colors.black}
      fontSize={20}
      labelFontSize={14}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      value={value}
      defaultValue=""
      editable={editable}
      autoCorrect={autoCorrect}
      ref={inputEl}
    />
  );
};