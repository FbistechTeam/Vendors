import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Instance from '../../../../Api/Instance';

export default () => {
  const [Achievements, setAchievements] = useState([]);
  const [completed, setCompleted] = useState([]);
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

  const Analytics = async () => {
    setLoading(true);
    try {
      const request = await Instance.get(
        `vendors/retailer/analytics/achievements?provider=vendor`,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      let s = request.data.status;
      let m = request.data.message;
      if (s) {
        setAchievements(request.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
      //**gets ongoing projects */
      const requestCompleted = await Instance.get(
        'vendors/retailer/analytics/sold_out?provider=vendor',
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      let s2 = requestCompleted.data.status;
      let m2 = requestCompleted.data.message;
      if (s2) {
        setCompleted(requestCompleted.data.data);
      } else {
        setLoading(false);
      }
      const requestReviews = await Instance.get(
        'vendors/tailor/jobs/reviews?provider=vendor',
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      let s3 = requestReviews.data.status;
      let m3 = requestReviews.data.message;
      if (s3) {
        setCompleted(requestReviews.data.data);
      } else {
        setLoading(false);
      }
    } catch (err) {
      // setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  return [Analytics, Achievements, completed, reviews, message];
};
