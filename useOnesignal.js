import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  signalData,
  signalOffData,
} from './src/Screens/LoginScreen/Action/Action';

export default () => {
  const dispatch = useDispatch();
  const notificationPush = data => {
    dispatch(signalData(data));
  };
  const notificationOff = data => {
    dispatch(signalOffData(data));
  };

  return [notificationPush, notificationOff];
};
