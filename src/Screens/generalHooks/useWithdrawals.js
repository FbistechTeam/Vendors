import {useState} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Instance from '../../Api/Instance';
import useApi from '../../Api/useApi';

export default () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentBank, setCurrentBank] = useState([]);

  const [HandleRequest] = useApi();

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };
  /**set withrawal options */
  const withrawalOption = dataA => {
    setLoading(true);
    let Data = {option_id: dataA};
    const request = HandleRequest(
      'vendors/withdrawals/options/set?provider=vendor',
      'put',
      Data,
    );
    request
      .then(data => {
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
      const response = HandleRequest(
        `vendors/withdrawals/options?provider=vendor`,
        'get',
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setOptions(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });

      //**gets ongoing projects */
      const response2 = HandleRequest('vendors/banks?provider=vendor', 'get');
      response2.then(data => {
        let s2 = data.status;
        let m2 = data.message;
        if (s2) {
          setCurrentBank(data.data);
        } else {
          setLoading(false);
        }
      });
    } catch (err) {
      // setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  return [loading, Details, options, currentBank, withrawalOption];
};
