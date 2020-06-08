import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const Inputs = ({placeholder, color, textChange, status}) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        // errorStyle={{color: 'red'}}
        // errorMessage="ENTER A VALID ERROR HERE"
        style={color === 'green' ? styles.inputsTwo : styles.inputs}
        placeholderTextColor={color === 'green' ? '#3D7782' : '#707070'}
        onChangeText={textChange}
        secureTextEntry={placeholder === 'Password' ? status : false}
      />
    </View>
  );
};

export default Inputs;

const styles = StyleSheet.create({
  inputs: {
    width: widthPercentageToDP('68%'),
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    color: '#FFFFFF',
    fontSize: heightPercentageToDP('2.157%'),
    textAlign: 'center',
    paddingBottom: 4,
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  inputsTwo: {
    width: widthPercentageToDP('68%'),
    borderBottomWidth: 1,
    borderBottomColor: '#3D7782',
    color: '#3D7782',
    fontSize: 14,
    textAlign: 'center',
    paddingBottom: 4,
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
});
