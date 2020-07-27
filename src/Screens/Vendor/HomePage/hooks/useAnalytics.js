import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Instance from '../../../../Api/Instance';
import useApi from '../../../../Api/useApi';

export default () => {
  const [Achievements, setAchievements] = useState([]);
  const [completed, setCompleted] = useState([]);
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

  const Analytics = async () => {
    setLoading(true);
    try {
      const request = HandleRequest(
        'vendors/retailer/analytics/achievements?provider=vendor',
        'get',
      );
      request.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setAchievements(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });

      //**gets ongoing projects */
      const requestCompleted = HandleRequest(
        'vendors/retailer/analytics/sold_out?provider=vendor',
        'get',
      );
      requestCompleted.then(data => {
        let s2 = data.status;
        let m2 = data.message;
        if (s2) {
          setCompleted(data.data);
        } else {
          setLoading(false);
        }
      });
    } catch (err) {
      // setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  return [Analytics, Achievements, completed, reviews, message];
};
