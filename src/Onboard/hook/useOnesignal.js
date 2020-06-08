import {useState} from 'react';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';

export default () => {
  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const oneSignal = async () => {
    try {
      //   const deviceInfo=await
      let version = await DeviceInfo.getVersion();
      console.log(version);
    } catch (err) {
      //   clg(err);
    }
  };

  return [oneSignal];
};
