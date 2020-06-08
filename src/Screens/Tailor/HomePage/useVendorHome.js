import {useState} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Instance from '../../../Api/Instance';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export default () => {
  const [styled, setStyles] = useState([]);
  const [ongoing, setOnGoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(false);
  const [profile, setProfile] = useState([]);
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
  const handleToggle = () => {
    setLoading(true);
    const request = new Promise(res => {
      res(
        Instance.put(
          'vendors/tailor/toggle-visibility?provider=vendor',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + access_token,
            },
          },
        ),
      );
    });
    request.then(({data: data}) => {
      console.log(data);
      let s = data.status;
      let m = data.message;
      if (s) {
        let d = data.data;
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 5000,
          style: Style,
        });
        if (d.is_online == 1) {
          setOnline(true);
        } else {
          setOnline(false);
        }
      }
    });
    //**gets on-going projects */
  };

  const RunVendorHome = async () => {
    setLoading(true);
    try {
      const response = await Instance.get(`vendors/profile?provider=vendor`, {
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
      }
      //**gets ongoing projects */
      const response2 = await Instance.get('styles?provider=vendor', {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });
      let s2 = response2.data.status;
      let m2 = response2.data.message;
      if (s2) {
        setStyles(response2.data.data);
      } else {
        setLoading(false);
      }
    } catch (err) {
      // setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  return [loading, handleToggle, online, profile, styled, RunVendorHome];
};
