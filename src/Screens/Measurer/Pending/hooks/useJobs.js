import {useState} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Instance from '../../../../Api/Instance';
import useApi from '../../../../Api/useApi';

export default () => {
  const [pending, setPending] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [HandleRequest] = useApi();
  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };

  const GetJObs = async () => {
    setLoading(true);
    try {
      const request = HandleRequest(
        `vendors/measurer/jobs/pending?provider=vendor`,
        'get',
      );
      request.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setPending(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });

      //**gets ongoing projects */
      const requestOngoing = HandleRequest(
        'vendors/measurer/jobs/ongoing?provider=vendor',
        'get',
      );
      requestOngoing.then(data => {
        let s2 = data.status;
        let m2 = data.message;
        if (s2) {
          setOngoing(data.data);
        } else {
          setLoading(false);
        }
      });
    } catch (err) {
      // setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  /**to accept requests */
  const AcceptRequest = async job_id => {
    setLoading(true);
    const dataId = {job_id};
    try {
      const requestOngoing = HandleRequest(
        'vendors/measurer/jobs/accept?provider=vendor',
        'put',
        dataId,
      );
      requestOngoing.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
          GetJObs();
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
          GetJObs();
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  return [loading, pending, ongoing, GetJObs, AcceptRequest];
};
