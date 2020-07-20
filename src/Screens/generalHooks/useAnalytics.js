import {useState} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Instance from '../../Api/Instance';

export default () => {
  const [accepted, setAccepted] = useState([]);
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

  const RunAnalytics = async () => {
    setLoading(true);
    try {
      const request = await Instance.get(
        `vendors/tailor/analytics/total_accepted_requests?provider=vendor`,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      let s = request.data.status;
      let m = request.data.message;
      if (s) {
        setAccepted(request.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
      //**gets ongoing projects */
      const requestCompleted = await Instance.get(
        'vendors/tailor/analytics/total_completed_jobs?provider=vendor',
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
      console.log(requestReviews);
      let s3 = requestReviews.data.status;
      let m3 = requestReviews.data.message;
      if (s3) {
        setReviews(requestReviews.data.data);
      } else {
        setLoading(false);
        setMessage(m3);
      }
    } catch (err) {
      // setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  return [accepted, completed, reviews, message, RunAnalytics];
};
