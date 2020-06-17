import {useState} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Instance from '../../Api/Instance';

export default () => {
  const [styled, setStyles] = useState([]);
  const [ongoing, setOnGoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(false);
  const [profile, setProfile] = useState([]);
  const [password, setPassword] = useState('');
  const options = {};
  const [errorMessage, setErrorMessage] = useState('');

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };
  /**toggle visibility online */

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await Instance.get('vendors/profile?provider=vendor', {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });
      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        setProfile(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
      }
    } catch (err) {
      setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  const updateProfile = async data => {
    setLoading(true);
    try {
      const response = await Instance.put(
        'vendors/profile/update?provider=vendor',
        data,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      let s = response.data.status;
      let m = response.data.message;

      if (s) {
        setLoading(false);
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 5000,
          style: Style,
        });
        getProfile();
      } else {
        setLoading(false);
        // setReqMessage(m);
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
      }
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
      alert(err);
    }
  };

  const updatePassword = async data => {
    setLoading(true);
    try {
      const response = await Instance.put(
        'vendors/profile/password/update?provider=vendor',
        data,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      let s = response.data.status;
      let m = response.data.message;

      if (s) {
        setLoading(false);
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 5000,
          style: Style,
        });
        setPassword(' ');
        getProfile();
      } else {
        setLoading(false);
        // setReqMessage(m);
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
      }
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
      alert(err);
    }
  };

  return [
    loading,
    setLoading,
    online,
    profile,
    getProfile,
    updateProfile,
    updatePassword,
    password,
    setPassword,
  ];
};
