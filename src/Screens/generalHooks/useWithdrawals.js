import {useState} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Instance from '../../Api/Instance';

export default () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentBank, setCurrentBank] = useState([]);

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };
  /**set withrawal options */
  const withrawalOption = data => {
    setLoading(true);
    const request = new Promise(res => {
      console.log('you');
      res(
        Instance.put(
          'vendors/withdrawals/options/set?provider=vendor',
          {option_id: data},
          {
            headers: {
              Authorization: 'Bearer ' + access_token,
            },
          },
        ),
      );
    });
    request
      .then(({data: data}) => {
        setLoading(false);
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
        }
      })
      .catch(err => {
        console.log(err);
      });
    //**gets on-going projects */
  };

  const Details = async () => {
    setLoading(true);
    try {
      const response = await Instance.get(
        `vendors/withdrawals/options?provider=vendor`,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        setOptions(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
      //**gets ongoing projects */
      const response2 = await Instance.get('vendors/banks?provider=vendor', {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });
      let s2 = response2.data.status;
      let m2 = response2.data.message;
      if (s2) {
        setCurrentBank(response2.data.data);
      } else {
        setLoading(false);
      }
    } catch (err) {
      // setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  return [loading, Details, options, currentBank, withrawalOption];
};
