import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {signalData} from './src/Screens/LoginScreen/Action/Action';

export default () => {
  const dispatch = useDispatch();
  const notificationPush = data => {
    dispatch(signalData(data));
  };

  return [notificationPush];
};
