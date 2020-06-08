import {useState} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Instance from '../../../../Api/Instance';

export default () => {
  const [pending, setPending] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const request = await Instance.get(
        `vendors/measurer/jobs/pending?provider=vendor`,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );

      let s = request.data.status;
      let m = request.data.message;
      if (s) {
        console.log(request.data.data);
        setPending(request.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }

      //**gets ongoing projects */
      const requestOngoing = await Instance.get(
        'vendors/measurer/jobs/ongoing?provider=vendor',
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );

      let s2 = requestOngoing.data.status;
      let m2 = requestOngoing.data.message;
      if (s2) {
        setOngoing(requestOngoing.data.data);
      } else {
        setLoading(false);
      }
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
      const response = await Instance.put(
        'vendors/measurer/jobs/accept?provider=vendor',
        dataId,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      console.log(response);
      let s = response.data.status;
      let m = response.data.message;
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
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  return [loading, pending, ongoing, GetJObs, AcceptRequest];
};
